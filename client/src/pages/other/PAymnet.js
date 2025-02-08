import axios from "axios";
import React from "react";
 const Payment=()=>{


    const Payment= async( )=>{
        let response=await axios.post('https://localhost:5001/api/payment');
        if (response && response.status===200){
            console.log(response.data)
        }

    }
     


    return(
        <div>
            <button onClick={Payment}> 
                Buy Now

            </button>
        </div>
    )
 }
 export default Payment;