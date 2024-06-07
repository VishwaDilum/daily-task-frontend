import * as React from 'react';
import { } from '../components/forgotpass.css'
import homeIcon from '../assets/home.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function forgotpassword() {
    const history = useNavigate();
    function test() {
        history('/signin');
    }
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
                                <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"></input>
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            <div className='row'>
                                <div className='col-4'>
                                    <button type="button" className="btn btn-secondary">  Send  OTP</button>
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
