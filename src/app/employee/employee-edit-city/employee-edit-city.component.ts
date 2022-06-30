import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { ICity } from 'src/app/models/ICity';
import { IState } from 'src/app/models/IState';
import Swal from 'sweetalert2'
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit-city',
  templateUrl: './employee-edit-city.component.html',
  styleUrls: ['./employee-edit-city.component.css']
})
export class EmployeeEditCityComponent implements OnInit {
  cityForm: FormGroup;
  id: string;
  isAddMode: boolean; 
  submitted = false;

  stateList:IState[]=[]
  constructor(private adminService: AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private empService:EmployeeService) {
      this.empService.viewState().subscribe(states=>{
        console.log(states);
        
        this.stateList=states
      })
      console.log(this.stateList);
      
     }
     get f() {
      return this.cityForm.controls;
    }
  onSubmit() {
    console.log(this.isAddMode);
    this.submitted = true;

    
    if (this.isAddMode) {
      return
    } else {
     this.editCity();
     Swal.fire('City updated successfully.');
    }
  }
  addCity(){
    const cityData:ICity={
      id:'',
      stateTitle:this.cityForm.controls['stateName'].value,
      cityName:this.cityForm.controls['cityName'].value,
      isActive:this.cityForm.controls['status'].value

    }
    this.empService
    .addCity(cityData)
    .pipe(first())
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
    Swal.fire('City Added successfully.');

  }
  private editCity() {
    const cityData:ICity={
      id:this.id,
      stateTitle:this.cityForm.controls['stateName'].value,
      cityName:this.cityForm.controls['cityName'].value,
      isActive:this.cityForm.controls['status'].value

    }
    this.empService.updateCity(cityData)
        .pipe(first())
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
            
          },
        });
        
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.cityForm = this.formBuilder.group({
      stateName:['',Validators.required],
      cityName: ['', Validators.required],
      status: [null, Validators.required]
    });
    if (!this.isAddMode) {
      this.empService
        .viewCityById(this.id)
        .pipe(first())
        .subscribe((x) => this.cityForm.patchValue(x));
    }
  }

}
