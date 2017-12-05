/**
 * Created by Administrator on 2017/6/14.
 */
import React, {Component} from 'react';
import {Tooltip, Table, Pagination, Button, Modal, Popconfirm, Layout,message,Breadcrumb} from 'antd';
import axios from 'axios'
import {
    Link
} from 'react-router-dom';
import SearchWrap from  './search';
import configJson from 'configJson' ;
import { processResult} from './../../common/common';
import AddOrEditName from './addOrEditNmae';
import {connect} from 'react-redux';
import Pswp  from './../../components/pswp'
import './index.less'
const {Content,} = Layout;
class Manufacture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            query: '',
            page: 1,
            editModal: false,
            addModal: false,
            open:0,
            currentPage:1,
            count:0
        };
    }

    componentDidMount() {
        this.getInfo(this.state.currentPage);
    }

    getInfo = (currentPage,query)=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/classify`,
            method: 'get',
            params:{
                name:query,
                currentPage
            }
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
        for(let key in  addName){
            if(!addName[key]){
                message.error('所有字段都不能为空');
                return false
            }
        }
        if(!document.querySelector('#categoryFile').files[0]){
            message.error('所有字段都不能为空');
            return false
        }
        var formData = new FormData();
        formData.append("name", addName.name);
        formData.append("description", addName.description);
        formData.append("classifyUrl", document.querySelector('#categoryFile').files[0]);
        axios({
            url: `${configJson.prefix}/classify/add`,
            method: 'POST',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.setState({
                        addModal: false
                    });
                    that.getInfo(that.state.currentPage,that.state.query)
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
        formData.append("name", editName.name);
        formData.append("description", editName.description);
        formData.append("classifyUrl", document.querySelector('#categoryFile').files[0]);
        axios({
            url: `${configJson.prefix}/classify/edit/${this.state.editId}`,
            method: 'POST',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.setState({
                        editModal: false
                    });
                    that.getInfo(that.state.currentPage,that.state.query)
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }
    delData = (id)=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/classify/del/${id}`,
            method: 'POST',
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.getInfo(that.state.currentPage,that.state.query)
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }

    onChangeSearch = (currentPage, query,)=> {
        this.setState({
            currentPage, query,
        })
        this.getInfo(currentPage, query);
    }
    onPageChange = (currentPage) => {
        const {query}=this.state;
        this.onChangeSearch(currentPage, query);
    };
    openGallery=(image)=>{
        this.setState({
            open:this.state.open+1,
            imageUrl:image
        })
    }
    render() {
        const {data, page, meta} = this.state;
        const columns = [{
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
            render: (text) => {
                if(text){
                    return (
                        <Tooltip title={text}>
                            <span>{this.props.responsive.isMobile?text.substr(0, 5):text.substr(0, 35)}</span>
                        </Tooltip>
                    )
                }else{
                    return null
                }

            }
        }, {
            title: '图片',
            dataIndex: 'classifyUrl',
            key: 'classifyUrl',
            render: (text, record, index) => {
                return (
                    <div key={index} className="image" onClick={()=>this.openGallery(`${configJson.prefix}${text}`)} style={{cursor:'pointer'}}>
                        <img src={`${configJson.prefix}${text}`} alt=""/>
                    </div>
                )
            }
        },{
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            render: (text) => {
                if(text){
                    return (
                        <Tooltip title={text}>
                            <span>{this.props.responsive.isMobile?text.substr(0, 10):text.substr(0, 30)}</span>
                        </Tooltip>
                    )
                }else{
                    return null
                }

            }
        },  {
            title: '操作',
            key: 'action',
            width: this.props.responsive.isMobile?75:220,
            render: (text, record, index) => {
                return (
                    <div key={index}>
                        <Button onClick={()=> {
                            this.setState({editId: record.id, editModal: true, editRecord: record})
                        }}>
                            编辑
                        </Button>
                        {this.props.responsive.isMobile?null: <span className="ant-divider"/>}
                        <Link
                            to={{
                                pathname:`${this.props.match.url}/${record.id}`,
                            }}
                        ><Button  type="primary">产品</Button></Link>
                        {this.props.responsive.isMobile?null: <span className="ant-divider"/>}

                        <Popconfirm placement="topRight" title={ `确定要删除吗?`}
                                    onConfirm={this.delData.bind(this, record.id)}>
                            <button className="ant-btn ant-btn-danger">
                                删除
                            </button>
                        </Popconfirm>

                    </div>
                )
            }
        }];
        return (
            <div className="content config">
                <Content style={{background: '#fff', padding: '10px'}}>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>产品分类</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="operate-box">
                        <SearchWrap onChangeSearch={this.onChangeSearch} {...this.state} {...this.props}/>
                        <Button type="primary" icon="plus" onClick={()=> {
                        this.setState({addModal: true})
                    }}>
                        添加产品分类</Button>
                    </div>
                    <Table bordered className="category-table"
                           size={this.props.responsive.isMobile?'small':'default'}
                           loading={this.state.loading}
                           rowKey="id" columns={columns}
                           dataSource={data} pagination={false}/>
                    <Pagination total={this.state.count} current={this.state.currentPage} pageSize={10}
                                style={{marginTop: '10px'}} onChange={this.onPageChange}/>
                    {
                        this.props.responsive.isMobile && (
                            <style>
                                {`
                            .ant-table *{
                                font-size: 12px  !important;
                            }
                            .ant-table .ant-btn{
                                margin-bottom:5px;
                            }
                        `}
                            </style>
                        )
                    }
                </Content>
                <Pswp imageUrl={this.state.imageUrl}  open={this.state.open}/>
                <Modal
                    key={ Date.parse(new Date())}
                    visible={this.state.addModal}
                    title="添加产品分类"
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
                    title="修改产品分类"
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
