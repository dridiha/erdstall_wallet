import React, {useState} from "react";
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { flex } from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { session } from "./Home.js";
import { ethers } from "ethers";

let storage = localStorage;
const keys = JSON.parse(storage.getItem('erdstall'));
const wallet = ethers.Wallet.fromMnemonic(keys['mnemonic']);
const password = keys['password'];

export default function Description(){
    const [pass, setPass] = useState('');
    const location = useLocation();
    const [alert, setAlert] = useState(false);
    const confirmTransaction = () => {
        if (pass !== password){
            setAlert(true);
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
                        {location.state.amount} ETH
                    </Col>
                </Row>
            </div>
            <div className='mt-5'>
                <Form>
                    <Form.Control
                    className='shadow-lg'
                    placeholder='password'
                    type='password'
                    onChange={(e) => {
                        setPass(e.target.value);
                    }}
                    >
                        
                    </Form.Control>
                </Form>
                <Button 
                    variant='primary'
                    className='w-100 mt-5 mb-5 shadow-lg'
                    onClick={confirmTransaction}
                >CONFIRM</Button>
            </div>
                
            
            <Contact />
        </div>
    )
}