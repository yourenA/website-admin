import React, {Component} from 'react';
import { Layout, Menu, Icon,  Badge, Popover } from 'antd';
import {
    BrowserRouter as Router,
    Route,

} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'


import './App.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as loginAction from './actions/login';
import * as responsiveAction from './actions/responsive';
import {testPermission} from './common/common'
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import asyncComponent from './AsyncComponent'
// import Nopermission from './container/nopermission';
// import Login from './container/login';
// import Home from './container/home';

// import About from './container/about'
// import HardwareTest from './container/hardwareTest/index';


const Home = asyncComponent(() =>
import(/* webpackChunkName: "home" */ "./container/home/home")
)
const Config = asyncComponent(() =>
import(/* webpackChunkName: "Config" */ "./container/config/index")
)
const Category = asyncComponent(() =>
import(/* webpackChunkName: "Category" */ "./container/category/index")
)
const Products = asyncComponent(() =>
import(/* webpackChunkName: "Products" */ "./container/products/index")
)
const ProductDetail = asyncComponent(() =>
import(/* webpackChunkName: "ProductDetail" */ "./container/productDetail/index")
)
const customHistory = createBrowserHistory()
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class App extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            pathname: '',
            collapsed: false,
        }
    }

    componentDidMount = ()=> {
        const that = this;
        document.body.onclick = function (e) {
            // that.launchFullscreen(document.documentElement);
        }
    }

    componentWillMount() {
        this.getClientWidth();
        window.onresize = () => {
            this.getClientWidth();
        }
        if (window.location.pathname.indexOf('systemManage') >= 0) {
            this.setState({
                pathname: '/systemManage'
            })
        } else {
            this.setState({
                pathname: window.location.pathname
            })
        }
    }
    getClientWidth = () => {    // 获取当前浏览器宽度并设置responsive管理响应式
        const { checkMobile } = this.props;
        const clientWidth = document.body.clientWidth;
        checkMobile(clientWidth);
    };
    handleClick = (e) => {
        if (e.key === 'systemJournal') {
            // this.refs.SystemJournalModal.setSystemJournalModalTrue()
        } else if (e.key === '/about') {

        } else {
            this.setState({
                pathname: e.key,
            });
            if (e.key === '/signout') {
                console.log(this.refs.Login)
                this.props.signout();
            }
        }
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const {login,responsive} = this.props;
        return (
            <Router history={customHistory}>
                <Layout className="ant-layout-has-sider">
                    {!responsive.isMobile && <SiderCustom path={customHistory.location.pathname} collapsed={this.state.collapsed} />}
                    <Layout>
                        <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} responsive={responsive}  path={customHistory.location.pathname} />
                        <Content  style={{ margin: '0 16px', overflow: 'initial' }}>
                            <Route exact path="/" component={Home}/>
                            <Route  path="/config" component={Config}/>
                            <Route exact  path="/products" component={Category}/>
                            <Route exact path="/products/:categoryId" component={Products}/>
                            <Route  path="/products/:categoryId/:productId" component={ProductDetail}/>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            广州辂轺科技有限公司
                        </Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}
function mapStateToProps(state) {
    return {
        loginState: state.login,
        responsive: state.responsive,
    };
}
function mapDispatchToProps(dispath) {
    return bindActionCreators({...loginAction,...responsiveAction}, dispath);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
