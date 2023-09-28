import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SmartContractService } from '../services/smartContractService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private smartContractService: SmartContractService
  ) {}

  async getTotalVotes(partyId: number) {
    var ok = true;

    try {
      const totalNumber: number = await this.smartContractService.getTotalVotes(
        partyId
      );
      console.log('Total Votes:', totalNumber);
      alert(totalNumber);
      // Handle success
    } catch (error) {
      // Handle error
    }
  }
}
