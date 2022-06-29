import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from '../admin-services/admin-data.service';
import { IInsuracePlan } from '../../models/IInsurancePlan';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-plan',
  templateUrl: './view-plan.component.html',
  styleUrls: ['./view-plan.component.css']
})
export class ViewPlanComponent implements OnInit {

  planList:IInsuracePlan[]=[]
  constructor(private adminService:AdminDataService,private router:Router) { }

  editPlan(id:string){
    this.router.navigate([`Admin/EditPlan/${id}`])   
  }

  deletePlan(id: string) {
    this.adminService.deletePlan(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('deleted'),
    });
    Swal.fire('Plan Deleted');
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.adminService.viewPlans().subscribe(plans=>{
      this.planList=plans;
    })
  }

}
