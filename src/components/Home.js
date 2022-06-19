import React, {useEffect, useState} from "react";
import Logo from "./Logo.js";
import { ethers, utils } from "ethers";
import Contact from "./Contact.js";
import { Row, Col, Button , Toast} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCopy, FaFileExport} from "react-icons/fa/index.esm.js";
import {BsDot} from "react-icons/bs/index.esm.js"
import exportFromJSON from "export-from-json";
import { Session } from "@polycrypt/erdstall/session";
import { Address } from  "@polycrypt/erdstall/address";
import { flex } from "./Login.js";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc/index.esm.js"




export const PERUN_TOKEN = "0xefe8ef63995fb083502c6b2bd01871e084c8ab82";
export const ETHER = "0x0000000000000000000000000000000000000000"


export default function Home(){
    
    let navigate = useNavigate();
    let storage = localStorage;
    const [balance, setBalance] = useState('');
    const [prn, setPrn] = useState('');
    const [ether, setEther] = useState('');
    const [token, setToken] = useState('PRN');

    const keys = JSON.parse(storage.getItem('erdstall'));

    const ethRpcUrl = "ws://10.100.81.101:30313";
    const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
    const wallet = ethers.Wallet.fromMnemonic(keys["mnemonic"])
               .connect(ethProvider);
    const className = "border-bottom border-primary";
    const [borderEther, setBorderEther] = useState("");
    const [borderPrn, setBorderPrn] = useState(className);
    
    
    useEffect(() => {
        async function getBalance(){
            const address = Address.fromString(wallet.address);
            console.log("Address", address);
            const session = new Session(address, wallet, new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
            console.log("session created");
            await session.initialize();
            console.log("initialized");
            await session.onboard();
            console.log("onboarded");
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

            
        }
        getBalance();
        
        
        
    },[])
    
       
    

    const publicKey = wallet.address.substring(0,15) + "........" + wallet.address.substring(wallet.address.length- 10, wallet.address.length);
    return(
        <div style={flex}>
            <Logo menu={true}/>
            <div className="rounded mt-0 shadow-lg" style={{backgroundColor:"#c1cdcd"}}>
                <Row className="ms-5 rounded">
                    <Col className='mb-2 mt-3 ms-3 me-5 p-'>
                        <BsDot color={'green'} size={30} />
                        <b>Connected to Erdstall Network</b></Col>
                </Row>
                <Row>
                    <Col>
                        <VscAccount className="mt-3 ms-4" size={30}>

                        </VscAccount>
                    </Col>
                    <Col className='ms-1 p-3 border-bottom border-dark'>    
                        <p className="text-muted">{publicKey}</p>
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
            </div>
            
            <div className="w-25">
                <Row className="mt-5 ms-2">
                    <Col>
                        Assets
                    </Col>
                    <Col
                        className={borderPrn}  
                        onClick={() => {
                            setBalance(prn);
                            setToken("PRN");
                            setBorderPrn(className);
                            setBorderEther("")
                            
                        }} 
                        style={{cursor: 'pointer', marginLeft: '7%'}}>
                        Perun Tokens
                    </Col>
                    
                    <Col
                        className={borderEther}
                        onClick={() => {
                            setBalance(ether);
                            setToken("ETH")
                            setBorderPrn("");
                            setBorderEther(className);
                        }} 
                        style={{cursor: 'pointer', marginLeft:'10%'}}>
                        Ether
                    </Col>
                    
                </Row>
                <Row className='mt-5
                 bg-primary rounded shadow-lg p-3'>
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
                                navigate('/trasaction');
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