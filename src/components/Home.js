import React, {useEffect, useState} from "react";
import Logo from "./Logo.js";
import { ethers, utils } from "ethers";
import Contact from "./Contact.js";
import { Row, Col, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCopy, FaFileExport} from "react-icons/fa/index.esm.js";
import {BsDot} from "react-icons/bs/index.esm.js"
import exportFromJSON from "export-from-json";
import { Session } from "@polycrypt/erdstall/session";
import { Address } from  "@polycrypt/erdstall/address";
import { flex } from "./Login.js";
import { useNavigate, useLocation } from "react-router-dom";
import { VscAccount } from "react-icons/vsc/index.esm.js"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'




export const PERUN_TOKEN = "0xc35a99b1b5b10000e1aaf8ca83873e81eec71d72";
export const ETHER = "0x0000000000000000000000000000000000000000"


export default function Home(){
    
    let navigate = useNavigate();
    let storage = localStorage;
    let location = useLocation();

    let reload = false;
    if (location.state !== null && location.state.reload){
        reload = true;
    }

  

    const [balance, setBalance] = useState('');
    const [prn, setPrn] = useState('');
    const [ether, setEther] = useState('');
    const [token, setToken] = useState('PRN');

    const keys = JSON.parse(storage.getItem('erdstall'));

    const ethRpcUrl = "ws://10.100.81.101:30313";
    const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
    const wallet = new ethers.Wallet(keys["active"]['privateKey'])
               .connect(ethProvider);
    const className = "border-bottom border-primary";
    const [borderEther, setBorderEther] = useState("");
    const [borderPrn, setBorderPrn] = useState(className);
    
    useEffect(() => {
        storage.setItem('loggedIn', new Date().getTime());
    });
    
    useEffect(() => {
        async function getBalance(){
            if (!keys['init'] || reload){

            
                const address = Address.fromString(wallet.address);
                console.log("Address", address);
                const session = new Session(address, wallet, new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
                await session.initialize();
                session.getAccount(address).then(res => {
                    try{
                        console.log(res);
                        let val = utils.formatEther(res.values.values.get(PERUN_TOKEN).value);
                        setPrn(val);
                        setBalance(val);
                    } catch(err){
                        setPrn("0.0");
                        setBalance("0.0"); 
                    }
                    
                    try {
                        let val = res.values.values.get(ETHER).value;
                        setEther(utils.formatEther(val));
                    } catch(Error){
                        
                        setEther("0.0");
                    }
                    
                }).catch(err => {
                    console.log(err);
                });
                if (!keys['init']){
                    keys['init'] = true;
                    storage.setItem('erdstall', JSON.stringify(keys));
                } else {
                    location.state.reload = false;
                }

            
            }
        }
        getBalance();
        
        
        
    },[wallet])
    
       
    

    const addr = wallet.address.substring(0,10) + "......" + wallet.address.substring(wallet.address.length- 10, wallet.address.length);
    return(
        <div style={flex}>
            <Logo menu={true} accounts={keys['accounts']} mnemonic={keys['mnemonic']}/>
            <div className="rounded mt-0 shadow-lg w-100" style={{backgroundColor:"#c1cdcd"}}>
                <Row className="ms-5 rounded">
                    <Col className='mb-2 mt-3 ms-3 me-5 p-'>
                        <BsDot color={'green'} size={30} />
                        <b>Connected to Erdstall Network</b></Col>
                </Row>
                <Row>
                    <Col>
                        <VscAccount className="mt-3 ms-3" size={30}>

                        </VscAccount>
                    </Col>
                    <Col className='ms-1 p-3 border-bottom border-dark'>    
                        <p className="text-muted">{addr}</p>
                    </Col>
                    <Col className="p-3 ms-2">
                    <abbr title='Copy'>
                        <FaCopy 
                            className='rounded-circle border border-dark p-1'
                            size={30}
                            
                            style={{cursor: 'pointer', color:"#FF6F61"}}
                            onClick={() => {
                                navigator.clipboard.writeText(wallet.address);
                                
                            }} 
                            />
                        </abbr> 
                    
                    </Col>
                    <Col className="p-3 ms-0">
                        <abbr title='export your key'>
                                    <FaFileExport size={30}
                                        className='rounded-circle border border-dark p-1'
                                        style={{cursor: 'pointer', color:"#FF6F61"}}
                                        onClick={() => {
                                            confirmAlert({
                                
                                                message: 'Are you sure you want to export this key ?',
                                                buttons: [
                                                  {
                                                    label: 'Yes',
                                                    onClick: () => {
                                                        const data = [{
                                                            address: wallet.address,
                                                            privateKey: wallet.privateKey
                                                        }];
                                                        const fileName = wallet.publicKey.substring(0, 15);
                                                        const exportType = exportFromJSON.types.json;
                                                        exportFromJSON({data, fileName, exportType});
                                                    }
                                                  },
                                                  {
                                                    label: 'No',
                                                    onClick: () => {}
                                                  }
                                                ],
                                                closeOnEscape: true,
                                                closeOnClickOutside: true,
                                              });
                                            
                                        }}
                                    />
                            </abbr>
                    </Col>
                </Row>
            </div>
            
            <div className="w-100">
                <Row className="mt-5 ms-2">
                    <Col>
                        Assets
                    </Col>
                    <Col
                        className={borderPrn}  
                        onClick={() => {
                            console.log("prn");
                            setToken('PRN');
                            setBalance(prn);
                            setBorderPrn(className);
                            setBorderEther("");
                            
                        }} 
                        style={{cursor: 'pointer', marginLeft: '7%'}}>
                        Perun Tokens
                    </Col>
                    
                    <Col
                        className={borderEther}
                        onClick={() => {
                            
                            console.log("ether");
                            setBalance(ether);
                            setToken("ETH")
                            setBorderPrn("");
                            setBorderEther(className);
                        }} 
                        style={{cursor: 'pointer', marginLeft:'10%'}}>
                        Ether
                    </Col>
                    
                </Row>
                <Row className='mt-5 bg-primary rounded shadow-lg p-3'>
                    <Col>
                        Balance:
                    </Col>
                    <Col>
                        {balance}
                    </Col>
                    <Col>
                        {token}
                    </Col>

                </Row>

            </div>
            
            <Row className='mt-5'>
                <Col>
                        <Button 
                            className="shadow-lg rounded-pill"
                            variant='light'
                            style={{backgroundColor:"#FF6F61"}}
                            onClick={() => {
                                navigate('/transaction');
                            }}
                        > TRANSFER</Button>
                </Col>
                <Col>
                        
                        <Button 
                            className="shadow-lg rounded-pill"
                            variant='light'
                            style={{backgroundColor:"#FF6F61"}}
                            onClick={() => {
                                navigate('/history');
                            }}
                        >
                        TRANSACTIONS</Button>
                </Col>
            </Row>
            <div className='mt-5'>
                    <Contact />
            </div>
            
        </div>
    )
}