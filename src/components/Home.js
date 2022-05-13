import React from "react";
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { wallet } from "./createWallet.js";


export default function Home(){
    const flex = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };
    const publicKey = wallet.publicKey.substring(0,15) + "...." + wallet.publicKey.substring(wallet.publicKey.length- 6, wallet.publicKey.length);
    return(
        <div style={flex}>
            <Logo />
            <Row className='border border-info rounded-pill shadow-lg p-3 '>
                {publicKey}
            </Row>
            <Row className='mt-5 bg-primary w-50 rounded-pill shadow-lg p-3'>
                <Col>
                    Balance:
                </Col>
                <Col>
                    Test
                </Col>

            </Row>
            <div className='mt-5'>
                    <Contact />
            </div>
        </div>
    )
}