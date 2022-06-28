import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from '../admin-services/admin-data.service';
import { IInsuracePlan } from '../../models/IInsurancePlan';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.css']
})
export class ViewPlanComponent implements OnInit {

  planList:IInsuracePlan[]=[]
  constructor(private adminService:AdminDataService,private router:Router) { }

  editPlan(id:string){
    console.log(id);
    this.router.navigate([`Admin/EditPlan/${id}`])   
  }

  deletePlan(id: string) {
    console.log(id);

    this.adminService.deletePlan(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('deleted'),
    });
    alert('Plan Deleted');
    this.ngOnInit();
    // location.reload();
  }

  ngOnInit(): void {
    this.adminService.viewPlans().subscribe(plans=>{
      console.log(plans);
      
      this.planList=plans
    })
    console.log(this.planList);
  }

}
