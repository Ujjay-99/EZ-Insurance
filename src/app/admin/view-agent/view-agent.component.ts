import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminDataService } from '../admin-services/admin-data.service';
import { IEmployee } from '../../models/IEmployee';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent implements OnInit {

  employeeList:IEmployee[]=[]
  constructor(private adminService:AdminDataService,private router:Router) { }
  editEmployee(id: string) {
    console.log(id);
    this.router.navigate([`Admin/EditAgent/${id}`])    
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
        this.adminService.deleteEmployee(id).subscribe(response => {
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
    this.adminService.viewAgents().subscribe(emp=>{
      this.employeeList=emp
    })
  }
}
