import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  userDetails:any;
constructor(private route : Router, private router : ActivatedRoute, private apiservice : ApiService){}
ngOnInit(): void {
  this.router.queryParamMap.subscribe(params => {
    if (params.has('user')) {
let userName =  params?.get('user');
if(userName != null){
      this.getRepostryDetails(userName);}
    }
  });
}
public getRepostryDetails(githubUsername:string) {
  this.apiservice.getUser(githubUsername).subscribe((data)=>{
this.userDetails = data;
  });
  this.apiservice.getdata().subscribe((data)=>{
console.log(data,"repo")
  });
}
}
