import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminDataService } from '../admin-services/admin-data.service';
import { IInsuranceType } from '../../models/IInsuranceType';

@Component({
  selector: 'app-view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.css'],
})
export class ViewTypeComponent implements OnInit {
  typeList: IInsuranceType[] = [];
  constructor(private adminService: AdminDataService ,private route:ActivatedRoute,private router:Router) {
    
  }
  editType(id: string) {
    
    this.router.navigate([`Admin/EditType/${id}`])    
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
