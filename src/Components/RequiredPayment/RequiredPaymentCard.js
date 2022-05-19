import React from 'react';
import $ from 'jquery';

function RequiredPaymentCard(props) {

    let monthly;
    let pay_now;

    let repeaternote;
    let MonthlyPayment;
    let monthlyPrice;
    let LHeight;
    let bgColor;

    if(props.repeater){

        repeaternote='visible';
        monthlyPrice='flex';

        if(props.paid){
            MonthlyPayment='yes';
        }
        else{
            MonthlyPayment='no';
        }

        monthly='flex';
        pay_now='none';
        LHeight='40px';
        bgColor='rgb(229 181 37 / 21%)';
    }
    else{

        repeaternote='hidden';
        monthlyPrice='none';
        monthly='none';
        pay_now='flex';
        LHeight='63.5px';
        bgColor='rgb(209 216 226 / 57%)';
    }

    

    
    

    return (
        <div style={{width:'260px',height:'fit-content',lineHeight:'40px',borderRadius:'20px',padding:'10px',backgroundColor:bgColor,marginBottom:'20px',marginRight:'15px',display:'flex',flexDirection:'column',boxShadow:'5px 5px 5px 5px rgba(0,0,0,0.25)'}}>
            
            <div style={{height:'100%',display:'flex',flexDirection:'column',lineHeight:LHeight}}>
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

            <div  style={{margin:'0px',padding:'0px',display:'flex',flexDirection:'column',lineHeight:'40px',display:monthlyPrice}}>

                <span style={{color:'#11324D'}}>
                    The Rest &nbsp;:&nbsp;&nbsp;
                    <span style={{color:'#6B7AA1'}}>{props.rest} s.p</span> 
                </span>

                <span style={{color:'#11324D'}}>
                    Paid So Far &nbsp;:&nbsp;&nbsp;
                    <span style={{color:'#6B7AA1'}}>{props.paid} s.p</span> 
                </span>

                <span style={{color:'#11324D'}}>
                    Monthly Installment &nbsp;:&nbsp;&nbsp;
                    <span style={{color:'#6B7AA1'}}>{props.monthly} s.p</span> 
                </span>

            </div>

            
            <div style={{visibility: repeaternote}}>
                {MonthlyPayment==='yes'?<span style={{color:'green'}}>Paid this month</span>:<span style={{color:'red'}}>No payment yet this month</span>}
            </div>

            

            <div style={{marginBlock:'10px',marginInline:'auto'}}>
                <button type='button' className='btn-insert' style={{width:'100px',marginRight:'25px',borderRadius:'10px'}}> Delete</button>
                <button type='button' className='btn-insert' style={{width:'100px',borderRadius:'10px'}}> Update</button>
            </div>
            <div style={{marginBlock:'10px',marginInline:'auto',display:monthly}}>
                <button type='button' className='btn-insert' style={{width:'100px',marginRight:'25px',fontSize:'11px',borderRadius:'10px'}}> Monthly Payment</button>
                <button type='button' className='btn-insert' style={{width:'100px',fontSize:'11px',borderRadius:'10px'}}> Add premiums</button>
            </div>
            <button  type='button' className='btn-insert' style={{width:'100px',justifyContent:'center',marginBlock:'10px',marginInline:'auto',borderRadius:'10px',display:pay_now}}>Pay Now</button>

  
        </div>
    );
}

export default RequiredPaymentCard;