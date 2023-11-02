function Register() {
    const showHidePass = (event)=>{
        if (event.target.textContent == 'Show'){
            event.target.textContent = 'Hide';
            document.getElementById('password').setAttribute('type', 'text');
            document.getElementById('confirm_password').setAttribute('type', 'text');
        }
        else{
            event.target.textContent = 'Show';
            document.getElementById('password').setAttribute('type', 'password');
            document.getElementById('confirm_password').setAttribute('type', 'password');
        }
    }

    const registerUser = async()=>{
        document.querySelectorAll('.error-text').forEach(element => element.style.display = 'none');
        document.querySelector('label[for="option-1"]').style.color = '#333';
        let checkBox = document.getElementById('option-1');
        if (!checkBox.checked) {
            document.querySelector('label[for="option-1"]').style.color = 'red';
            return;
        }
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let confirm_password = document.getElementById('confirm_password').value;
        let data = {
            username: username,
            password: password,
            confirm_password: confirm_password
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        let response = await fetch('http://127.0.0.1:8000/register/', options);
        let result = await response.json();
        if (result.status_code == 201){
            localStorage.setItem('secret_phrases', result.secret_phrases);
        }
        else{
            if (result.error){
                let errorElement = document.getElementById('username');
                errorElement.nextElementSibling.style.display = 'block';
                errorElement.document.getElementById('username').nextElementSibling.textContent = result.error;
            }
            else{
                for (let err in result.errors){
                    let errorElement = document.getElementById(err);
                    errorElement.nextElementSibling.style.display = 'block';
                    errorElement.nextElementSibling.textContent = result.errors[err][0];
                }
            }
        }
    }

    const handleCheckBox = (event)=>{
        let checkBox = event.target;
        let registerAccount = document.getElementById('register');
        if (checkBox.checked) {
            registerAccount.style.backgroundColor = '#0376c9';
            registerAccount.style.pointerEvents = 'revert';
            registerAccount.removeAttribute('disabled');
        }
        else{
            registerAccount.style.backgroundColor = '#0376c980';
            registerAccount.setAttribute('disabled', 'disabled');
            registerAccount.style.pointerEvents = 'none';
        }
    }
    return (
        <div className="main-wrap-content">
            <section className="parent">
                <div className="box box--margin-bottom-4 box--flex-direction-row">
                    <ul className="progressbar"><li className="active">Create password</li>
                        <li className="">Secure wallet</li>
                        <li className="">Confirm secret recovery phrase</li>
                    </ul>
                </div>
                <div className="main-wrapper">
                    <h2>Create password
                    </h2>
                    <h4>MetaMask would like to gather usage data to better understand how our users interact with MetaMask. This data will be used to provide the service, which includes improving the service based on your use.

                    </h4>
                </div>
                <div className="container-fluid space-left">
                    <div className="row">
                    <div className=" col-md-10">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" className="form-control" type="text" />
                            <p className="error-text"></p>
                        </div>
                        </div>
                        <div className=" col-md-10">
                            <div className="form-group">
                                <label htmlFor="password">New password (8 characters min)</label>
                                <span className="show-hide-password" onClick={showHidePass}>Show</span>
                                <input id="password" className="form-control" type="password" />
                                <p className="error-text"></p>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <div className="form-group">
                                <label htmlFor="confirm_password">Confirm password</label>
                                <input id="confirm_password" className="form-control" type="password" />
                                <p className="error-text"></p>
                            </div>
                        <input id="non_field_errors" hidden />
                        <p className="error-text"></p>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                    <form>
                        <div className="terms-use">
                            <input type="checkbox" name="option-1" id="option-1" onChange={handleCheckBox} /><label htmlFor="option-1">I understand that MetaMask cannot recover this password for me. <span >Learn more </span></label>
                        </div>
                        <div className="center">
                            <button className="button-1" id="register" type="button" onClick={registerUser}>
                                Create a new wallet
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
export default Register;