require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/vboQz_0kc8qhHHVCCbVluRnVagr2gxAi",
      accounts:["b5a5700adc9d46a7ffe70bde7ae2bf4797418c7a76d4acc12b7fbf3cf45f9e64"],
    },
  },
};
