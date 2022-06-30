import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IState } from 'src/app/models/IState';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-view-state',
  templateUrl: './employee-view-state.component.html',
  styleUrls: ['./employee-view-state.component.css']
})
export class EmployeeViewStateComponent implements OnInit {

  stateList:IState[]=[]
  constructor(private adminService:AdminDataService,private router:Router,private empService:EmployeeService) { 
    
    
  }
  deleteState(id: string) {
    console.log(id);

    this.empService.deleteState(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('deleted'),
    });
    alert('State Deleted');
    this.ngOnInit();
    // location.reload();
  }
  editState(id: string) {
    console.log(id);
    this.router.navigate([`Employee/EditState/${id}`])    
  }
  
  ngOnInit(): void {
    this.empService.viewState().subscribe(states=>{
      console.log(states);
      
      this.stateList=states
    })
    console.log(this.stateList);
  }
}
