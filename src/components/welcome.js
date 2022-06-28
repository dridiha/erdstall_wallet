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

    const [displayed, setDisplayed] = useState(false);
    const [pass, setPass] = useState("");
    useEffect(() => {
        const keys = JSON.parse(storage.getItem("erdstall"));
        console.log(keys);
        if (keys === null){
            navigate('/login');
            
        }else {
            setPass(keys["password"]);
        }
        const time = storage.getItem('loggedIn');
        console.log(time);
        if ((new Date().getTime() - time) > 30*60*1000 && time !== null){
            console.log("okay")
            navigate("/home")
        } else {
            storage.removeItem("loggedIn");
        }
    })
    const checkPassword = () => {
        
        
        if (password.current !== pass){
            setDisplayed(true);
        } else {
            setDisplayed(false);
            storage.setItem('loggedIn', new Date().getTime());
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
                >UNLOCK</Button>
            </Form>
            <div className='mt-5'>
                    <Contact />
            </div>
        </div>
    )
}