
import { useState } from 'react';
import { login} from '../userAuth'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createUser} from '../features/user/userSlice';


const PageLogin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
   

    const submitLogin = async event => {
        event.preventDefault()
        try{
            const result = await login(username, password)
            navigate("/");
            console.log(result.accessToken.jwtToken)
            dispatch(createUser(result.accessToken.jwtToken));
        }catch{
            setError("Invalid username or password")
        }
       console.log(user)
      }

    return (
        <main>
            <section>
                <form className='form' onSubmit={submitLogin}>
                    <label htmlFor="username">Username</label>
                    <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Username"></input>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {error &&<p>{error}</p>}
            </section>
        </main>
    );
};

export default PageLogin;