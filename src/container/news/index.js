/**
 * Created by Administrator on 2017/6/14.
 */
import React, {Component} from 'react';
import {Breadcrumb, Table, Icon, Button, Modal, Popconfirm, Layout,message} from 'antd';
import axios from 'axios'
import configJson from 'configJson' ;
import {processResult} from './../../common/common';
import AddOrEditName from './addOrEditNmae';
import Avatar from './avatar';
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
    getInfo = (currentPage)=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/introduction`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data.rows,
                        count: response.data.data.count
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    addData = ()=> {
        const that = this;
        const addName = this.refs.AddName.getFieldsValue();
        console.log(addName);
        if(!addName.description){
            message.error('请输入内容');
            return false
        }
        if(addName.description.length>140){
            message.error('内容长度超过140个字符');
            return false
        }
        var formData = new FormData();
        formData.append("description", addName.description);
        if(document.querySelector('#newsFile').files.length){
            formData.append("imageUrl", document.querySelector('#newsFile').files[0]);
        }
        axios({
            url: `${configJson.prefix}/introduction/add`,
            method: 'POST',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.getInfo()
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }
    editData=()=>{
        const that = this;
        const editName = this.refs.EditName.getFieldsValue();
        console.log(editName);
        if(!editName.description){
            message.error('请输入内容');
            return false
        }
        if(editName.description.length>140){
            message.error('内容长度超过140个字符');
            return false
        }
        var formData = new FormData();
        formData.append("description", editName.description);
        if(document.querySelector('#editNewsFile').files.length){
            formData.append("imageUrl", document.querySelector('#editNewsFile').files[0]);
        }
        axios({
            url: `${configJson.prefix}/introduction/edit/${this.state.editRecord.id}`,
            method: 'POST',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.getInfo();
                    that.setState({
                        editModal:false
                    })
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }
    delData = (id)=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/introduction/del/${id}`,
            method: 'POST',
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.getInfo()
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
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
                        <div className="desc">{item.description}</div>
                        <div className="image">{item.imageUrl?<img src={`${configJson.prefix}${item.imageUrl}`} alt="" onClick={()=>that.openGallery(`${configJson.prefix}${item.imageUrl}`)}/>:null}</div>
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
                                    <Avatar />
                                </div>
                            </div>
                            <div className="right-input">
                                <AddOrEditName ref="AddName" addData={this.addData}/>
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
