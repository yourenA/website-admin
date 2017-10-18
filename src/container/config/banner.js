/**
 * Created by Administrator on 2017/6/13.
 */
import React ,{Component} from 'react'
import {Button, message, Icon, Upload, Input, Form,Popconfirm,Modal} from 'antd';
import {sortable} from 'react-sortable';
import pc1 from './../../images/1.jpg'
import pc2 from './../../images/2.jpg'
import pc3 from './../../images/3.jpg'
import AddOrEditBanner from './addOrEditBanner';
import './banner.less'
const FormItem = Form.Item;

class ListItem extends Component {
    render () {
        return (
            <div {...this.props}>{this.props.children}</div>
        )
    }
}
var SortableListItem = sortable(ListItem);
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    console.log(file)
    const isJPG = file.type .indexOf('image');
    const isLt10KB = file.size / 1024  < 10;
    console.log(isLt10KB);
    if (!isLt10KB) {
        message.error('Image must smaller than 10kb!');
    }
    return isJPG && isLt10KB;
}
class Demo extends React.Component {
    state = {
        data:[]
    };
    componentDidMount = ()=> {
        this.setState({
            draggingIndex: null,
            imageUrl:'/pc1.jpg',
            data:[{imageUrl:pc1,title:'辂轺科技',desc:'专注于汽车电子控制单元产品开发'},{imageUrl:pc2,title:'辂轺产品',desc:'专注于汽车电子控制单'},{imageUrl:pc3,title:'辂轺科技3',desc:'专注于汽车电专注于汽车电子控制单元产品开发'}]
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    updateState = obj=> {
        this.setState(obj,function () {
            if(obj.draggingIndex == null){
                console.log(this.state.data)
                console.log('提交更改')
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        const that=this;
        const imageUrl = this.state.imageUrl;
        const data=this.state.data;
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
                        <div className="banner-table-cell">{item.desc}</div>
                        <div className="banner-table-cell"><img src={item.imageUrl} alt=""/></div>
                        <div className="banner-table-cell">
                            <Button type='primary' onClick={()=> {
                                that.setState({editId: item.id, editModal: true, editRecord: item})
                            }}>编辑</Button>
                            <Popconfirm placement="topRight" title={ `确定要删除吗?`}
                                        >
                                <Button style={{marginTop:'5px'}} type='danger'>
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
                <Button type="primary" icon="plus" style={{marginBottom:'10px'}} onClick={()=>{this.setState({addModal:true})}}>添加</Button>
                <div className="banner-wrap">
                    {/*<Form >
                     <FormItem
                     {...formItemLayout}
                     label="banner图片"
                     >
                     <div className="dropbox">
                     {getFieldDecorator('dragger', {
                     valuePropName: 'fileList',
                     getValueFromEvent: this.normFile,
                     })(
                     <Upload
                     className="banner-uploader"
                     name="banner"
                     showUploadList={false}
                     action="http//jsonplaceholder.typicode.com/posts/"
                     beforeUpload={beforeUpload}
                     onChange={this.handleChange}
                     >
                     {
                     imageUrl ?
                     <img src={imageUrl} alt="" className="banner" /> :
                     <Icon type="plus" className="banner-uploader-trigger" />
                     }
                     </Upload>
                     )}
                     </div>
                     </FormItem>
                     <FormItem
                     label="slogan"
                     {...formItemLayout}>
                     {getFieldDecorator('slogan', {
                     initialValue:  '专注于汽车电子控制单元产品开发',
                     })(
                     <Input  />
                     )}
                     </FormItem>
                     <div className="edit-btn">
                     <Button >重置</Button>
                     <Button type="primary" htmlType="submit">确定</Button>
                     </div>
                     </Form>*/}

                    <div className="banner-table-row banner-table-row-header">
                        <div className="banner-table-cell">标题</div>
                        <div className="banner-table-cell">描述</div>
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
                        <AddOrEditBanner  ref="AddName"
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
                        <AddOrEditBanner  ref="EditName"
                                          isEdit={true} editRecord={this.state.editRecord}/>
                    </Modal>
                </div>
            </div>

        )
    }
}
const WrappedDemo = Form.create()(Demo);

export default WrappedDemo