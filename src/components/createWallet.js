import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import { Row, Button, Form, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { useNavigate } from "react-router-dom";

const mnemonicToArray = (str) => {
    let arr = []
    let j = 0
    for (let i =0; i < str.length; i++){
        if (str[i] === ' '){
            arr.push(<p className='bg-primary p-1 text-white'>str.substring(j, i + 1) </p>);
            j = i + 1;
        }

    }
    console.log(arr);
    return arr;

}


export default function CreateWallet() {
   
    const [displayed, setDisplayed] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [arr, setArr] = useState([]);
    const [keys, setKeys] = useState( {
        'password': '',
        'mnemonic': '',
        'accounts': [],
        'isLogged': false,
        'numberOfAccounts': 0
    })
   let navigate = useNavigate();
   let storage = localStorage
    
    
    const flex = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

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
                                setKeys({
                                    ...keys,
                                    'password': e.target.value,
                                });
                            }}
                            >

                            </FormControl>
                            <FormControl
                                placeholder="Repeat Password "
                                className="shadow-lg mt-3 mb-3 w-100"
                                type='password'
                                onChange={(e) => {
                                    if (e.target.value === keys['password'] && keys['password '] !==  ''){       
                                        setDisabled(false);
                                    }
                                }}
                            >

                            </FormControl>
                    </Form.Group>
                   
                </Form> }
                
                { !displayed && <div className="w-25 border border-light rounded shadow-lg" style={{backgroundColor: '#dcd4af'}}>

                    <p className='m-3'>Here is your mnemonic:</p>
                    
                    <Row>
                        
                        <p className='border border-info rounded-pill p-3 ms-5  w-75'
                            style={{fontSize: '18px'}}
                        >{keys['mnemonic']}</p>
                        
                        
                       
                        
                    </Row>
                    <Row>
                        <p className='m-3'>Please keep your mnemonic safe  ! </p>
                    </Row>
                </div> }
                <Row className='w-25'>
                     <Button className='mt-3  shadow-lg' variant='primary' disabled={disabled}
                         onClick={() => {
                             if (!displayed){
                                 setKeys({
                                     ...keys,
                                     'isLogged ': true                         
                                  });
                                 storage.setItem('erdstall' ,JSON.stringify(keys));
                                 navigate('/home');
                             } else {
                                 const wallet = ethers.Wallet.createRandom();
                                     setKeys({
                                         ...keys,
                                         'mnemonic': wallet.mnemonic.phrase,
                                         'accounts': keys['accounts'].push(wallet.privateKey),
                                         'numberOfAccounts': keys['numberOfAccounts'] + 1
                                     });
                                setArr(wallet.mnemonic.phrase);
                                 setDisplayed(false);
                             }

                         }}
                     >
                         NEXT
                     </Button>
                </Row>
               
                
            
                <div className='mt-5'>
                    <Contact />
                </div>
        </div>
    )
}