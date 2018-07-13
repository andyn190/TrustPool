import { Component, OnInit } from '@angular/core';
import { GroupCreateService } from '../service/group-create.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Routes } from '@angular/router';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {
  public groupName: string;
  public file: any;
  public description: string;
  public voteConfig: number;
  public publicOpt: boolean;
  constructor(
    private groupService: GroupCreateService,
    private toastr: ToastrService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  createGroup(form) {
    let name = form.value['group-name'];
    let imgUrl64 = this.file;
    let desc = form.value['group-description'];
    let voteConfig = form.value['group-voterConfig'];
    let publicOpt = form.value['group-publicOpt'];
    const pool = { name, imgUrl64, desc, voteConfig, publicOpt };
    this.groupService.createGroup(pool).subscribe(
      success => {
        this.toastr.success(`${name} was Successfully created`);
        console.log(success, 'this is the success');
        console.log(success['newPool'].id, 'this be that mofuggin id');
        this._router.navigate([`group/${success['newPool'].id}`]);
      },
      err => this.toastr.error(err, 'ERROR'),
      () => console.log(`${name} was Successfully created`),
    );
    form.reset();
  }

  encodeImageFileAsURL(element) {
    const outer = this;
    const file = element.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      // console.log('RESULT', reader.result);
      outer.file = reader.result;
    }
    reader.readAsDataURL(file);
  }

}
