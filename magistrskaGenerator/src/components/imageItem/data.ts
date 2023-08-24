export const COMPONENT_IMAGE_ITEM = [
    {
        'tag': 'imageItem',
        'value': 'Generating image item',
        'html':
`<p-card>
<ng-template pTemplate="header">
  <p-image src="{{nft.fileUrl}}" [preview]="true" alt="Image" width="250">
    <ng-template pTemplate="indicator">
      <i class="pi pi-check"></i>
    </ng-template>
  </p-image>
</ng-template>

<div id="imageItem">
  <p class="form-label">Title: {{nft.title}}</p>
  <p class="form-label">Rating: {{ this.avgRating }}</p>

  <div class="row" style="padding-bottom: 12px">
    <div class="container-fluid col-8">
      <input type="text" class="form-control" (change)="this.setNFTRating($event)"
             id="rating" placeholder="Enter rating as a number">
    </div>
    <div class="container-fluid col-4">
      <button type="submit" class="btn btn-primary text-center" (click)="this.setRating(nft.tokenId!)">Rate</button>
    </div>
  </div>

  <div *ngFor="let property of this.properties">
    <div class="row">
      <div class="col-5">
        Name: <p class="form-control">{{ property.name }}</p>
      </div>
      <div class="col-5">
        Value: <p class="form-control">{{ property.value }}</p>
      </div>
    </div>
  </div>
</div>


<ng-template pTemplate="footer">
  <button pButton pRipple type="button" class="disabled:cursor-not-allowed mr-3 text-gray-400 p-button-primary" label="Sell" (click)="this.sellItem(nft)"></button>
</ng-template>
</p-card>
`,
        'ts':
`import {Component, Input, OnInit} from '@angular/core';
import {NFT} from '../../../../models/NFT.model';
import {WalletService} from "../../../../services/wallet.service";
import {Router} from "@angular/router";
import {MarketplaceContract} from "../../../../services/marketplace.contract";
import {MarketplaceTokenContract} from "../../../../services/marketplaceToken.contract";
import {Property} from "../../../../models/property.model";

@Component({
  selector: 'imageItemComponent',
  templateUrl: './imageItem.component.html',
})
export class ImageItemComponent implements OnInit {
  @Input()
  public nft!: NFT;
  @Input()
  public parent: any;

  public properties: Property[] = [];
  public marketplaceContract!: MarketplaceContract;
  public marketplaceTokenContract!: MarketplaceTokenContract;
  public avgRating!: number;
  public rating: number = 0;

  constructor(public walletService: WalletService,
              public router: Router) {
    this.walletService.initMarketplaceContract().then(marketplaceContract => {
      this.marketplaceContract = marketplaceContract;
    });
    this.walletService.initMarketplaceTokenContract().then(marketplaceTokenContract => {
      this.marketplaceTokenContract = marketplaceTokenContract;
    })
  }

  ngOnInit(): void {
    this.calculateRating();
    this.setProperties(this.nft);
  }

  private calculateRating() {
    let sum = 0;
    this.nft.ratings?.forEach(rating => {
      sum += +rating;
    });
    if (sum === 0) {
      this.avgRating = 0;
    } else {
      this.avgRating = +(sum / this.nft.ratings?.length!).toFixed(1);
    }
  }

  public sellItem(nft: NFT): void {
    this.marketplaceContract.putItemForSale(nft.tokenId!, nft.price!).then(r => console.log("sellitem: " + r));
  }

  public setNFTRating(event: any): void {
    this.rating = event.target.value;
  }

  public setRating(tokenId: number) {
    this.marketplaceTokenContract.updateAddRating(tokenId, this.rating).then(r => {
        this.parent.updateUserNFTList();
    });
  }

  public setProperties(nft: NFT): void {
    let propertyCount = 0;
    if (nft.propertyNames !== null) {
      propertyCount = nft.propertyNames.length;
    }
    for (let i = 0; i < propertyCount; i++) {
      let tempProperty = new Property();
      if (nft.propertyNames !== null && nft.propertyValues !== null) {
        tempProperty.name = nft.propertyNames[i];
        tempProperty.value = nft.propertyValues[i];
        this.properties.push(tempProperty);
      }
    }
  }
}

`
    }
];