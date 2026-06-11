import {Link} from "react-router-dom";

function LandingPage(){
    return (
        <div>
            <h1>Welcome to My platform</h1>
            <Link to='/login'>
                <button>Login</button>
            </Link>

            <Link to='/register'>
                <button>Register</button>
            </Link>
        </div>
    );
}

export default LandingPage;