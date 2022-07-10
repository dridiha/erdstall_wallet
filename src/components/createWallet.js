import React, {useState, useRef} from "react";
import { ethers } from "ethers";
import { Row, Col,  Button, Form, FormControl} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { useNavigate } from "react-router-dom";
import { flex } from "./Login.js";

const mnemonicToArray = (str) => {
    let arr = [];
    let j = 0;
    let i;
    let counter = 1;
    let tmp = [];
    for ( i = 0; i < str.length; i++){
        if (str[i] === ' '){
            tmp.push(<Col className='p-1 text-white ps-3 m-2 rounded-pill' key={Math.floor(Math.random() * 10000)} style={{backgroundColor: "#88B04B"}}>{str.substring(j, i + 1)} </Col>);
            j = i + 1;
             if (counter % 4 === 0) {
                arr.push(<Row className='ms-1' key={Math.floor(Math.random() * 10000)} style={{display:'flex', flexDirection: 'row', justifyContent:'center'}}>{tmp}</Row>);
                tmp = [];
                
             }
             counter++;
        }
        
    }
    tmp.push(<Col className='p-1 ps-3 m-2 text-white rounded-pill' key={Math.floor(Math.random() * 10000)} style={{backgroundColor: "#88B04B"}}>{str.substring(j, i + 1)} </Col>);
    arr.push(<Row className='ms-1' key={Math.floor(Math.random() * 10000)} style={{display:'flex', flexDirection: 'row', justifyContent:'center'}}>{tmp}</Row>);
    return arr;

}


export default function CreateWallet() {
   
    const [displayed, setDisplayed] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const repPassword = useRef('');
    const password = useRef("");
    const wallet = useRef({});
    const [arr, setArr] = useState([]);
    
    const transactions = [] 
    let navigate = useNavigate();
    let storage = localStorage;
   
 
   

    return(
        
            <div style={flex}>
                <Logo />
                { displayed && <Form>
                    <Form.Group>
                        
                        <FormControl
                            className="shadow-lg mt-3 w-100"
                            placeholder='Enter Password'
                            type='password'
                            onChange={(e) => {
                                password.current = e.target.value;
                                if (e.target.value === repPassword.current && repPassword.current !==  ''){       
                                    setDisabled(false);
                                } else {
                                    setDisabled(true);
                                }

                            }}
                            >

                            </FormControl>
                            <FormControl
                                placeholder="Repeat Password "
                                className="shadow-lg mt-3 mb-3 w-100"
                                type='password'
                                onChange={(e) => {
                                    repPassword.current = e.target.value;
                                    if (e.target.value === password.current && password.current !==  ''){       
                                        setDisabled(false);
                                    } else {
                                        setDisabled(true);
                                    }
                                }}
                            >

                            </FormControl>
                    </Form.Group>
                   
                </Form> }
                
                { !displayed && <div className="w-100 border border-light rounded shadow-lg" style={{backgroundColor: '#eae8e8'}}>

                    <p className='m-3'><i>Here is your mnemonic:</i></p>
                    
                   
                        
                        
                        <Row>
                            {mnemonicToArray(wallet.current.mnemonic.phrase)}
                        </Row>
                        
                        
                       
                        
                    
                    <Row>
                        <p className='m-3'><i>Please keep your mnemonic safe  !</i> </p>
                    </Row>
                </div> }
                
                    <Button className='mt-5 w-50 shadow-lg' variant='primary' disabled={disabled}
                        onClick={() => {
                            if (!displayed){
                                storage.setItem('loggedIn', new Date().getTime());
                                storage.setItem('transactions', JSON.stringify(transactions))
                                const account = {
                                    'name': 'main',
                                    'privateKey': wallet.current.privateKey,
                                    'address': wallet.current.address 
                                }
                                const accounts = [];
                                accounts.push(account);
                                const json = {
                                    'password': password.current,
                                    'accounts': accounts,
                                    'active': account,
                                    'mnemonic': wallet.current.mnemonic.phrase,
                                    'init': false
                                    
                                }
                                storage.setItem('erdstall', JSON.stringify(json))
                                navigate('/home');
                            } else {
                                const tmp = ethers.Wallet.createRandom();
                                wallet.current = tmp;
                                setArr(wallet.current.mnemonic.phrase);
                                setDisplayed(false);
                            }

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