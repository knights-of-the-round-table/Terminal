/* jshint esversion: 6 */
import React, { Component } from 'react';
import { Input, Row, Col }  from 'antd';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="App-login">
                <h3>立即登录</h3>
                <form action="login" method="POST">
                    <Row className="App-login-username" >
                        <Col span={6} offset={2} style={{
                            textAlign: 'justify'
                        }}>
                            用户名:
                        </Col>
                        <Col span={14}>
                            <Input placeholder="请输入用户名/邮箱" type="text"></Input>
                        </Col>
                    </Row>
                    <Row className="App-login-password">
                        <Col span={6} offset={2} style={{
                            textAlign: 'justify'
                        }}>
                            密码:                  
                        </Col>
                        <Col span={14}>
                            <Input  placeholder="请输入用户密码" type="password"></Input>
                        </Col>
                    </Row>
                </form>
                <a className="App-link">没有账号, 点我注册</a>
            </div>
        )
    }
}

