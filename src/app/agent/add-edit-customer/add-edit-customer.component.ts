import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { ICity } from 'src/app/models/ICity';
import { IState } from 'src/app/models/IState';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { ICustomer } from 'src/app/models/ICustomer2';
import { EmployeeService } from 'src/app/employee/employee.service';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {
  form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

  stateList:IState[]=[]
  cityList:ICity[]=[]


  constructor(
    private adminService:AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agentService:AgentService) { 
      this.adminService.viewState().subscribe(states=>{
        console.log(states);
        
        this.stateList=states
      })
      this.adminService.viewCity().subscribe(city=>{
        console.log(city);
        
        this.cityList=city
      })
    }
  
  get f() { return this.form.controls; }
  
  onSubmit() {
    console.log(this.isAddMode);
    
    this.submitted = true;

    // if (this.editform.invalid) {       
    //   return;     
    // }
    if (this.isAddMode) {
      this.addCustomer();
      Swal.fire('Customer Added successfully.');
      
    } else {
      return
  }
}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({ 
            id: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            doB: ['', Validators.required],
            userName: ['', Validators.required],
            phoneNumber: ['', Validators.required],   
            password: ['', Validators.required], 
            nominee:['', Validators.required], 
            nomineeRelation:['', Validators.required], 
            city:['', Validators.required], 
            state: ['', Validators.required], 
          address: ['', Validators.required], 
          pincode:['', Validators.required], 
        });
      //   if (!this.isAddMode) {
      //     this.adminService.viewCustomerById(this.id)
      //         .pipe(first())
      //         .subscribe(x => this.form.patchValue(x));
      // }

  }

  private addCustomer() {

    const payload:ICustomer = {
      id : '',
      firstName : this.form.controls['firstName'].value,
      lastName : this.form.controls['lastName'].value,
      email : this.form.controls['email'].value,
      password : this.form.controls['password'].value,
      parentId : this.agentService.getAgentId(),
      userName : this.form.controls['userName'].value,
      doB : this.form.controls['doB'].value,
      phoneNumber : this.form.controls['phoneNumber'].value,
      nominee:this.form.controls['nominee'].value,
      nomineeRelation:this.form.controls['nomineeRelation'].value,
      city: this.form.controls['city'].value,
      state: this.form.controls['state'].value,
      address: this.form.controls['address'].value,
      pincode:this.form.controls['pincode'].value,

    }

    this.adminService
      .addCustomer(payload)
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



}