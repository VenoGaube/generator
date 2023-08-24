export const SERVICE_MARKETPLACE_TOKEN = [
    {
        'tag': 'serviceMarketplaceToken',
        'value': 'Generate Marketplace Token service',
        'ts':
`import {NFT} from "../models/NFT.model";

export interface MarketplaceTokenContract {
  userMint: (title: string, description: string, price: number, propertyNames: string[], propertyValues: string[]) => Promise<any>;
  userMassMint: (massUploadTitles: string[], massUploadPrices: number[], massUploadDescriptions: string[], massUploadPropertyNames: string[][], massUploadPropertyValues: string[][], size: number) => Promise<any>;
  userMintFile: (fileName: string, fileUrl: string, description: string, price: number, propertyNames: string[], propertyValues: string[]) => Promise<any>;
  getOwnedTokens:(walletAddress: string) => Promise<NFT[]>;
  updateAddRating: (tokenId: number, rating: number) => Promise<NFT[]>;
  setApproval:(tokenId: number, contractAddress: string) => Promise<any>;
}
`
    }
];