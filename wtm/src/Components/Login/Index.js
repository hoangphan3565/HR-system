import React, { useRef, useState } from "react";
import Cookies from 'js-cookie';
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
import UserService from "../../Services/UserService";
import { Redirect, history } from "react-router-dom";
import axios from 'axios'
const Index = (props) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };
  const [message, setMessage] = useState("");
  const userName = useRef();
  const passWord = useRef();
  const { Text } = Typography;
  const onLogin = () => {
    const account = {
      username: userName.current.props.value,
      password: passWord.current.props.value
    }
    axios.post("http://localhost:8080/authenticate", account).then(res => {
      Cookies.set('loginInfo',res.data.token);
      props.history.push("/home");
    })
  }
  return (
    <div className="container">
      <h5>{message}</h5>
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
              <Form {...layout} onFinish={onLogin}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Input your username" ref={userName} />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input.Password placeholder="Input your password" ref={passWord} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Tooltip placement="topLeft" title="Remember me,plz!">
                    <Checkbox>Remember me</Checkbox>
                  </Tooltip>
                  <Tooltip placement="topLeft" title="Login Here !">
                    <Button htmlType="submit" type="primary" id="btnlogin" onClick={onLogin}>
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
