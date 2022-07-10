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
    const [text, setText] = useState('');
    const [variant, setVariant] = useState('');
    const pass = useRef(); 
    
    const tokens = {
        'PRN': PERUN_TOKEN,
        'ETH': ETHER
    };
    let location = useLocation();
    let storage = localStorage;
    let navigate = useNavigate();
    

    const keys = JSON.parse(storage.getItem('erdstall'));
    const active = keys['active'];
    const ethRpcUrl = "ws://10.100.81.101:30313";
    const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
    const wallet = new ethers.Wallet(active['privateKey'])
               .connect(ethProvider);
    
    
   const password = keys["password"];
    
    useEffect(() => {
        storage.setItem('loggedIn', new Date().getTime());
    }); 
    async function confirmTransaction() {
    
        if (pass.current !== password){
            setText('Password is incorrect !')
            setVariant('danger')
            setAlert(true);
            
        }
        else {
            setAlert(false);
            const address = Address.fromString(wallet.address);
            
            const session = new Session(address, wallet, new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
            
            await session.initialize();
            
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
                    setText('Transaction successful, redirecting to home page ...')
                    setVariant('success')
                    setAlert(true);
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
                    
                    setTimeout(()=>{
                        navigate("/home");
                    }, 3000)
                })
            }).catch(err => {
                setText('Transaction failed ! retry later !')
                setVariant('danger')
                setAlert(true);
                setTimeout(()=>{
                    navigate("/home");
                }, 2);
            })
        } 

    }
    return(
        <div style={flex}>
            <Logo goBack={true} redirect={"/home"}/>
            {alert && <div>
                <Alert className='ps-2' variant={variant}>{text}</Alert>
            </div>}

            <div className="border border-dark rounded shadow-lg w-100 ms-2">
                <Row className='p-2 m-2'>
                    <b className="text-primary">Your Transaction </b>
                </Row>
                <Row className='p-2 m-2'>
                    <b><i className="text-success">Source Address:</i></b>
                </Row>
                <Row className="ms-4">
                    {wallet.address}
                </Row>
                <Row className='p-2 m-2'>    
                    <b><i className="text-success">Destination Address:</i></b>
                </Row>
                <Row className="ms-4">
                    {location.state.destinationAddress}
                </Row>
                <Row className="p-2 m-2">
                    <Col className="">
                    <b><i className="text-success">Amount:</i></b>
                    </Col>
                    <Col className="">
                        {location.state.amount} {location.state.token}
                    </Col>
                </Row>
            </div>
            <div className='mt-5 w-100'>
                <Form>
                    <Form.Group>
                        <FormControl
                            className="w-75  ms-5 shadow-lg"
                            placeholder="password"
                            type='password'
                            onChange={(e) => {
                                pass.current = e.target.value;
                            }}
                        >

                        </FormControl>
                        
                        <Button 
                    variant='primary'
                    className='w-75 mt-5 mb-5 ms-5 shadow-lg'
                    onClick={confirmTransaction}
                >CONFIRM</Button>
                    </Form.Group>
                </Form>
                
            </div>
                
            <div className="mt-3 ms-3">
                <Contact />
            </div>
            
        </div>
    )
}