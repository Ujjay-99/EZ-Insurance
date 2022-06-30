import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IEmployee } from 'src/app/models/IEmployee';
import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-view-agent',
  templateUrl: './employee-view-agent.component.html',
  styleUrls: ['./employee-view-agent.component.css']
})
export class EmployeeViewAgentComponent implements OnInit {

  employeeList:IEmployee[]=[]
  constructor(private adminService:AdminDataService,private router:Router,private empService:EmployeeService) { }
  editEmployee(id: string) {
    console.log(id);
    this.router.navigate([`Employee/EditAgent/${id}`])    
  }

  deleteEmployee(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empService.deleteEmployee(id).subscribe(response => {
          console.log(response);
        });
        this.ngOnInit();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  ngOnInit(): void {
    this.empService.viewAgents().subscribe(emp=>{
      this.employeeList=emp
    })
  }
}
