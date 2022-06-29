import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuraceScheme } from 'src/app/models/iinsurace-scheme';
import { IInsuracePlan } from 'src/app/models/IInsurancePlan';
import { ISchemeWithImage } from 'src/app/models/ISchemeWithImage';

@Component({
  selector: 'app-schemes-by-title',
  templateUrl: './schemes-by-title.component.html',
  styleUrls: ['./schemes-by-title.component.css']
})
export class SchemesByTitleComponent implements OnInit {
  title:string
  PlanName:string;
  schemesList:ISchemeWithImage[];
  imageUrl:any;

  constructor(private dataService:AdminDataService,private router: Router,private route: ActivatedRoute, private sanitizer: DomSanitizer) { 
  }

  planDetails(schemeTitle:string){
    console.log(schemeTitle);
    this.router.navigate([`PlanDetail/${schemeTitle}`])
  }
  goToAgentLogin(){
    this.router.navigate([`AgentLogin`])
  }
  goToLogin(){
    this.router.navigate([`CustomerLogin`])

  }
  
  ngOnInit(): void {
    this.title = this.route.snapshot.params['title'];
    console.log(this.title);
    this.dataService
        .viewSchemesByType(this.title)
        .subscribe(x => {
          this.schemesList=x
          console.log(x);
        });

    
  }

}
