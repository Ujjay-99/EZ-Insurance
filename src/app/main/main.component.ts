import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from '../admin/admin-services/admin-data.service';
import { IInsuraceScheme } from '../models/iinsurace-scheme';
import { IInsuranceType } from '../models/IInsuranceType';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
  // planDetails(id:string){
  //   console.log(id);
  //   this.router.navigate([`PlanDetail/${id}`])    
  // }

  viewSchemes(title:string){
    console.log(title);
    this.router.navigate([`SchemesByTitle/${title}`])
    
  }
  ngOnInit(): void {

  }

}
