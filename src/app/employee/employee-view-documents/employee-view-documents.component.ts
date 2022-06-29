import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICustomer } from 'src/app/models/ICustomer';
import { IDocument } from 'src/app/models/IDocument';
import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-view-documents',
  templateUrl: './employee-view-documents.component.html',
  styleUrls: ['./employee-view-documents.component.css']
})
export class EmployeeViewDocumentsComponent implements OnInit {


  constructor(private adminService:EmployeeService, private sanitizer: DomSanitizer) { }

  documents:IDocument[];
  customer:ICustomer;
  imageUrl:any;
  ngOnInit(): void {
    this.customer = this.adminService.getCustomer();
    this.adminService.getDocumentsByCustomerId(this.customer.id).subscribe(x => {
      console.log(x);
      this.documents = x;
    })
  }

  viewDocument(document:IDocument){
    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${document.imageData}`);
    Swal.fire({
      title: document.imageTitle,
      text: "Image Id: " +document.id,
      imageUrl: this.imageUrl.changingThisBreaksApplicationSecurity,
      imageWidth: 900,
      imageHeight: 400,
      imageAlt: document.imageTitle,
    })
  }

  deleteDocument(id:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteDocument(id).subscribe(x =>{
          console.log(x);
          
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.ngOnInit();
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelled',
          'Your document is safe :)',
          'error'
        )
      }
    })
    
  }
}
