import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import { Row, Col,  Button, Form, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { useNavigate } from "react-router-dom";
import { flex } from "./Login.js";



export default function ImportWallet(){
    const [passphrase, setPassPhrase] = useState('');
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [keys, setKeys] = useState( {
        'password': '',
        'mnemonic': '',
        'accounts': [],
        'isLogged': false,
        'numberOfAccounts': 0
    });
    let storage = localStorage;
    let session = sessionStorage;
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
                        setPassPhrase(e.target.value);
                        
                    } }
                   >
                    </Form.Control> 
                    <Form.Control
                        className='mt-3 shadow-lg'
                        type='password'
                        placeholder="New Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            
                        } }
                    >
                    </Form.Control>
                    <Form.Control
                        className='mt-3 shadow-lg'
                        type='password'
                        placeholder="Repeat password"
                        onChange={(e) => {
                            if (e.target.value === password && passphrase !== ''){
                                setDisabled(false);
                                setKeys({
                                    ...keys,
                                    'password':password,
                                    'mnemonic': passphrase
                                });
                            }
                        }}
                    >

                    </Form.Control>
                    <Button variant="primary" disabled={disabled}
                        className='mt-5 mb-5 shadow-lg w-100'
                        onClick={() => {
                            try{
                                const wallet = ethers.Wallet.fromMnemonic(passphrase);
                                console.log(passphrase);
                                console.log(password);
                                setKeys({
                                    ...keys,
                                    'accounts': keys['accounts'].push(wallet.privateKey),
                                    'numberOfAccounts': keys['numberOfAccounts'] + 1
                                });
                                storage.setItem('erdstall' ,JSON.stringify(keys));
                                session.setItem('erdstall', new Date().getTime());
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