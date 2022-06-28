import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-enquiry',
  templateUrl: './customer-enquiry.component.html',
  styleUrls: ['./customer-enquiry.component.css']
})
export class CustomerEnquiryComponent implements OnInit {
queryForm:FormGroup

submit(){
  Swal.fire('Thank You for Your Response..We will get back to you soon...')
}
  constructor() { }

  ngOnInit(): void {

  }

}
