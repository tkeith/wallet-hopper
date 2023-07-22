// SPDX-License-Identifier: MIT
// Created by @tsrkeith for ETHGlobal Paris 2023
// https://wallethopper.com/

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WalletHopper is ERC721 {
    mapping(address => string) public pointers;

    constructor() ERC721("Wallet Hopper", "HOP") {}

    function setPointer(string memory pointerValue) public {
        uint256 tokenId = uint256(uint160(msg.sender));
        pointers[msg.sender] = pointerValue;
        if (_exists(tokenId)) {
            _burn(tokenId);
        }
        _safeMint(msg.sender, tokenId);
    }

    function getPointer(address user) public view returns (string memory) {
        return pointers[user];
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
        return string(abi.encodePacked("https://wallethopper.com/token.json?id=", Strings.toString(tokenId), "&pointer=", pointers[ownerOf(tokenId)]));
    }

    function _transfer(
        address,
        address,
        uint256
    ) internal override pure {
        revert("This token is non-transferrable");
    }
}
