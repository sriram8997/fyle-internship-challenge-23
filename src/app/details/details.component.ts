import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  userDetails:any;
  loading:any;
  image:any;
  user:any;

constructor(private route : Router, private router : ActivatedRoute, private apiservice : ApiService){}
ngOnInit(): void {
  this.loading = true;
  this.router.queryParamMap.subscribe(params => {
    if (params.has('user')) {
let userName =  params?.get('user');
this.user = userName;
if(userName != null){
      this.getRepostryDetails(userName);}
    }
  });
}
public getRepostryDetails(githubUsername:string) {
  this.apiservice.getUser(githubUsername).subscribe((data)=>{
    this.loading = false;
this.userDetails = data;
  });
  this.apiservice.getdata().subscribe((data)=>{
console.log(data,"repo")
  });
}
openFileUpload() {
  const fileInput = document.getElementById('user') as HTMLInputElement;
  fileInput.click();
}


getImage(event: any) {
  const selectedFile = event.target.files[0];
  console.log(selectedFile, "Selected File");

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      console.log("FileReader onload event triggered.");
      console.log(e, "FileReader event");
      const previewImg = document.getElementById('preview_img') as HTMLImageElement;
      previewImg.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile); // Read the file as a URL representing the file's data.
  }
}


}
