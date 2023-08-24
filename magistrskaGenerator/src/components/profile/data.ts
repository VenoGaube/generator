export const COMPONENT_PROFILE = [
    {
        'tag': 'profile',
        'value': 'Generating profile',
        'html':
`<div id="body" class="container-fluid p-lg-5">
<div class="row">
  <!-- Profile card -->
  <div class="col-lg-4">
    <div class="card mb-4">
      <div class="card-body text-center">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
             class="rounded-circle img-fluid" style="width: 150px;">
        <h5 class="my-3">{{walletService.walletAddress}}</h5>
        <p class="text-muted mb-1">Full Stack Developer</p>
        <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
        <button *ngIf="walletService.walletAddress" class="btn btn-outline-dark" (click)="walletService.disconnectWallet()" routerLink="home" style="margin: 12px">
          Disconnect Wallet
        </button>
        <button class="btn btn-success" (click)="this.imageTokenComponent.toggle($event)" style="margin: 12px">
          Create Image NFT
        </button>
        <button class="btn btn-success" (click)="this.fileTokenComponent.toggle($event)" style="margin: 12px">
          Create File NFT
        </button>
        <button class="btn btn-success" (click)="this.jsonTokenComponent.toggle($event)" style="margin: 12px">
          Create Mass NFT from JSON
        </button>
        <div class="d-flex justify-content-center mb-2">
        </div>
      </div>
    </div>
  </div>
  <!-- NFT segment -->
  <div class="row">
    <div *ngFor="let nft of this.userNFTs" class="col-4">
      <imageItemComponent *ngIf="!nft.isFile" #imageItem [nft]="nft" [parent]="this"></imageItemComponent>
      <fileItemComponent *ngIf="nft.isFile" #fileItem [nft]="nft" [parent]="this"></fileItemComponent>
    </div>
  </div>

</div>
</div>

<!-- Minting segment -->
<imageTokenComponent #imageTokenComponent [parent]="this"></imageTokenComponent>
<fileTokenComponent #fileTokenComponent [parent]="this"></fileTokenComponent>
<jsonTokenComponent #jsonTokenComponent [parent]="this"></jsonTokenComponent>

`,
        'ts':
`import {Component, OnInit, ViewChild} from '@angular/core';
import {NFT} from '../../models/NFT.model';
import {WalletService} from "../../services/wallet.service";
import {Router} from "@angular/router";
import {MarketplaceTokenContract} from "../../services/marketplaceToken.contract";
import {ImageItemComponent} from "./nftItem/imageItem/imageItem.component";
import {Property} from "../../models/property.model";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  @ViewChild('imageItem')
  public imageItem: ImageItemComponent | undefined;

  marketplaceTokenContract!: MarketplaceTokenContract;
  userNFTs: NFT[] = [];

  constructor(public walletService: WalletService,
              public router: Router) {
  }

  ngOnInit(): void {
    if (this.walletService !== null && this.walletService !== undefined) {
      this.walletService.initWallet().then(result => {
        this.walletService.initMarketplaceTokenContract().then(marketplaceTokenContract => {
          this.marketplaceTokenContract = marketplaceTokenContract;
          return this.updateUserNFTList();
        });
      });
    }
  }

  updateUserNFTList(): Promise<any> {
    return this.marketplaceTokenContract.getOwnedTokens(this.walletService.walletAddress).then((result: NFT[]) => {
      this.userNFTs = [];
      result.forEach(token => {

        let counter = 0;
        let properties: Property[] = [];
        if (token.propertyNames !== null && token.propertyValues !== null) {
          token.propertyNames.forEach(x => {
            let property: Property = new Property();
            property.value = token.propertyValues![counter];
            property.name = token.propertyNames![counter];
            properties[counter] = property;
            counter += 1;
          })
        }

        this.userNFTs.push({
          tokenId: token.tokenId,
          fileUrl: token.fileUrl,
          description: token.description,
          owner: token.owner,
          price: token.price,
          properties: properties,
          propertyNames: token.propertyNames,
          propertyValues: token.propertyValues,
          raterAddresses: token.raterAddresses,
          ratings: token.ratings,
          title: token.title,
          isFile: token.isFile
        })
      })
    });
  }
}
`
    }
];