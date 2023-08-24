export const MODELS = [
    {
        'tag': 'itemsForSale',
        'value': 'Generate model ItemsForSale',
        'ts':
`import {Property} from "./property.model";

export class ItemForSale {
  id: number | undefined | null = null;
  tokenId: number | undefined | null = null;
  title: string | undefined | null = null;
  seller: string | undefined | null = null;
  fileUrl: string | undefined | null = null;
  price: number | undefined | null = null;
  isSold: boolean | undefined | null = null;
  ratings: number[] | undefined | null = null;
  properties: Property[] | undefined | null = null;
  propertyNames: string[] | null = null;
  propertyValues: string[] | null = null;
  isFile: boolean | null = null;
}
`
    },
    {
        'tag': 'filter',
        'value': 'Generate model Filter',
        'ts':
`export class Filter {
  searchValue: string | undefined | null = null;
  searchCategory: string | null = null;
}
`
    },
    {
        'tag': 'property',
        'value': 'Generate model Property',
        'ts':
`export class Property {
  name: string | null = null;
  value: string | null = null;
}
`
    },
    {
        'tag': 'nft',
        'value': 'Generate model NFT',
        'ts':
`import {Property} from "./property.model";

export class NFT {
  tokenId: number | undefined | null = null;
  owner: string | undefined | null = null;
  price: number | undefined | null = null;
  title: string | undefined | null = null;
  description: string | undefined | null = null;
  fileUrl: string | undefined | null = null;
  ratings: number[] | undefined | null = null;
  raterAddresses: string[] | undefined | null = null;
  properties: Property[] | null = null;
  propertyNames: string[] | null = null;
  propertyValues: string[] | null = null;
  isFile: boolean | null = null;
}
`
    },
];