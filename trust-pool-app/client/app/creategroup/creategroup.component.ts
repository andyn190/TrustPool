import { Component, OnInit } from '@angular/core';
import { GroupCreateService } from '../service/group-create.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.component.html',
  styleUrls: ['./creategroup.component.css']
})
export class CreategroupComponent implements OnInit {
  public groupName: string;
  public imageUrl: string;
  public description: string;
  public voteConfig: number;
  public publicOpt: boolean;
  constructor(
    private http: HttpClient, private groupService:GroupCreateService , private router: Router) { }

  ngOnInit() {
  }
  
  createGroup(form){
    console.log(form.value);
    let name = form.value['group-name'];
    let imageUrl = form.value['group-url'];
    let description = form.value['group-description'];
    let voteConfig = form.value['group-voterConfig'];
    let publicOpt = form.value['group-publicOpt'];
    const pool = {name: name, imgUrl: imageUrl, desc: description, voteConfig: voteConfig, publicOpt: publicOpt};
    this.groupService.createGroup(pool).subscribe(
      success => { console.log(success, 'Success!'); },
      err => console.log(err, 'ERROR'),
      () => console.log('done creating pool')
    );
    form.reset();
  }

}
