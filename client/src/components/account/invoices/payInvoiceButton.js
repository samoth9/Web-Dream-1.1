import React from 'react';

const PayInvoiceButton = props => {
    return(
        <button onClick={props.payInvoice} className='block-btn small'>Pay Now</button>
    )
}

export default PayInvoiceButton;
