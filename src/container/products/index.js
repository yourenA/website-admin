/**
 * Created by Administrator on 2017/6/14.
 */
import React, {Component} from 'react';
import {Breadcrumb, Table, Pagination, Button, Modal, Popconfirm, Layout,message} from 'antd';
import axios from 'axios'
import {
    Link
} from 'react-router-dom';
import SearchWrap from  './search';
import configJson from 'configJson' ;
import { processResult} from './../../common/common';
import AddName from './addName';
import {connect} from 'react-redux';
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
            meta: {pagination: {total: 0, per_page: 0}},
            editModal: false,
            addModal: false,
            currentPage:1,
            count:0,
            categoryName:''
        };
    }

    componentDidMount() {
        this.getInfo(this.state.currentPage);
        this.getCategoryName()
    }
    getCategoryName=()=>{
        const that = this;
        axios({
            url: `${configJson.prefix}/classify/getById`,
            method: 'get',
            params:{
                id:this.props.match.params.categoryId
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        categoryName: response.data.data.name,
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });
    }
    getInfo = (currentPage,query)=> {
        console.log(this.props)
        const that = this;
        axios({
            url: `${configJson.prefix}/product/${this.props.match.params.categoryId}`,
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
        var formData = new FormData();
        formData.append("name", addName.name);
        axios({
            url: `${configJson.prefix}/product/add/${this.props.match.params.categoryId}`,
            method: 'POST',
            data: formData,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    // that.props.history.push(`${that.props.match.url}/new`)
                    that.setState({
                        addModal: false
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
            url: `${configJson.prefix}/product/del/${id}`,
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

    render() {
        const {data, page, meta} = this.state;
        const columns = [{
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
        },  {
            title: '操作',
            key: 'action',
            width: this.props.responsive.isMobile?75:180,
            render: (text, record, index) => {
                return (
                    <div key={index}>
                        <Link
                            to={{
                                pathname:`${this.props.match.url}/${record.id}`,
                            }}
                        ><Button  type="primary">详情/修改</Button></Link>
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
                        <Breadcrumb.Item
                            style={{cursor:'pointer'}}
                            onClick={()=>{
                                this.props.history.goBack();
                            }}
                        >产品分类</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.categoryName}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="operate-box">
                        <SearchWrap onChangeSearch={this.onChangeSearch} {...this.state} {...this.props}/>
                        <Button  type="primary" onClick={()=>this.setState({addModal:true})}>添加产品</Button>
                    </div>
                    <Table bordered className="category-table"
                           loading={this.state.loading}
                           size={this.props.responsive.isMobile?'small':'default'}
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

                <Modal
                    key={ Date.parse(new Date())}
                    visible={this.state.addModal}
                    title="添加产品"
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
                    <AddName  ref="AddName"/>
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
