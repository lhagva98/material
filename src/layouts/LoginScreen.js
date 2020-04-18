import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './LoginStyles.scss'

export default function LoginScreen() {
    return (
        <div className="body text-center">
            <div className="form-signin">
                <img className="mb-4" src={require('../assets/user.png')} width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Нэвтрэх</h1>
                <label for="emailinput" className="sr-only">Хэрэглэгчийн нэр</label>
                <input type="email" id="emailinput" className="form-control" placeholder="И-мэйл" required autoFocus/>
                <label for="passwordinput" className="sr-only">Хэрэглэгчийн нэр</label>
                <input type="password" id="passwordinput" className="form-control" placeholder="Нууц үг" required autoFocus/>
                <div className="checkbox md-3">
                    <label>
                        <input type="checkbox" value="remember=me"/>
                        Намайг сана
                    </label>
                </div>
                <Link to="/admin">
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </Link>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </div>
        </div>
    );
} 