import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';

@Injectable()
export class SolanaService {
    private async getSolanaConnection(network: string): Promise<Connection> {
        const url = network === 'mainnet'
          ? 'https://api.mainnet-beta.solana.com'
          : 'https://api.testnet.solana.com';
        const connection = new Connection(url);
        try {
          const version = await connection.getVersion();
          console.log('Solana connection established:', version);
          return connection;
        } catch (error) {
          console.error('Failed to establish Solana connection:', error);
          throw new HttpException('Failed to connect to Solana network', HttpStatus.SERVICE_UNAVAILABLE);
        }
      }

  private async getTokenBalances(publicKey: PublicKey, connection: Connection) {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") // SPL Token Program ID
    });
    console.log('Token accounts:=======================>>>>>>>>>>>>>>>.', tokenAccounts.value.map(account=>account.account.data.parsed.info));
    return tokenAccounts.value.map(account => ({
      mint: account.account.data.parsed.info.mint,
      amount: account.account.data.parsed.info.tokenAmount.uiAmount
    }));
  }

  private async getTokenMetadata(mintAddress: string, maxRetries = 3) {
    const baseDelay = 6000; // 6 seconds, allowing for 10 calls per minute
    let retryCount = 0;
  
    while (retryCount < maxRetries) {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/solana/contract/${mintAddress}`);
        return response.data;
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              console.log(`Token ${mintAddress} not found in CoinGecko`);
              return null; // Return null instead of throwing an error
            case 429:
              retryCount++;
              const delay = baseDelay * (2 ** retryCount); // Exponential backoff
              console.log(`Rate limit hit for ${mintAddress}, retrying in ${delay / 1000} seconds...`);
              await new Promise(resolve => setTimeout(resolve, delay));
              break;
            default:
              console.error(`Error fetching metadata for ${mintAddress}:`, error.response.data || error.message);
              return null; // Return null for other errors
          }
        } else {
          console.error(`Network error fetching metadata for ${mintAddress}:`, error.message);
          return null;
        }
      }
    }
  
    console.error(`Failed to fetch token metadata for ${mintAddress} after ${maxRetries} retries`);
    return null;
  }
  
  private async getTokenMarketData(tokenSymbol: string) {
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenSymbol}&vs_currencies=usd&include_24hr_change=true`);
      return response.data[tokenSymbol];
    } catch (error) {
      console.error(`Error fetching market data for ${tokenSymbol}:`, error.response?.data || error.message);
      return null; // Return null for market data if not found or error occurs
    }
  }

  public async getTokensHeldByAddress(address: string, network: string) {
    try {
      const connection = await this.getSolanaConnection(network);
      const publicKey = new PublicKey(address);
      const balances = await this.getTokenBalances(publicKey, connection);
  
      const tokenData = await Promise.all(balances.map(async (balance) => {
        try {
          const metadata = await this.getTokenMetadata(balance.mint);
          const marketData = await this.getTokenMarketData(metadata.symbol);
  
          return {
            mint: balance.mint,
            name: metadata.name,
            symbol: metadata.symbol,
            image: metadata.image,
            amount: balance.amount,
            current_price: marketData?.usd || null,
            price_change_percentage_24h: marketData?.usd_24h_change || null
          };
        } catch (error) {
          console.error(`Error processing token ${balance.mint}:`, error.message);
          // Return basic information for tokens not found in CoinGecko
          return {
            mint: balance.mint,
            name: 'Unknown Token',
            symbol: 'UNKNOWN',
            image: null,
            amount: balance.amount,
            current_price: null,
            price_change_percentage_24h: null
          };
        }
      }));
  
      // Filter out any null results (in case of severe errors)
      return tokenData.filter(token => token !== null);
    } catch (error) {
      console.error('Error in getTokensHeldByAddress:', error);
      throw new HttpException(`An error occurred while fetching tokens: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
function sleep(arg0: number) {
    throw new Error('Function not implemented.');
}

