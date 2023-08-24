export const COMPONENT_IMAGE_TOKEN_FOR_SALE = [
    {
        'tag': 'imageTokenForSale',
        'value': 'Generating full marketplace',
        'html':
`<p-card *ngIf="!itemForSale.isSold">
<ng-template pTemplate="header">
  <p-image src="{{itemForSale.fileUrl}}" [preview]="true" alt="Image" width="250">
    <ng-template pTemplate="indicator">
      <i class="pi pi-check"></i>
    </ng-template>
  </p-image>
</ng-template>

<div class="form-label">
  <p>{{itemForSale.title}}</p>
  <p>Seller: {{itemForSale.seller}}</p>
  <p>Price: {{itemForSale.price}}</p>
  <p>Rating: {{this.avgRating}}</p>

  <p>Properties:</p>
  <div *ngFor="let property of this.properties">
    <div class="row">
      <div class="col-5">
        <p>Name: {{ property.name }}</p>
      </div>
      <div class="col-5">
        <p>Value: {{ property.value }}</p>
      </div>
    </div>
  </div>
</div>

<ng-template pTemplate="footer">
  <button pButton pRipple type="button" class="disabled:cursor-not-allowed mr-3 text-gray-400 p-button-primary" label="Buy" (click)="this.buyItem(itemForSale)"></button>
  <button pButton pRipple type="button" class="disabled:cursor-not-allowed text-gray-400 p-button-text" label="Preview"></button>
</ng-template>
</p-card>
`,
        'ts':
`import {Component, Input, OnInit} from '@angular/core';
import {WalletService} from "../../../services/wallet.service";
import {Router} from "@angular/router";
import {ItemForSale} from "../../../models/itemForSale.model";
import {Property} from "../../../models/property.model";

@Component({
  selector: 'ImageTokenForSaleComponent',
  templateUrl: './imageTokenForSale.component.html',
})
export class ImageTokenForSaleComponent implements OnInit {
  @Input()
  public itemForSale!: ItemForSale;
  @Input()
  public parent: any;

  public avgRating: number = 0;
  public properties: Property[] = [];

  constructor(public walletService: WalletService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.calculateRating();
    this.setProperties(this.itemForSale);
  }

  private calculateRating() {
    let sum = 0;
    this.itemForSale.ratings?.forEach(rating => {
      sum += +rating;
    });
    if (sum === 0) {
      this.avgRating = 0;
    } else {
      this.avgRating = +(sum / this.itemForSale.ratings?.length!).toFixed(1);
    }
  }

  public buyItem(itemForSale: ItemForSale): void {
    this.walletService.getMarketplaceContract().buyItem(itemForSale.id!).then(result => {
      this.walletService.getMarketplaceTokenContract().setApproval(this.itemForSale.tokenId!, this.walletService.marketplaceContractAddress).then(approvalResult => {
        this.parent.getAllItemsForSale();
      });
    });
  }

  public setProperties(itemForSale: ItemForSale): void {
    let propertyCount = 0;
    if (itemForSale.propertyNames !== null) {
      propertyCount = itemForSale.propertyNames.length;
    }
    for (let i = 0; i < propertyCount; i++) {
      let tempProperty = new Property();
      if (itemForSale.propertyNames !== null && itemForSale.propertyValues !== null) {
        tempProperty.name = itemForSale.propertyNames[i];
        tempProperty.value = itemForSale.propertyValues[i];
        this.properties.push(tempProperty);
      }
    }
  }
}
`,
        'css':
`#body {
    background-color: #f6f6f6;
}
`
    }
];