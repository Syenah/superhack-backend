import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import abi from './abi/TokenTransferPayNative.json';

@Injectable()
export class CcipService {
  private contract: ethers.Contract;

  constructor() {
    const provider = new ethers.providers.JsonRpcProvider(process?.env?.RPC_URL);
    const wallet = new ethers.Wallet(process?.env?.PRIVATE_KEY, provider);
    this.contract = new ethers.Contract(
      process?.env?.CONTRACT_ADDRESS,
      abi,
      wallet
    );
  }

  
  async transferTokensPayNative(
    destinationChainSelector: string,
    receiver: string,
    token: string,
    amount: string
  ) {
    try {
      const tx = await this.contract.transferTokensPayNative(
        destinationChainSelector,
        receiver,
        token,
        ethers?.utils?.parseUnits(amount, 18)
      );
      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (error) {
      throw new Error(`Failed to transfer tokens: ${error.message}`);
    }
  }
}