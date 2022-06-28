import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { ICity } from 'src/app/models/ICity';

@Component({
  selector: 'app-employee-view-city',
  templateUrl: './employee-view-city.component.html',
  styleUrls: ['./employee-view-city.component.css']
})
export class EmployeeViewCityComponent implements OnInit {

  cityList:ICity[]=[]
  constructor(private adminService:AdminDataService,private router:Router) { 
    
    
  }
  deleteCity(id: string) {
    console.log(id);

    this.adminService.deleteCity(id).subscribe({
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
  editCity(id: string) {
    console.log(id);
    this.router.navigate([`Employee/EditCity/${id}`])    
  }
  ngOnInit(): void {
    this.adminService.viewCity().subscribe(city=>{
      console.log(city);
      
      this.cityList=city
    })
    console.log(this.cityList);
  }

}
