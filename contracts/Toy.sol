// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

contract Toy {
    // Stores the owner of the contract
    address public owner;
    
    /**
     * @dev Stores the address of the person deploying the contract
     */
    constructor() {
        owner = msg.sender;
    }
}
