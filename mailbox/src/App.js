import './App.css';
import 'antd/dist/antd.css';
import {Row, Col, Layout } from 'antd';
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
         <Header>Header Name Here</Header>
         <Content>
             <div className="App">
                 <Row >
                     <Col span={6}><ModelSelector onModelChange={handleModelChange} /></Col>
                 </Row>
                 <Row>
                     <Col span={24}><MailBox currentModel={currentModel}/></Col>
                 </Row>
                 {/*  <Welcome/>*/}
             </div>
         </Content>
     </Layout>

  );
}

export default App;
