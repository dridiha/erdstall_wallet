import React, {useEffect, useRef, useState} from "react";
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { flex } from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Alert, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Welcome(){
    const password = useRef("");
    let navigate = useNavigate();
    let storage = localStorage;
    let session = sessionStorage;
    const [displayed, setDisplayed] = useState(false);
    const [pass, setPass] = useState("");
    useEffect(() => {
        const keys = JSON.parse(storage.getItem("erdstall"));
        if (keys === null){
            navigate('/login');
        }else {
            setPass(keys["password"]);
        }
        const time = session.getItem('erdstall');
        if (new Date().getTime() - time < 30*60*1000){
            navigate("/home")
        } else {
            session.removeItem("erdstall")
        }
    })
    const checkPassword = () => {
        
        
        if (password.current !== pass){
            setDisplayed(true);
        } else {
            setDisplayed(false);
            session.setItem('erdstall', new Date().getTime());
            navigate("/home");
        }

        
    }
    return(
        <div style={flex}>
            <Logo />
            {displayed && 
                <Alert className="w-75 mb-4" variant="danger">Password is incorrect !</Alert>
            }
            <Form>
                <Form.Control
                    placeholder="password"
                    type="password"
                    className="ps-3 mb-3 shadow-lg"
                    onChange={(e) => {
                        password.current = e.target.value;
                    }}
                >

                </Form.Control>
                <Button 
                    variant="primary"
                    className="mt-4 w-100 shadow-lg"
                    onClick={checkPassword}
                >CONFIRM</Button>
            </Form>
            <div className='mt-5'>
                    <Contact />
            </div>
        </div>
    )
}