import React, {useState, useEffect} from "react";
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { flex } from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Transaction(props) {
    
    const [destinationAddress, setDestinationAddress] = useState('');
    const [amount, setAmount] = useState(0.0);
    const [token, setToken] = useState('PRN');
    let navigate = useNavigate();
    let storage = localStorage;
    useEffect(() => {
        storage.setItem('loggedIn', new Date().getTime());
    });
    return(
        <div style={flex}>
            <Logo goBack={true} redirect={"/home"}/>
            <Form className="ms-5">
                <Form.Group>
                    <Row className="w-100">

                    
                        <Form.Label className="">
                            <b>Destination Address</b>
                        </Form.Label>
                        <Form.Control
                        className="mt-2 shadow-lg"
                        placeholder="destination address"
                        onChange={(e) => {
                            setDestinationAddress(e.target.value);
                        }}
                        >
                        </Form.Control>
                        <Form.Label className="mt-2">
                            <b>Amount</b>
                        </Form.Label>
                    </Row>
                    <Row className="w-100">

                    
                        <Col className="p-0">
                            <Form.Control
                            className="mt-2 shadow-lg"
                            placeholder="ETH | PRN"
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                            >

                            </Form.Control>
                        </Col>
                        <Col xs={4} className='mt-2'>
                            <Form.Select defaultValue="PRN">
                                <option
                                    onChange={() => {
                                        setToken("PRN");
                                    }}
                                >PRN</option>
                                <option
                                    onChange={() => {
                                        setToken("ETH");
                                    }}
                                >
                                    ETH
                                </option>

                            </Form.Select>
                        </Col>
                    </Row>
                    
                </Form.Group>
                <Row className="w-100">
                    <Button 
                    className='mt-5 mb-5 shadow-lg'
                    variant='primary'
                    onClick={() => {
                        if (destinationAddress !== '' && amount !== null){
                            navigate('/description', {state:{'destinationAddress': destinationAddress, 'amount': amount, 'token': token}});
                        }
                    }}
                    >NEXT</Button>
                </Row>

                
            </Form>
            
            <div className='mt-5 ms-3'>
                    <Contact />
            </div>
        </div>
    )
}