export const SERVICE_MARKETPLACE_FACTORY = [
    {
        'tag': 'serviceMarketplaceFactory',
        'value': 'Generate Marketplace factory service',
        'ts':
`import {Injectable} from "@angular/core";
import {MarketplaceContract} from "./marketplace.contract";

@Injectable({
  providedIn: 'root',
})
export class MarketplaceFactoryService {

  // Creates all the smart contract function calls.
  public create(rawMarketplaceContract: any, address: any): MarketplaceContract {
    const putItemForSale = (tokenId: number, price: number) => rawMarketplaceContract.methods.putItemForSale(tokenId, price).send({from: address});
    const buyItem = (itemForSaleId: number) => rawMarketplaceContract.methods.buyItem(itemForSaleId).send({from: address});
    const getTokenData = (itemForSaleId: number) => rawMarketplaceContract.methods.getTokenData(itemForSaleId).call();
    const getAllItemsForSale = () => rawMarketplaceContract.methods.getAllItemsForSale().call();
    const getContractAddress = () => rawMarketplaceContract.methods.getContractAddress().call();
    return {putItemForSale, buyItem, getTokenData, getAllItemsForSale, getContractAddress};
  }
}
`
    }
];