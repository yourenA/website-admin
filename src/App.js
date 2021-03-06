import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'


import './App.less';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as loginAction from './actions/login';
import * as responsiveAction from './actions/responsive';
import asyncComponent from './AsyncComponent'
import MyLayout from './Layout';

const Login = asyncComponent(() =>
import(/* webpackChunkName: "Login" */ "./components/Login.jsx")
)
const customHistory = createBrowserHistory()
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathname: '',
            collapsed: false,
        }
    }

    componentDidMount = ()=> {
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
        console.log('responsive',this.props.responsive)
        const {loginState} = this.props;
        return (
            <Router history={customHistory}>
                <div style={{height:'100%'}}>
                    <Switch>
                    <Route  path="/background/"  render={(props) => {
                        return (loginState.login  ) ?
                            <MyLayout {...props}/> :
                            <Redirect to={{pathname: '/login'}}/>;
                    }}/>
                    <Route  path="/login" component={Login}/>
                    <Redirect  from="/" to="/background/" /></Switch>
                </div>
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
