import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuraceScheme } from 'src/app/models/iinsurace-scheme';

@Component({
  selector: 'app-employee-view-scheme',
  templateUrl: './employee-view-scheme.component.html',
  styleUrls: ['./employee-view-scheme.component.css']
})
export class EmployeeViewSchemeComponent implements OnInit {

  schemeList:IInsuraceScheme[]=[]
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
    alert('Scheme Deleted');
    this.ngOnInit();
    // location.reload();
  }
  editScheme(id: string) {
    
    this.router.navigate([`Employee/EditScheme/${id}`])    
  }

  ngOnInit(): void {
    this.adminService.viewScheme().subscribe(scheme=>{
      console.log(scheme);
      
      this.schemeList=scheme
    })
    console.log(this.schemeList);
  }

}
