import React, {useState} from 'react';
import {Button, Popover, Form, Input, Avatar} from 'antd';


export default function LoginForm() {


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

    const [visible, setVisible] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const hide = () => {
        setVisible(false);
    };

    const handleVisibleChange = visible => {
        setVisible(visible);
    };


    const onFinish = (values) => {
        console.log('Success:', values);
        hide();
        setLoggedIn(true);
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
            // content={<a onClick={hide}>Close</a>}
            content={loginForm}
            //  title="Title"
            trigger="click"
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <Button type="primary">Login</Button>
        </Popover>
    )

    const logoutDialog = (<Avatar>M</Avatar>)

    {
        if (loggedIn) {
            return logoutDialog
        } else {
            return loginDialog
        }

    }

}