// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SecureCode is ERC721, ERC721URIStorage, Pausable, Ownable {
    /** 
        @title A Code Approval Mechanism
        @author Anthony J. Butt
        @notice You can use this contract to mint NFCs based on pipeline status and owner approval
        @dev Counter for ID incrementation
    */
    using Counters for Counters.Counter;

    /**
        @dev state for tokenIdCounter;    
    */
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SecureCode", "SEC") {}

    /**
      @dev Create a struct to store PipelineInformation
      @notice This captures pipeline information
    */
    struct PipelineInfo {
        uint256 id;
        string commitSha;
        string status;
        bool approved;
    }

    /**
      @dev Create a struct to store Code Owner information
      @notice This captures pipelines by owner
    */
    struct CodeOwner {
        PipelineInfo[] pipelines;
    }

    /**
      @dev Create mapping of addresses to CodeOwners
    */
    mapping(address => CodeOwner) codeOwners;

    /**
      @dev stores a list of users of the contract
    */
    address[] public codeOwnerAccts;

    /** 
      @dev Sets the pipeline info on the senders object
      @notice Returns the pipelines for the sender
    */
    function setPipeline(
        string memory _sha,
        string memory _status,
        uint256 _id
    ) public {
        CodeOwner storage codeOwner = codeOwners[msg.sender];

        codeOwner.pipelines.push(PipelineInfo(_id, _sha, _status, false));

        codeOwnerAccts.push(msg.sender);
    }

    /**
      @dev returns the pipelines for a given user
      @notice Returns pipelines
    */
    function getPipelines(address _address)
        public
        view
        returns (PipelineInfo[] memory)
    {
        return codeOwners[_address].pipelines;
    }

    /**
     * @dev approves a pipeline run
     */
    function approveCode(uint256 _index, address _address) public onlyOwner {
        CodeOwner storage codeOwner = codeOwners[_address];
        codeOwner.pipelines[_index].approved = true;
    }

    /**
     * @dev returns list of addresses on the contract
     */
    function getCodeOwnerAccts() public view returns (address[] memory) {
        return codeOwnerAccts;
    }

    /**
     * @dev pauses the contract
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev unpauses the contract
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev mints an NFT increments the id counter and sets the NFT's uri
     * @notice
     */
    function safeMint(address to, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /**
     * @dev Hook that is called before any transfer of tokens. This includes
     * minting and burning.
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    
    /**
     * @dev Hook that is called to burn tokens
     */
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }
    
    /**
     * @dev Returns the token uri given a token id
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
