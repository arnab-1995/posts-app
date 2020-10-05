import { Component, OnInit } from '@angular/core';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private utilitySvc: UtilityService) {}

  ngOnInit() {
    const username = this.utilitySvc.getCookie('username');
    if(username){
      this.utilitySvc.setAuthenticationStatus(true);
    }
  }
}
