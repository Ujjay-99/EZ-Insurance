import { Component, OnInit } from '@angular/core';
import { IQuery } from 'src/app/models/IQuery';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-view-queries',
  templateUrl: './customer-view-queries.component.html',
  styleUrls: ['./customer-view-queries.component.css']
})
export class CustomerViewQueriesComponent implements OnInit {
customerId:string
queries:IQuery[]
defalutTime:Date 
  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.defalutTime=new Date('0001-01-01T00:00:00');
    this.customerId=this.customerService.getCustomerId();
    this.customerService.viewQueriesByCustomerId(this.customerId).subscribe(x=>{
      this.queries=x
      console.log(x);
      
    })
  }

}
