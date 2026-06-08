import react from 'react'
import "../auth.form.scss"
import {useNavigate,Link} from "react-router"


const Login = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
    }



    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}> 
                    <div className="input-group">
                        <lable htmlFor="email">Email</lable>
                        <input type="email" id="email" name="email" placeholder="Enter your email"/>
                    </div>
                    <div className="input-group">
                        <lable htmlFor="password">Password</lable>
                        <input type="password" id="password" name="password" placeholder="Enter your password"/>
                    </div>
                    <button className="button primary-button">Login</button>
                </form>
                <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
            </div>
        </main>
    )
}

export default Login