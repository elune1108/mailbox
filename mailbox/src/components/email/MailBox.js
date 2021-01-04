import {Table, Badge, Space, Button, Drawer, message} from 'antd';
import React, {useEffect, useState} from "react";


export default function MailBox(props) {


    const [data, setData] = useState([]);
    const [currentEmail, setCurrentEmail] = useState(null);

    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
    };


    const showEmailContent = (emailKey) => {
        const url =
            'http://192.168.86.48:5000/v1/mail/' + emailKey;

        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                // console.log(result[0]);
                setCurrentEmail(result[0]);
                //   console.log('~~~ key: ' + result[0].key);

            })


    };

    useEffect(() => {
            // console.log('~~~ currentEmail: ' + currentEmail);
            if (currentEmail) {
                console.log('~~~currentEmail key ' + currentEmail.key);
                setVisible(true);
            }

        }, [currentEmail]
    )


    const vote = (emailKey, tagName, userName) => {
        setData(data.map(item => {
                if (emailKey === item.key) {
                    console.log('Fine the item ' + emailKey);
                    console.log(item.h_tags[tagName]);
                    item.h_tags[tagName] = [...item.h_tags[tagName], userName];

                    return item;
                }
                return item;
            })
        )
    };

    const updateVote = async (emailKey, tagName, userName) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: userName, category: tagName})
        };
        const response = await fetch('http://192.168.86.48:5000/v1/mail/' + emailKey, requestOptions);
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            message.error(error);
            return Promise.reject(error);
        }
        vote(emailKey, tagName, userName);


    }


    useEffect(() => {
        const url =
            'http://192.168.86.48:5000/v1/mails';

        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                console.log(result[0]);
                setData(result);
            })
    }, [])

    let emailModelContent;
    if (currentEmail) {
        emailModelContent = <table>
            <tr>
                <th>Id:</th>
                <td>{currentEmail.key}</td>
            </tr>
            <tr>
                <th>From:</th>
                <td>{currentEmail.from}</td>
            </tr>
            <tr>
                <th>Subject:</th>
                <td>{currentEmail.subject}</td>
            </tr>
            <tr>
                <th>Human Tags:</th>
                <td>

                    <Space size='large'>
                        {
                            Object.keys(currentEmail.h_tags).map((key => {
                                return (
                                    <Badge count={currentEmail.h_tags[key].length} key={key}>
                                        <Button size={'small'} shape="round" disabled> {key}</Button>
                                    </Badge>
                                );
                            }))}
                    </Space>


                </td>
            </tr>

            <tr>
                <th>Content:</th>
                <td>{currentEmail.content}</td>
            </tr>
        </table>

    }


    const columns = [
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: (text, record) => <a onClick={() => showEmailContent(record.key)} href="/#">{text}</a>,
        },
        {
            title: 'Prediction',
            // title: {props.currentModel},
            dataIndex: 'm_tags',
            key: 'm_tags',
            render: (m_tags) => (
                <Badge count={0} >
                    <Button size={'small'} shape="round" disabled={true}> {m_tags[props.currentModel]}</Button>
                </Badge>
            )
        },
        {
            title: 'Tags',
            dataIndex: 'h_tags',
            key: 'h_tags',
            render: (h_tags, record) => (

                <Space size='large'>
                    {
                        Object.keys(h_tags).map((key => {
                            return (
                                <Badge count={h_tags[key].length} key={key}>
                                    <Button onClick={() => updateVote(record.key, key, "W")} size={'small'} shape="round"> {key}</Button>
                                </Badge>
                            );
                        }))}
                </Space>
            )
        },
    ];


    return <>
        <Table columns={columns} dataSource={data}/>

        <Drawer
            title="Email Details"
            placement="left"
            closable={false}
            onClose={onClose}
            visible={visible}
            width={1000}

        >
            {emailModelContent}
        </Drawer>

    </>;

}

