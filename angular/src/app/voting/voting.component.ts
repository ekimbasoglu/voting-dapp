import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VotingService } from '../services/votingService';
import { SmartContractService } from '../services/smartContractService';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css'],
})
export class VotingComponent {
  candidateInfos: any = [
    {
      id: 0,
      name: 'AKP - Adalet ve Kalkınma Parti',
      image: 'assets/images/akp.svg',
    },
    {
      id: 1,
      name: 'CHP - Cumhuriyet Halk Partisi',
      image: 'assets/images/chp.svg',
    },
    {
      id: 2,
      name: 'İYİ Parti',
      image: 'assets/images/iyi.svg',
    },
    {
      id: 3,
      name: 'MHP - Milliyetçi Hareket Partisi',
      image: 'assets/images/mhp.svg',
    },
    {
      id: 4,
      name: 'HDP - Halkların Demokratik Partisi',
      image: 'assets/images/hdp.jpg',
    },
  ];

  constructor(
    private router: Router,
    private votingService: VotingService,
    private smartContractService: SmartContractService
  ) {}

  async vote(partyId: number) {
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

  showMethods() {}
}
