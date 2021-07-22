// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20{
    
    address public owner;
    mapping(address => bool) verifiedUsers;
    
    event ApprovedMsg(string message);
    
    constructor() ERC20("STtoken", 'STY') {
        _mint(msg.sender, 1000);
        owner = msg.sender;
    }
    
    modifier ownerOnly(){
        require(msg.sender == owner, "Only owner can verify!!");
        _;
    }
    
    modifier verifiedOnly(){
        require(msg.sender != owner, "Buyer cannot be owner!!");
        require(verifiedUsers[msg.sender] == true, "User not verified!!");
        _;
    }
    
    
    function approveUser(address account) public ownerOnly returns (bool) {
        verifiedUsers[account] = true;
        emit ApprovedMsg("User is approved !!");
        return true;
    }
    
    function buyToken() payable public verifiedOnly () {
        uint256 amountToBuy = msg.value;
        uint256 ownerBalance = balanceOf(owner); 
        require(amountToBuy > 0, "You need to send some ether!!");
        require(amountToBuy <= ownerBalance, "Not enough token present!!");
        _transfer(owner, msg.sender, msg.value);
    }
}