import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuracePlan } from 'src/app/models/IInsurancePlan';

@Component({
  selector: 'app-employee-view-plan',
  templateUrl: './employee-view-plan.component.html',
  styleUrls: ['./employee-view-plan.component.css']
})
export class EmployeeViewPlanComponent implements OnInit {

  planList:IInsuracePlan[]=[]
  constructor(private adminService:AdminDataService,private router:Router) { }

  editPlan(id:string){
    console.log(id);
    this.router.navigate([`Employee/EditPlan/${id}`])   
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
