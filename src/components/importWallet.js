import React, {useRef, useState} from "react";
import { ethers } from "ethers";
import { Row, Col,  Button, Form, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { useNavigate } from "react-router-dom";
import { flex } from "./Login.js";



export default function ImportWallet(){
    const passphrase = useRef('');
    const password = useRef('');
    const [disabled, setDisabled] = useState(true);
    
    let storage = localStorage;
    let navigate = useNavigate();
    return(
        <div style={flex}>
            <Logo />
            <Form>
                <Form.Group>
                   <Form.Control
                    className='mt-3 shadow-lg'
                    placeholder="passphrase"
                    onChange={(e) => {
                        passphrase.current = e.target.value;
                        
                    } }
                   >
                    </Form.Control> 
                    <Form.Control
                        className='mt-3 shadow-lg'
                        type='password'
                        placeholder="New Password"
                        onChange={(e) => {
                            password.current = e.target.value;
                            
                        } }
                    >
                    </Form.Control>
                    <Form.Control
                        className='mt-3 shadow-lg'
                        type='password'
                        placeholder="Repeat password"
                        onChange={(e) => {
                            if (e.target.value === password.current && password.current !== '' && passphrase.current !== ''){
                                setDisabled(false);
                                
                            }
                        }}
                    >

                    </Form.Control>
                    <Button variant="primary" disabled={disabled}
                        className='mt-5 mb-5 shadow-lg w-100'
                        onClick={() => {
                            try{
                                const wallet = ethers.Wallet.fromMnemonic(passphrase);
                                const account = {
                                    'name': 'main',
                                    'privateKey': wallet.privateKey,
                                    'address': wallet.address 
                                }
                                const accounts = [];
                                accounts.push(account);
                                const keys = {
                                    'password': password.current,
                                    'accounts': accounts,
                                    'active': account,
                                    'mnemonic': wallet.mnemonic.phrase
                                    
                                }
                                storage.setItem('erdstall' ,JSON.stringify(keys));
                                storage.setItem('loggedIn', new Date().getTime());
                                navigate('/home');
                            } catch(err){
                               console.log(err);
                            }
                            
                            
                        }}
                    >NEXT</Button>
                </Form.Group>
            </Form>

            <div className='mt-5 ms-3'>
                <Contact />
            </div>
        </div>
        

    )
}