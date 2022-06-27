import React from "react";
import { Row, Col, Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsThreeDotsVertical} from "react-icons/bs/index.esm.js"


export default function Logo(props) {
    let className = "mb-5 mt-2";
    let style = {
        backgroundColor: "transparent"
    };
    if (props.menu){
        className = "mb-3 mt-2";
        style = {
            backgroundColor: "#e0eeee"
        };
    }
    return(
        <Row className={className} style={style}>
            <Col className="ms-3">
                <Image src='https://polycry.pt/wp-content/uploads/2022/02/Screenshot-2022-01-24-131338.png' alt='Erdstall'
                    className='w-100 '
                >
                </Image>
            </Col>
            {(props.menu) && 
                <Col className="mt-4 ms-5" xs={3} >
                    <BsThreeDotsVertical
                    className='ms-5'
                    size={25}
                
                    />
                </Col>
                
            }
            

            
        </Row>
    )
}