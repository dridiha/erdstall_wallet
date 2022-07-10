import React, {useEffect, useRef, useState} from "react";
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { flex } from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Alert, FormControl } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io/index.esm.js"
import { useNavigate } from "react-router-dom";


const showhistory = (transactions) => {
    let arr = []
    transactions.forEach(tx => {
        let tmp = []
        const destAdd = tx['destination address'].substring(0,10) + "......" + tx['destination address'].substring(tx['destination address'].length- 10, tx['destination address'].length);
        tmp.push(<Col xs={6} className='pt-2' key={Math.floor(Math.random() * 10000)}>{destAdd}</Col>)
        tmp.push(<Col xs={2} className='pt-2' key={Math.floor(Math.random() * 10000)}>{tx['amount']}</Col>)
        tmp.push(<Col xs={4} className='pt-2' key={Math.floor(Math.random() * 10000)}>{tx['time']}</Col>)
        arr.push(<Row className="border-top border-bottom border-dark shadow-lg mt-4 ms-2" key={Math.floor(Math.random() * 10000)}>{tmp}</Row>)
    });
    return arr;
}


export default function History() {
    
    let storage = localStorage;
    let transactions = JSON.parse(storage.getItem('transactions'));
    let navigate = useNavigate();

    useEffect(() => {
        storage.setItem('loggedIn', new Date().getTime());
    });

    return(
        <div style={flex}>
            <Row className="mb-4 mt-3 ms-2 w-100 pb-4 border-bottom border-dark">
                <Col xs={2}>
                    <IoMdArrowBack 
                        className="border border-dark rounded-pill mt-1"
                        size={25}
                        color={'#0072B5'}
                        style={{cursor:'pointer'}}
                        onClick={() => {
                            navigate('/home');
                        }}
                    >

                    </IoMdArrowBack>
                </Col>
                
            </Row>
            <Row className="w-100">
                <Col xs={6} className="">
                    <b><i>Destination Address</i></b>
                </Col>
                <Col xs={2} className="ms-1">
                    <b><i>Amount</i></b>
                    
                </Col>
                <Col xs={4} className="ms-4 w-25">
                    <b><i>Time</i></b>
                </Col>
            </Row>
            {showhistory(transactions)}
        </div>
    )
}