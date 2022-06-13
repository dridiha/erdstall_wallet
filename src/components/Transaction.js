import React, {useState} from "react";
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { flex } from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Address } from  "@polycrypt/erdstall/address";

export default function Transaction(props) {
    
    const [destinationAddress, setDestinationAddress] = useState('');
    const [amount, setAmount] = useState(0.0);
    const [token, setToken] = useState('PRN');
    let navigate = useNavigate();
    return(
        <div style={flex}>
            <Logo />
            <Form className="w-25 ms-5">
                <Form.Group>
                    <Row>

                    
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
                        <Form.Label className="m-2">
                            <b>Amount</b>
                        </Form.Label>
                    </Row>
                    <Row>

                    
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
                        <Col xs={3} className='mt-2'>
                            <Form.Select defaultValue="PRN">
                                <option
                                    onChange={() => {
                                        setToken("PRN");
                                    }}
                                >PRN</option>
                                <option
                                    onChange={() => {
                                        setToken("PRN");
                                    }}
                                >
                                    ETH
                                </option>

                            </Form.Select>
                        </Col>
                    </Row>
                    
                </Form.Group>
                <Row>
                    <Button 
                    className='w-100 mt-5 mb-5 shadow-lg'
                    variant='primary'
                    onClick={() => {
                        if (destinationAddress !== '' && amount !== null){
                            navigate('/description', {state:{'destinationAddress': destinationAddress, 'amount': amount}});
                        }
                    }}
                    >NEXT</Button>
                </Row>

                
            </Form>
            
            <Contact />
        </div>
    )
}