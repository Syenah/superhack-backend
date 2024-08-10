import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import Moralis from 'moralis';


@Injectable()
export class MoralisService {
  private isInitialized = false;

  constructor(private httpService: HttpService, private configService: ConfigService) {}

  private async initializeMoralis() {
    if (!this.isInitialized) {
      try {
        console.log('Initializing Moralis...',process.env.MORALIS_API_KEY);
        await Moralis.start({
          apiKey: this.configService.get<string>('MORALIS_API_KEY'),
        });
        this.isInitialized = true;
        console.log('Moralis initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Moralis:', error);
        throw error;
      }
    }
  }

  async getWalletTokenBalancesPrice(chain: string, address: string) {
    try {
      await this.initializeMoralis();

      const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        chain,
        address,
      });

      return response.result;
    } catch (error) {
      console.error('Failed to fetch wallet token balances and prices:', error);
      if (error.response) {
        // Log the response from the server if available
        console.error('Response:', error.response.data);
      }
      throw error;
    }
  }

  async getSPL(limit: number, ownerAddresses: string[], network: string) {
    try {
      await this.initializeMoralis();

      const response = await Moralis.AptosApi.wallets.getCoinBalancesByWallets({
        limit,
        ownerAddresses,
        network,
      });

      return response.result;
    } catch (error) {
      console.error('Failed to fetch wallet token balances and prices:', error);
      if (error.response) {
        // Log the response from the server if available
        console.error('Response:', error.response.data);
      }
      throw error;
    }
  }
}
