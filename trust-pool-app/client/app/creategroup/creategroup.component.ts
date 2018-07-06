import { Component, OnInit } from '@angular/core';
import { GroupCreateService } from '../service/group-create.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

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
    private http: HttpClient, private groupService:GroupCreateService , private router: Router) { }

  ngOnInit() {
  }
  
  createGroup(form){
    console.log(form.value);
    let name = form.value['group-name'];
    let imgUrl = this.file;
    let desc = form.value['group-description'];
    let voteConfig = form.value['group-voterConfig'];
    let publicOpt = form.value['group-publicOpt'];
    const pool = { name, imgUrl, desc, voteConfig, publicOpt};
    this.groupService.createGroup(pool).subscribe(
      success => { console.log(success, 'Success!'); },
      err => console.log(err, 'ERROR'),
      () => console.log('done creating pool')
    );
    form.reset();
  }

  encodeImageFileAsURL(element) {
    const outer = this;
    console.log(element);
    const file = element.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function() {
      console.log('RESULT', reader.result);
      outer.file = reader.result;
    }
    reader.readAsDataURL(file);
  }

}
