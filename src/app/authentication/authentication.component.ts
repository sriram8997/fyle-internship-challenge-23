import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  private route = inject(Router)
userName:string = '';
public loginToDashboard(){
if(this.userName !== '' && this.userName !== null) {  
  this.route.navigate(['/home'], { queryParams: { user: this.userName } });
}
}
}
