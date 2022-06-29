import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuraceScheme } from 'src/app/models/iinsurace-scheme';
import { IInsuranceType } from 'src/app/models/IInsuranceType';
import { ISchemeWithImage } from 'src/app/models/ISchemeWithImage';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  typeList:IInsuranceType[];
  schemesList:ISchemeWithImage[];
  viewSchemeList:ISchemeWithImage[];
  imageUrl:any;
  url:any;
  constructor(private dataService:AdminDataService,private router: Router, private sanitizer: DomSanitizer) {}
  purchasePlan(schemeTitle:string){
    this.router.navigate([`Customer/PurchasePlan/${schemeTitle}`])
  }

  ngOnInit(): void {
    this.dataService.viewType().subscribe(type=>{
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
}
