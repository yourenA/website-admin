/**
 * Created by Administrator on 2017/6/14.
 */
import React, {Component} from 'react';
import {Breadcrumb, Table, Icon, Button, Modal, Popconfirm, Layout,message} from 'antd';
import axios from 'axios'
import {
    Link
} from 'react-router-dom';
import SearchWrap from  './search';
import configJson from 'configJson' ;
import {getHeader, converErrorCodeToMsg} from './../../common/common';
import AddOrEditName from './addOrEditNmae';
import Avatar from './avatar';
import messageJson from './../../common/message.json';
import avatar from './../../images/avatar.png'
import {connect} from 'react-redux';
import './index.less'
import Pswp  from './../../components/pswp'
const {Content,} = Layout;
class Manufacture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            q: '',
            page: 1,
            meta: {pagination: {total: 0, per_page: 0}},
            editModal: false,
            addModal: false,
            imageUrl:'',
            open:0
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo = (page = 1, q = '') => {
        const that = this;
                that.setState({
                    loading: false,
                    data:[{date:"2017-10-16 10:40:50",image:'http://img.weiot.net/portal/201401/29/200809um073mx02zoxdk7p.gif',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内,描述文字字数限制在140以内,描述文字字数限制在140以内,描述文字字数限制在140以内，描述文字字数限制在140以内,描述文字字数限制在140以内,描述文字字数限制在140以内,描述文字字数限制在140以内.'},
                        {date:"2017-10-16 10:40:50",image:'http://f12.baidu.com/it/u=1505322598,1727959990&fm=72 ',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内'},
                        {date:"2017-10-16 10:40:50",image:'http://f12.baidu.com/it/u=1505322598,1727959990&fm=72',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内'},
                        {date:"2017-10-16 10:40:50",image:'http://f12.baidu.com/it/u=1505322598,1727959990&fm=72',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内'},
                        {date:"2017-10-16 10:40:50",image:'http://f12.baidu.com/it/u=1505322598,1727959990&fm=72',desc:'这是简要新闻，包含一张图片，描述文字字数限制在140以内'},]
                })
    }
    editData=()=>{
        const editName = this.refs.EditName.getFieldsValue();
        console.log("addName",editName);
        document.querySelector('.banner')?console.log(document.querySelector('.banner').src):null
    }
    delData = (id)=> {
        const that = this;
        const {page, q}=this.state;
        console.log(id)
        // axios({
        //     url: `${configJson.prefix}/companies/${id}`,
        //     method: 'delete',
        //     headers: getHeader()
        // })
        //     .then(function (response) {
        //         console.log(response.data);
        //         message.success(messageJson[`del manufacture success`]);
        //         that.fetchHwData(page, q);
        //     }).catch(function (error) {
        //     console.log('获取出错', error);
        //     converErrorCodeToMsg(error)
        // })
    }

    onChangeSearch = (page, q,)=> {
        this.setState({
            page, q,
        })
        this.fetchHwData(page, q);
    }
    onPageChange = (page) => {
        const {q}=this.state;
        this.onChangeSearch(page, q);
    };
    openGallery=(image)=>{
        this.setState({
            open:this.state.open+1,
            imageUrl:image
        })
    }
    render() {
        const {data, page, meta} = this.state;
        const that=this;
        const renderNews=this.state.data.map(function (item,index) {
            return(
                <li key={index}>
                    <div className="news-content">
                        <div className="date">
                            {item.date}
                        </div>
                        <div className="desc">{item.desc}</div>
                        <div className="image"><img src={item.image} alt="" onClick={()=>that.openGallery(item.image)}/></div>
                        <div className="edit-icon">
                            <Icon type="edit" onClick={()=>that.setState({editRecord:item,editModal:true})}/>
                            <Popconfirm placement="bottomRight" title={ `确定要删除吗?`}
                                        onConfirm={that.delData.bind(that, item.id)}>
                                <Icon type="delete" />
                            </Popconfirm>
                        </div>
                    </div>
                </li>
            )
        })
        return (
            <div className="content config">
                <Content style={{background: '#fff', padding: '10px'}}>
                    <div className="news-box">
                        <div className="news-top">
                            <div className="left-avatar">
                                <div className="left-avatar">
                                    <Avatar imageUrl={avatar} />
                                </div>
                            </div>
                            <div className="right-input">
                                <AddOrEditName />
                            </div>
                        </div>
                        <div className="news-list">
                            <ul>
                                {renderNews}
                            </ul>
                        </div>
                    </div>

                </Content>
                <Pswp imageUrl={this.state.imageUrl}  open={this.state.open}/>
                <Modal
                    key={ Date.parse(new Date())}
                    visible={this.state.addModal}
                    title="添加简闻"
                    onCancel={()=> {
                        this.setState({addModal: false})
                    }}
                    footer={[
                        <Button key="back" type="ghost" size="large"
                                onClick={()=> {
                                    this.setState({addModal: false})
                                }}>取消</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.addData}>
                            保存
                        </Button>,
                    ]}
                >
                    <AddOrEditName  ref="AddName"/>
                </Modal>
                <Modal
                    key={ Date.parse(new Date()) + 1}
                    visible={this.state.editModal}
                    title="修改简闻"
                    onCancel={()=> {
                        this.setState({editModal: false})
                    }}
                    footer={[
                        <Button key="back" type="ghost" size="large"
                                onClick={()=> {
                                    this.setState({editModal: false})
                                }}>取消</Button>,
                        <Button key="submit" type="primary" size="large" onClick={this.editData}>
                            保存
                        </Button>,
                    ]}
                >
                    <AddOrEditName  ref="EditName"
                                    isEdit={true} editRecord={this.state.editRecord}/>
                </Modal>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        responsive: state.responsive,
    };
}
export default connect(mapStateToProps)(Manufacture);
