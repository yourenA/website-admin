/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import {Icon, Layout, Popconfirm, Popover} from 'antd';
import {Menu, Avatar, Dropdown, Spin, BackTop} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as loginAction from './../actions/login';
import SiderCustom from './SiderCustom';
const {Header} = Layout;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
    };

    componentDidMount() {
        // if (QueryString.hasOwnProperty('code')) {
        //     console.log(QueryString);
        //     const _user = JSON.parse(localStorage.getItem('user'));
        //     !_user && gitOauthToken(QueryString.code).then(res => {
        //         console.log(res);
        //         gitOauthInfo(res.access_token).then(info => {
        //             this.setState({
        //                 user: info
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        //     _user && this.setState({
        //         user: _user
        //     });
        // }
    };

    // screenFull = () => {
    //     if (screenfull.enabled) {
    //         screenfull.request();
    //     }
    //
    // };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logout();
    };
    logout = () => {
        localStorage.removeItem('user');
        this.props.router.push('/login')
    };
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({visible});
    };
    confirm = ()=> {
        this.props.signout()
    }
    onMenuClick = ({ key }) => {
        if (key === 'logout') {
            this.props.signout()
        }else if (key === 'setting') {
            console.log('setting')
            this.props.pushPath('/background/editPassword')
        }
    }
    render() {
        const {responsive, path} = this.props;
        const menu = (
            <Menu selectedKeys={[]} onClick={this.onMenuClick} className="menu">
                <Menu.Item  key="setting"><Icon type="setting"/>修改密码</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
            </Menu>
        );
        return (
            <Header style={{padding: 0, height: 65}} className="custom-theme">
                {
                    responsive.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide}/>} trigger="click"
                                 placement="bottomLeft" visible={this.state.visible}
                                 onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="trigger custom-trigger"/>
                        </Popover>
                    ) : (
                        <Icon
                            className="trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <div className="float-right">
                    <Dropdown overlay={menu} placement="bottomRight" >
                         <span >
                     <Avatar icon="user" className="user-icon"/>
                        </span>
                    </Dropdown>
                </div>

                <style>{`
                    .ant-menu-submenu-horizontal > .ant-menu {
                        width: 120px;
                        left: -40px;
                    }
                `}</style>
            </Header>
        )
    }
}
function mapStateToProps(state) {
    return {
        state: state,
    };
}
function mapDispatchToProps(dispath) {
    return bindActionCreators(loginAction, dispath);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCustom);