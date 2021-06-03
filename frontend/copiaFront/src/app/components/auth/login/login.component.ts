import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiCallsService } from 'src/app/services/api-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 response:any=[]
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, public service: ApiCallsService, private router:Router, private storage:LocalStorageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.service.post("/user/login", this.validateForm.value)
        .subscribe(data => {
          this.response=data
        
          if(this.response.status==0){
          
           this.storage.store('user',this.response.user)
           this.storage.store('token',this.response.token)           
           window.location.replace('/dashboard')
          }else{
            alert(this.response.error)
          }
        })
    }else {
      alert("invalid form")
    }
  }
}
