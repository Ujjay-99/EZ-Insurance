import { Component, OnInit } from '@angular/core';
import { IWithdrawAccount } from 'src/app/models/IwithdrawAccount';
import Swal from 'sweetalert2';
import { AgentService } from '../agent.service';

@Component({
  selector: 'app-withdraw-amount',
  templateUrl: './withdraw-amount.component.html',
  styleUrls: ['./withdraw-amount.component.css'],
})
export class WithdrawAmountComponent implements OnInit {
  availableAmount: number;
  withdrawAmount: number;


  agentId: string;
  account: IWithdrawAccount;
  withdraw() {
    if(this.withdrawAmount>this.availableAmount){
      Swal.fire('Ammount should be less than Available amount')
      return
    }
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Withdraw',
    }).then((result) => {
      if (result.isConfirmed) {
        const payload: IWithdrawAccount = {
          id: this.account.id,
          agentId: this.account.agentId,
          totalAmount: this.withdrawAmount,
          createdAt: this.account.createdAt,
          commissions: [],
        };
        this.agentService.withdrawAmount(payload).subscribe(x=>{
          console.log("Withdrawd");
          
        });
        Swal.fire('Successful!', 'Ammount has been withdrawn', 'success');
        this.ngOnInit();
      }
    });
  }
  constructor(private agentService: AgentService) {
    
  }

  ngOnInit(): void {
    this.agentId = this.agentService.getAgentId();
    console.log(this.agentId);

    this.agentService
      .getWithdrawAccountByAgentId(this.agentId)
      .subscribe((x) => {
        this.account = x;
        this.availableAmount = x.totalAmount;
        console.log(x);
      });
  }
}
