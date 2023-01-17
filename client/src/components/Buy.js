
import { ethers } from 'ethers';
import { useState} from 'react';
import './buy.css';
import pic from './newchai.png'
import chai2 from './chai3.png'
import { FaAddressCard, FaEthereum, FaWallet } from 'react-icons/fa';
const Buy = ({state,account,balance})=>
{
    
    const[details,setDetails] = useState({
        name:"",
        message:"",
    })

    const changeHandler=(e)=>
    {
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        setDetails({...details,[name]:value});
    }
    const buyChai=async(event)=>{
        if(state.contract)
        {
        event.preventDefault();
        if(balance>="0.001")
        {
        const {contract} = state;
        const amount={value:ethers.utils.parseEther("0.001")};
        const transaction = await contract.BuyChai(details.name,details.message,amount);
        await transaction.wait(); 
        }
        else
        {
            alert("Your wallet balance is less than 0.001 Ether")
        }
    }
    else
    {
        alert("You haven't install Metamask !");
    }
    };

    
    return (
        <>
        
        <div className='imgsec'>
           {/* <img src={logo} alt='logo' className='logo'></img> */}
            <img src={pic} alt='chai' className='icon'></img>
            <img src={chai2} alt='chai' className='icon2'></img>
        </div>
        <div className='row' >
        <div className='acc column1'>
        <FaAddressCard className='AddCard'></FaAddressCard>
        Connected Account 
        <p className='p1'>{String(account).slice(0,12)}...</p>
        </div>
        <div className='column2 acc'>
        <FaWallet className='wallet'></FaWallet>
        Balance <p className='p2'>{String(balance).slice(0,8)}<FaEthereum></FaEthereum></p>
        </div>
        </div>
        
        <form onSubmit={buyChai}>
        <fieldset>
            <legend>Just pay only 0.001<FaEthereum></FaEthereum>/Chai</legend>
            <label>Name</label>
            <input type="text" placeholder="name" name="name" value={details.name} onChange={changeHandler}></input>
            <label>Message</label>
            <input type="text" placeholder="message" name="message" value={details.message} onChange={changeHandler}></input>
            
        </fieldset>
        <button type='submit'>Pay</button>
    </form>

        </>
    );
}
export default Buy;