import './App.css';
import 'antd/dist/antd.css';
import {Row, Col, Layout } from 'antd';

import MailBox from "./components/email/MailBox";
import ModelSelector from "./components/email/ModelSelector";
import DatasetSelector from "./components/email/DatasetSelector";
import DataFilter from "./components/email/DataFilter";
import {useState} from "react";
import LoginForm from "./components/email/LoginForm";

function App() {

  const [currentModel, setCurrentModel] = useState(null);

  const handleModelChange = (query) => {
    setCurrentModel(query);
  }

  const {Header, Content} = Layout;


  return (
     <Layout>
      <Header className="header">
      <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div><h1 style={{color:"white", "fontSize":"40px", "textAlign":"left"}}>Mail Tag Tool 1.0</h1></div>
      </Col>
      <Col className="gutter-row" span={6}>
      </Col>
      <Col className="gutter-row" span={6}>
      </Col>
      <Col className="gutter-row" span={6}>
          <LoginForm/>
      </Col>
    </Row>
    </Header>
         <Content>
             <div className="App">
                 <Row >
                     <Col span={6}>
                        <DatasetSelector />
                     </Col>
                     <Col span={12}>
                        <DataFilter />
                     </Col>
                     <Col span={6}><ModelSelector onModelChange={handleModelChange} /></Col>
                 </Row>
                 <Row>
                     <Col span={24} style={{"textAlign":"right"}}><MailBox currentModel={currentModel}/></Col>
                 </Row>
             </div>
         </Content>
     </Layout>

  );
}

export default App;
