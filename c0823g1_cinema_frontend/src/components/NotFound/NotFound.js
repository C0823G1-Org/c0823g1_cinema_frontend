import {useNavigate} from "react-router-dom";

export function NotFound(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/home");
    }
    return <>
        <div>
            <h1 style={{ textAlign: 'center' }}>Whoops</h1>
            <h3>404 Page Not Found</h3>
            <h3>We can't find the page you're looking for, but meet one of our Meo-chan instead!</h3>
            <img src="meo-chan.png" alt="Meo-chan" />
            <p><b>Meo-chan</b> a team member's furry friend</p>
            <button className="button-38" onClick={handleClick}>Trang chủ</button>
        </div>
    </>
}