/**
 * Created by Administrator on 2017/6/13.
 */
import React, {Component} from 'react'
import {Button, message, Alert, Upload, Tooltip, Form, Popconfirm, Modal} from 'antd';
import {sortable} from 'react-sortable';
import AddOrEditBanner from './addOrEditBanner';
import './banner.less'
import axios from 'axios'
import configJson from 'configJson' ;
import {processResult} from './../../common/common.js';

class ListItem extends Component {
    render() {
        return (
            <div {...this.props}>{this.props.children}</div>
        )
    }
}
var SortableListItem = sortable(ListItem);
class Demo extends React.Component {
    state = {
        data: []
    };
    componentDidMount = ()=> {
        this.getInfo()
    }
    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/slideShow`,
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
    updateState = obj=> {
        this.setState(obj, function () {
            if (obj.draggingIndex == null) {
                console.log(this.state.data)
                let sortArr = this.state.data.map(function (item, index) {
                    return item.id
                })
                console.log('sortArr', sortArr);
                axios({
                    url: `${configJson.prefix}/slideShow/change`,
                    method: 'post',
                    data:{change:sortArr}
                })
                    .then(function (response) {
                        console.log(response);
                        if (response.data.status === 200) {
                            message.success(response.data.body);

                        } else {
                            message.error(response.data.body);
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        });
    }
    addData = ()=> {
        const that = this;
        const addName = this.refs.AddName.getFieldsValue();
        console.log("addName", addName);
        for(let key in  addName){
            if(!addName[key]){
                message.error('所有字段都不能为空');
                return false
            }
        }
        if(!document.querySelector('#slideFile').files[0]){
            message.error('所有字段都不能为空');
            return false
        }
        var formData = new FormData();
        formData.append("title", addName.title);
        formData.append("description", addName.description);
        formData.append("link", addName.link);
        formData.append("slideshowUrl", document.querySelector('#slideFile').files[0]);
        axios({
            url: `${configJson.prefix}/slideShow/add`,
            method: 'POST',
            data: formData,
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
    editData = ()=> {
        const that=this;
        const editName = this.refs.EditName.getFieldsValue();
        console.log("addName", editName);
        for(let key in  editName){
            if(!editName[key]){
                message.error('所有字段都不能为空');
                return false
            }
        }
        var formData = new FormData();
        formData.append("title", editName.title);
        formData.append("description", editName.description);
        formData.append("link", editName.link);
        formData.append("slideshowUrl", document.querySelector('#slideFile').files[0]);
        axios({
            url: `${configJson.prefix}/slideShow/edit/${this.state.editId}`,
            method: 'POST',
            data: formData,
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
    delData = (id)=> {
        const that=this;
        axios({
            url: `${configJson.prefix}/slideShow/del/${id}`,
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
        const that = this;
        const data = this.state.data;
        const renderdetailList = data.map(function (item, index) {
            return (
                <SortableListItem
                    key={index}
                    updateState={that.updateState}
                    items={data}
                    draggingIndex={that.state.draggingIndex}
                    sortId={index}
                    outline="list"
                >
                    <div className="banner-table-row">
                        <div className="banner-table-cell">{item.title}</div>
                        <div className="banner-table-cell">
                            <Tooltip title={item.description}>
                                {item.description&&item.description.length > 10 ? item.description.substring(0, 10) + '...' : item.description}
                            </Tooltip></div>
                        <div className="banner-table-cell">{item.link}</div>
                        <div className="banner-table-cell"><img src={`${configJson.prefix}${item.slideshowUrl}`}
                                                                alt=""/></div>
                        <div className="banner-table-cell">
                            <Button  onClick={()=> {
                                that.setState({editId: item.id, editModal: true, editRecord: item})
                            }}>编辑</Button>
                            <Popconfirm placement="topRight" title={ `确定要删除吗?`}
                                        onConfirm={that.delData.bind(that, item.id)}>
                                <Button style={{marginTop: '5px'}} type='danger'>
                                    删除
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                </SortableListItem>
            )
        })
        return (
            <div>
                <Alert message="拖动每一行可以改变顺序" type="info" closable
                       style={{marginTop: '10px', marginBottom: '10px'}}/>
                <Button type="primary" icon="plus" style={{marginBottom: '10px'}} onClick={()=> {
                    this.setState({addModal: true})
                }}>添加</Button>
                <div className="banner-wrap">

                    <div className="banner-table-row banner-table-row-header">
                        <div className="banner-table-cell">标题</div>
                        <div className="banner-table-cell">描述</div>
                        <div className="banner-table-cell">链接</div>
                        <div className="banner-table-cell">图片</div>
                        <div className="banner-table-cell">操作</div>
                    </div>
                    {renderdetailList}
                    <Modal
                        key={ Date.parse(new Date()) }
                        visible={this.state.addModal}
                        title="添加轮播图"
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
                        <AddOrEditBanner ref="AddName"
                        />
                    </Modal>
                    <Modal
                        key={ Date.parse(new Date()) + 1}
                        visible={this.state.editModal}
                        title="修改轮播图"
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
                        <AddOrEditBanner ref="EditName"
                                         isEdit={true} editRecord={this.state.editRecord}/>
                    </Modal>
                </div>
            </div>

        )
    }
}
const WrappedDemo = Form.create()(Demo);

export default WrappedDemo