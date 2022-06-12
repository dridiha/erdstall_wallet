import React, {useEffect, useState} from "react";
import Logo from "./Logo.js";
import { ethers, utils } from "ethers";
import Contact from "./Contact.js";
import { Row, Col, Button , Toast} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCopy, FaFileExport} from "react-icons/fa/index.esm.js";
import {BsDot, BsThreeDotsVertical} from "react-icons/bs/index.esm.js"
import exportFromJSON from "export-from-json";
import { Session } from "@polycrypt/erdstall/session";
import { Address } from  "@polycrypt/erdstall/address";
import { flex } from "./Login.js";
import { useNavigate } from "react-router-dom";


const PERUN_TOKEN = "0xefe8ef63995fb083502c6b2bd01871e084c8ab82";



export default function Home(){
    
    let navigate = useNavigate();
    let storage = localStorage;
    const [balance, setBalance] = useState('');

    const keys = JSON.parse(storage.getItem('erdstall'));

    const ethRpcUrl = "ws://10.100.81.101:30313";
    const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
    const wallet = ethers.Wallet.fromMnemonic(keys["mnemonic"])
               .connect(ethProvider);
    const address = Address.fromString(wallet.address);
    console.log("Address", address);
    const session = new Session(address, wallet, new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
    
    useEffect(() => {
        async function getBalance(){
            console.log("session created");
            await session.initialize();
            console.log("initialized");
            await session.onboard();
            console.log("onboarded");
            session.getAccount(address).then(res => {
                const val = res.values.values.get(PERUN_TOKEN).value;
                setBalance(utils.formatEther(val));
            }).catch(err => {
                console.log(err);
            })
        }
        getBalance();
        
        
    })
    
       
    

    const publicKey = wallet.address.substring(0,20) + "................" + wallet.address.substring(wallet.address.length- 10, wallet.address.length);
    return(
        <div style={flex}>
            <Logo />
            <div style={{position:'fixed', marginTop:'40px', right:'620px'}} >
                <BsThreeDotsVertical
                    size={25}
                    
                />
               <p>test</p>

            </div>
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
                                navigator.clipboard.writeText(wallet.address);
                            }} 
                        />
                    </abbr> 
                   
                </Col>
                <Col className="p-3 ms-0">
                    <abbr title='export your key'>
                                <FaFileExport size={25}
                                    style={{cursor: 'pointer'}}
                                    onClick={() => {
                                        const data = [{
                                            publicKey: wallet.publicKey,
                                            privateKey: wallet.privateKey
                                        }];
                                        const fileName = wallet.publicKey.substring(0, 15);
                                        const exportType = exportFromJSON.types.json;
                                        exportFromJSON({data, fileName, exportType});
                                    }}
                                />
                        </abbr>
                </Col>
            </Row>
            
            <Row className='mt-5 bg-primary w-25 rounded-pill shadow-lg p-3'>
                <Col>
                    Balance:
                </Col>
                <Col>
                    {balance}
                </Col>

            </Row>
            <Row className='mt-4'>
                <Col>
                        <Button 
                            variant='secondary'
                            onClick={() => {
                                navigate('/trasaction');
                            }}
                        > SEND</Button>
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