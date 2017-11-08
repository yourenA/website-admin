/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import { Row, Col, Card, Timeline, Icon } from 'antd';
import Masonry from 'react-masonry-component';
import Count from './count'
import City from './city'
import Proportion from './proportion'
import Detail from './detail'
import './index.less'
class Data extends React.Component {
    constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
        };
    }

    render() {
        var masonryOptions = {
            transitionDuration: 0
        };
        return (
            <div className="content config web-data">
                <Row >
                        <Col sm={24}  md={24} lg={24}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>访问量统计</h2>
                                        <small>总浏览数: <b>15200</b></small>
                                    </div>
                                    <Count />
                                </Card>
                            </div>
                        </Col>
                        <Col sm={24}  md={12} lg={12}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>访问设备统计</h2>
                                        <small></small>
                                    </div>
                                    <Proportion />
                                </Card>
                            </div>
                        </Col>
                        <Col sm={24}  md={12} lg={12}>
                            <div >
                                <Card bordered={false}>
                                    <div className="card-title">
                                        <h2>访问者地域分布</h2>
                                        <small></small>
                                    </div>
                                    <City />
                                </Card>
                            </div>
                        </Col>
                    <Col sm={24}  md={24} lg={24}>
                        <div >
                            <Card bordered={false}>
                                <div className="card-title">
                                    <h2>访问详情</h2>
                                    <small></small>
                                </div>
                                <Detail />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>

        )
    }
}


export default Data