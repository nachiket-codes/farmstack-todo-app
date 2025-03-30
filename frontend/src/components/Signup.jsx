import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../apiClient";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            setError("Please fill in all fields");
            setLoading(false);
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return
        }
        if (!email.includes("@")) {
            setError("Please enter a vaild email")
            setLoading(false);
            return
        }

        try {
            const response = await apiClient.post('/users/add', 
                {
                    "username": username,
                    "email": email,
                    "password": password
                }
            )
            console.log(response.data)
            nav('/login')
        }
        catch (error) {
            if (error.response) {
                // Server responded with a status code outside 2xx range
                console.error("Error Response Data:", error.response.data);
                console.error("Error Status Code:", error.response.status);
                console.error("Error Headers:", error.response.headers);
                setError(`${error.response.data.detail || "Something went wrong"}`);
                
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
                setError("Network error. Please try again.");
            } else {
                // Other errors (unexpected)
                console.error("Unexpected Error:", error.message);
                setError("Something went wrong. Please try again.");
            }
        }
        setLoading(false)
    }

    return (
        <div className="h-screen w-full bg-violet-900 flex justify-center items-center">
            <div className="form-container w-full sm:w-[70%] text-white p-4">
                <h1 className="text-4xl font-bold text-center mt-3">
                    Sign Up
                </h1>
                <form action="" className="mt-10 p-4 w-full flex flex-col gap-4" onSubmit={handleSignup}>
                    <input type="text" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} className="border border-white bg-violet-900 w-full h-14 p-2 outline-none focus:bg-violet-600 text-xl" />
                    <input type="text" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="border border-white bg-violet-900 w-full h-14 p-2 outline-none focus:bg-violet-600 text-xl" />
                    <input type="password" placeholder="Enter a new password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="border border-white bg-violet-900 w-full h-14 p-2 outline-none focus:bg-violet-600 text-xl appearance-none" />
                    <input type="password" placeholder="Re-enter the password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  className="border border-white bg-violet-900 w-full h-14 p-2 outline-none focus:bg-violet-600 text-xl appearance-none" />
                    {
                        error && <p className="text-red-500 text-lg text-center font-semibold">{error}</p>
                    }
                    <button className="text-white mt-4 font-bold text-2xl p-3 bg-violet-700 hover:text-black hover:bg-violet-400 transition duration-300 ease-in-out">
                        { loading ? 'Signing up...' : 'Sign up'}
                    </button>
                    <p className="text-xl text-center">Already a member? <Link to="/login" className="cursor-pointer text-yellow-500 hover:text-yellow-400"> Login </Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup;