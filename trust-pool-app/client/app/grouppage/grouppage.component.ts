import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  Directive,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxChartsModule } from '@swimlane/ngx-charts'
import { PoolsService } from '../services/pools/pools.service';
import { ChatService } from '../services/chat/chat.service';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService, Toast } from 'ngx-toastr';
import { DateFormatPipe } from 'angular2-moment';

@Directive({ selector: 'cardinfo' })
export class CardInfo {
}

@Component({
  selector: 'app-grouppage',
  templateUrl: './grouppage.component.html',
  styleUrls: ['./grouppage.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GrouppageComponent implements OnInit, AfterViewInit, OnDestroy {
  public cardInfo: ElementRef;
  @ViewChild('cardInfo') set getCardInfo(cardInfo: ElementRef) {
    const groupPage = this;
    setTimeout(() => {
      groupPage.cardInfo = cardInfo;
      if (groupPage.cardInfo) {
        groupPage.card.mount(groupPage.cardInfo.nativeElement);
      }
    }, 0);
  }

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  joinRequests: any;
  currentExpenseRequest: any;
  failedExpenseRequests: any;
  passedExpenseRequests: any;
  poolid: number;
  isMember: any;
  pool: any = {};
  private sub: any;
  closeResult: string;
  expenseRequests: any;
  toggleChat: boolean = false;
  chatName: string;
  chatMessages: Array<{ userName: String, message: String }> = [];
  messageToSend: string;
  chatError: string;
  currentChatId: number;
  currentExpenseVote: any[];
  multi: any[];

  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private cd: ChangeDetectorRef,
    private _poolsService: PoolsService,
    private _cookieService: CookieService,
    private _router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private _chatService: ChatService,
    private toastrService: ToastrService
  ) { 
    this._chatService.getPrevMessages()
      .subscribe((data) => {
        this.chatMessages = data.messages;
      });
    this._chatService.newUserJoined()
      .subscribe(data => this.chatMessages.push(data));
    this._chatService.userHasLeft()
      .subscribe(data => this.chatMessages.push(data));
    this._chatService.receiveMessages()
      .subscribe(data => this.chatMessages.push(data));
    Object.assign(this, { currentExpenseVote: this.currentExpenseVote, multi: this.multi })
  }


  ngAfterViewInit() {
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = elements.create('card', { style });
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let { poolid, getPool, checkIsMember, getJoinRequests, getExpenseRequests } = this;
      poolid = +params['poolid']; // (+) converts string 'id' to a number
      getPool.call(this, poolid);
      checkIsMember.call(this, poolid);
      getJoinRequests.call(this, poolid);
      getExpenseRequests.call(this, poolid);
    });
  }

  viewGroups() {
    this._router.navigate(['groups']);
  }

  fnToggleChat(){
    this.toggleChat = !this.toggleChat;
  }

  sendChatMessage(){
    const { currentChatId, isMember, messageToSend } = this;
    const messageData = { chatId: currentChatId, userId: isMember.pool_member_id, message: messageToSend };
    this._chatService.sendMessage(messageData);
  }

  leaveChat() {
    const joinInfo = { chatId: this.currentChatId, userId: this.isMember.pool_member_id };
    this._chatService.leaveChat(joinInfo);
    this.fnToggleChat();
  }

  joinRequestChat(chatId){
    const joinInfo = { chatId, userId: this.isMember.pool_member_id };
    this.currentChatId = chatId;
    this._chatService.joinRequestChat(joinInfo);
    this.fnToggleChat();
  }

  onSelect(event) {
    console.log(event);
  }

  getPool(poolid) {
    this._poolsService.getPool(poolid).subscribe(
      (res: {pool:object, error: string}) => {
        const { pool, error } = res;
        if(pool){
          this.pool = pool;
          const readable = (new DateFormatPipe()).transform(pool['createdAt'], 'LL');
          pool['createdAt'] = readable;
        }
        console.log(error);
      },
      err => this.toastrService.error(err),
      () => console.log('done loading pool')
    );
  }

  inviteFriend(poolName, email, message, poolId) {
    this._poolsService.inviteFriend(email, message, poolName, poolId, window.location.origin).subscribe(
      res => console.log(res),
      err => console.log(err),
      () => this.toastrService.success('You\'ve Successfully invited a friend!')
    );
  }

  getJoinRequests(poolid) {
    this._poolsService.getJoinRequests(poolid).subscribe(
      (res: { requests: ArrayType }) => {
        this.joinRequests = res.requests;
      }
    );
  }

  getExpenseRequests(poolid) {
    this._poolsService.getExpenseRequests(poolid).subscribe(
      (res: any) => {
        this.expenseRequests = res;
        this.failedExpenseRequests = [];
        this.passedExpenseRequests = [];
        res.forEach((request)=>{
          if(request.active_status === 'current'){
            const readable = (new DateFormatPipe()).transform(request['createdAt'], 'LL');
            const readable2 = (new DateFormatPipe()).transform(request['expiration_date'], 'LL');
            request['createdAt'] = readable;
            request['expiration_date'] = readable2;
            this.currentExpenseRequest = request;
            this.currentExpenseVote = [{ name: 'Vote Power to Pass', value: request.vote_up }, { name: 'Vote Power to Fail', value: request.vote_down }]
          } else if (request.active_status === 'failed'){
            const readable = (new DateFormatPipe()).transform(request['createdAt'], 'LL');
            const readable2 = (new DateFormatPipe()).transform(request['expiration_date'], 'LL');
            request['createdAt'] = readable;
            request['expiration_date'] = readable2;
            this.failedExpenseRequests.push(request);
          } else if (request.active_status === 'passed') {
            const readable = (new DateFormatPipe()).transform(request['createdAt'], 'LL');
            const readable2 = (new DateFormatPipe()).transform(request['expiration_date'], 'LL');
            request['createdAt'] = readable;
            request['expiration_date'] = readable2;
            this.passedExpenseRequests.push(request);
          }
        });
      }
    );
  }

  approveExpenseRequest(request) {
    const { isMember, _poolsService, pool } = this;
    const { id, voter_count } = request;
    const { vote_power } = isMember;
    const { members_count, voteConfig} = pool;
    if (voter_count >= members_count) {
      this.toastrService.info('EVERYONE HAS VOTED ALREADY')
      return 'EVERYONE HAS VOTED ALREADY';
    }
    if (isMember.has_voted) {
      this.toastrService.info('YOU HAVE ALREADY VOTED');
      return 'YOU HAVE ALREADY VOTED';
    }
    _poolsService.approveExpenseRequest(id, vote_power, isMember.id, members_count, voteConfig, pool.id).subscribe(
      res => {
        request.voter_count += 1;
        request.vote_up += isMember.vote_power;
        isMember.has_voted = 't';
      },
      err => console.log(err),
      () => console.log('done loading pool')
    );

  }

  declineExpenseRequest(request) {
    const { isMember, _poolsService, pool } = this;
    const { id, voter_count } = request;
    const { vote_power } = isMember;
    const { voteConfig, members_count } = pool;
    if (voter_count >= members_count) {
      this.toastrService.info('EVERYONE HAS VOTED ALREADY')
      return 'EVERYONE HAS VOTED ALREADY';
    }
    if (this.isMember.has_voted) {
      this.toastrService.info('YOU HAVE ALREADY VOTED');
      return 'YOU HAVE ALREADY VOTED';
    }
    _poolsService.declineExpenseRequest(id, vote_power, isMember.id, members_count, voteConfig, pool.id).subscribe(
      res => {
        request.voter_count += 1;
        request.vote_down += isMember.vote_power;
        isMember.has_voted = 't';
      },
      err => console.log(err),
      () => console.log('done loading pool')
    );
  }

  acceptRequest(request) {
    request.status = 'accepted';
    this._poolsService.resJoinRequest(request).subscribe(
      res => console.log(res),
      err => console.log(err),
      () => console.log('done loading pool')
    );
  }
  declineRequest(request) {
    request.status = 'declined';
    this._poolsService.resJoinRequest(request).subscribe(
      res => console.log(res),
      err => console.log(err),
      () => console.log('done loading pool')
    );
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  openInviteFriendModal(inviteFriendModal) {
    this.modalService.open(inviteFriendModal, { centered: true });
  }

  openExpenseRequestModal(expenseRequestModal){
    this.modalService.open(expenseRequestModal, { centered: true, size: 'lg' });
  }

  async onSubmit(form: NgForm, poolId) {
    const { isMember, _poolsService, card, pool } = this
    const { amount } = form.value;
    const { token, error } = await stripe.createToken(card);
    if (!isMember) {
      this.toastrService.info('YOU ARE NOT A MEMBER OF THIS GROUP');
    }
    if (error) {
      this.toastrService.error('Something is wrong:', error);
    } else {
      const amountArr = amount.toString().split('.');
      let decimalStr = amountArr[1];
      if (decimalStr && decimalStr.length > 2) {
        this.error = 'Too Many Decimals'
      } else if (!decimalStr) {
        _poolsService.sendContrib(token, poolId, amount * 100, isMember.id)
          .subscribe(
            (servResult: any) => {
              const { success } = servResult;
              const { contribution, charge  } = success;
              const { contributionEntry, updatedPool } = contribution;
              const { contribution_amount } = contributionEntry;
              const readable = (new DateFormatPipe()).transform(updatedPool['createdAt'], 'LL');
              updatedPool.createdAt = readable;
              this.pool = updatedPool;
              this.isMember.contrubution_amount += contribution_amount;
              // get vote power back, / get new isMember
            },
            err => this.toastrService.error(err, 'ERROR'),
            () => this.toastrService.success('done contributing to pool', 'Successfully contributed to the pool')
          );
      } else {
        if (decimalStr.length === 1) {
          amountArr[1] = decimalStr + '0';
        }
        _poolsService.sendContrib(token, poolId, amountArr.join(''), isMember.id)
          .subscribe(
            success => { this.toastrService.success(success.toString(), 'SUCCESS') },
            err => this.toastrService.error(err, 'ERROR'),
            () => console.log('done contributing to pool')
          );
      }
    }
  }

  joinGroup(poolid) {
    let socialUser = this._cookieService.get('socialID');
    let groupPage = this;
    if (socialUser) {
      // send post request with social user id
      this._poolsService.joinPool(poolid, socialUser)
        .subscribe(
          success => {
            groupPage.checkIsMember(poolid);
            this.toastrService.success(success.toString(), 'Success!!!');
          },
          err => this.toastrService.error(err, 'ERROR'),
          () => this.toastrService.success('done joining pool')
        );
    } else {
      // send post request with just poolId in body
      this._poolsService.joinPool(poolid, null).subscribe(
        success => {
          groupPage.checkIsMember(poolid);
        },
        err => this.toastrService.error(err, 'ERROR'),
        () => this.toastrService.success('done joining pool')
      );
    }
  }

  checkIsMember(poolid) {
    this._poolsService.checkIsMember(poolid).subscribe((result: { [member: string]: boolean }) => {
      const { member } = result;
      if (member) {
        this.isMember = member;
      } else {
        this.isMember = false;
      }
    },
      err => console.log('CHECK FILWS', err),
      () => console.log('done checking is member')
    );
  }
  goToExpenseRequestForm(poolid) {
    this._router.navigate(['expenseForm'], { queryParams: { poolid: poolid, value: this.pool.pool_value } });
  }
}
