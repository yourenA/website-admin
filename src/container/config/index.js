/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import { Row, Col, Card,  Alert } from 'antd';
import TitleALogo from './titleAlogo'
import Advantage2 from './advantage2'
import Banner from './banner'
import Contact from './contact'
import Partner from './partner'
import FriendshipLink2 from './friendshipLink2'
class TitleAndLogo extends React.Component {
    constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            friendshipLink:[{name:'xxxx公司',url:'http://baidu.com'},{name:'xxxx公司',url:'http://baidu.com'},],
        };
    }

    render() {
        return (
            <div className="content config">
                <Row >
                    <Alert message="当配置项下方有'确定'按钮时，需要点击'确定'按钮才能保存数据。" type="info" closable
                           style={{marginTop: '10px', marginBottom: '10px'}}/>
                        <Col xs={24} sm={24}  md={12} lg={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>网站基本信息</h2>
                                    </div>
                                    <TitleALogo />
                                </Card>
                            </div>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>我们的优势</h2>
                                        <small>该模块的ICON采用<b>'Font Awesome'</b>图标，在ICON字段中填入相关的'Font Awesome'图标名称，如'fa-address-book'。详情
                                            <a target="_blank" href="http://www.fontawesome.com.cn/faicons/">http://www.fontawesome.com.cn/faicons/</a></small>
                                    </div>
                                    <Advantage2/>
                                </Card>
                            </div>

                        </Col>
                        <Col xs={24} sm={24}  md={12} lg={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>首页轮播图</h2>
                                    </div>
                                    <Banner/>
                                </Card>
                            </div>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>友情链接</h2>
                                    </div>
                                    <FriendshipLink2 />
                                </Card>
                            </div>
                        </Col>
                        <Col  xs={24} sm={24}  md={12} lg={8}>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>联系方式</h2>
                                    </div>
                                    <Contact/>
                                </Card>
                            </div>
                            <div className="gutter-box">
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2 >合作伙伴</h2>
                                    </div>
                                    <Partner partner={this.state.partner}/>
                                </Card>
                            </div>
                        </Col>

                </Row>
            </div>

        )
    }
}


export default TitleAndLogo
