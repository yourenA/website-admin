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
import {getHeader, converErrorCodeToMsg} from './../../common/common';
import AddName from './addName';
import messageJson from './../../common/message.json';
import icon1 from './../../images/icon1.png'
import icon2 from './../../images/icon2.png'
import icon3 from './../../images/icon3.png'
import icon4 from './../../images/icon5.png'
import icon5 from './../../images/icon4.png'
import image1 from './../../images/1.jpg'
import image2 from './../../images/2.jpg'
import image3 from './../../images/3.jpg'
import image4 from './../../images/item4.jpg'
import image5 from './../../images/5.jpg'
import {connect} from 'react-redux';
import './index.less'
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
            addModal: false
        };
    }

    componentDidMount() {
        this.fetchHwData();
    }

    fetchHwData = (page = 1, q = '') => {
        const that = this;
                that.setState({
                    loading: false,
                    data: [{
                        id: 0,
                        icon: icon5,
                        name: '产品0',
                        desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。',
                        image:image1
                    },
                        {id: 1, icon: icon3,image:image5, name: '产品1', desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
                        {id: 2, icon: icon4,image:image2, name: '产品2', desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
                        {id: 3, icon: icon1,image:image3, name: '产品3', desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'},
                        {id: 4, icon: icon2,image:image4, name: '产品4', desc: '电动助力转向系统（Electric Power Steering），既节省能量，又保护了环境。'}],
                })
    }
    addData = ()=> {
        const that = this;
        const {page, q}=this.state;
        const addName = this.refs.AddName.getFieldsValue();
        this.props.history.push(`${this.props.match.url}/new`)
        // axios({
        //     url: `${configJson.prefix}/companies`,
        //     method: 'post',
        //     data: addName,
        //     headers: getHeader()
        // })
        //     .then(function (response) {
        //         console.log(response.data);
        //         message.success(messageJson[`add manufacture success`]);
        //         that.setState({
        //             addModal:false
        //         })
        //         that.fetchHwData(page, q);
        //     }).catch(function (error) {
        //     console.log('获取出错', error);
        //     converErrorCodeToMsg(error)
        // })
    }
    editData=()=>{
        const editName = this.refs.EditName.getFieldsValue();
        const that = this;
        const {page, q}=this.state;
        axios({
            url: `${configJson.prefix}/companies/${this.state.editId}`,
            method: 'put',
            params: editName,
            headers: getHeader()
        })
            .then(function (response) {
                console.log(response.data);
                message.success(messageJson[`edit manufacture success`]);
                that.setState({
                    editModal:false
                });
                that.fetchHwData(page, q);
            }).catch(function (error) {
            console.log('获取出错', error);
            converErrorCodeToMsg(error)
        })
    }
    delData = (id)=> {
        const that = this;
        const {page, q}=this.state;
        axios({
            url: `${configJson.prefix}/companies/${id}`,
            method: 'delete',
            headers: getHeader()
        })
            .then(function (response) {
                console.log(response.data);
                message.success(messageJson[`del manufacture success`]);
                that.fetchHwData(page, q);
            }).catch(function (error) {
            console.log('获取出错', error);
            converErrorCodeToMsg(error)
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
                        <Breadcrumb.Item>产品分类</Breadcrumb.Item>
                        <Breadcrumb.Item>EPB电子驻车制动系统</Breadcrumb.Item>
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
                    <Pagination total={meta.pagination.total} current={page} pageSize={meta.pagination.per_page}
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
