// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SecureCode is ERC721, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SecureCode", "SEC") {}
    
    struct PipelineInfo {
        uint id;
        string commitSha;
        string status;
        bool approved;
    }

    struct CodeOwner {
        PipelineInfo[] pipelines;
    }

    mapping (address => CodeOwner) codeOwners;
    address[] public codeOwnerAccts;

    function setPipeline(string memory _sha, string memory _status, uint _id) public {
        CodeOwner storage codeOwner = codeOwners[msg.sender];

        codeOwner.pipelines.push(PipelineInfo(_id, _sha, _status, false));
        
        codeOwnerAccts.push(msg.sender);
    }
    
    function getPipelines(address _address) public view returns (PipelineInfo[] memory) {
        return codeOwners[_address].pipelines;
    }

    function approveCode(uint _index, address _address) public onlyOwner {
        CodeOwner storage codeOwner = codeOwners[_address];
        codeOwner.pipelines[_index].approved = true;
    }
    
    function getCodeOwnerAccts() public view returns (address[] memory){
        return codeOwnerAccts;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}