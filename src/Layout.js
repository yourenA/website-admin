/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import asyncComponent from './AsyncComponent'
import { Layout, Menu, Icon,  Badge, Popover } from 'antd';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import HeaderCustom from './components/HeaderCustom';
import * as loginAction from './actions/login';
import * as responsiveAction from './actions/responsive';
import SiderCustom from './components/SiderCustom';
const customHistory = createBrowserHistory()

// import Nopermission from './container/nopermission';
// import Login from './container/login';
// import Home from './container/home';

// import About from './container/about'
// import HardwareTest from './container/hardwareTest/index';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
const News = asyncComponent(() =>
import(/* webpackChunkName: "News" */ "./container/news/index")
)
const Data = asyncComponent(() =>
import(/* webpackChunkName: "Data" */ "./container/websiteData/index")
)
class MyLayout extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            pathname: '',
            collapsed: false,
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
            <Layout className="ant-layout-has-sider">
                {!responsive.isMobile && <SiderCustom path={customHistory.location.pathname} collapsed={this.state.collapsed} />}
                <Layout>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} responsive={responsive}  path={customHistory.location.pathname} />
                    <Content  style={{ margin: '0 16px', overflow: 'initial' }}>
                             <Route exact  path="/layout" component={Home}/>
                            <Route  path="/layout/config" component={Config}/>
                            <Route exact path="/layout/products" component={Category}/>
                            <Route exact path="/layout/products/:categoryId" component={Products}/>
                            <Route  path="/layout/products/:categoryId/:productId" component={ProductDetail}/>
                            <Route  path="/layout/news" component={News}/>
                            <Route  path="/layout/data" component={Data}/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        广州辂轺科技有限公司
                    </Footer>
                </Layout>
            </Layout>

        )
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
export default connect(mapStateToProps, mapDispatchToProps)(MyLayout);