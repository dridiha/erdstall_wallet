import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Image, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsThreeDotsVertical} from "react-icons/bs/index.esm.js"
import exportFromJSON from "export-from-json";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { IoMdArrowBack } from "react-icons/io/index.esm.js"



const formatAddress = (str) => {
    const tmp = str.substring(0, 10) + "..." + str.substring(str.length - 8, str.length);
    return tmp;
}
export default function Logo(props) {
    let className = "mb-5 mt-2 w-100";
    let style = {
        backgroundColor: "transparent"
    };
    if (props.menu){
        className = "mb-3 mt-2 w-100";
        style = {
            backgroundColor: "#e0eeee"
        };
    };
    let navigate = useNavigate(); 
    let storage = localStorage;

    const displayAccounts = (accounts) => {
        const arr = []
        let counter = 0;
        accounts.forEach(element => {
            counter += 1;
            arr.push(<Dropdown.Item 
                    onClick={() => {
                        const keys = JSON.parse(storage.getItem('erdstall'));        
                        if (keys['active']['privateKey'] !== element['privateKey']) {
                            keys['active'] = element
                            storage.setItem('erdstall',JSON.stringify(keys));
                            navigate('/home', {state:{'reload': true}})
                        }
                        
                    }}
                    key={Math.floor(Math.random() * 1000)}>
                        {element['name']} <p className="text-muted" style={{fontSize:"13px"}}>{formatAddress(element['address'])}</p>
                    </Dropdown.Item>)
            if (counter < accounts.length){
                arr.push(<Dropdown.Divider />);
            }
        });
        return arr;
    }
    const buttonStyle = {
        background: 'none',
	    color: 'inherit',
	    border: 'none',
	    padding: '0',
	    font: 'inherit',
	    cursor: 'pointer',
	    outline: 'inherit'
    }
    
    return(
        <Row className={className} style={style}>
            {(props.goBack) &&
                <Col className='mt-4 ms-1'xs={2}>
                    <IoMdArrowBack 
                        className="border border-dark rounded-pill mt-1"
                        size={25}
                        color={'#0072B5'}
                        style={{cursor:'pointer'}}
                        onClick={() => {
                            navigate(props.redirect, {state:{'reload': true}});
                        }}
                    >

                    </IoMdArrowBack>
                </Col>
            }
            <Col className="ms-4" xs={8}>
                <Image src='https://polycry.pt/wp-content/uploads/2022/02/Screenshot-2022-01-24-131338.png' alt='Erdstall'
                    
                >
                </Image>
            </Col>
            
            {(props.menu) && 
                <Col className="mt-4" xs={2} >
                    <Dropdown>
                        <Dropdown.Toggle id="toogle" style={buttonStyle}>
                            <BsThreeDotsVertical
                                className='ms-5'
                                size={25}
                    
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item><b>Accounts</b></Dropdown.Item>
                            <Dropdown.Divider />
                            {displayAccounts(props.accounts)}
                            <Dropdown.Divider/>
                            <Dropdown.Item
                                onClick={() => {
                                    navigate("/addaccount");
                                }}
                            >
                                Add Account
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    
                                    confirmAlert({
                                
                                        message: 'Are you sure you want to export all of your keys ?',
                                        buttons: [
                                          {
                                            label: 'Yes',
                                            onClick: () => {
                                                const data = [
                                                    {"mnemonic":props.mnemonic},
                                                    props.accounts
                                                     
                                                ]
                                                const exportType = exportFromJSON.types.json;
                                                const fileName = "wallet_keys";
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
                            >
                                Export all Accounts
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                </Col>
                
            }
            
            

            
        </Row>
    )
}