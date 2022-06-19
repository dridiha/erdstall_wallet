import React, {useEffect, useRef, useState} from "react";
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { flex } from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Alert, FormControl } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Session } from "@polycrypt/erdstall/session";
import { Address } from  "@polycrypt/erdstall/address";
import { Assets } from "@polycrypt/erdstall/assets";
import { PERUN_TOKEN, ETHER } from "./Home.js";
import { Amount } from "@polycrypt/erdstall/amount";



export default function Description(){
    
    

    

    const [alert, setAlert] = useState(false);
    const pass = useRef(); 
    
    const tokens = {
        'PRN': PERUN_TOKEN,
        'ETH': ETHER
    };
    let location = useLocation();
    let storage = localStorage;
    let navigate = useNavigate();
    console.log("ok...");

    const keys = JSON.parse(storage.getItem('erdstall'));

    const ethRpcUrl = "ws://10.100.81.101:30313";
    const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
    const wallet = ethers.Wallet.fromMnemonic(keys["mnemonic"])
               .connect(ethProvider);
    
    
   const password = keys["password"];
    

    async function confirmTransaction() {
        console.log("test")
        if (pass.current !== password){
            setAlert(true);
        }
        else {
            setAlert(false);
            const address = Address.fromString(wallet.address);
            console.log("Address", address);
            const session = new Session(address, wallet, new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
            console.log("session created");
            await session.initialize();
            console.log("initialized");
            
            const asset = new Assets(
                    {
                        token: tokens[location.state.token],
                        asset: new Amount(location.state.amount)
                    }
            );
            const destAddress = Address.fromString(location.state.destinationAddress);
            let time = new Date().toLocaleString();
            await session.transferTo(asset, destAddress).then(res => {
                res.accepted.then(value => {
                    window.alert("Transaction successful !")
                    const hash = value.hash;
                    
                    const transaction = {
                        'hash': hash,
                        'destination address': location.state.destinationAddress,
                        'amount': `${location.state.amount} ${location.state.token}`,
                        'time': time
                    }
                    let transactions = JSON.parse(storage.getItem('transactions'));
                    
                    
                    transactions.push(transaction);
                    storage.setItem('transactions', JSON.stringify(transactions));
                    
                    console.log("accepted");
                    console.log(value);
                })
            }).catch(err => {
                console.log("Error in transaction");
            })
        } 

    }
    return(
        <div style={flex}>
            <Logo />
            {alert && <div>
                <Alert variant='danger'>Password is incorrect !</Alert>
            </div>}
            <div className="border border-dark rounded shadow-lg">
                <Row className='p-2 m-2'>
                    <b>Your Transaction </b>
                </Row>
                <Row className='p-2 m-2'>
                    <Col className="w-25">
                        Source Address:
                    </Col>
                    <Col className="w-75">
                        {wallet.address}
                    </Col>
                </Row>
                <Row className='p-2 m-2'>
                    <Col className="w-25">
                            Destination Address:
                    </Col>
                    <Col className="w-75">
                        {location.state.destinationAddress}
                    </Col>

                </Row>
                <Row className="p-2 m-2">
                    <Col className="w-25">
                            Amount:
                    </Col>
                    <Col className="w-75">
                        {location.state.amount} {location.state.token}
                    </Col>
                </Row>
            </div>
            <div className='mt-5'>
                <Form>
                    <Form.Group>
                        <FormControl
                            placeholder="password"
                            type='password'
                            onChange={(e) => {
                                pass.current = e.target.value;
                            }}
                        >

                        </FormControl>
                        
                        <Button 
                    variant='primary'
                    className='w-100 mt-5 mb-5 shadow-lg'
                    onClick={confirmTransaction}
                >CONFIRM</Button>
                    </Form.Group>
                </Form>
                
            </div>
                
            
            <Contact />
        </div>
    )
}