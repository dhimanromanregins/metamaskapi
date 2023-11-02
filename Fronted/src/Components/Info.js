import { Link } from 'react-router-dom';
import { React, useState } from 'react';

function Info(props) {
    return (
        <div className="main-wrap-content">
            <section className="parent">
                <div className="main-wrapper">
                    <h2 className="text-center">Help us improve SSP Coin</h2>
                    <h4>SSP Coin would like to gather usage data to better understand how our users interact with MetaMask. This data will be used to provide the service, which includes improving the service based on your use.
                    </h4>
                    <h4>SSP Coin will...</h4>
                </div>
                <div className="check-list">
                    <ul>
                        <li>
                            <span><i className="fa fa-check" aria-hidden="true"></i></span>Always allow you to opt-out via Settings
                        </li>
                        <li>
                            <span><i className="fa fa-check" aria-hidden="true"></i></span>Send anonymized click and pageview events
                        </li>
                        <li>
                            <span><i className="fa fa-check" aria-hidden="true"></i></span>A Never collect information we don’t need to provide the service (such as keys, addresses, transaction hashes, or balances)
                        </li>
                        <li>
                            <span className="colr-change"><i className="fa fa-times" aria-hidden="true"></i></span> Never collect your full IP address*
                        </li>
                        <li>
                            <span className="colr-change"><i className="fa fa-times" aria-hidden="true"></i></span> Never sell data. Ever!
                        </li>

                    </ul>
                </div>
                <h4>
                    This data is aggregated and is therefore anonymous for the purposes of General Data Protection Regulation (EU) 2016/679.
                </h4>
                <h4>
                    * When you use Infura as your default RPC provider in MetaMask, Infura will collect your IP address and your Ethereum wallet address when you send a transaction. We don’t store this information in a way that allows our systems to associate those two pieces of data. For more information on how MetaMask and Infura interact from a data collection perspective, see our update here. For more information on our privacy practices in general, see our Privacy Policy here.
                </h4>
                <div className="wrapper">
                    <form>
                        {/* <div className="terms-use">
                            <input type="checkbox" name="option-1" id="option-1" onChange={handleCheckBox} /> <label htmlFor="option-1">I agree to SSP Wallet's <span >Terms of use</span></label>
                        </div> */}
                        <div className="center">
                            <Link className="agree-btn" type="button" to={props.pageUrl}>
                                I agree
                            </Link>
                        </div>
                        <div className="center">
                            <Link className="thanks-btn" to={props.pageUrl} type="button">
                                No thanks
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
export default Info;