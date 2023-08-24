export const CONTRACT_MARKETPLACE = [
    {
        'tag': 'marketplace',
        'value': 'Generate Marketplace contract',
        'sol':
`//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./MarketplaceToken.sol";

contract Marketplace {
  MarketplaceToken private marketplaceTokenContract;

  struct Property {
    string name;
    string value;
  }

  struct ItemForSale {
    uint256 id;
    uint256 tokenId;
    string title;
    address payable seller;
    string fileUrl;
    uint256 price;
    bool isSold;
    uint256[] ratings;
    string[] propertyNames;
    string[] propertyValues;
    bool isFile;
  }

  ItemForSale[] public itemsForSale;
  mapping(uint256 => bool) public activeItems;

  event itemAddedForSale(uint256 id, uint256 tokenId, uint256 price);
  event itemSold(uint256 id, address buyer, uint256 price);

  constructor(MarketplaceToken _tokenContract) {
    marketplaceTokenContract = _tokenContract;
  }

  modifier OnlyItemOwner(uint256 tokenId){
    require(marketplaceTokenContract.ownerOf(tokenId) == msg.sender, "Sender does not own the item");
    _;
  }

  modifier HasTransferApproval(uint256 tokenId){
    require(marketplaceTokenContract.getApproved(tokenId) == address(this), "Market is not approved");
    _;
  }

  modifier ItemExists(uint256 id){
    require(id < itemsForSale.length && itemsForSale[id].id == id, "Could not find item");
    _;
  }

  modifier IsForSale(uint256 id){
    require(!itemsForSale[id].isSold, "Item is already sold");
    _;
  }

  function putItemForSale(uint256 tokenId, uint256 price)
  OnlyItemOwner(tokenId)
  HasTransferApproval(tokenId)
  external
  returns (ItemForSale memory){
    require(!activeItems[tokenId], "Item is already up for sale");

    uint256 newItemId = itemsForSale.length;
    string[] memory tempPropertyNames;
    string[] memory tempPropertyValues;
    (tempPropertyNames, tempPropertyValues) = marketplaceTokenContract.getTokenProperties(tokenId);

    itemsForSale.push(ItemForSale({
    id: newItemId,
    tokenId: tokenId,
    title: marketplaceTokenContract.getTokenTitle(tokenId),
    seller: payable(msg.sender),
    fileUrl: marketplaceTokenContract.getTokenFileUrl(tokenId),
    price: price,
    isSold: false,
    ratings: marketplaceTokenContract.getTokenRating(tokenId),
    propertyNames: tempPropertyNames,
    propertyValues: tempPropertyValues,
    isFile: marketplaceTokenContract.getIsTokenFile(tokenId)
    }));
    activeItems[tokenId] = true;

    assert(itemsForSale[newItemId].id == newItemId);
    emit itemAddedForSale(newItemId, tokenId, price);
    return itemsForSale[newItemId];
  }

  function buyItem(uint256 id)
  ItemExists(id)
  IsForSale(id)
  HasTransferApproval(itemsForSale[id].tokenId)
  payable
  external returns (ItemForSale memory) {
    require(msg.value >= itemsForSale[id].price, "Not enough funds sent");
    require(msg.sender != itemsForSale[id].seller);

    itemsForSale[id].isSold = true;
    activeItems[itemsForSale[id].tokenId] = false;
    marketplaceTokenContract.safeTransferFrom(itemsForSale[id].seller, msg.sender, itemsForSale[id].tokenId);
    itemsForSale[id].seller.transfer(msg.value);

    marketplaceTokenContract.updateOwner(itemsForSale[id].tokenId, msg.sender);

    emit itemSold(id, msg.sender, itemsForSale[id].price);
    return itemsForSale[id];
  }

  function getTokenData(uint256 tokenId) external view returns(ItemForSale memory) {
    return(itemsForSale[tokenId]);
  }

  function getAllItemsForSale() public view returns(ItemForSale[] memory) {
    return itemsForSale;
  }

  function getContractAddress() public view returns(address) {
    return address(this);
  }
}
`
    }
];