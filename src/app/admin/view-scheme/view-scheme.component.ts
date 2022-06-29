import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from '../admin-services/admin-data.service';
import { IInsuraceScheme } from '../../models/iinsurace-scheme';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-scheme',
  templateUrl: './view-scheme.component.html',
  styleUrls: ['./view-scheme.component.css']
})
export class ViewSchemeComponent implements OnInit {

  schemeList:IInsuraceScheme[];
  constructor(private adminService:AdminDataService,private router:Router) { 
  }
  deleteScheme(id: string) {
    console.log(id);

    this.adminService.deleteScheme(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('deleted'),
    });
    Swal.fire('Scheme Deleted');
    this.ngOnInit();
    // location.reload();
  }
  editScheme(scheme:IInsuraceScheme) {
    this.adminService.setScheme(scheme);
    console.log("1", scheme);
    this.router.navigate([`Admin/EditScheme/${scheme.id}`])    
  }

  ngOnInit(): void {
    this.adminService.viewScheme().subscribe(scheme=>{
      console.log(scheme);
      
      this.schemeList=scheme
    })
    console.log(this.schemeList);
  }

}
