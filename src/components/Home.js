import React from "react";
import Logo from "./Logo.js";
import { ethers } from "ethers";
import Contact from "./Contact.js";
import { Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCopy, FaFileExport} from "react-icons/fa/index.esm.js";
import {BsDot, BsThreeDotsVertical} from "react-icons/bs/index.esm.js"



export default function Home(){
    let storage = localStorage;
   const keys = JSON.parse(storage.getItem('erdstall'));
   const wallet = ethers.Wallet.fromMnemonic(keys['mnemonic']);

    const flex = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const publicKey = wallet.publicKey.substring(0,20) + "................" + wallet.publicKey.substring(wallet.publicKey.length- 10, wallet.publicKey.length);
    return(
        <div style={flex}>
            <Logo />
            <BsThreeDotsVertical
                style={{position:'fixed', marginTop:'40px', right:'620px'}} 
                size={25}
            />
            <Row>
                <Col className='border border-info rounded-pill mb-5 me-5 p-'>
                    <BsDot color={'green'} size={30} />
                    Connected to Erdstall Network</Col>
            </Row>
            <Row>
                <Col className='border border-info rounded-pill shadow-lg p-3 ms-5 '>
                    {publicKey}
                </Col>
                <Col className="p-3 ms-2">
                   <abbr title='Copy'>
                    <FaCopy size={25}
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                                navigator.clipboard.writeText(wallet.publicKey);
                            }} 
                        />
                    </abbr> 
                   
                </Col>
                <Col className="p-3 ms-0">
                    <abbr title='export your key'>
                                <FaFileExport size={25}
                                    style={{cursor: 'pointer'}}
                                />
                        </abbr>
                </Col>
            </Row>
            
            <Row className='mt-5 bg-primary w-25 rounded-pill shadow-lg p-3'>
                <Col>
                    Balance:
                </Col>
                <Col>
                    Test
                </Col>

            </Row>
            <Row className='mt-4'>
                <Col>
                        <Button variant='secondary'> SEND</Button>
                </Col>
                <Col>
                        <Button variant='secondary'>TRANSACTIONS</Button>
                </Col>
            </Row>
            <div className='mt-5'>
                    <Contact />
            </div>
        </div>
    )
}