import './App.css';
import 'antd/dist/antd.css';
import {Row, Col, Layout , Tag, Avatar} from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import MailBox from "./components/email/MailBox";
import ModelSelector from "./components/email/ModelSelector";
import {useState} from "react";
import Welcome from "./components/email/Welcome";

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
        <div><h1 style={{color:"white", "font-size":"40px", "text-align":"left"}}>Mail Tag Tool 1.0</h1></div>
      </Col>
      <Col className="gutter-row" span={6}>
      </Col>
      <Col className="gutter-row" span={6}>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={{"text-align":'right'}}><Avatar size={40}>Tony</Avatar></div>
      </Col>
    </Row>
    </Header>
         <Content>
             <div className="App">
                 <Row >
                 <Col span={18}></Col>
                     <Col span={6}><ModelSelector onModelChange={handleModelChange} /></Col>
                 </Row>
                 <Row>
                     <Col span={24} style={{"text-align":"right"}}><MailBox currentModel={currentModel}/></Col>
                 </Row>
                 {/*  <Welcome/>*/}
             </div>
         </Content>
     </Layout>

  );
}

export default App;
