
import { useState } from 'react';
import { signUp, confirmUser } from '../userAuth'
import { useNavigate } from "react-router-dom";


const PageSignup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verification, setVerification] = useState("")
    const [page, setPage] = useState("signup")

    const submitSignup = async event => {
        event.preventDefault()
        const result = await signUp(username, password, email)
        console.log(email)
        setPage("confirmEmail")
    }
    
    const submitConfirmEmail = async event => {
        event.preventDefault()
        const result = await confirmUser(username, verification)
        console.log("confirm")
        console.log(result)
        if (result == "SUCCESS") {
            navigate("/login");
        }
    }

    return (
        <main>
            <section>
                {page == "signup" &&
                    (<form className='form' onSubmit={submitSignup}>
                        <label htmlFor="username">Username</label>
                        <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Username"></input>
                        <label htmlFor="exampleInputEmail1">Email </label>
                        <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </form>)}
                {page == "confirmEmail" &&
                    (<form className='form' onSubmit={submitConfirmEmail}>
                        <label htmlFor="username">Username</label>
                        <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Username"></input>
                        <label >Verification Code </label>
                        <input onChange={e => setVerification(e.target.value)} type="text" className="form-control" placeholder="Verification Code"></input>
                        <button type="submit" className="btn btn-primary">Confirm</button>
                    </form>)}

            </section>
        </main>
    );
};

export default PageSignup;