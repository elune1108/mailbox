import './App.css';
import 'antd/dist/antd.css';
import {Row, Col, Layout} from 'antd';

import MailBox from "./components/email/MailBox";
import ModelSelector from "./components/email/ModelSelector";
import DatasetSelector from "./components/email/DatasetSelector";
import DataFilter from "./components/email/DataFilter";
import {useState} from "react";
import LoginControl from "./components/email/login/LoginControl";
import Cookies from 'js-cookie';

function App() {

    const [currentModel, setCurrentModel] = useState(null);
    const [currentQuery, setCurrentQuery] = useState(null);
    const [username, setUsername] = useState(Cookies.get("username"));


    const handleModelChange = (query) => {
        setCurrentModel(query);
    }

    const handleQueryChange = (query) => {
        setCurrentQuery(query);
    }

    const handleUsernameChange = (username) => {
        setUsername(username);
    }

    const {Header, Content} = Layout;

    return (
        <Layout>
            <Header className="header">
                <Row gutter={16}>
                    <Col className="gutter-row" span={22}>
                        <div><h1 style={{color: "white", "fontSize": "34px", "textAlign": "left"}}>Mail Tag Tool
                            1.0</h1></div>
                    </Col>
                    <Col className="gutter-row" span={2}>
                        <LoginControl onUsernameChange={handleUsernameChange}/>
                    </Col>
                </Row>
            </Header>
            <Content>
                <div className="App" style={{"marginTop": "10px", "marginLeft": "10px", "marginRight": "10px"}}>
                    <Row gutter={[8, 0]}>
                        <Col span={6}>
                            <DatasetSelector/>
                        </Col>
                        <Col span={12}>
                            <DataFilter onQueryChange={handleQueryChange}/>
                        </Col>
                        <Col span={6}><ModelSelector onModelChange={handleModelChange}/></Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{"textAlign": "right"}}>
                            <MailBox currentModel={currentModel} currentQuery={currentQuery} username={username}/>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>

    );
}

export default App;
