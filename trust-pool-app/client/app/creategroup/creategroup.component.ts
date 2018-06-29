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
  constructor(
    private http: HttpClient, private groupService:GroupCreateService , private router: Router) { }

  ngOnInit() {
  }
  
  createGroup(e){
    e.preventDefault();
    let name = e.target.elements[0].value;
    let imageUrl = e.target.elements[1].value;
    let description = e.target.elements[2].value
    const pool = {name: name, imageUrl: imageUrl, desc: description};
    this.groupService.createGroup(pool).subscribe(
      success => { console.log(success, 'Success!'); },
      err => console.log(err, 'ERROR'),
      () => console.log('done creating pool')
    );
  }

}
