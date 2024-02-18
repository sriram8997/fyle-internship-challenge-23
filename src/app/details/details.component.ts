import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule } from '@angular/forms';
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
  repostriesData: any;
  pages: any = [];
  currentpage: number = 1;
  dataList: any = [];
search: string = '';

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
      if (data) {
        this.userDetails = data;        
        this.loading = false;    
        if (this.userDetails) {      
         this.getRepostries();
        }
      }
  }); 
}
public getRepostries() {
  this.apiservice.getdata(this.userDetails.repos_url).subscribe((data)=>{
    this.dataList = data;
    let pageCount = this.dataList.length / 10;    
    this.pages = [];
    pageCount = pageCount % 1 === 0 ? pageCount : Math.floor(pageCount) + 1;
      for (let index = 0; index < pageCount; index++) {
        const element = index+1;      
        this.pages.push(element);
     }
         this.loadDetails(this.dataList.slice(0, 10));  
  });
}

switchPage(pageNumber: number){
  this.currentpage = pageNumber;  
  this.loadDetails(this.dataList.slice((this.currentpage*10)-9, (this.currentpage*10)-1));
}

loadDetails(dataArray:any[]){
  this.repostriesData = [...dataArray];
}

searchData() {    
if (this.search !== '' && this.search !== null) {  
  let search_data = this.dataList.filter((item: any) => {
    if (item.name.toLowerCase().includes(this.search)) {
        return item.name.toLowerCase().startsWith(this.search);
    }
    return false;
});
  let pageCount = search_data.length / 10;    
  this.pages = []
    pageCount = pageCount % 1 === 0 ? pageCount : Math.floor(pageCount) + 1;
      for (let index = 0; index < pageCount; index++) {
        const element = index+1;      
        this.pages.push(element);
     }
      this.loadDetails(search_data.slice(0, 10));  

} else{
  this.getRepostries()
}
}
previousPage(){
  if (this.currentpage > 1) {
  this.currentpage -= 1;  
  }
  this.loadDetails(this.dataList.slice((this.currentpage*10)-9, (this.currentpage*10)-1));
}
nextPage() {
  if (this.currentpage < this.pages.length) {
    this.currentpage += 1;
  }
  this.loadDetails(this.dataList.slice((this.currentpage*10)-9, (this.currentpage*10)-1));
}

openFileUpload() {
  const fileInput = document.getElementById('user') as HTMLInputElement;
  fileInput.click();
}


getImage(event: any) {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const previewImg = document.getElementById('preview_img') as HTMLImageElement;
      previewImg.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile); 
  }
}


}
