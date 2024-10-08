import React, {useEffect, useState} from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {


    const [inputs, setInput] = useState({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate();


    const handleValidate = (values) => {
        var errors = {};
        
        if (!values.email.trim()) {
          errors.email = 'Enter a valid email';
        } else if (!/\S+@\S+\.\S+/.test(values.email.trim())) {
          errors.email = 'Invalid email format';
        }
        if (!values.password.trim()) {
          errors.password = 'Enter password';
        }

        return errors;
      };

    
    const handleSubmitForm = async (event) => {
        event.preventDefault();
        console.log(inputs);
    
        const errors = handleValidate(inputs);
        setFormErrors(errors);
    
        if (Object.keys(errors).length === 0) {
            try {
                const res = await axios.post('https://backendflavorfeed.onrender.com/user/login', inputs);
                console.log("response", res);
                sessionStorage.setItem('role', res.data.data.role);
                sessionStorage.setItem('userId', res.data.data._id);
                sessionStorage.setItem('email', res.data.data.email);
    
                toast.success(res.data.message);
    
                setTimeout(() => {
                    navigate('/');
                }, 3000);

            } catch (error) {
                if (!error.response || !error.response.data || !error.response.data.message) {
                    toast.error('An unexpected error occurred');
                } else {
                    toast.error(error.response.data.message);
                }
            }
        } else {
            console.log('Form validation errors:', errors);
        }
    };
    
    
    
    const inputChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInput({ ...inputs, [name]: value })
    }

    return (
        <>
            <div>
                <section className="h-screen bg-Homewall bg-cover font-[Poppins] md:bg-top bg-center">
                    <Toaster />

                    <div className="flex flex-col justify-center text-center items-center h-3/4">
                        <div className="SigninMain">

                            <div className="signinContainer  max-w-md  flex flex-col   p-4  text-black bg-white">
                                <div className="text-2xl font-bold  mb-2 text-[#7747ff] text-center">Log In</div>

                                <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
                                <form className="flex flex-col gap-3">
                                    <div className="block ">
                                        <span style={{ color: 'red' }}>{formErrors.email}</span>
                                        <input type="text" id="email" name='email'  placeholder='Email' onChange={inputChange} onClick={() => { setFormErrors({ ...formErrors, email: '' }) }}  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />
                                    </div>
                                    <div className="block ">
                                        <span style={{ color: 'red' }}>{formErrors.password}</span>
                                        <input type="text" id="password" name='password' autoComplete='off' placeholder='Password' onChange={inputChange} onClick={() => { setFormErrors({ ...formErrors, password: '' }) }}  className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
                                    </div>
                                    <div>
                                        <Link to={'/resetpassword'}><span className="text-sm text-[#7747ff]" >Forgot your password? </span></Link>    
                                    </div>
                                    <button type="submit" onClick={(event)=>handleSubmitForm(event)} className="loginBtn bg-[#7747ff] w-max m-auto px-6 py-2  text-white text-sm font-normal">Login</button>
                                </form>
                                <div className="text-sm text-center mt-[1.6rem]">Don’t you have an account yet? <Link to={'/signup'}><span className="text-sm text-[#7747ff]">Sign up for free! </span> </Link></div>
                            </div>
                        </div>



                    </div>
                </section>
                <Footer />
            </div>




        </>

    )
}

export default Login
