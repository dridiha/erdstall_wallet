import React, {useState, useRef} from "react";
import { ethers } from "ethers";
import { Row, Col,  Button, Form, FormControl, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "./Logo.js";
import Contact from "./Contact.js";
import { useNavigate } from "react-router-dom";
import { flex } from "./Login.js";


export default function AddAccount() {

    const name = useRef('');
    const privateKey = useRef('');
    const [alert, setAlert] = useState(false);
    const [text, setText] = useState('Private key is not correct !');
    let storage = localStorage;
    let navigate = useNavigate()
    
    const add = () => {
        
        if (name !== '' && privateKey.current !== '') {
            console.log("input validated");
            try {
                const keys = JSON.parse(storage.getItem('erdstall'));
                let isHere = false;
                for (const element of keys['accounts']){
                    if (element['privateKey'] === privateKey.current){
                        isHere = true;
                        break;
                    }
                };
               
                if (isHere){
                    setText("The private Key is already added to your wallet !")
                } else {
                    console.log("everything ok");
                    const wallet = new ethers.Wallet(privateKey.current);
                    console.log(wallet);
                    const account = {
                        'name' : name.current,
                        'privateKey': wallet.privateKey,
                        'address': wallet.address
                    }
                    keys['accounts'].push(account);
                    keys['active'] = account;
                    storage.setItem('erdstall', JSON.stringify(keys));
                    navigate('/home')
                }
                

            } catch (err) {
                setText('Private key might be not correct !')
            }
        } else {
            setAlert(true);
            setText("You must fill in the fields !")
        }
    }
    return (
        <div style={flex}>
            <Logo goBack={true}/>
            {alert &&
                <Alert variant="danger">{text}</Alert> 
            }
            <Form>
                <Form.Control
                    className="shadow-lg mb-3"
                    placeholder="Name"
                    onChange={(e) => {
                        name.current = e.target.value;
                    }}
                >

                </Form.Control>
                <Form.Control
                    className="shadow-lg mb-3"
                    placeholder="Private Key"
                    onChange={(e) => {
                        privateKey.current = e.target.value;
                    }}
                >

                </Form.Control>
                <Button
                    className="shadow-lg mb-3 mt-3 w-100"
                    variant="primary"
                    onClick={() => {
                        add();
                    }}

                >
                    CONFIRM</Button>
            </Form>

            <div className='mt-5'>
                    <Contact />
            </div>
            

        </div>
    )
}