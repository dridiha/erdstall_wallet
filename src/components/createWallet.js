import React from "react";
import { ethers } from "ethers";
import { Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo";
import Contact from "./Contact";

export default function CreateWallet() {
    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase;
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;
    
    const flex = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    return(
        
            <div style={flex}>
                <Logo />
                
                    <p>Here is your mnemonic:</p>
                
                <Row className="">
                    
                    <p className='border border-info rounded-pill p-0 ms-3 shadow-4-strong'
                        style={{fontSize: '18px'}}
                    >{mnemonic}</p>
                    
                </Row>
                <Row>
                    <p>Please keep your mnemonic safe and do not communicate it to anyone ! </p>
                </Row>
                
            
                <div className='mt-5'>
                    <Contact />
                </div>
        </div>
    )
}