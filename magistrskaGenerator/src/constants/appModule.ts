// COMMANDS
export const npmI = `npm i`;
export const npmRunBuild = `npm run build`;
export const truffleCompile = `truffle compile`;
export const truffleMigrate = `truffle migrate --reset`;

// ROUTES
export const routeImports = `import {MarketplaceComponent} from "./components/marketplace/marketplace.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {NftListResolver} from "./resolvers/nftList.resolver";
import {ProfileNFTListResolver} from "./resolvers/profileNFTList.resolver";`;

export const routes = `const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: MarketplaceComponent,
    // Handles async loading of data to the Home component.
    resolve: {
      nftList: NftListResolver
    },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    // Handles async loading of data to the Profile component.
    resolve: {
      profileNFTList: ProfileNFTListResolver
    },
  }`;

// ANGULAR JSON
export const scripts = `
"scripts": [
  "node_modules/@popperjs/core/dist/umd/popper.min.js",
  "node_modules/bootstrap/dist/js/bootstrap.min.js",`;

export const styles = `"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.css",
  "node_modules/primeicons/primeicons.css",
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "node_modules/primeng/resources/primeng.min.css",`;

// PACKAGE JSON
export const dependencies = 
`"dependencies": {
  "openzeppelin-solidity": "^4.6.0",
  "bootstrap": "^5.2.3",
  "buffer": "^6.0.3",
  "ethers": "^5.7.2",
  "ipfs-http-client": "^60.0.0",
  "primeicons": "^6.0.1",
  "primeng": "^16.0.0-rc.1",
  "web3": "^1.9.0",`;

// TS CONFIG

export const allowSyntheticDefaultImports = `"allowSyntheticDefaultImports": true,`;
export const compilerOptions = `"compilerOptions": {`;

// APP MODULE

export const declareGlobal = 
`declare global {
  interface Window {
    web3:any;
    ethereum:any;
  }
}`;

export const declarations = `declarations: [`;

export const MARKETPLACE_COMPONENT_DECLARATION = `MarketplaceComponent,`;
export const SEARCH_COMPONENT_DECLARATION = `SearchComponent,`;
export const PROFILE_COMPONENT_DECLARATION = `ProfileComponent,`;
export const IMAGE_TOKEN_FOR_SALE_COMPONENT_DECLARATION = `ImageTokenForSaleComponent,`;
export const FILE_TOKEN_FOR_SALE_COMPONENT_DECLARATION = `FileTokenForSaleComponent,`;
export const IMAGE_ITEM_COMPONENT_DECLARATION = `ImageItemComponent,`;
export const FILE_ITEM_COMPONENT_DECLARATION = `FileItemComponent,`;
export const CREATE_IMAGE_TOKEN_DECLARATION = `ImageTokenComponent,`;
export const CREATE_FILE_TOKEN_DECLARATION = `FileTokenComponent,`;
export const CREATE_JSON_TOKEN_DECLARATION = `JsonTokenComponent,`;

export const imports = `imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProgressBarModule,
    ToastModule,
    CardModule,
    ButtonModule,
    RippleModule,
    DataViewModule,
    TableModule,
    ImageModule,
    OverlayPanelModule,`;

export const SHARED_IMPORTS_COMPONENT = `SharedModule,`;

export const importFiles = `import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DataViewModule} from "primeng/dataview";
import {TableModule} from "primeng/table";
import {ImageModule} from "primeng/image";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OverlayPanelModule} from "primeng/overlaypanel";`;

export const SHARED_MODULE_IMPORT = `import {SharedModule} from "./shared/shared.module";`;
export const MARKETPLACE_COMPONENT_IMPORT = `import {MarketplaceComponent} from "./components/marketplace/marketplace.component";`;
export const SEARCH_COMPONENT_IMPORT = `import { SearchComponent } from './components/marketplace/search/search.component';`;
export const PROFILE_COMPONENT_IMPORT = `import {ProfileComponent} from "./components/profile/profile.component";`;
export const IMAGE_TOKEN_FOR_SALE_COMPONENT_IMPORT = `import {ImageTokenForSaleComponent} from "./components/marketplace/imageTokenForSale/imageTokenForSale.component";`;
export const IMAGE_ITEM_COMPONENT_IMPORT = `import {ImageItemComponent} from "./components/profile/nftItem/imageItem/imageItem.component";`;
export const FILE_ITEM_COMPONENT_IMPORT = `import {FileItemComponent} from "./components/profile/nftItem/fileItem/fileItem.component";`;
export const FILE_TOKEN_FOR_SALE_COMPONENT_IMPORT = `import {FileTokenForSaleComponent} from "./components/marketplace/fileTokenForSale/fileTokenForSale.component";`;
export const CREATE_IMAGE_TOKEN_IMPORT = `import { ImageTokenComponent } from './components/profile/createToken/imageToken/imageToken.component';`;
export const CREATE_FILE_TOKEN_IMPORT = `import {FileTokenComponent} from "./components/profile/createToken/fileToken/fileToken.component";`;
export const CREATE_JSON_TOKEN_IMPORT = `import {JsonTokenComponent} from "./components/profile/createToken/jsonToken/jsonToken.component";`;