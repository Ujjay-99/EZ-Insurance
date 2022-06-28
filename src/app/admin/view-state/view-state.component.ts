import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDataService } from '../admin-services/admin-data.service';
import { IState } from '../../models/IState';

@Component({
  selector: 'app-view-state',
  templateUrl: './view-state.component.html',
  styleUrls: ['./view-state.component.css']
})
export class ViewStateComponent implements OnInit {

  stateList:IState[]=[]
  constructor(private adminService:AdminDataService,private router:Router) { 
    
    
  }
  deleteState(id: string) {
    console.log(id);

    this.adminService.deleteState(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('deleted'),
    });
    alert('State Deleted');
    this.ngOnInit();
    // location.reload();
  }
  editState(id: string) {
    console.log(id);
    this.router.navigate([`Admin/EditState/${id}`])    
  }
  
  ngOnInit(): void {
    this.adminService.viewState().subscribe(states=>{
      console.log(states);
      
      this.stateList=states
    })
    console.log(this.stateList);
  }

}
