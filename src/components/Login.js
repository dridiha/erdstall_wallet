import React, {useState} from 'react';
import {Button, Form, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './Logo.js';
import Contact from './Contact.js';


export default function Login(){
    const [passPhrase, setPassPhrase] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [nextButton, setNextButton] = useState(false);
    let navigate = useNavigate();

    const flex = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    return(
        

    
        <div className='m-5 ms-5 w-50' style={flex}>
        

            
            <Logo />
            <Row className='mt-3 w-50 shadow-lg'>
                <Button variant='primary'
                    onClick={(e) => {
                        navigate('/createwallet');
                    }}
                 >
                    Create Wallet</Button>
            </Row>
            <Row className='mt-3 w-75 shadow-lg'>
                <Button variant='secondary'
                    onClick={(e) => {
                        setDisabled((disabled^true) === 1)
                    }}
                >Import Wallet</Button>
            </Row>

            {(disabled) && <div className='w-75'>
                <Row>
                    <Form className='mt-3'>
                        <Form.Group>
                            <Form.Control className='shadow-lg' type='text' placeholder='passphrase'
                            onChange={(e) => {
                                setPassPhrase(e.target.value);
                                if (e.value !== ""){
                                    setNextButton(true);
                                }
                                
                                
                            }}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    
                </Row>
                <Row className='mt-3 ms-0 me-0 shadow-lg'> 
                    <Button variant='primary' disabled={!nextButton}>Next</Button>
                </Row>
            </div>}
            <div className='mt-5'>
                <Contact />
            </div>
           
           
            
            
            
            

        </div>
    )
}
