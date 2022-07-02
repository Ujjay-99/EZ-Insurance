import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IDocument } from 'src/app/models/IDocument';
import { IUploadDocument } from 'src/app/models/IUploadDocument';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-upload-documents',
  templateUrl: './customer-upload-documents.component.html',
  styleUrls: ['./customer-upload-documents.component.css']
})
export class CustomerUploadDocumentsComponent implements OnInit {

  title:string;
  file:File;
  documents:IDocument[];
  customerId:string;
  image:any;
  imageUrl:any;

  base64textString:string | Blob;
  constructor(private customerService:CustomerService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.customerId = this.customerService.getCustomerId();
    this.customerService.getDocumentsByCustomerId(this.customerId)
          .subscribe(d => {
            console.log(d);
              this.documents = d;
          })
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

  onSubmit(){
    const payload:IUploadDocument = {
      baseEntityId:this.customerId,
      documentTitle:this.title,
      documentFile:this.base64textString
      }
      Swal.fire({
        title: 'Do you want to upload this Document?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, upload it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.customerService.uploadDocument(payload)
            .subscribe(x => {
              console.log(x);
            });
            Swal.fire(
              'Uploaded!',
              'Your file has been uploaded.',
              'success'
              )
              this.ngOnInit();
        }
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
        this.customerService.deleteDocument(id).subscribe(x =>{
          console.log(x);
          
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Your document is safe :)',
            'error'
            )
          }
          this.ngOnInit();
    })
    
  }
}
