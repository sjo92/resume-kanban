import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedin :boolean =false
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((data: any) => {
      console.log(data)
      this.loggedin = data.data
    })
  }
  logout(){
    this.authService.SignOut().then(
      ()=> {
        this.authService.loggedIn();
      } 
    )
    console.log("Sign Out successful")
  }

}
