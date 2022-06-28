import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  marketingForm:FormGroup
  formBuilder: any;

  constructor() { }
  sendMail(){

  }

  ngOnInit(): void {
    this.marketingForm = this.formBuilder.group({
            
      emailId: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      
  });
  }

}
