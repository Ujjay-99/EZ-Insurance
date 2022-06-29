import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminDataService } from 'src/app/admin/admin-services/admin-data.service';
import { IInsuranceType } from 'src/app/models/IInsuranceType';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-employee-edit-type',
  templateUrl: './employee-edit-type.component.html',
  styleUrls: ['./employee-edit-type.component.css']
})
export class EmployeeEditTypeComponent implements OnInit {
  typeForm: FormGroup;
  id: string;
  isAddMode: boolean;
  submitted = false;
  base64textString:string | Blob;

  constructor(
    private adminService: AdminDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  get f() {
    return this.typeForm.controls;
  }

  onSubmit() {
    console.log(this.isAddMode);
    this.submitted = true;
    if (this.isAddMode) {
      return
    } else {
      this.editType();
      Swal.fire('Type Updated successfully.');
    }
  }

  onFileChange(e:any){
    var files = e.target.files;
    var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();
        reader.onload =this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e:any) {
      var binaryString = e.target.result;
      this.base64textString= btoa(binaryString);
  }

  private editType() {
    const typeData: IInsuranceType = {
      id: this.id,
      typeImage:this.base64textString,
      typeTitle: this.typeForm.controls['typeTitle'].value,
      isActive: this.typeForm.controls['status'].value,
    };
    this.adminService.updateType(typeData)
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
    this.typeForm = this.formBuilder.group({
      typeImage: ['',Validators.required],
      typeTitle: ['', Validators.required],
      status: [null, Validators.required],
    });
    if (!this.isAddMode) {
      this.adminService
        .viewTypeById(this.id)
        .pipe(first())
        .subscribe((x) => this.typeForm.patchValue(x));
    }
  }

}
