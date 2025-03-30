import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import apiClient from '../apiClient';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (email === '' || password === '') {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }
        try {
            const response = await apiClient.post('/login', {
                email: email,
                password: password
            })
            console.log(response.data)
            localStorage.setItem('token', response.data.access_token)
            navigate('/');
        }
        catch (err) {
            if (err.response) {
                setError(err.response.data.detail || "Something went wrong");
            }
            else if (err.request) {
                setError("Network error! Please try again");
            }
            else {
                setError("Unknown error!")
            }
        }
        setLoading(false)

    }

  return (
    <div className="h-screen w-full bg-violet-900 flex justify-center items-center">
            <div className="form-container w-full sm:w-[70%] text-white p-4">
                <h1 className="text-4xl font-bold text-center mt-3">
                    Login
                </h1>
                <form action="" className="mt-10 p-4 w-full flex flex-col gap-4" onSubmit={handleLogin}>
                    <input type="text" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border border-white bg-violet-900 w-full h-14 p-2 outline-none focus:bg-violet-600 text-xl" />
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="border border-white bg-violet-900 w-full h-14 p-2 outline-none focus:bg-violet-600 text-xl appearance-none" />
                    {
                        error && <p className="text-red-500 text-lg text-center font-semibold">{error}</p>
                    }
                    <button className="text-white mt-4 font-bold text-2xl p-3 bg-violet-700 hover:text-black hover:bg-violet-400 transition duration-300 ease-in-out">
                        { loading ? "Logging in..." : "Login"}
                    </button>
                    <p className="text-xl text-center">Don't have an account? <Link to="/signup" className="cursor-pointer text-yellow-500 hover:text-yellow-400"> Register </Link></p>
                </form>
            </div>
        </div>
  )
}

export default Login