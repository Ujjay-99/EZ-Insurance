import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuranceType } from 'src/app/models/IInsuranceType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-view-type',
  templateUrl: './employee-view-type.component.html',
  styleUrls: ['./employee-view-type.component.css']
})
export class EmployeeViewTypeComponent implements OnInit {
  typeList: IInsuranceType[] = [];
  constructor(private adminService: AdminDataService ,private route:ActivatedRoute,private router:Router) {
    
  }
  editType(id: string) {
    
    this.router.navigate([`Employee/EditType/${id}`])    
  }
  deleteType(id: string) {
    console.log(id);

    
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
        this.adminService.deleteType(id).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => console.log('deleted'),
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.ngOnInit();
      }
    })
    // location.reload();
  }
  ngOnInit(): void {
    this.adminService.viewType().subscribe((type) => {
      console.log(type);

      this.typeList = type;
    });
    // console.log(this.typeList);
  }
}
