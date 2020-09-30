import React, { useState, useEffect } from 'react';
import { Menu, Avatar, Badge, Dropdown, Button, Input, Select, notification, Drawer, Form } from 'antd';
import { LogoutOutlined, ContactsOutlined } from '@ant-design/icons';
import { UnorderedListOutlined, UserOutlined, BarcodeOutlined } from '@ant-design/icons';
import logo from '../Image/logo.png';
import { Link } from 'react-router-dom';
import UserService from '../../Services/UserService';
function Header(props) {
    const { SubMenu } = Menu;
    const { Search } = Input;
    const [theme, setTheme] = useState(localStorage.getItem("theme"));
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(false);
    }
    const toggleTheme = () => {
        localStorage.getItem("theme") === 'light' ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light');
        //props.test(theme);
    }
    const onLogout = () => {
        localStorage.removeItem('id');
        window.location.href = '/login';
    }
    const [name, setName] = useState("");
    useEffect(() => {
        setName(localStorage.getItem("fullname"))
    })
    const onOpen = () => {
        setVisible(true);
    }
    const [id, setId] = useState("");
    useEffect(() => {
        setId(localStorage.getItem('id'))
    })
    const [user,setUser]=useState([])
    useEffect(() => {
        UserService.get(1).then(res => {
            setUser(res.data);
        })
    },[id])
    console.log(user);
    const menu = (
        <Menu>
            <Menu.Item key="0" icon={<ContactsOutlined />} onClick={onOpen}>
                <div>Profile</div>
            </Menu.Item>
            <Menu.Item key="1" icon={<LogoutOutlined />} onClick={onLogout}>
                <div style={{ width: 100, height: 25 }} >Log out</div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div id="banner" style={{ height: 50 }}>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#">
                    <img src={logo} width={30} />
                </a>
                <Button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    icon={<UnorderedListOutlined />}
                >

                </Button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Search
                        placeholder="Search..."
                        onSearch={value => console.log(value)}
                        size="middle"
                        style={{ width: 200 }}
                    />
                    <div className="brand">
                        <h5>H<span>R</span>s Solutions</h5>
                    </div>
                    <div className="user">
                        <div className="row" id="avatar" style={{ width: 200 }}>
                            <Badge dot style={{ backgroundColor: '#52c41a' }}>
                                <Avatar shape="circle" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                            </Badge>
                            <p>{name}</p>
                        </div>
                    </div>
                    <div className="settings">
                        <Dropdown overlay={menu} >
                            <Button shape="circle" icon={<UnorderedListOutlined />} id="test"></Button>

                        </Dropdown>
                    </div>
                </div>
            </nav>
            <Drawer
                title="Your Profile"
                width={300}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
              </Button>
                        <Button onClick={onClose} type="primary">
                            Submit
              </Button>
                    </div>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        rules={[{ required: true, message: 'Please input your fullname!' }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label="Userame"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >

                        <Input.Password prefix={<BarcodeOutlined />} />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}

export default Header;