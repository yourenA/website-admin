/**
 * Created by Administrator on 2017/3/24.
 */
import React, {Component} from 'react';
import { Input,Cascader,DatePicker} from 'antd';
import {provinceAndCity} from './../../common/common'
const Search = Input.Search;
const {  RangePicker } = DatePicker;
class UserManageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    onChangeSearchText = (value)=> {
        console.log(value)
        // this.props.onChangeSearch(1, page,value)
    };
    onChange=(date, dateString) =>{
        console.log(date, dateString);
    }
    render() {
        const residences = provinceAndCity();
        return (
            <div className="search-wrap">
                <span>IP : </span>
                <Search
                    defaultValue={''}
                    style={{width: 150}}
                    onSearch={value => this.onChangeSearchText(value)}
                />
                <span className="ant-divider"/>
                <span>城市 : </span>
                <Cascader placeholder="请选择" options={residences} />
                <span className="ant-divider"/>
                <span>最后访问时间 : </span>
                <RangePicker onChange={this.onChange} />
            </div>

        );
    }
}

export default UserManageSearch;