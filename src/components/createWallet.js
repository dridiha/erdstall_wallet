import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import { Row, Col,  Button, Form, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { useNavigate } from "react-router-dom";

const mnemonicToArray = (str) => {
    let arr = [];
    let j = 0;
    let i;
    let counter = 1;
    let tmp = [];
    for ( i = 0; i < str.length; i++){
        if (str[i] === ' '){
            tmp.push(<Col className='bg-primary p-1 text-white ps-3 m-2 rounded-pill' key={counter}>{str.substring(j, i + 1)} </Col>);
            j = i + 1;
             if (counter % 4 === 0) {
                arr.push(<Row className='ms-1' style={{display:'flex', flexDirection: 'row', justifyContent:'center'}}>{tmp}</Row>);
                tmp = [];
                
             }
             counter++;
        }
        
    }
    tmp.push(<Col className='bg-primary p-1 ps-3 m-2 text-white rounded-pill' key={counter}>{str.substring(j, i + 1)} </Col>);
    arr.push(<Row className='ms-1' style={{display:'flex', flexDirection: 'row', justifyContent:'center'}}>{tmp}</Row>);
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
                            {mnemonicToArray(keys['mnemonic'])}
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