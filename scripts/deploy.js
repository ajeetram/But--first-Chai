// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address)
{
 const balanceBigInt = await hre.ethers.provider.getBalance(address);
 return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses)
{
 let counter=0;
 for(const address of addresses)
 {
   console.log(`Address ${counter} balance : `,await getBalances(address));
   counter++;
}
 }
 
async function consoleDetails(details)
{
 for(const Detail of details)
 {
   const timestamp = Detail.timestamp;
   const name = Detail.name;
   const message = Detail.message;
   const from = Detail.from;
   console.log(`At ${timestamp}, name ${name}, message ${message}, from ${from}`);

 }

}

async function main() {
const[owner,from1,from2,from3] = await hre.ethers.getSigners();
const chai = await hre.ethers.getContractFactory("chai");
const contract = await chai.deploy(); //instance of contract
contract.deployed();
console.log("Address of contract :",contract.address);
const addresses = [owner.address,from1.address];
console.log("Bfore buying Chai ");
await consoleBalances(addresses);

const amount = {value:hre.ethers.utils.parseEther("0.001")};
await contract.connect(from1).BuyChai("from1","Very nice",amount);
await contract.connect(from2).BuyChai("from2","good",amount);
await contract.connect(from3).BuyChai("from3","Very good",amount);
console.log("After buying Chai ");
await consoleBalances(addresses);

const Detail = await contract.getDetails();
consoleDetails(Detail);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
