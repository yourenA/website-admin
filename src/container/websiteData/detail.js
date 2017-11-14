/**
 * Created by Administrator on 2017/10/11.
 */
import React, {Component} from 'react';
import {Table,Pagination} from 'antd';
import SearchWrap from './search'
import axios from 'axios'
import configJson from 'configJson' ;

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
        this.getInfo(this.state.currentPage);
    }

    getInfo = (currentPage)=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/visitor`,
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
                    <p>{(record.province?record.province+'/':'')+record.city}</p>
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