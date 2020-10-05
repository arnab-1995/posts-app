import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  constructor(private modalService: NgbModal, private utilitySvc: UtilityService) { }

  ngOnInit(): void {
    this.utilitySvc.isAuthenticated.subscribe(resp => {
      if (resp) {
        this.username = this.utilitySvc.getCookie('username');
      } else {
        this.username = '';
      }
    })
  }

  openLoginModal() {
    this.modalService.open(LoginComponent, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

}
