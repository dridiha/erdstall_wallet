import React from "react";
import { ethers } from "ethers";
import { Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { useNavigate } from "react-router-dom";
import Dexie from "dexie";

export const wallet = ethers.Wallet.createRandom();

export default function CreateWallet() {
   
    const mnemonic = wallet.mnemonic.phrase;
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey;

    let navigate = useNavigate();

    // const db = new Dexie("Erdstall")
    // db.version(1).stores({
    //     items:"passphrase, privateKey, publicKey"
    // })
    
    // db.items.put({
    //     passphrase: mnemonic,
    //     privateKey: privateKey,
    //     publicKey: publicKey
    // });



    // var pass = db.items.where('id').equals(mnemonic).toArray();
    // console.log(pass);
    
    
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
                    
                    <p className='border border-info rounded-pill p-0 ms-3 shadow-lg'
                        style={{fontSize: '18px'}}
                    >{mnemonic}</p>
                    
                </Row>
                <Row>
                    <p>Please keep your mnemonic safe and do not communicate it to anyone ! </p>
                </Row>
                <Button className='mt-3 w-50 shadow-lg' variant='primary'
                    onClick={() => {
                        navigate('/home');
                    }}
                >
                    NEXT
                </Button>
                
            
                <div className='mt-5'>
                    <Contact />
                </div>
        </div>
    )
}