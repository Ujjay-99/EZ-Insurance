import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdminDataService } from '../admin/admin-services/admin-data.service';
import { IInsuraceScheme } from '../models/iinsurace-scheme';
import { IInsuranceType } from '../models/IInsuranceType';
import { ISchemeWithImage } from '../models/ISchemeWithImage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  typeList:IInsuranceType[];
  schemesList:ISchemeWithImage[];
  imageUrl:any;
  url:any;
  constructor(private dataService:AdminDataService,private router: Router, private sanitizer: DomSanitizer) { 
    
  }
  // planDetails(id:string){
  //   console.log(id);
  //   this.router.navigate([`PlanDetail/${id}`])    
  // }

  viewSchemes(title:string){
    console.log(title);
    this.router.navigate([`SchemesByTitle/${title}`])
    
  }
  ngOnInit(): void {
    this.dataService.viewType().subscribe(type=>{
      console.log(type);
      this.typeList=type;
    })
    this.dataService.viewSchemesWithImage().subscribe(type=>{
      this.success(type);
    })
  }

  success(data:ISchemeWithImage[]){
    this.schemesList = data;
    for(let i = 0; i < this.schemesList.length; i++){
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.schemesList[i].insranceTypeImage}`);
      this.schemesList[i].url = this.url;
    }
  }

  planDetails(schemeTitle:string){
    console.log(schemeTitle);
    this.router.navigate([`PlanDetail/${schemeTitle}`])
  }
}
