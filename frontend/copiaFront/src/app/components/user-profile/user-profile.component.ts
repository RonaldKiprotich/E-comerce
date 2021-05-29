import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user:any=[]

  constructor(private storage:LocalStorageService, private service:ApiCallsService

  ) { }

  ngOnInit(): void {

    //get user id from local storage
    var x = this.storage.retrieve('user')
    this.service.get('/api/user/'+x.id).subscribe(data=>{
      this.user=data
    })



    //get user details from api

  } 

}
