import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from '../admin-services/admin-data.service';
import { ICity } from '../../models/ICity';
import { IState } from '../../models/IState';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  cityForm: FormGroup;
  id: string;
  isAddMode: boolean; 
  submitted = false;

  stateList:IState[]=[]
  constructor(private adminService: AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
      this.adminService.viewState().subscribe(states=>{
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
      this.addCity();
      Swal.fire('City added successfully.');
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
    this.adminService
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
    this.adminService.updateCity(cityData)
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
      this.adminService
        .viewCityById(this.id)
        .pipe(first())
        .subscribe((x) => this.cityForm.patchValue(x));
    }
  }

}
