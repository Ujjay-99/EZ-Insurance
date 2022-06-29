import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IQuery } from 'src/app/models/IQuery';
import Swal from 'sweetalert2';
import { AdminDataService } from '../admin-services/admin-data.service';

@Component({
  selector: 'app-view-queries',
  templateUrl: './view-queries.component.html',
  styleUrls: ['./view-queries.component.css']
})
export class ViewQueriesComponent implements OnInit {
  customerId:string
  queries:IQuery[]
  defalutTime:Date 

    constructor(private adminService:AdminDataService) { }

    reply(Query:IQuery){
      
      Swal.fire({
      title: 'Add Your Reply',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        const payload:IQuery={
       
          id: Query.id,
          createdAt: Query.createdAt,
          customerId: Query.customerId,
          title: Query.title,
          description: Query.description,
          reply:login,
          replyTime: new Date()
      
      }
        this.adminService.reply(payload).subscribe(x=>{
          console.log(x);
          return x
          
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Replied Succesfully`,
         
        })
        this.ngOnInit();
      }
    })
  }
    ngOnInit(): void {

      
      this.adminService.viewQueries().subscribe(x=>{
        this.queries=x
        console.log(x);
        
      })
    }
  
  }

  