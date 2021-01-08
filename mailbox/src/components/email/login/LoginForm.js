import React, {useState} from 'react';
import {Button, Popover, Form, Input} from 'antd';

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


    const onFinish = (values) => {
        console.log('Success:', values);
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