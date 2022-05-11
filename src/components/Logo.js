import React from "react";
import { Row , Image} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Logo() {
    return(
        <Row className='mb-5'>
            <Image src='https://polycry.pt/wp-content/uploads/2022/02/Screenshot-2022-01-24-131338.png' alt='Erdstall'
                className='w-100 '
            >

            </Image>
        </Row>
    )
}