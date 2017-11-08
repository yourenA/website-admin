/**
 * Created by Administrator on 2017/3/24.
 */
import React, {Component} from 'react';
import { Input,Cascader,DatePicker} from 'antd';
const Search = Input.Search;
const { MonthPicker, RangePicker } = DatePicker;
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
        const {  page}=this.props;
        // this.props.onChangeSearch(1, page,value)
    };
    onChange=(date, dateString) =>{
        console.log(date, dateString);
    }
    render() {
        const residences = [{
            value: '北京',
            label: '北京',
        }, {
            value: '江苏',
            label: '江苏',
            children: [{
                value: '南京',
                label: '南京',
            }],
        }, {
            value: '广东',
            label: '广东',
            children: [{
                value: '广州',
                label: '广州',
            },{
                value: '佛山',
                label: '佛山',
            }],
        }];
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
                <span>时间 : </span>
                <RangePicker onChange={this.onChange} />
            </div>

        );
    }
}

export default UserManageSearch;