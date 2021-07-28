pragma solidity >=0.8.0;

//Importing openzeppelin-solidity ERC-721 implemented Standard
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

/// @title A sample carbon storage marketplace
/// @author Jasper van de Vorst
/// @notice This is a very naive implementation with potential vulnerabilities,
/// please don't use it for anything.
contract CarbonStorage is ERC721 {

    // Storage data
    struct Storage {
        uint256 capacity;
        uint256 timestamp;
        string facility;
    }

    // Add symbol and name property
    constructor() ERC721("CarbonStorage", "CCS") {}

    // mapping the Storage info to the tokenId
    mapping(uint256 => Storage) public tokenIdToStorageInfo;
    // mapping the tokenId to the price
    mapping(uint256 => uint256) public storagesForSale;

    /// @notice a utility function to return the specified the address as a payable address
    /// @param address to make payable
    /// @return the payable address
    function _make_payable(address x) internal pure returns (address payable) { }

    /// @notice Function that creates, saves, and mints a new storage
    /// @param _capacity The carbon capacity of the storage
    /// @param _tokenId The id of the storage
    /// @param _facility The name of the facility issuing the storage
    function createStorage(uint256 _capacity, uint256 _tokenId, string memory facility) public { }

    /// @notice function that lists a storage as 'for sale' and allows users to buy it
    /// @param _tokenId the tokenId of the storage to be listed
    /// @param _price the price of the storage
    function listStorage(uint256 _tokenId, uint256 _price) public { }

    /// @notice a function that allows buying of a storage and proper transfer of funds
    /// @param _tokenId the tokenId of the storage to be bought
    function buyStorage(uint256 _tokenId) public payable { }

}