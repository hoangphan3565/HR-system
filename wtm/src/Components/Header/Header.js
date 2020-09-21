import React, { useState } from 'react';
import { Menu, Avatar, Badge, Dropdown, Button, Input } from 'antd';
import { LogoutOutlined, ContactsOutlined } from '@ant-design/icons';
import { UnorderedListOutlined } from '@ant-design/icons';
import logo from '../Image/logo.png';
import { Link } from 'react-router-dom';
function Header(props) {
    const { SubMenu } = Menu;
    const { Search } = Input;
    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const toggleTheme = () => {
        localStorage.getItem("theme") === 'light' ?  localStorage.setItem('theme','dark'):  localStorage.setItem('theme','light');
        //props.test(theme);
    }
    const menu = (
        <Menu>
            <Menu.Item key="0" icon={<ContactsOutlined />}>
                <Link to="">Profile</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<LogoutOutlined />}>
                <Link to="">Log out</Link>
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
                        <div className="row" id="avatar">
                            <Badge dot style={{ backgroundColor: '#52c41a' }}>
                                <Avatar shape="circle" src="https://scontent-xsp1-2.xx.fbcdn.net/v/t1.0-9/88210277_616259475872577_385201391846555648_n.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=EK733GauT3kAX_av1kH&_nc_ht=scontent-xsp1-2.xx&oh=d0f0b1033e8412cbc6dd67db5f18208f&oe=5F81B5AD" />
                            </Badge>
                            <p>Admin</p>
                        </div>
                    </div>
                    <div className="settings">
                        <Dropdown overlay={menu} >
                            <Button shape="circle" icon={<UnorderedListOutlined />} id="test"></Button>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;