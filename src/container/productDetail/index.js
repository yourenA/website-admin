/**
 * Created by Administrator on 2017/6/14.
 */
import React, {Component} from 'react';
import {Breadcrumb, Alert, Icon, Button, Modal, Popconfirm, Layout, Col,Card,message} from 'antd';
import AddOrEditName from './addOrEditNmae';
import axios from 'axios'
import {connect} from 'react-redux';
import TitleImage from './titleImage';
import './index.less'
import {sortable} from 'react-sortable';
import Pswp  from './../../components/pswp'
import { processResult} from './../../common/common';
import configJson from 'configJson' ;

const {Content,} = Layout;
class ListItem extends Component {
    render () {
        return (
            <div {...this.props}>{this.props.children}</div>
        )
    }
}
var SortableListItem = sortable(ListItem);

class Manufacture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draggingIndex: null,
            data: [],
            content:[],
            loading: false,
            q: '',
            page: 1,
            meta: {pagination: {total: 0, per_page: 0}},
            editModal: false,
            addModal: false,
            imageUrl:'',
            open:0,
        };
    }

    componentDidMount() {
        this.getInfo();
        this.getContent();
    }

    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/classify/`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    getContent=()=>{
        const that = this;
        axios({
            url: `${configJson.prefix}/content/${this.props.match.params.productId}/1`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        content:response.data.data.rows
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    updateState = obj=> {
        this.setState(obj,function () {
            if(obj.draggingIndex == null){
                let sortArr=this.state.content.map(function (item,index) {
                    return item.id
                })
                console.log('sortArr',sortArr)
            }
        });
    }
    openGallery=(image)=>{
        this.setState({
            open:this.state.open+1,
            imageUrl:image
        })
    }
    addData = ()=> {
        const that = this;
        const addName = this.refs.AddName.getFieldsValue();
        console.log(addName);
        for(let key in  addName){
            if(!addName[key]){
                message.error('所有字段都不能为空');
                return false
            }
        }
        if(!document.querySelector('#contentFile').files[0]){
            message.error('所有字段都不能为空');
            return false
        }
        var formData = new FormData();
        formData.append("title", addName.title);
        formData.append("description", addName.description);
        formData.append("contentUrl", document.querySelector('#contentFile').files[0]);
        axios({
            url: `${configJson.prefix}/content/add/${this.props.match.params.productId}`,
            method: 'POST',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.setState({
                        addModal: false
                    });
                    that.getContent()
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }
    editData=()=>{
        const editName = this.refs.EditName.getFieldsValue();
        const that = this;
        console.log(editName);
        for(let key in  editName){
            if(!editName[key]){
                message.error('所有字段都不能为空');
                return false
            }
        }
        var formData = new FormData();
        formData.append("title", editName.title);
        formData.append("description", editName.description);
        formData.append("contentUrl", document.querySelector('#contentFile').files[0]);
        axios({
            url: `${configJson.prefix}/content/edit/${this.props.match.params.productId}`,
            method: 'POST',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.setState({
                        editModal: false
                    });
                    that.getContent()
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }
    delData = (id)=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/content/del/${id}`,
            method: 'POST',
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.getContent()
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }
    render() {
        const that = this;
        const {content, page, meta} = this.state;
        const renderdetailList = content.map(function (item, index) {
            return (
                <SortableListItem
                    key={index}
                    updateState={that.updateState}
                    items={content}
                    draggingIndex={that.state.draggingIndex}
                    sortId={index}
                    outline="list"
                >
                    <li>
                        <div className="left">
                            <img src={`${configJson.prefix}${item.contentUrl}`} alt="" onClick={()=>{that.openGallery(item.image)}} style={{cursor:'pointer'}}/>
                        </div>
                        <div className="right">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <div className="edit-icon">
                                <Icon type="edit" onClick={()=>that.setState({editRecord:item,editModal:true})}/>
                                <Popconfirm placement="bottomRight" title={ `确定要删除吗?`}
                                            onConfirm={that.delData.bind(that, item.id)}>
                                <Icon type="delete" />
                                    </Popconfirm>
                            </div>
                        </div>
                    </li></SortableListItem>
            )
        })
        console.log(this.props)
        return (
            <div className="content config">

                <Content style={{background: '#fff', padding: '10px'}}>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>产品分类</Breadcrumb.Item>
                        <Breadcrumb.Item
                            style={{cursor:'pointer'}}
                            onClick={()=>{
                            this.props.history.goBack();
                        }}>{this.props.match.params.categoryId}</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.props.match.params.productId}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Col sm={24}  md={18} lg={10}>
                        <div >
                            <Card title="产品名称及顶部图片">
                                <TitleImage productUrl={this.state.productUrl} productId={this.props.match.params.productId}/>
                            </Card>
                        </div>
                    </Col>
                    <div className="clearfix"></div>
                    <Alert message="拖动每一个内容块可以改变顺序" type="info" closable
                           style={{marginTop: '10px', marginBottom: '10px'}}/>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <Button type="primary" icon="plus" onClick={()=> {
                            this.setState({addModal: true})
                        }}>
                            添加内容块</Button>
                    </div>

                    <div className="product-detail">
                        <div  className='ul'>{renderdetailList}</div>

                    </div>
                    {
                        this.props.responsive.isMobile && (
                            <style>
                                {`
                        `}
                            </style>
                        )
                    }
                </Content>
                <Pswp imageUrl={this.state.imageUrl}  open={this.state.open}/>
                <Modal
                    key={ Date.parse(new Date())}
                    visible={this.state.addModal}
                    title="添加内容"
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
                    <AddOrEditName ref="AddName"/>
                </Modal>
                <Modal
                    key={ Date.parse(new Date()) + 1}
                    visible={this.state.editModal}
                    title="修改内容"
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
                    <AddOrEditName ref="EditName" isEdit={true} editRecord={this.state.editRecord}/>
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
