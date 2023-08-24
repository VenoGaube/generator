export const SERVICE_MARKETPLACE = [
    {
        'tag': 'serviceMarketplace',
        'value': 'Generate Marketplace service',
        'ts':
`import {ItemForSale} from "../models/itemForSale.model";

export interface MarketplaceContract {
  putItemForSale: (itemForSaleId: number, price: number) => Promise<ItemForSale>;
  buyItem: (itemForSaleId: number) => Promise<ItemForSale>;
  getTokenData: (itemForSaleId: number) => Promise<ItemForSale>;
  getAllItemsForSale: () => Promise<ItemForSale[]>;
  getContractAddress: () => Promise<string>;
}
`
    }
];