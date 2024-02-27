import {useNavigate} from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('')
    }
    return(
        <><button>Đăng nhập</button>
        </>
    )
}