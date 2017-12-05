/**
 * Created by Administrator on 2017/3/24.
 */
import React, {Component} from 'react';
import { Input,Cascader,DatePicker,Button} from 'antd';
import {provinceAndCity} from './../../common/common'
const Search = Input.Search;
const {  RangePicker } = DatePicker;
class UserManageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip:'',
            cap:'',
            floor:'',
            city:'',
            date:''
        };
    }

    componentDidMount() {
    }

    onChangeSearchText = (value)=> {
        console.log(value)
        // this.props.onChangeSearch(1, page,value)
    };
    onChangeRange=(date, dateString) =>{
        console.log( dateString);
        this.setState({
            date:date,
            cap:dateString[1],
            floor:dateString[0],
        })
    }
    onChangeValue=(e)=>{
        this.setState({
            ip:e.target.value
        })
    }
    onChangeCity=(value)=>{
        console.log(value)
        this.setState({
            city:value
        })
    }
    render() {
        const residences = provinceAndCity();
        return (
            <div className="search-wrap">
                <span>IP : </span>
                <Search
                    defaultValue={''}
                    value={this.state.ip}
                    style={{width: 150}}
                    onChange={value=>this.onChangeValue(value)}
                />
                <span className="ant-divider"/>
                <span>城市 : </span>
                <Cascader  placeholder="请选择" value={this.state.city} options={residences} onChange={this.onChangeCity}/>
                <span className="ant-divider"/>
                <span>最后访问时间 : </span>
                <RangePicker onChange={this.onChangeRange} value={this.state.date}/>
                <Button  className='btn' type='primary' onClick={()=>{
                    this.props.onChangeSearch( 1,this.state.ip,this.state.city[this.state.city.length-1],this.state.cap,this.state.floor)
                }}>查询</Button>
                <Button className='btn' onClick={()=>{
                    this.setState({
                        ip:'',
                        cap:'',
                        floor:'',
                        city:'',
                        date:''
                    })
                    this.props.onChangeSearch( 1,'')
                }}>清空</Button>

            </div>

        );
    }
}

export default UserManageSearch;