export const SERVICE_MARKETPLACE_TOKEN_FACTORY = [
    {
        'tag': 'serviceMarketplaceTokenFactory',
        'value': 'Generate Marketplace token factory service',
        'ts':
`import {Injectable} from "@angular/core";
import {MarketplaceTokenContract} from "./marketplaceToken.contract";
import {Property} from "../models/property.model";

@Injectable({
  providedIn: 'root',
})
export class MarketplaceTokenFactoryService {

  // Creates all the smart contract function calls.
  public create(rawMarketplaceTokenContract: any, address: string): MarketplaceTokenContract {
    const userMint = (title: string, description: string, price: number, propertyNames: string[], propertyValues: string[]) =>
      rawMarketplaceTokenContract.methods.userMint(title, description, price, propertyNames, propertyValues).send({
        from: address
      });
    const userMassMint = (massUploadTitles: string[], massUploadPrices: number[], massUploadDescriptions: string[],
                          massUploadPropertyNames: string[][], massUploadPropertyValues: string[][], size: number) =>
      rawMarketplaceTokenContract.methods.userMassMint(massUploadTitles, massUploadPrices, massUploadDescriptions, massUploadPropertyNames, massUploadPropertyValues, size).send({
        from: address
      });
    const userMintFile = (fileName: string, fileUrl: string, description: string, price: number, propertyNames: string[], propertyValues: string[]) =>
      rawMarketplaceTokenContract.methods.userMintFile(fileName, fileUrl, description, price, propertyNames, propertyValues).send({
        from: address
      });
    const getOwnedTokens = (walletAddress: string) => rawMarketplaceTokenContract.methods.getOwnedTokens(walletAddress).call();
    const updateAddRating = (tokenId: number, rating: number) =>
      rawMarketplaceTokenContract.methods.updateAddRating(tokenId, rating).send({
        from: address
      });
    const setApproval = (tokenId: number, contractAddress: string) => rawMarketplaceTokenContract.methods.approve(contractAddress, tokenId).send({
        from: address
      });
    return {userMint, userMassMint, userMintFile, getOwnedTokens, updateAddRating, setApproval};
  }
}
`
    }
];