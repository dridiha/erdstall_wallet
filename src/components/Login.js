import React, {useState} from 'react';
import {Button, Form, Image, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(){
    const [passPhrase, setPassPhrase] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [nextButton, setNextButton] = useState(false);
    

    const flex = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    return(
        <div className='m-5 ms-5' style={flex}>
            <Row className='mb-5'>
                <Image src='https://polycry.pt/wp-content/uploads/2022/02/Screenshot-2022-01-24-131338.png' alt='Erdstall'
                    className='w-100 '
                >

                </Image>
            </Row>
            
            <Row className='mt-3 w-75'>
                <Button variant='primary' >Create Wallet</Button>
            </Row>
            <Row className='mt-3 w-75'>
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
                            <Form.Control className='' type='text' placeholder='passphrase'
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
                <Row className='mt-3 ms-0 me-0'> 
                    <Button variant='primary' disabled={!nextButton}>Next</Button>
                </Row>
            </div>}
            

        </div>
    )
}
