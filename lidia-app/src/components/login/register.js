import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { uuid } from 'uuidv4';
import "./style.css";
import Button from 'react-bootstrap/Button';

const Register = (props) => {
   
    
    let history = useHistory();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleReg = () => {
        const user = getUserFromState();
        const userListString = localStorage.getItem('userList');
        const userList = userListString == null ? [] : JSON.parse(userListString);
        userList.push(user);
        localStorage.setItem('userList', JSON.stringify(userList));
        localStorage.setItem('user', JSON.stringify(user));
        history.push('/');
    };
   
  
    const getUserFromState = () => {
        return {
            id: uuid(),
            user: user,
            pwd: pwd,
            confirmPwd,
            firstName: firstName,
            lastName: lastName,
            credits : '1000'
        }
    }

    const isInvalid = 
        pwd !== confirmPwd ||
        pwd === '' ||
        user === '' ||
        firstName === '' ||
        lastName ==='';
    

    return <div className="base-container">
        <form name="form" className="form">
            <div id="reg-header">Registration</div>
            <div className="content" id="form-content">
                <div className="form" id="reg-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username" required  minLength={3} maxLength={20}
                            value={user}
                            onChange={e => setUser(e.target.value)}
                        />
                        {/* <span style={{ color: "red" }}>
                         { props.passedState.errors["name"]}
                     </span> */}

                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password" required 
                            value={pwd}
                            onChange={e => setPwd(e.target.value)}

                        />
                        {/* <span style={{ color: "red" }}>
                         {props.passedState.errors["password"] }
                     </span> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmpassword">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="confirm password"
                            value={confirmPwd}
                            onChange={e => setConfirmPwd(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="first name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="last name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div id="register-container" className="footer">
                    <Button variant="outline-dark " disabled ={isInvalid} type="button" className="btn" onClick={handleReg}>Register</Button>
                </div>
            </div>
        </form>
    </div>
}

export default Register;
