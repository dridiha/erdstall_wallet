import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Routing() {
    let navigate = useNavigate();
    let storage = localStorage;
    useEffect(() => {
        const keys = JSON.parse(storage.getItem('erdstall'));
        if (keys === null){
            navigate("/");
        }
        else {
            navigate("/home");
        }
    }, [])
    
    
    return (
        <div></div>
    )
}