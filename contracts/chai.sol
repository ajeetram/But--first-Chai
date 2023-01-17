// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

contract chai
{
    struct Detail
    {
        string name;
        string  message;
        uint timestamp;
        address from;
    }

    Detail[] details;

    address payable owner;

    constructor()
    {
        owner = payable(msg.sender);
    }

    function BuyChai(string memory _name, string memory _message) public payable
    {
        require(msg.value== 0.001 ether,"please send the exact price");
        owner.transfer(msg.value);
        details.push(Detail(_name,_message,block.timestamp,msg.sender));


    }

    function getDetails() public view returns(Detail[] memory)
    {
        return details;
    }
}