import {useNavigate} from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }
    return(
        <><button onClick={handleLogin}>Đăng nhập</button>
        </>
    )
}