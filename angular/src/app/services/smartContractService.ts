import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {
  WEB3_URL,
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
} from '../services/contract-config';

@Injectable({
  providedIn: 'root',
})
export class SmartContractService {
  private web3: Web3;
  private contract: any; // Replace with your contract's TypeScript typings if available

  constructor() {
    // Initialize Web3 and set the provider (Ethereum node URL)
    this.web3 = new Web3(WEB3_URL);
    this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  }

  // TODO: Implement this function
  // params: partyId: string, senderAddress: string
  async vote(partyId: number, senderAddress: string): Promise<void> {
    try {
      // Get the list of accounts
      const accounts = await this.web3.eth.getAccounts();

      // Send the vote transaction
      const result = await this.contract.methods
        .vote(partyId)
        .send({ from: senderAddress });

      console.log('Transaction Receipt:', result);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
