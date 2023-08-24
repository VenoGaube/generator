export const COMPONENT_MARKETPLACE = [
    {
        'tag': 'marketplace',
        'value': 'Generating marketplace',
        'html':
`<div class="relative pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
<SearchComponent [parent]="this"></SearchComponent>
<div class="text-center">
    <h2 class="text-3xl tracking-tight font-extrabold sm:text-4xl">Amazing Creatures NFTs</h2>
    <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">Buy a NFT to get unlimited ownership forever!</p>
</div>

<div class="row">
    <div *ngFor="let itemForSale of this.itemsOnSale" class="col-3">
    <ImageTokenForSaleComponent *ngIf="!itemForSale.isFile" #itemForSaleComponent [parent]="this" [itemForSale]="itemForSale"></ImageTokenForSaleComponent>
    <FileTokenForSaleComponent *ngIf="itemForSale.isFile" #fileTokenForSaleComponent [parent]="this" [itemForSale]="itemForSale"></FileTokenForSaleComponent>
    </div>
</div>
</div>
`,
        'ts':
`import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { WalletService } from "../../services/wallet.service";
import {from, map, Observable} from "rxjs";
import {ActivatedRoute, Data} from "@angular/router";
import {ItemForSale} from "../../models/itemForSale.model";
import {ImageTokenForSaleComponent} from "./imageTokenForSale/imageTokenForSale.component";
import {Filter} from "../../models/filter.model";


@Component({
    selector: 'MarketplaceComponent',
    templateUrl: './marketplace.component.html',
})
export class MarketplaceComponent implements OnInit {

    @ViewChild('itemForSaleComponent')
    public itemForSaleComponent: ImageTokenForSaleComponent | undefined;

    walletAddress:any;
    public itemsOnSale: ItemForSale[] = [];

    constructor(
    private walletService:WalletService,
    private _ngZone: NgZone,
    private activatedRoute: ActivatedRoute
    ) { }

    async ngOnInit(){

    this.walletAddress = await this.walletService.walletAddress
    if (this.walletService.walletSubject === undefined || this.walletService.walletSubject === null) {
        this.walletService.getWalletSubject().subscribe(async (walletAddress) => {
        this._ngZone.run(() => {
            this.walletAddress = walletAddress
        });
        });
    }

    this.getItemsOnSale(new Filter());
    }

    public getItemsOnSale(filter: Filter): Promise<any> {
    return this.walletService.marketplaceContract.getAllItemsForSale().then((result) => {
        if (filter.searchCategory !== null && filter.searchCategory !== undefined) {
        if (filter.searchCategory === 'File') {
            result = result.filter((element) => {
            return element.isFile === true;
            })
        }
        if (filter.searchCategory === 'Image') {
            result = result.filter((element) => {
            return element.isFile === false;
            })
        }
        }

        if (filter.searchValue !== null && filter.searchValue !== undefined && filter.searchValue !== '') {
        result = result.filter((element) => {
            return this.like(element.title!, filter.searchValue!) || this.like(element.seller!, filter.searchValue!);
        })
        }
        this.itemsOnSale = result;
    });
    }

    public like(str: string, pattern: string): boolean {
    pattern = '%' + pattern + '%';
    str = str.toUpperCase();
    pattern = pattern.toUpperCase();
    const regex = new RegExp("^" + pattern.replace(/%/g, ".*") + "$");
    return regex.test(str);
    }
}
`
    }
];