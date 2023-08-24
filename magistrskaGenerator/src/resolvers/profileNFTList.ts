export const RESOLVER_PROFILE_NFT_LIST = [
    {
        'tag': 'resolverProfileNFTList',
        'value': 'Generate resolver for profile NFT List',
        'ts':
`import { Injectable } from '@angular/core';
import {NFT} from "../models/NFT.model";
import {WalletService} from "../services/wallet.service";
import {debounceTime, from, Observable, switchMap, take} from "rxjs";


@Injectable({ providedIn: 'root' })
export class ProfileNFTListResolver {

  walletAddress:any;

  constructor(private walletService: WalletService) {}

  public resolve(): Observable<NFT[]> {
    // Get the wallet service and initialize the NFT contract.
    return from(this.walletService.initMarketplaceTokenContract()).pipe(
      // Create a delay to fetch data.
      debounceTime(500),
      // Get the return value from the initNFTContract function.
      switchMap((contract) => {
        // Return all tokens on the NFT contract.
        return from(contract.getOwnedTokens(this.walletService.walletAddress));
      }),
      // Takes care of the resolve function and finishes it successfully.
      take(1)
    );
  }
}

`
    }
];