import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAddQuery } from 'src/app/models/IAddQuery';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-enquiry',
  templateUrl: './customer-enquiry.component.html',
  styleUrls: ['./customer-enquiry.component.css']
})
export class CustomerEnquiryComponent implements OnInit {
queryForm:FormGroup
title=''
discription=''
submit(){
  const payload:IAddQuery={
    customerId:this.customerService.getCustomerId(),
    title:this.title,
    description:this.discription
  }
  this.customerService.addQuery(payload).subscribe(x=>{
    console.log('sent');
    
  })
  Swal.fire('Thank You for Your Response..We will get back to you soon...')
  console.log(this.title);
  console.log(this.discription);

  
}
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {

  }

}
