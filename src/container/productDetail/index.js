/**
 * Created by Administrator on 2017/6/14.
 */
import React, {Component} from 'react';
import {Breadcrumb, Alert, Icon, Button, Modal, Popconfirm, Layout, Col,Card} from 'antd';
import AddOrEditName from './addOrEditNmae';
import messageJson from './../../common/message.json';
import pc1 from './../../images/3.jpg'
import pc2 from './../../images/1.jpg'
import pc3 from './../../images/2.jpg'
import pc4 from './../../images/5.jpg'
import {connect} from 'react-redux';
import Dragula from 'react-dragula';
import TitleImage from './titleImage';
import './index.less'
import {sortable} from 'react-sortable';
import Pswp  from './../../components/pswp'
const {Content,} = Layout;
class ListItem extends Component {
    render () {
        return (
            <div {...this.props}>{this.props.children}</div>
        )
    }
}
var SortableListItem = sortable(ListItem);

class Manufacture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draggingIndex: null,
            data: [],
            loading: false,
            q: '',
            page: 1,
            meta: {pagination: {total: 0, per_page: 0}},
            editModal: false,
            addModal: false,
            imageUrl:'',
            open:0,
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo = (page = 1, q = '') => {
        const that = this;
        that.setState({
            loading: false,
            data: [{
                id: 1,
                title: '空调控制ECU1',
                desc: '该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',
                image: pc1
            },
                {
                    id: 2,
                    title: '空调控制ECU2',
                    desc: '该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',
                    image: pc2
                },
                {
                    id: 3,
                    title: '空调控制ECU3',
                    desc: '该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',
                    image: pc3
                },
                {
                    id: 4,
                    title: '空调控制ECU4',
                    desc: '该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',
                    image: pc4
                },
                {
                    id: 5,
                    title: '空调控制ECU5',
                    desc: '该产品能够完美替代原厂TOYOTA的相关空调控制ECU产品，实现对压缩机、空调控制面板、蒸发器、电机等的整个空调系统的控制。',
                    image: pc4
                }]
        })
    }
    updateState = obj=> {
        this.setState(obj,function () {
            if(obj.draggingIndex == null){
                console.log(this.state.data)
                let sortArr=this.state.data.map(function (item,index) {
                    return item.id
                })
                console.log('sortArr',sortArr)
            }
        });
    }
    openGallery=(image)=>{
        this.setState({
            open:this.state.open+1,
            imageUrl:image
        })
    }
    addData = ()=> {
        const that = this;
        const {page, q}=this.state;
        const addName = this.refs.AddName.getFieldsValue();
        console.log(addName)
        document.querySelector('.category')?console.log(document.querySelector('.category').src):null
        /*   axios({
         url: `${configJson.prefix}/companies`,
         method: 'post',
         data: addName,
         headers: getHeader()
         })
         .then(function (response) {
         console.log(response.data);
         message.success(messageJson[`add manufacture success`]);
         that.setState({
         addModal:false
         })
         that.fetchHwData(page, q);
         }).catch(function (error) {
         console.log('获取出错', error);
         converErrorCodeToMsg(error)
         })*/
    }
    editData=()=>{
        const editName = this.refs.EditName.getFieldsValue();
        const that = this;
        const {page, q}=this.state;
        console.log(editName)
        document.querySelector('.category')?console.log(document.querySelector('.category').src):null
        /*    axios({
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
         })*/
    }
    delData = (id)=> {
        const that = this;
        const {page, q}=this.state;
        console.log(id)
        /*      axios({
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
         })*/
    }
    render() {
        const that = this;
        const {data, page, meta} = this.state;
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
                    <li>
                        <div className="left">
                            <img src={item.image} alt="" onClick={()=>{that.openGallery(item.image)}} style={{cursor:'pointer'}}/>
                        </div>
                        <div className="right">
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <div className="edit-icon">
                                <Icon type="edit" onClick={()=>that.setState({editRecord:item,editModal:true})}/>
                                <Popconfirm placement="bottomRight" title={ `确定要删除吗?`}
                                            onConfirm={that.delData.bind(that, item.id)}>
                                <Icon type="delete" />
                                    </Popconfirm>
                            </div>
                        </div>
                    </li></SortableListItem>
            )
        })
        return (
            <div className="content config">

                <Content style={{background: '#fff', padding: '10px'}}>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>产品分类</Breadcrumb.Item>
                        <Breadcrumb.Item>EPB电子驻车制动系统</Breadcrumb.Item>
                        <Breadcrumb.Item>新建产品</Breadcrumb.Item>
                    </Breadcrumb>
                    <Col sm={24}  md={18} lg={10}>
                        <div >
                            <Card title="产品名称及顶部图片">
                                <TitleImage />
                            </Card>
                        </div>
                    </Col>
                    <div className="clearfix"></div>
                    <Alert message="拖动每一个内容块可以改变顺序" type="info" closable
                           style={{marginTop: '10px', marginBottom: '10px'}}/>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <Button type="primary" icon="plus" onClick={()=> {
                            this.setState({addModal: true})
                        }}>
                            添加内容块</Button>
                    </div>

                    <div className="product-detail">
                        <div  className='ul'>{renderdetailList}</div>

                    </div>
                    {
                        this.props.responsive.isMobile && (
                            <style>
                                {`
                        `}
                            </style>
                        )
                    }
                </Content>
                <Pswp imageUrl={this.state.imageUrl}  open={this.state.open}/>
                <Modal
                    key={ Date.parse(new Date())}
                    visible={this.state.addModal}
                    title="添加内容"
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
                    <AddOrEditName ref="AddName"/>
                </Modal>
                <Modal
                    key={ Date.parse(new Date()) + 1}
                    visible={this.state.editModal}
                    title="修改内容"
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
                    <AddOrEditName ref="EditName" isEdit={true} editRecord={this.state.editRecord}/>
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
