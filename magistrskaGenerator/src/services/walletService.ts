export const SERVICE_WALLET = [
    {
        'tag': 'serviceWallet',
        'value': 'Generate wallet service',
        'ts':
`import { Injectable } from '@angular/core';
import {ethers} from "ethers";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {MarketplaceTokenContract} from "./marketplaceToken.contract";
import {MarketplaceContract} from "./marketplace.contract";
import {MarketplaceFactoryService} from "./marketplaceFactoryService.service";
import {MarketplaceTokenFactoryService} from "./marketplaceTokenFactoryService.service";

const Web3 = require('web3')

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public MarketplaceContractJson = require('../../../build/contracts/Marketplace.json');
  public MarketplaceTokenContractJson = require('../../../build/contracts/MarketplaceToken.json');
  public web3 = new Web3(window.ethereum);
  public provider:any;
  public walletAddress:any;
  public walletSubject = new Subject<any>();
  public marketplaceContract!: MarketplaceContract;
  public marketplaceTokenContract!: MarketplaceTokenContract;
  public marketplaceContractAddress!: string;

  constructor(private marketplaceFactoryService: MarketplaceFactoryService,
              private marketplaceTokenFactoryService: MarketplaceTokenFactoryService,
              private router: Router) {
    this.initProvider();
    this.initWallet();
    this.initMarketplaceTokenContract();
    this.initMarketplaceContract();
  }

  public setMarketplaceContract(marketplaceContract: MarketplaceContract) {
    this.marketplaceContract = marketplaceContract;
  }

  public getMarketplaceContract(): MarketplaceContract {
    return this.marketplaceContract;
  }

  public setMarketplaceTokenContract(marketplaceTokenContract: MarketplaceTokenContract) {
    this.marketplaceTokenContract = marketplaceTokenContract;
  }

  public getMarketplaceTokenContract(): MarketplaceTokenContract {
    return this.marketplaceTokenContract;
  }

  public getMarketplaceContractAddress(): string{
    return this.marketplaceContractAddress;
  }

  // Creates a blockchain (Ethereum) provider that fetches data from the blockchain.
  async initProvider(){
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      this.initWallet()
    })
  }

  // Initializes a wallet if it's not yet connected.
  async initWallet(){
    let connectStatus = await localStorage.getItem("connectStatus")
    if(connectStatus === '1'){
      await this.connectWallet();
    }
  }

  // Initializes the NFT contract
  public async initMarketplaceContract(): Promise<MarketplaceContract> {
    // MetaMask injects a global API into websites visited by its users at window.ethereum.
    const ethereum = window.ethereum;
    let errMsg;
    if (typeof ethereum !== 'undefined') {
      const web3 = new Web3(ethereum);
      await ethereum.enable();
      // Gets blockchain network id.
      const netId = await web3.eth.net.getId();
      // Gets connected accounts.
      const accounts = await web3.eth.getAccounts();
      const selectedAccount = accounts[0];

      if (typeof selectedAccount !== 'undefined') {
        // Gets the Marketplace contract details.
        const marketplaceContract = this.innerMarketplaceContract(web3, netId, selectedAccount);
        this.setMarketplaceContract(marketplaceContract);
        marketplaceContract.getContractAddress().then(result => {
          this.marketplaceContractAddress = result;
        })
        return Promise.resolve(marketplaceContract);
      } else {
        errMsg = 'Please login with MetaMask and connect the account to this site.';
        alert(errMsg);
        return Promise.reject({msg: errMsg});
      }
    } else {
      errMsg = 'Enable Metamask!';
      alert(errMsg);
      return Promise.reject({msg: errMsg});
    }
  }

  // Initializes the NFT contract
  public async initMarketplaceTokenContract(): Promise<MarketplaceTokenContract> {
    // MetaMask injects a global API into websites visited by its users at window.ethereum.
    const ethereum = window.ethereum;
    let errMsg;
    if (typeof ethereum !== 'undefined') {
      const web3 = new Web3(ethereum);
      await ethereum.enable();
      // Gets blockchain network id.
      const netId = await web3.eth.net.getId();
      // Gets connected accounts.
      const accounts = await web3.eth.getAccounts();
      const selectedAccount = accounts[0];

      if (typeof selectedAccount !== 'undefined') {
        // Gets the NFT contract details.
        const marketplaceTokenContract = this.innerMarketplaceTokenContract(web3, netId, selectedAccount);
        this.setMarketplaceTokenContract(marketplaceTokenContract);
        return Promise.resolve(marketplaceTokenContract);
      } else {
        errMsg = 'Please login with MetaMask and connect the account to this site.';
        alert(errMsg);
        return Promise.reject({msg: errMsg});
      }
    } else {
      errMsg = 'Enable Metamask!';
      alert(errMsg);
      return Promise.reject({msg: errMsg});
    }
  }

  // Return the compiled .sol code as the contract in userNFTFactoryService.
  private innerMarketplaceContract(web3: any, netId: number, selectedAccount: string): MarketplaceContract {
    const contract  = new web3.eth.Contract(this.MarketplaceContractJson.abi, this.MarketplaceContractJson.networks[netId].address);
    return this.marketplaceFactoryService.create(contract, selectedAccount);
  }

  // Return the compiled .sol code as the contract in userNFTFactoryService.
  private innerMarketplaceTokenContract(web3: any, netId: number, selectedAccount: string): MarketplaceTokenContract {
    const contract  = new web3.eth.Contract(this.MarketplaceTokenContractJson.abi, this.MarketplaceTokenContractJson.networks[netId].address);
    return this.marketplaceTokenFactoryService.create(contract, selectedAccount);
  }

  getWalletSubject():Observable<any>{
    return this.walletSubject.asObservable();
  }

  async connectWallet(){
    try{
      if(!this.provider) {
        await this.initProvider();
      }
      // Get all wallet accounts
      const _accounts = await this.provider.send("eth_requestAccounts", []);
      // Pick the first account
      this.walletAddress = _accounts[0];
      await localStorage.setItem("connectStatus",'1');
      // Get the account/wallet address
      this.walletSubject.next(this.walletAddress);
      return this.walletAddress;
    }catch(error){
      console.log('error on get connectWallet', error);
    }
  }

  async disconnectWallet(){
    await localStorage.setItem("connectStatus",'0')
    this.walletSubject.next(null);
    this.walletAddress = null;
    await this.router.navigate(['home']);
  }

  // Instead of displaying the entire length of the address, just display parts of it.
  getShrinkWalletAddress(){
    return this.walletAddress.replace(this.walletAddress.substring(4, (this.walletAddress ? this.walletAddress.length : 42) - 4 ), "...");
  }
}
`
    }
];