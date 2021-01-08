import {Table, Badge, Space, Button, Drawer, message, Tag} from 'antd';
import React, {useEffect, useState} from "react";
import config from "../../Config";


export default function MailBox(props) {


    const [data, setData] = useState([]);
    const [currentEmail, setCurrentEmail] = useState(null);

    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
    };


    const showEmailContent = (emailKey) => {
        const url =
            config.apiEndpoint + '/v1/mail/' + emailKey;

        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                setCurrentEmail(result[0]);

            })


    };

    useEffect(() => {
            if (currentEmail) {
                setVisible(true);
            }

        }, [currentEmail]
    )


    const vote = (emailKey, tagName, userName, label) => {
        setData(data.map(item => {
                if (emailKey === item.key) {
                    console.log('Fine the item ' + emailKey);
                    console.log(item.h_tags[tagName]);
                    if (item.h_tags[tagName].includes(userName)){
                        item.h_tags[tagName].splice(item.h_tags[tagName].indexOf(userName), 1)
                    }else{
                        item.h_tags[tagName] = [...item.h_tags[tagName], userName];
                    }
                    item.label = label
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
        const response = await fetch(config.apiEndpoint + '/v1/mail/' + emailKey, requestOptions);
        const data = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            message.error(error);
            return Promise.reject(error);
        }
        vote(emailKey, tagName, userName, data.label);


    }


    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: props.currentQuery})
        };
        const response =  fetch(config.apiEndpoint + '/v1/mails/query' , requestOptions)
            .then((result) => result.json())
            .then( (result) => {
                setData(result);
            });

    }, [props.currentQuery])

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

    const colors = {"social":"green", "shopping":"cyan", "news":"magenta", "personal":"purple", "finance":"blue"}

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
                 <Tag color={colors[m_tags[props.currentModel]]}>{m_tags[props.currentModel]}</Tag>
            )
        },
         {
            title: 'Label',
            // title: {props.currentModel},
            dataIndex: 'label',
            key: 'label',
            render: (label) => (

            <Tag color={colors[label]}>{label}</Tag>

            )
        },
        {
            title: 'Annotation',
            dataIndex: 'h_tags',
            key: 'h_tags',
            render: (h_tags, record) => (

                <Space size='large'>
                    {
                        Object.keys(h_tags).map((key => {
                            return (
                                <Badge count={h_tags[key].length} key={key}>
                                    <Button type= {h_tags[key].includes(props.username)? "primary": "dashed"}onClick={() => updateVote(record.key, key, props.username)} size={'small'} > {key} </Button>
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
        <h2>username is {props.username}</h2>

    </>;

}

