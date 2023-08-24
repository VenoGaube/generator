export const COMPONENT_CREATE_TOKEN = [
    {
        'tag': 'fileToken',
        'value': 'Generating file token',
        'html':
`<p-overlayPanel #dialog [showCloseIcon]="true" [style]="{ width: '800px' }">
    <div class="col-12">
        <div class="container text-center">
            <div class="row my-4">
                <div class="col-12">
                    <h1>Create NFT from a file</h1>
                </div>
            </div>
            <div class="row">
                <div class="container-fluid col-12">
                    <div class="form-group">
                        <input type="file" class="form-control"
                            id="tokenFile" aria-describedby="writeColorCode"
                            placeholder="Input file" (change)="this.uploadFile($event)">
                        <input type="text" class="form-control"
                            id="token_description" aria-describedby="writeColorCode"
                            value="{{description}}"
                            placeholder="Enter the description as a string" (change)="this.setDescription($event)">
                        <div class="row">
                            <div class="col-5">
                                <input type="text" class="form-control"
                                    id="propertyName" aria-describedby="writeColorCode"
                                    value="{{propertyName}}"
                                    placeholder="Property name" (change)="this.setPropertyName($event)">
                            </div>
                            <div class="col-5">
                                <input type="text" class="form-control col-5"
                                    id="propertyValue" aria-describedby="writeColorCode"
                                    value="{{propertyValue}}"
                                    placeholder="Property value" (change)="this.setPropertyValue($event)">
                            </div>
                            <div class="col-2" style="padding: 6px">
                                <button type="submit" class="btn btn-primary text-center" (click)="addProperty()">+ property</button>
                            </div>
                        </div>
                        <div *ngFor="let property of this.properties">
                            <div class="row">
                                <div class="col-5">
                                    <p class="form-control">Name: {{ property.name }}</p>
                                </div>
                                <div class="col-5">
                                    <p class="form-control">Value: {{ property.value }}</p>
                                </div>
                                <div class="col-2" style="padding: 6px">
                                    <button type="submit" class="btn btn-danger text-center" (click)="removeProperty(property)">- property</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="container-fluid col-4" style="padding: 6px">
                    <button type="submit" class="btn btn-primary text-center" (click)="mint()">Mint</button>
                </div>
            </div>

        </div>
    </div>
</p-overlayPanel>


`,
        'ts':
`import { Component, Input, ViewChild} from '@angular/core';
import {MarketplaceTokenContract} from "../../../../services/marketplaceToken.contract";
import {WalletService} from "../../../../services/wallet.service";
import {Router} from "@angular/router";
import {OverlayPanel} from "primeng/overlaypanel";
import {Property} from "../../../../models/property.model";
import { create } from 'ipfs-http-client'
import {Buffer} from "buffer";
import {NFT} from "../../../../models/NFT.model";

@Component({
  selector: 'fileTokenComponent',
  templateUrl: './fileToken.component.html'
})
export class FileTokenComponent {

  @Input()
  public parent: any;

  @ViewChild('dialog')
  public dialog!: OverlayPanel;

  public file: any;
  public projectId = '2Ov3l9xcwJZGsPUNmP2hbs2TOHp';
  public projectSecret = '6159babe6bf62b6eed639c536354de5a';
  public auth = 'Basic ' + Buffer.from(this.projectId + ':' + this.projectSecret).toString('base64');
  public client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: this.auth,
    },
  });

  marketplaceTokenContract!: MarketplaceTokenContract;
  title: string = "";
  author: string = "";
  description: string = "";
  fileUrl: string = "";
  propertyName: string = "";
  propertyValue: string = "";
  price: number = 0;
  properties: Property[] = [];

  massUploadNFTs: NFT[] = [];
  massUpload: boolean = false;

  constructor(public walletService: WalletService,
              public router: Router) {
  }

  mint() {
    if (this.file !== null) {
      let fileExt = this.file.name.split('.').pop();
      if (fileExt === 'json') {
        this.getJSONStringFromFile(this.file).then(jsonString => {
          if (typeof jsonString === "string") {
            const jsonArr = JSON.parse(jsonString);
            jsonArr.map((object: NFT) => {
              this.massUpload = true;
              this.massUploadNFTs.push(object);
            })

            this.client.add(this.file).then(result => {
              this.fileUrl = result.path;

              if (this.fileUrl !== null && this.fileUrl !== undefined) {

                const massUploadTitles: string[] = [];
                const massUploadPrices: number[] = [];
                const massUploadDescriptions: string[] = [];
                const massUploadPropertyNames: string[][] = [];
                const massUploadPropertyValues: string[][] = [];

                this.massUploadNFTs.forEach(element => {
                  massUploadTitles.push(element.title!);
                  massUploadPrices.push(element.price!);
                  massUploadDescriptions.push(element.description!);
                  massUploadPropertyNames.push(element.propertyNames!);
                  massUploadPropertyValues.push(element.propertyValues!);
                })

                this.marketplaceTokenContract.userMassMint(massUploadTitles, massUploadPrices, massUploadDescriptions, massUploadPropertyNames, massUploadPropertyValues, this.massUploadNFTs.length)
                  .then(() => {
                      if (this.dialog) {
                        this.dialog.hide();
                      }
                      return this.parent.updateUserNFTList();
                });
              }
            });
          }
        });
      } else {
        let propertyNames: string[] = [];
        let propertyValues: string[] = [];
        this.properties.forEach(property => {
          propertyNames.push(property.name !== null && property.name !== undefined ? property.name : "");
          propertyValues.push(property.value !== null && property.name !== undefined ? property.value : "");
        });

        this.client.add(this.file).then(result => {
          this.fileUrl = result.path;

          if (this.fileUrl !== null && this.fileUrl !== undefined) {
            this.marketplaceTokenContract.userMintFile(this.file.name, this.fileUrl, this.description, this.price, propertyNames, propertyValues)
              .then(() => {
                if (this.dialog) {
                  this.dialog.hide();
                }
                return this.parent.updateUserNFTList();
              });
          }
        });
      }
    }
  }

  addProperty() {
    const newProperty = new Property();
    newProperty.name = this.getPropertyName();
    newProperty.value = this.getPropertyValue();
    this.properties.push(newProperty);
  }

  removeProperty(property: Property) {
    this.properties.forEach( (item, index) => {
      if(item === property) this.properties.splice(index,1);
    });
  }

  setDescription(event: any) {
    this.description = event.target.value;
  }

  getDescription(): string {
    return this.description;
  }

  setPropertyName(event: any) {
    this.propertyName = event.target.value;
  }

  getPropertyName(): string {
    return this.propertyName;
  }

  setPropertyValue(event: any) {
    this.propertyValue = event.target.value;
  }

  getPropertyValue(): string {
    return this.propertyValue;
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
  }

  toggle(event: any) {
    if (this.dialog) {
      this.dialog.show(event);
      this.marketplaceTokenContract = this.walletService.getMarketplaceTokenContract();
    }
  }

  getJSONStringFromFile(file: any): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.match('json.*')) {
        resolve(null);
      }

      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const jsonObject = JSON.parse(event.target.result);
          const jsonString = JSON.stringify(jsonObject);
          resolve(jsonString);
        } catch (err) {
          console.error(err);
          resolve(null);
        }
      };
      reader.onerror = (event: any) => {
        console.error(event);
        resolve(null);
      };
      reader.readAsText(file);
    });
  }
}
`
    },
    {
        'tag': 'imageToken',
        'value': 'Generating image token',
        'html':
`<p-overlayPanel #dialog [showCloseIcon]="true"
[style]="{ width: '800px' }">
<div class="col-12">
<div class="container text-center">
<div class="row my-4">
<div class="col-12">
<h1>Create a randomly generated image NFT</h1>
</div>
</div>
<div class="row">
<div class="container-fluid col-12">
<div class="form-group">
<label for="token_title">Issue Token</label>
<input type="text" class="form-control"
   id="token_title" aria-describedby="writeColorCode"
   value="{{title}}"
   placeholder="Enter title as a string" (change)="this.setTitle($event)">
<input type="text" class="form-control"
   id="token_description" aria-describedby="writeColorCode"
   value="{{description}}"
   placeholder="Enter the description as a string" (change)="this.setDescription($event)">
<input type="number" class="form-control"
   id="price" aria-describedby="writeColorCode"
   value="{{price}}"
   placeholder="Enter the price as a number" (change)="this.setPrice($event)">
<div class="row">
<div class="col-5">
<input type="text" class="form-control"
       id="propertyName" aria-describedby="writeColorCode"
       value="{{propertyName}}"
       placeholder="Property name" (change)="this.setPropertyName($event)">
</div>
<div class="col-5">
<input type="text" class="form-control col-5"
       id="propertyValue" aria-describedby="writeColorCode"
       value="{{propertyValue}}"
       placeholder="Property value" (change)="this.setPropertyValue($event)">
</div>
<div class="col-2" style="padding: 6px">
<button type="submit" class="btn btn-primary text-center" (click)="addProperty()">+ property</button>
</div>
</div>
<div *ngFor="let property of this.properties">
<div class="row">
<div class="col-5">
  <p class="form-control">Name: {{ property.name }}</p>
</div>
<div class="col-5">
  <p class="form-control">Value: {{ property.value }}</p>
</div>
<div class="col-2" style="padding: 6px">
  <button type="submit" class="btn btn-danger text-center" (click)="removeProperty(property)">- property</button>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="row">
<div class="container-fluid col-4" style="padding: 6px">
<button type="submit" class="btn btn-primary text-center" (click)="mint()">Mint</button>
</div>
</div>

</div>
</div>
</p-overlayPanel>

`,
        'ts':
`import {Component, Input, ViewChild} from '@angular/core';
import {MarketplaceTokenContract} from "../../../../services/marketplaceToken.contract";
import {WalletService} from "../../../../services/wallet.service";
import {Router} from "@angular/router";
import {OverlayPanel} from "primeng/overlaypanel";
import {Property} from "../../../../models/property.model";

@Component({
  selector: 'imageTokenComponent',
  templateUrl: './imageToken.component.html'
})
export class ImageTokenComponent {

  @Input()
  public parent: any;

  @ViewChild('dialog')
  public dialog!: OverlayPanel;

  marketplaceTokenContract!: MarketplaceTokenContract;
  title: string = "";
  author: string = "";
  description: string = "";
  fileUrl: string = "";
  propertyName: string = "";
  propertyValue: string = "";
  price: number = 0;
  properties: Property[] = [];

  constructor(public walletService: WalletService,
              public router: Router) {
  }

  mint() {
    if (this.title) {
      let propertyNames: string[] = [];
      let propertyValues: string[] = [];
      this.properties.forEach(property => {
        propertyNames.push(property.name !== null && property.name !== undefined ? property.name : "");
        propertyValues.push(property.value !== null && property.name !== undefined ? property.value : "");
      })

      this.marketplaceTokenContract.userMint(this.title, this.description, this.price, propertyNames, propertyValues)
        .then(() => {
          if (this.dialog) {
            this.dialog.hide();
          }
          return this.parent.updateUserNFTList();
        })
    }
  }

  addProperty() {
    const newProperty = new Property();
    newProperty.name = this.getPropertyName();
    newProperty.value = this.getPropertyValue();
    this.properties.push(newProperty);
  }

  removeProperty(property: Property) {
    this.properties.forEach( (item, index) => {
      if(item === property) this.properties.splice(index,1);
    });
  }

  setPrice(event: any) {
    this.price = event.target.value;
  }

  getPrice(): number {
    return this.price;
  }

  setPropertyName(event: any) {
    this.propertyName = event.target.value;
  }

  getPropertyName(): string {
    return this.propertyName;
  }

  setPropertyValue(event: any) {
    this.propertyValue = event.target.value;
  }

  getPropertyValue(): string {
    return this.propertyValue;
  }

  setTitle(event: any) {
    this.title = event.target.value;
  }

  setAuthor(event: any) {
    this.author = event.target.value;
  }

  setDescription(event: any) {
    this.description = event.target.value;
  }

  toggle(event: any) {
    if (this.dialog) {
      this.dialog.show(event);
      this.marketplaceTokenContract = this.walletService.getMarketplaceTokenContract();
    }
  }
}
`
    },
    {
        'tag': 'jsonToken',
        'value': 'Generating json tokens',
        'html':
`<p-overlayPanel #dialog [showCloseIcon]="true"
[style]="{ width: '800px' }">
<div class="col-12">
<div class="container text-center">
<div class="row my-4">
<div class="col-12">
<h1>Create mass NFTs from JSON</h1>
</div>
</div>
<div class="row">
<div class="container-fluid col-12">
<div class="form-group">
<input type="file" class="form-control"
   id="tokenFile" aria-describedby="writeColorCode"
   placeholder="Input .json file" (change)="this.uploadFile($event)">
</div>
</div>
</div>
<div class="row">
<div class="container-fluid col-4" style="padding: 6px">
<button type="submit" class="btn btn-primary text-center" (click)="mint()">Mint</button>
</div>
</div>

</div>
</div>
</p-overlayPanel>


`,
        'ts':
`import { Component, Input, ViewChild} from '@angular/core';
import {MarketplaceTokenContract} from "../../../../services/marketplaceToken.contract";
import {WalletService} from "../../../../services/wallet.service";
import {Router} from "@angular/router";
import {OverlayPanel} from "primeng/overlaypanel";
import {Property} from "../../../../models/property.model";
import { create } from 'ipfs-http-client'
import {Buffer} from "buffer";
import {NFT} from "../../../../models/NFT.model";

@Component({
  selector: 'jsonTokenComponent',
  templateUrl: './jsonToken.component.html'
})
export class JsonTokenComponent {

  @Input()
  public parent: any;

  @ViewChild('dialog')
  public dialog!: OverlayPanel;

  public file: any;
  public projectId = '2Ov3l9xcwJZGsPUNmP2hbs2TOHp';
  public projectSecret = '6159babe6bf62b6eed639c536354de5a';
  public auth = 'Basic ' + Buffer.from(this.projectId + ':' + this.projectSecret).toString('base64');
  public client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: this.auth,
    },
  });

  marketplaceTokenContract!: MarketplaceTokenContract;
  title: string = "";
  author: string = "";
  description: string = "";
  fileUrl: string = "";
  propertyName: string = "";
  propertyValue: string = "";
  price: number = 0;
  properties: Property[] = [];

  massUploadNFTs: NFT[] = [];
  massUpload: boolean = false;

  constructor(public walletService: WalletService,
              public router: Router) {
  }

  mint() {
    if (this.file !== null) {
      let fileExt = this.file.name.split('.').pop();
      if (fileExt === 'json') {
        this.getJSONStringFromFile(this.file).then(jsonString => {
          if (typeof jsonString === "string") {
            const jsonArr = JSON.parse(jsonString);
            jsonArr.map((object: NFT) => {
              this.massUpload = true;
              this.massUploadNFTs.push(object);
            })

            this.client.add(this.file).then(result => {
              this.fileUrl = result.path;

              if (this.fileUrl !== null && this.fileUrl !== undefined) {

                const massUploadTitles: string[] = [];
                const massUploadPrices: number[] = [];

                const massUploadDescriptions: string[] = [];
                const massUploadPropertyNames: string[][] = [];
                const massUploadPropertyValues: string[][] = [];

                this.massUploadNFTs.forEach(element => {
                  massUploadTitles.push(element.title!);
                  massUploadPrices.push(element.price!);
                  massUploadDescriptions.push(element.description!);
                  massUploadPropertyNames.push(element.propertyNames!);
                  massUploadPropertyValues.push(element.propertyValues!);
                })

                this.marketplaceTokenContract.userMassMint(massUploadTitles, massUploadPrices, massUploadDescriptions, massUploadPropertyNames, massUploadPropertyValues, this.massUploadNFTs.length)
                  .then(() => {
                      if (this.dialog) {
                        this.dialog.hide();
                      }
                      return this.parent.updateUserNFTList();
                });
              }
            });
          }
        });
      }
    }
  }

  addProperty() {
    const newProperty = new Property();
    newProperty.name = this.getPropertyName();
    newProperty.value = this.getPropertyValue();
    this.properties.push(newProperty);
  }

  removeProperty(property: Property) {
    this.properties.forEach( (item, index) => {
      if(item === property) this.properties.splice(index,1);
    });
  }

  setDescription(event: any) {
    this.description = event.target.value;
  }

  getDescription(): string {
    return this.description;
  }

  setPropertyName(event: any) {
    this.propertyName = event.target.value;
  }

  getPropertyName(): string {
    return this.propertyName;
  }

  setPropertyValue(event: any) {
    this.propertyValue = event.target.value;
  }

  getPropertyValue(): string {
    return this.propertyValue;
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
  }

  toggle(event: any) {
    if (this.dialog) {
      this.dialog.show(event);
      this.marketplaceTokenContract = this.walletService.getMarketplaceTokenContract();
    }
  }

  getJSONStringFromFile(file: any): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.match('json.*')) {
        resolve(null);
      }

      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const jsonObject = JSON.parse(event.target.result);
          const jsonString = JSON.stringify(jsonObject);
          resolve(jsonString);
        } catch (err) {
          console.error(err);
          resolve(null);
        }
      };
      reader.onerror = (event: any) => {
        console.error(event);
        resolve(null);
      };
      reader.readAsText(file);
    });
  }
}

`
    },
];