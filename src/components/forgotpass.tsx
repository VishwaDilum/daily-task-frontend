import * as React from 'react';
import { } from '../cascade/forgotpass.css'
import homeIcon from '../assets/home.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
function forgotpassword() {

    const [count, setCount] = useState<number>(10);
    const [isDisable, setDisable] = useState<boolean>(false);
    const [emailValue, setEmailValue] = useState<string>("");
    const history = useNavigate();

    const handleSendOTP = async   ()=>{
        setDisable(true)
        const response = await fetch('http://localhost:5000/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailValue })  // Pass the email value
        });

        if (response.ok) {
            alert('OTP sent successfully!');
        } else {
            alert('Error sending OTP');
        }

    };

    function test() {
        history('/signin');
    }

    function disable() {

    }

    useEffect(() => {
        if (isDisable) {
            const intervalId = setInterval(() => {
                setCount(prevCount => {
                    if (prevCount <= 1) {
                        clearInterval(intervalId);
                        setDisable(false)
                        return 10; // Reset count to 10
                    }
                    return prevCount - 1;
                });
            }, 1000);
            console.log("Hee " + intervalId)
        }
    }, [isDisable]); // Add isSending to dependency array

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
                                    <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="Enter OTP"></input>
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
                                    <button type="button" className="btn btn-primary">Confirm</button>
                                </div>
                            </div>


                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" disabled></input>
                                <label htmlFor="floatingInput">Enter Password</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" disabled></input>
                                <label htmlFor="floatingInput">Re-Enter</label>
                            </div>

                            <div className='col-5'>
                                <button type="button" className="btn btn-outline-primary" disabled>Reset Password</button>
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
