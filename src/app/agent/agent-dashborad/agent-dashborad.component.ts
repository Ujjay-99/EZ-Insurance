import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agent-dashborad',
  templateUrl: './agent-dashborad.component.html',
  styleUrls: ['./agent-dashborad.component.css']
})
export class AgentDashboradComponent implements OnInit {
  customerCount:number
  constructor() { }

  ngOnInit(): void {
  }

}
