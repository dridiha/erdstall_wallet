import React, {useState} from 'react';
import {Button, Form, Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './Logo.js';
import Contact from './Contact.js';

export const flex = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

export default function Login(){
    const [passPhrase, setPassPhrase] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [nextButton, setNextButton] = useState(false);
    let navigate = useNavigate();

    

    return(
        
        
    
        <div className='m-5 ms-5' style={flex}>

            <Logo />
            <Row className='mt-3 w-100 shadow-lg'>
                <Button className="p-3" variant='primary'
                    onClick={(e) => {
                        navigate('/createwallet');
                    }}
                 >
                    Create Wallet</Button>
            </Row>
            <Row className='mt-4 w-100 shadow-lg'>
                <Button className="p-3" variant='secondary'
                    onClick={(e) => {
                        navigate('/importwallet');
                    }}
                >Import Wallet</Button>
            </Row>

            
            <div className='mt-5 ms-3'>
                <Contact />
            </div>
           
           
            
            
            
            

        </div>
    )
}
