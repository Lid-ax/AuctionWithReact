import React, { useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from "react-bootstrap";
//import img from '../../images/login-img.png';

const Login = (props) => {

    const history = useHistory();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');

    const handle = () => {
        const arr = JSON.parse(localStorage.getItem('userList'));
        console.log(arr)
        for (let userInList of arr) {
            if (user === userInList['user']) {
                console.log(user === userInList['user'])
                if (pwd === userInList['pwd']) {
                    localStorage.setItem('user', JSON.stringify(userInList));
                    console.log(localStorage.setItem('user', JSON.stringify(userInList)))
                    history.push('/');
                    break;
                }
            }
        }
    };

    return (
        <div className="body-style">
            <Container className=" mt-5 base-container">
                <Row>
                    {/* <Col xs ={6}><img className="login-img" src={img} alt="icon" /></Col> */}
                    <Col>
                        <form name="form" className="form">
                            <div className="login-title-header">Login</div>
                            <div className="content">
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="username" /* minLength={3} maxLength={20} required */
                                            value={user}
                                            onChange={e => setUser(e.target.value)}

                                        />
                                        {/* <span style={{ color: "red" }}>{ props.passedState.errors["name"]}</span> */}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="password"
                                            value={pwd}
                                            onChange={e => setPwd(e.target.value)}
                                        />
                                        {/* <span style={{ color: "red" }}>{props.passedState.errors["password"] }</span> */}
                                    </div>
                                
                                </div>
                                <div id="login-container" className="footer">
                                    <Button variant="outline-dark" type="button" className="btn" onClick={handle}>Login</Button>
                                </div>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}

export default Login;

