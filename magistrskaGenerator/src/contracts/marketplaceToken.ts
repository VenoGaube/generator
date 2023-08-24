export const CONTRACT_MARKETPLACE_TOKEN = [
    {
        'tag': 'marketplaceToken',
        'value': 'Generate Marketplace Token contract',
        'sol':
`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "../node_modules/openzeppelin-solidity/contracts/utils/Base64.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MarketplaceToken is ERC721URIStorage {
  using Counters for Counters.Counter;

  Counters.Counter private tokenCounter;
  address public marketplace;

  struct NFT {
    uint256 tokenId;
    address owner;
    uint256 price;

    string title;
    string description;
    string fileUrl;
    uint256[] ratings;
    address[] raterAddresses;
    string[] propertyNames;
    string[] propertyValues;
    bool isFile;
  }

  NFT[] public mintedTokens;
  string private imageURI = "https://gateway.pinata.cloud/ipfs/QmXUgFJkWnXwazMG5jqA9HKwa6DU1ZWfzTwfbNJCEU3ddd/";
  string private imageMetadataURI = "https://gateway.pinata.cloud/ipfs/QmTiy2J5ArzRDeJdjraDVLVogqHaZyGHVYnvWA1Y4jdXGa/";

  constructor () ERC721("Marketplace Token", "MT") {}

  function userMint(string memory title, string memory description, uint256 price, string[] memory propertyNames, string[] memory propertyValues) external returns (uint256){
    uint256 currentTokenId = tokenCounter.current();

    string memory fileUrl = string(abi.encodePacked(imageURI, Strings.toString(currentTokenId % 100), ".png"));
    string memory imageMetadata = string(abi.encodePacked(imageMetadataURI, Strings.toString(currentTokenId % 100), ".json"));
    string memory tokenUri = createTokenUri(imageMetadata);
    uint256[] memory ratings;
    address[] memory raterAddresses;

    mintedTokens.push(
      NFT(
        currentTokenId,
        msg.sender,
        price,
        title,
        description,
        fileUrl,
        ratings,
        raterAddresses,
        propertyNames,
        propertyValues,
        false
      )
    );

    _safeMint(msg.sender, currentTokenId);
    approve(marketplace, currentTokenId);
    _setTokenURI(currentTokenId, tokenUri);
    tokenCounter.increment();

    return currentTokenId;
  }

  function userMintFile(string memory fileName, string memory fileUrl, string memory description, uint256 price, string[] memory propertyNames, string[] memory propertyValues) external returns (uint256){
    uint256 currentTokenId = tokenCounter.current();
    uint256[] memory ratings;
    address[] memory raterAddresses;

    mintedTokens.push(
      NFT(
        currentTokenId,
        msg.sender,
        price,
        fileName,
        description,
        fileUrl,
        ratings,
        raterAddresses,
        propertyNames,
        propertyValues,
        true
      )
    );

    _safeMint(msg.sender, currentTokenId);
    approve(marketplace, currentTokenId);
    tokenCounter.increment();

    return currentTokenId;
  }

  function userMassMint(string[] memory massUploadTitles, uint256[] memory massUploadPrices, string[] memory massUploadDescriptions,
    string[][] memory massUploadPropertyNames, string[][] memory massUploadPropertyValues, uint256 size) external returns (uint256){

    uint256 currentTokenId = tokenCounter.current();
    for (uint i = 0; i < size; i++) {
      currentTokenId = tokenCounter.current();
      string memory fileUrl = string(abi.encodePacked(imageURI, Strings.toString(currentTokenId % 100), ".png"));
      uint256[] memory ratings;
      address[] memory raterAddresses;

      mintedTokens.push(
        NFT(
          currentTokenId,
          msg.sender,
          massUploadPrices[i],
          massUploadTitles[i],
          massUploadDescriptions[i],
          fileUrl,
          ratings,
          raterAddresses,
          massUploadPropertyNames[i],
          massUploadPropertyValues[i],
          false
        )
      );

      _safeMint(msg.sender, currentTokenId);
      approve(marketplace, currentTokenId);
      tokenCounter.increment();
    }

    return currentTokenId;
  }

  function createTokenUri(string memory imageMetadata) internal pure returns(string memory tokenUri) {
    string memory json = Base64.encode(bytes(string(abi.encodePacked(imageMetadata))));

    tokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
  }

  function setMarketplace(address marketAddress) public {
    marketplace = marketAddress;
  }

  function getOwnedTokens(address accountAddress) public view returns(NFT[] memory){
    uint ownedItemsCount = ERC721.balanceOf(accountAddress);
    NFT[] memory items = new NFT[](ownedItemsCount);
    uint256 allMintedTokens = mintedTokens.length;
    uint256 counter = 0;
    for (uint i = 0; i < allMintedTokens; i++){
      if (ownerOf(i) == accountAddress) {
        items[counter] = mintedTokens[i];
        counter += 1;
      }
    }
    return items;
  }

  function updateOwner(uint256 tokenId, address newOwner) public {
    mintedTokens[tokenId].owner = newOwner;
  }

  function updateAddRating(uint256 tokenId, uint256 rating) public returns(NFT memory) {
    require(ownerOf(tokenId) == msg.sender, "You can only rate NFTs that you own.");
    bool userAlreadyRated = false;
    uint index = 0;
    address[] memory raterAddresses = mintedTokens[tokenId].raterAddresses;

    for (uint i = 0; i < raterAddresses.length; i++) {
      if (raterAddresses[i] == msg.sender) {
        userAlreadyRated = true;
        index = i;
      }
    }
    if (userAlreadyRated) {
      mintedTokens[tokenId].ratings[index] = rating;
    } else {
      mintedTokens[tokenId].ratings.push(rating);
      mintedTokens[tokenId].raterAddresses.push(msg.sender);
    }

    return mintedTokens[tokenId];
  }

  function getTokenFileUrl(uint256 tokenId) public view returns (string memory) {
    return mintedTokens[tokenId].fileUrl;
  }

  function getTokenTitle(uint256 tokenId) public view returns (string memory) {
    return mintedTokens[tokenId].title;
  }

  function getTokenRating(uint256 tokenId) public view returns (uint256[] memory) {
    return mintedTokens[tokenId].ratings;
  }

  function getTokenProperties(uint256 tokenId) public view returns (string[] memory, string[] memory) {
    return (mintedTokens[tokenId].propertyNames, mintedTokens[tokenId].propertyValues);
  }

  function getIsTokenFile(uint256 tokenId) public view returns (bool) {
    return mintedTokens[tokenId].isFile;
  }
}
`
    }
];