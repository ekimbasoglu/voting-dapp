import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VotingService } from '../services/votingService';
import { SmartContractService } from '../services/smartContractService';
import Web3 from 'web3';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css'],
})
export class VotingComponent {
  candidateInfos: any = [
    {
      id: 'akp',
      name: 'AKP - Adalet ve Kalkınma Parti',
      image: 'assets/images/akp.svg',
    },
    {
      id: 'chp',
      name: 'CHP - Cumhuriyet Halk Partisi',
      image: 'assets/images/chp.svg',
    },
    {
      id: 'iyi',
      name: 'İYİ Parti',
      image: 'assets/images/iyi.svg',
    },
    {
      id: 'mhp',
      name: 'MHP - Milliyetçi Hareket Partisi',
      image: 'assets/images/mhp.svg',
    },
    {
      id: 'hdp',
      name: 'HDP - Halkların Demokratik Partisi',
      image: 'assets/images/hdp.png',
    },
  ];

  constructor(
    private router: Router,
    private votingService: VotingService,
    private smartContractService: SmartContractService
  ) {}

  async vote(partyId: string) {
    var ok = true;

    try {
      await this.smartContractService.vote(partyId);
      // Handle success
    } catch (error) {
      // Handle error
    }

    // return to voting accepted page
    if (ok == true) {
      this.router.navigate(['/votingaccepted']);
    } else {
      this.router.navigate(['/votingdenied']);
    }
  }

  cancelVoting() {
    this.votingService.cancelVoting().subscribe(
      (data) => {
        alert('Oylamanız isteğiniz üzerine iptal edilmiştir.');
        localStorage.removeItem('authToken');
        this.router.navigate(['/votingdenied']);
      },
      (error) => {
        console.log(error);
        alert('Something went wrong.');
        localStorage.removeItem('authToken');
        this.router.navigate(['/']);
      }
    );
  }
}
