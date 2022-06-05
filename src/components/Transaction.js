import React, {useState} from "react";
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { flex } from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Transaction() {
    const [destinationAddress, setDestinationAddress] = useState('');
    const [amount, setAmount] = useState(0.0);
    let navigate = useNavigate();
    return(
        <div style={flex}>
            <Logo />
            <Form>
                <Form.Group>
                    <Form.Label className="m-2">
                        <b>Destination Address</b>
                    </Form.Label>
                    <Form.Control
                    className="m-2 shadow-lg"
                    placeholder="destination address"
                    onChange={(e) => {
                        setDestinationAddress(e.target.value);
                    }}
                    >
                    </Form.Control>
                    <Form.Label className="m-2">
                        <b>Amount</b>
                    </Form.Label>
                    <Form.Control
                    className="m-2 shadow-lg"
                    placeholder="ETH"
                    onChange={(e) => {
                        setAmount(e.target.value);
                    }}
                    >

                    </Form.Control>
                </Form.Group>
                <Button 
                className='w-100 mt-5 mb-5 shadow-lg ms-2'
                variant='primary'
                onClick={() => {
                    if (destinationAddress !== '' && amount !== null){
                        navigate('/description', {state:{'destinationAddress': destinationAddress, 'amount': amount}});
                    }
                }}
            >NEXT</Button>
            </Form>
            
            <Contact />
        </div>
    )
}