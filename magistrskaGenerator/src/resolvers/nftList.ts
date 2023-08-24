export const RESOLVER_NFT_LIST = [
    {
        'tag': 'resolverNFTList',
        'value': 'Generate resolver NFT List',
        'ts':
`import { Injectable } from '@angular/core';
import {WalletService} from "../services/wallet.service";
import {debounceTime, from, Observable, switchMap, take} from "rxjs";
import {ItemForSale} from "../models/itemForSale.model";


@Injectable({ providedIn: 'root' })
export class NftListResolver {

  walletAddress:any;

  constructor(private walletService: WalletService) {}

  public resolve(): Observable<ItemForSale[]> {
    // Get the wallet service and initialize the NFT contract.
    return from(this.walletService.initMarketplaceContract()).pipe(
      // Create a delay to fetch data.
      debounceTime(500),
      // Get the return value from the initNFTContract function.
      switchMap((contract) => {
        // Return all tokens on the NFT contract.
        return from(contract.getAllItemsForSale());
      }),
      // Takes care of the resolve function and finishes it successfully.
      take(1)
    );
  }
}

`
    }
];