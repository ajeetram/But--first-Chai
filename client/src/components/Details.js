import { useState,useEffect } from "react";
import './tables.css';
const Detail=({state})=>
{
    const[record, setRecord] = useState([]);
    const {contract} = state;

    useEffect(() => {
      const recordMsg = async()=>
      {
        const records = await contract.getDetails();
        setRecord(records);
      }
      contract && recordMsg();
    }, [contract]);

   


    return(
        <>
        <p id="para">Received Requests</p>
        <div className="table-wrapper">
        <table className="fl-table">
        
        <thead>
        <tr>
            <th>Timestamp</th>
            <th>Name</th>
            <th>Messages</th>
            <th>Recieved From</th>
        </tr>
        </thead>
        <tbody>
        {record.map((list)=>{
            return(
                
                    <tr key={list.timestamp} >
                        <td>{new Date(list.timestamp*1000).toLocaleString()}</td>
                        <td>{list.name}</td>
                        <td>{list.message}</td>
                        <td>{list.from}</td>
                    </tr>
            )


        })}
        </tbody>
                </table>
        </div>
        </>
    );
}
export default Detail;