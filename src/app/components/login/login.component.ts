import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'src/app/services/utility.service';
import { HttpService } from 'src/app/services/http.service';
import User from 'src/app/models/user';
import APIResponse from 'src/app/models/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  name: string;
  email: string;
  constructor(public activeModal: NgbActiveModal, private utilitySvc: UtilityService, private httpService: HttpService) { }

  ngOnInit(): void {
  }

  onSignUp(e: Event) {
    e.preventDefault();
    const data: User = { name: this.name, email: this.email, gender: 'Male', status: 'Active' };
    this.httpService.createUser(data).subscribe((resp: APIResponse) => {
      const user: User = resp.data;
      if (user.name && user.email) {
        this.utilitySvc.setCookie('username', user.name, 1);
        this.utilitySvc.setCookie('email', user.email, 1);
        this.utilitySvc.setAuthenticationStatus(true);
      } else {
        console.log('Error occurred while registering user');
      }
    }, err => {
      console.log('Error occurred while registering user: ' + err);
    })
    this.activeModal.close();
  }

}
