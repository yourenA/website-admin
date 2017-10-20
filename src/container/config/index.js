/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import { Row, Col, Card, Timeline, Icon } from 'antd';
import Masonry from 'react-masonry-component';
import TitleALogo from './titleAlogo'
import Advantage from './advantage'
import Banner from './banner'
import Contact from './contact'
import Partner from './partner'
import FriendshipLink from './friendshipLink'
class TitleAndLogo extends React.Component {
    constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            advantage:[{theme:'我们的优势',icon:'taxi'},{theme:'我们的优势',icon:'paper-plane-o'},{theme:'我们的优势',icon:'bolt'}],
            friendshipLink:[{name:'xxxx公司',url:'http://baidu.com'},{name:'xxxx公司',url:'http://baidu.com'},],
            partner:[{id:1,name:'xxxx公司',city:'广州'},{id:2,name:'xxxx公司',city:'北京'},],
        };
    }

    render() {
        var masonryOptions = {
            transitionDuration: 0
        };
        return (
            <div className="content config">
                <Row >
                    <Masonry
                        className={'my-gallery-class'} // default ''
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        <Col xs={24} sm={24}  md={12} lg={8}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>网站基本信息</h2>
                                        <small></small>
                                    </div>
                                    <a className="card-sync"><Icon type="sync" /></a>
                                    <TitleALogo />
                                </Card>
                            </div>
                        </Col>
                        <Col xs={24} sm={24}  md={12} lg={8}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>首页轮播图</h2>
                                    </div>
                                    <Banner/>
                                </Card>
                            </div>
                        </Col>
                        <Col  xs={24} sm={24}  md={12} lg={8}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>联系方式</h2>
                                    </div>
                                    <Contact/>
                                </Card>
                            </div>
                        </Col>
                        <Col xs={24} sm={24}  md={12} lg={8}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2 >合作伙伴</h2>
                                    </div>
                                    <Partner partner={this.state.partner}/>
                                </Card>
                            </div>
                        </Col>
                        <Col  xs={24} sm={24} md={12} lg={8}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>我们的优势</h2>
                                        <small>该模块的ICON采用'Font Awesome'图标，在ICON字段中填入相关的'Font Awesome'图标名称，如'address-book'。注意不用填写前缀'fa-'。详情
                                            <a href="http://www.fontawesome.com.cn/faicons/">http://www.fontawesome.com.cn/faicons/</a></small>
                                    </div>
                                    <a className="card-sync"><Icon type="sync" /></a>
                                    <Advantage advantage={this.state.advantage}/>
                                </Card>
                            </div>
                        </Col>


                        <Col  xs={24} sm={24}  md={12} lg={8}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>友情链接</h2>
                                    </div>
                                    <FriendshipLink friendshipLink={this.state.friendshipLink}/>
                                </Card>
                            </div>
                        </Col>
                    </Masonry>

                </Row>
            </div>

        )
    }
}


export default TitleAndLogo
