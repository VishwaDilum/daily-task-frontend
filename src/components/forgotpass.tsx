import * as React from 'react';
function forgotpassword() {

    let test : number = 5;

    return (
        <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex = {test} role="dialog" id="modalSignin">
  <div className="modal-dialog" role="document">
    <div className="modal-content rounded-4 shadow">
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="fw-bold mb-0 fs-2">Lost The Password</h1>
      </div>

      <div className="modal-body p-5 pt-0">
        <form className="">
          <div className="form-floating mb-3">
            <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"></input>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password">

            </input>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password"></input>
            <label htmlFor="floatingPassword">Re- Password</label>
          </div>
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Sign up</button>
          <small className="text-body-secondary">By clicking Sign up, you agree to the terms of use.</small>
          <hr className="my-4"></hr>
        </form>
      </div>
    </div>
  </div>
</div>
    );
}

export default forgotpassword;
