import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuraceScheme } from 'src/app/models/iinsurace-scheme';
import { IInsuranceType } from 'src/app/models/IInsuranceType';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  typeList:IInsuranceType[]=[];
  schemesList:IInsuraceScheme[]=[];
  constructor(private dataService:AdminDataService,private router: Router) { 
    this.dataService.viewType().subscribe(type=>{
      console.log(type);
      this.typeList=type;
    })
    this.dataService.viewScheme().subscribe(type=>{
      console.log(type);
      this.schemesList=type;
    })
  }
  purchasePlan(schemeTitle:string){
    console.log(schemeTitle);
    this.router.navigate([`Customer/PurchasePlan/${schemeTitle}`])
  }

  ngOnInit(): void {
  }

}
