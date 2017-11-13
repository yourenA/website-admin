/**
 * Created by Administrator on 2017/10/11.
 */
import React, {Component} from 'react';
import {Table,Popconfirm,Pagination,Button,Modal} from 'antd';
import axios from 'axios'
import configJson from 'configJson' ;
import {processResult} from './../../common/common.js';
import AddOrEditName from './friendshipAddOrEdit';
class Partner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            q: '',
            page: 1,
            meta: {pagination: {total: 0, per_page: 0}},
            editModal: false,
            addModal: false
        };
    }
    componentDidMount() {
        this.getInfo();
    }
    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/link`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    addData=()=>{
        const that = this;
        const addName = this.refs.AddName.getFieldsValue();
        axios({
            url: `${configJson.prefix}/link/add`,
            method: 'POST',
            data: addName,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.setState({
                        addModal: false
                    });
                    that.getInfo()
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }
    editData=()=>{
        const that = this;
        const editName = this.refs.EditName.getFieldsValue();
        axios({
            url: `${configJson.prefix}/link/edit/${this.state.editId}`,
            method: 'POST',
            data: editName,
        })
            .then(function (response) {
                console.log(response.data)
                processResult(response, function () {
                    that.setState({
                        editModal: false
                    });
                    that.getInfo()
                })
            }).catch(function (error) {
            console.log('获取出错', error);
        })
    }
    delData=(id)=>{
        console.log(id)
        const that=this;
        axios({
            url: `${configJson.prefix}/link/del/${id}`,
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
    render() {
        const {data, page, meta} = this.state;
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (text, record, index) => {
                return (

                    <a href={text} target="_blank"> {text&&text.length > 10 ? text.substring(0, 10) + '...' :text}</a>
                )
            }
        }
            , {
                title: '操作',
                key: 'action',
                width: 150,
                render: (text, record, index) => {
                    return (
                        <div key={index}>
                            <Button onClick={()=> {
                                this.setState({editId: record.id, editModal: true, editRecord: record})
                            }}>
                                编辑
                            </Button>
                            <span className="ant-divider"/>
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
            <div>
                <Button type="primary" icon="plus" style={{marginBottom:'10px'}} onClick={()=>{this.setState({addModal:true})}}>添加</Button>
                <Table bordered
                       size="small"
                       rowKey="id" columns={columns}
                       dataSource={data} pagination={false}/>
                <Pagination total={meta.pagination.total} current={page} pageSize={meta.pagination.per_page}
                            style={{marginTop: '10px'}} onChange={this.onPageChange}/>
                <Modal
                    key={ Date.parse(new Date()) }
                    visible={this.state.addModal}
                    title="添加友情链接"
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
                    <AddOrEditName  ref="AddName"
                                    />
                </Modal>
                <Modal
                    key={ Date.parse(new Date()) + 1}
                    visible={this.state.editModal}
                    title="修改友情链接"
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
                    <AddOrEditName  ref="EditName" editRecord={this.state.editRecord}
                                    isEdit={true} />
                </Modal>
            </div>

        );
    }
}

export default Partner;