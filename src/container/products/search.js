/**
 * Created by Administrator on 2017/3/24.
 */
import React, {Component} from 'react';
import { Input,Button} from 'antd';
const Search = Input.Search;
class UserManageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:''
        };
    }

    componentDidMount() {
    }

    onChangeSearchText = (value)=> {
        console.log(value)
        const {  currentPage}=this.props;
        this.props.onChangeSearch( 1,value)
    };
    changeValue=(e)=>{
        this.setState({
            value:e.target.value
        })
    }
    render() {
        return (
            <div className="search-wrap">
                <span>名称: </span>
                <Input
                    defaultValue={''}
                    value={this.state.value}
                    style={{width: 150}}
                    onChange={value=>this.changeValue(value)}
                />
                <Button  className='btn' type='primary' onClick={()=>{
                    this.props.onChangeSearch( 1,this.state.value)
                }}>查询</Button>
                <Button className='btn' onClick={()=>{
                    this.setState({
                        value:''
                    })
                    this.props.onChangeSearch( 1,'')
                }}>清空</Button>

            </div>

        );
    }
}

export default UserManageSearch;