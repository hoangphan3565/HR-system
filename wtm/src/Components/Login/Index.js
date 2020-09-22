import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Image,
  Tooltip,
  Checkbox,
  Typography
} from "antd";
import "antd/dist/antd.css";
import "./css/index.css";
import "../Image/LimitedPhysicalEnglishsetter-small.gif";
const Index = (props) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };
  const { Text} = Typography;
  return (
    <div className="container">
      <div className="login">
        <Row className="header">
          <Col flex={1}></Col>
          <Col flex={3} className="justify-content-center">
               <div className="brand">
               <h5><Text mark>HR</Text>Solutions</h5>
               </div>
          </Col>
          <Col flex={1}></Col>
        </Row>
        <Card>
          <Row>
            <Col flex={2}>
                <Image
                  height={250}
                  width={400}
                  src="https://thumbs.gfycat.com/LimitedPhysicalEnglishsetter-small.gif"
                />
            
            </Col>
            <Col flex={3}>
              <Form {...layout}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Input your username" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password placeholder="Input your password" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Tooltip placement="topLeft" title="Remember me,plz!">
                  <Checkbox>Remember me</Checkbox>
                  </Tooltip>
                  <Tooltip placement="topLeft" title="Login Here !">
                    <Button htmlType="submit" type="primary" id="btnlogin">
                      Login
                    </Button>
                  </Tooltip>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
        <Row className="footer">
          <Col flex={1}></Col>
          <Col flex={3}>
            
          </Col>
          <Col flex={1}></Col>
        </Row>
      </div>
    </div>
  );
};
export default Index;
