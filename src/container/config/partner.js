/**
 * Created by Administrator on 2017/10/11.
 */
import React, {Component} from 'react';
import {Table,Popconfirm,Pagination,Button,Modal} from 'antd';
import AddOrEditName from './addOrEditNmae';
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
        this.fetchData();
    }
    fetchData = (page = 1, q = '') => {
        const that=this;
            that.setState({
                meta: {pagination: {total: 2, per_page: 10}},
                data:[{id:1,name:'xxxx公司',province:'广东',city:'广州'},{id:2,name:'xxxx公司',province:'',city:'北京'},],
            })

    }
    delData=()=>{

    }
    render() {
        const {data, page, meta} = this.state;
        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '城市',
            dataIndex: 'city',
            key: 'city',
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
                    title="添加合作伙伴"
                    onCancel={()=> {
                        this.setState({addModal: false})
                    }}
                    footer={[
                        <Button key="back" type="ghost" size="large"
                                onClick={()=> {
                                    this.setState({editModal: false})
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
                    title="修改制造厂商"
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