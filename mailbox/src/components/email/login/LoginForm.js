import React, {useState} from 'react';
import {Button, Popover, Form, Input, message} from 'antd';

export default function LoginForm(props) {

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const [loginVisible, setLoginVisible] = useState(false);

    const handleLoginVisibleChange = loginVisible => {
        setLoginVisible(loginVisible);
    };


    const onFinish = async (values) => {
        console.log('Success:', values);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: values.username, password: values.password})
        };
        const response = await fetch('http://192.168.86.48:5000/v1/users/login', requestOptions);
        const data = await response.json();

        if (!response.ok) {
            const error = (data && data.message) || response.status;
            message.error(error);
            return Promise.reject(error);
        }

        setLoginVisible(false);
        props.handleLoginClick(values.username)

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const loginForm = (
        <Form
            {...layout}
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );


    const loginDialog = (<Popover
            content={loginForm}
            trigger="click"
            visible={loginVisible}
            onVisibleChange={handleLoginVisibleChange}
        >
            <Button type="primary">Log In</Button>
        </Popover>
    )

    return loginDialog

}