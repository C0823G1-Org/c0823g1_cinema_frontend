import {useNavigate} from "react-router-dom";
import "./NotFound.css"
import {useEffect} from "react";

export function NotFound(){
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`home`)
    },[])
    return <>

    </>
}