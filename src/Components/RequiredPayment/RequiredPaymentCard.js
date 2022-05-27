import React from 'react';
import $ from 'jquery';
import axios from 'axios';

function RequiredPaymentCard(props){
    let repeaternote;
    let bgColor;
    const token=localStorage.getItem('userToken');

    if(props.repeater){
        repeaternote='visible';
        bgColor='rgb(229 181 37 / 21%)';
    }
    else{
        repeaternote='hidden';
        bgColor='rgb(209 216 226 / 57%)';
    }

    const monthlyPayment=async ()=>{

        try {
            
            //!remove
            console.log("id : "+props.id)
        
            const res=await axios.post(
                `http://localhost:5000/managment/monthlyinstallment/${props.id}`,
                {
                    Headers : {
                        authorization : `Bearer ${token}`
                    }
                })
             
                //!remove
                console.log("data "+res.data);
            
        } catch (err) {
            //!remove
            console.log(err);
            
        }
    }

    const addPremiums=async()=>{
        try {
            
            //!remove
            console.log("id : "+props.id)
        
            const res=await axios.post(
                `http://localhost:5000/managment/addInstallment/${props.id}`,
                {
                    Headers : {
                        authorization : `Bearer ${token}`
                    }
                })
             
                //!remove
                console.log("data "+res.data);
            
        } catch (err) {
            //!remove
            console.log(err);
            
        }
    }

    const Delete=async()=>{
        try {
            
            //!remove
            console.log("id : "+props.id)
        
            const res=await axios.post(
                `http://localhost:5000/managment/deleteInstallment/${props.id}`,
                {
                    Headers : {
                        authorization : `Bearer ${token}`
                    }
                })
             
                //!remove
                console.log("data "+res.data);
            
        } catch (err) {
            //!remove
            console.log(err);
            
        }
    }


    return (
        <div style={{width:'300px',minHeight:'550px',lineHeight:'40px',borderRadius:'20px',padding:'10px',backgroundColor:bgColor,marginBottom:'20px',marginRight:'15px',display:'flex',flexDirection:'column',boxShadow:'5px 5px 5px 5px rgba(0,0,0,0.25)'}}>

            {
                props.repeater?
            
                     <div style={{height:'100%',display:'flex',flexDirection:'column'}}>

                            <span style={{color:'#11324D'}}>
                                Payment Name &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.name}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Type &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.type}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Price &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.value} s.p</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Expiry Date &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.date}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Repeater &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.repeater?'Yes':'No'}</span> 
                            </span>
        

        

                            <span style={{color:'#11324D'}}>
                                The Rest &nbsp;:&nbsp;&nbsp;                           
                                <span style={{color:'#6B7AA1'}}>{props.rest} s.p</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Paid So Far &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.paid} s.p</span> 
                            </span>

                            {/* //! remove sp when a letter */}
                            <span style={{color:'#11324D'}}>
                                Monthly Installment &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1',fontSize:'15px'}}>{props.monthly} s.p</span> 
                            </span>

                            <div style={{visibility: repeaternote}}>
                                {props.message?<span style={{color:'green'}}>Paid this month</span>:<span style={{color:'red'}}>No payment yet this month</span>}
                            </div>
                    </div>
                
                :<div style={{height:'100%',display:'flex',flexDirection:'column',lineHeight:'63.5px'}}>

                            <span style={{color:'#11324D'}}>
                                Payment Name &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.name}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Type &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.type}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Price &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.value} s.p</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Expiry Date &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.date}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Repeater &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.repeater?'Yes':'No'}</span> 
                            </span>

                </div>
            }
            

            <div style={{marginBlock:'10px',marginInline:'auto'}}>
                <button type='button' className='btn-insert' style={{width:'100px',marginRight:'25px',borderRadius:'10px'}} onClick={Delete}> Delete</button>
                <button type='button' className='btn-insert' style={{width:'100px',borderRadius:'10px'}}> Update</button>
            </div>


            {
                props.repeater?
                <>
                     <div style={{marginBlock:'10px',marginInline:'auto'}}>
                        <button type='button' className='btn-insert' style={{width:'100px',marginRight:'25px',fontSize:'11px',borderRadius:'10px'}} onClick={monthlyPayment}> Monthly Payment</button>
                        <button type='button' className='btn-insert' style={{width:'100px',fontSize:'11px',borderRadius:'10px'}} on onClick={addPremiums}> Add premiums</button>
                    </div>
                </>:
                <>
                     <button  type='button' className='btn-insert' style={{width:'100px',justifyContent:'center',marginBlock:'10px',marginInline:'auto',borderRadius:'10px'}}>Pay Now</button>
                </>
            }

        </div>
    );
}

export default RequiredPaymentCard;