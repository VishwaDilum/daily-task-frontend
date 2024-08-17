import * as React from 'react';
import { } from '../cascade/forgotpass.css'
import homeIcon from '../assets/home.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Send } from '@mui/icons-material';
function forgotpassword() {

    const [count, setCount] = useState<number>(10);
    const [isDisable, setDisable] = useState<boolean>(false);
    const [emailValue, setEmailValue] = useState<string>("");
    const [otpValue, setOtpValue] = useState<string>("");
    const [newPass, setNewPass] = useState<boolean>(true);
    const [newInputPass01, setNewPass01] = useState<string>("");
    const [newInputPass02, setNewPass02] = useState<string>("");
    const [showPassword, setShowPassword] = useState(true);
    const [typeOfInput, setTypeOfInput] = useState();
    const history = useNavigate();


    const handleSendOTP = async () => {
        if (emailValue === "" || emailValue === undefined || emailValue === null) {
            return;
        }
        setDisable(true);

        const response = await fetch('http://localhost:5000/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailValue })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Handle successful response
        } else {
            alert('Error sending OTP');
            setDisable(false); // Reset disable state if sending OTP fails
        }

    };

    function test() {
        history('/sign-in');
    }

    const confirmOtp = async () => {
        if (otpValue == "" || otpValue == undefined || otpValue == null) {
            return;
        }
        // setDisable(true)
        const response = await fetch('http://localhost:5000/confirm-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp: otpValue })  // Pass the email value
        });

        if (response.ok) {
            alert("Password Confirmed")
            setNewPass(false)

        } else {
            alert('Error sending OTP');
        }
    }

    useEffect(() => {
        if (isDisable) {
            const intervalId = setInterval(() => {
                setCount(prevCount => {
                    if (prevCount <= 1) {
                        clearInterval(intervalId);
                        setDisable(false);
                        return 10; // Reset count to 10
                    }
                    return prevCount - 1;
                });
            }, 1000);
            console.log("Countdown interval started");
        }
    }, [isDisable]); // Dependency array for useEffect



    async function resetPass() {
        if (newInputPass01 === newInputPass02) {
            console.log("Password Matched")
            const response = await fetch('http://localhost:5000/resetpass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email: emailValue,
                    password : newInputPass01
                })
            });
            return;
        }
        console.log("Password Not Matched");
        // Clear input fields
        setNewPass01("");
        setNewPass02("");
        // Alert the user
        alert("Password Not Matched");
    }

    const handleTypeOfInput = () => {
        if(showPassword){
            return "password";
        }
        return "text";
    };
    

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    return (

        <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={2} role="dialog" id="modalSignin">
            <button className='test' onClick={test} >
                <div>
                    <img src={homeIcon}></img>
                </div>
            </button>
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header p-5 pb-4 border-bottom-0">
                        <h1 className="fw-bold mb-0 fs-">Lost The Password</h1>
                    </div>

                    <div className="modal-body p-5 pt-0">
                        <form className="">
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" disabled={isDisable} value={emailValue} onChange={(e) => setEmailValue(e.target.value)}></input>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            <div className='row'>
                                <div className='col-4'>
                                    <button className="btn btn-secondary" onClick={handleSendOTP} disabled={isDisable}>
                                        {isDisable ? `Wait in ${count}s` : "Send OTP"}
                                    </button>
                                </div>
                                <div className='col-4'>
                                    <input type="number" className="form-control rounded-3" id="floatingInput" placeholder="Enter OTP" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} ></input>
                                </div>
                                <div className='col-4'>

                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-4'>

                                </div>
                                <div className='col-4'>

                                </div>
                                <div className='col-4' id='confirmBtn'>
                                    <button type="button" className="btn btn-primary" onClick={confirmOtp}>Confirm</button>
                                </div>
                            </div>


                            <div className="form-floating mb-3">
                                <input type={handleTypeOfInput()} className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" disabled={newPass} value={newInputPass01} onChange={(e) => setNewPass01(e.target.value)} ></input>
                                <label htmlFor="floatingInput">Enter Password</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type={handleTypeOfInput()}className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" disabled={newPass} value={newInputPass02} onChange={(e) => setNewPass02(e.target.value)} ></input>
                                <label htmlFor="floatingInput">Re-Enter</label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"onClick={handleTogglePassword}></input>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {showPassword ? `Show Passowrd` : "Hide Passoword"}
                                </label>
                            </div>

                            <div className='col-5'>
                                <p hidden={newInputPass01 === newInputPass02} className='missMtachPass'>
                                    Passwords do not match
                                </p>
                                <button type="button" className="btn btn-outline-primary" disabled={newPass} onClick={resetPass} >Reset Password </button>
                            </div>


                            <hr className="my-4"></hr>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default forgotpassword;
