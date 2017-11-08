/**
 * Created by Administrator on 2017/10/11.
 */
import React, {Component} from 'react';
import {Table,Popconfirm,Pagination,Button,Modal} from 'antd';
import SearchWrap from './search'
class Detail extends Component {
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
            data:[{id:1,ip:'192.165.33.150',province:'广东',city:'广州',count:5,last_date:'2015/3/45 15:32:45'},{id:2,ip:'192.165.33.150',count:5,province:'广东',city:'广州',last_date:'2015/3/45 15:32:45'},{id:3,ip:'192.165.33.150',province:'广东',count:5,city:'广州',last_date:'2015/3/45 15:32:45'},
                {id:89,ip:'192.165.33.150',province:'广东',city:'广州',count:5,last_date:'2015/3/45 15:32:45'},{id:233,ip:'192.165.33.150',count:5,province:'广东',city:'广州',last_date:'2015/3/45 15:32:45'},{id:23,ip:'158.65.69.22',province:'',city:'北京',count:5,last_date:'2015/3/45 15:32:45'},],
        })

    }
    delData=()=>{

    }
    render() {
        const {data, page, meta} = this.state;
        const columns = [{
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        }, {
            title: '城市',
            dataIndex: 'city',
            key: 'city',
            render: (text, record, index) => {
                return(
                    <p>{record.province+'/'+record.city}</p>
                )
            }
        }, {
            title: '访问次数',
            dataIndex: 'count',
            key: 'count',
        }, {
            title: '最后访问时间',
            dataIndex: 'last_date',
            key: 'last_date',
        }];

        return (
            <div>
                <div className="operate-box">
                    <SearchWrap />
                </div>
                <Table bordered
                       rowKey="id" columns={columns}
                       dataSource={data} pagination={false}/>
                <Pagination total={meta.pagination.total} current={page} pageSize={meta.pagination.per_page}
                            style={{marginTop: '10px'}} onChange={this.onPageChange}/>
            </div>

        );
    }
}

export default Detail;