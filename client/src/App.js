
import abi from './Contract/chai.json';
import { ethers } from "ethers";
import {useState,useEffect} from "react";
import Buy from './components/Buy';
import Detail from './components/Details';
const App=()=>
{
  const [balance, setBalance] = useState(0);
  const [state,setState] = useState({
    provider:null,
    signer:null,
    contract:null,
  })

  const[accounts, setAccount]= useState("None");

  useEffect(()=>{
    const connectWallet = async()=>{
      const contractAddress = "0xAa18F1236BFF5a9e045b238B835193c6D720f4F0";
      const  contractABI = abi.abi;
      try{
        const {ethereum}=window;
        if(ethereum)
        {
          const account = await  ethereum.request({method:"eth_requestAccounts",})
        
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });

        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        })


        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        const bal = await provider.getBalance(String(account));
        const Balance = parseFloat(ethers.utils.formatEther(bal));
            setBalance(Balance);
        setAccount(account);
        setState({provider,signer,contract});
        }else
        {
          alert("Please Install Metamask");
        }
      }catch(error)
      {
        console.log(error);
      }
    };
    connectWallet();
  },[]);
  return(
    <>
    <Buy state={state} account = {accounts} balance={balance}></Buy>
    <Detail state={state}></Detail>
    </>
  );
}

export default App;