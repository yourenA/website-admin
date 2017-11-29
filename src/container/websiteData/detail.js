/**
 * Created by Administrator on 2017/10/11.
 */
import React, {Component} from 'react';
import {Table,Pagination} from 'antd';
import SearchWrap from './search'
import axios from 'axios'
import configJson from 'configJson' ;
import moment from 'moment'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            ip:'',
            city:'',
            cap:'',
            floor:'',
            currentPage:1,
            meta: {pagination: {total: 0, per_page: 0}},
            editModal: false,
            addModal: false
        };
    }
    componentDidMount() {
        this.getInfo(this.state.currentPage);
    }

    getInfo = (currentPage,ip,city,cap,floor)=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/visitor/${currentPage}`,
            method: 'get',
            params:{
                ip,city,cap,floor
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
    onChangeSearch = (currentPage, ip,city,cap,floor)=> {
        this.setState({
            currentPage, ip,city,cap,floor
        })
        this.getInfo(currentPage, ip,city,cap,floor);
    }
    onPageChange = (currentPage) => {
        const {ip,city,cap,floor}=this.state;
        this.onChangeSearch(currentPage, ip,city,cap,floor);
    };
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
            dataIndex: 'ipCount',
            key: 'ipCount',
        }, {
            title: '最后访问时间',
            dataIndex: 'updated',
            key: 'updated',
            render:val=>{
                return(
                    <p>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</p>
                )
            }
        }];

        return (
            <div>
                <div className="operate-box">
                    <SearchWrap onChangeSearch={this.onChangeSearch} {...this.state} {...this.props}/>
                </div>
                <Table bordered
                       rowKey="id" columns={columns}
                       dataSource={data} pagination={false}/>
                <Pagination total={this.state.count} current={this.state.currentPage} pageSize={10}
                            style={{marginTop: '10px'}} onChange={this.onPageChange}/>
            </div>

        );
    }
}

export default Detail;