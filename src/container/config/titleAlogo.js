/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import {Button, message, Icon, Upload, Input, Form} from 'antd';
import axios from 'axios'
const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        console.log(reader.result)
        callback(reader.result)
    });
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isImage = file.type.indexOf('image')>=0 ;
    if (!isImage) {
        message.error('必须上传图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
        message.error('图片大小必须小于 1MB!');
    }
    return isImage && isLt2M;
}
class Demo extends React.Component {
    state = {};
    componentDidMount = ()=> {
        this.setState({
            imageUrl:'http://localhost:3000/my-uploads/1509084144559-3 (1).jpg'
        })
    }
    handleChange = (info) => {
        //
        if (info.file.status === 'done') {
            console.log("info.file.originFileObj",info.file.originFileObj)
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    reset=()=>{
        this.props.form.resetFields();
    }
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const that=this
        console.log(that.state.imageUrl)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios({
                    url: `http://localhost:3000/users`,
                    method: 'POST',
                    data:values
                })
                    .then(function (response) {

                        console.log(response.data)
                    }).catch(function (error) {
                    console.log('获取出错', error);
                })
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        const imageUrl = this.state.imageUrl;
        return (
            <div >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="公司Logo"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('profile', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload
                                    className="avatar-uploader"
                                    name="profile"
                                    showUploadList={false}
                                    action="http://localhost:3000/profile"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange}
                                >
                                    {
                                        imageUrl ?
                                            <img src={imageUrl} alt="" className="avatar" /> :
                                            <Icon type="plus" className="avatar-uploader-trigger" />
                                    }
                                </Upload>
                            )}
                        </div>
                    </FormItem>
                    <FormItem
                        label="公司名称"
                        {...formItemLayout}>
                        {getFieldDecorator('title', {
                            initialValue:  '广州辂轺信息科技有限公司',
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem
                        label="公司描述"
                        {...formItemLayout}>
                        {getFieldDecorator('desc', {
                            initialValue:  '广州辂轺信息科技2013年成立于广州,是一家专注于汽车ECU（电子控制单元）产品开发的科技企业。 依托于自行开发的AUTOSAR汽车软件架构和OSEK实时操作系统，凭借自身多年的技术积累，为广大客户提供各种ECU解决方案和产品。',
                        })(
                            <Input type="textarea" rows={6} />
                        )}
                    </FormItem>
                    <FormItem
                        label="版权信息"
                        {...formItemLayout}>
                        {getFieldDecorator('copyright', {
                            initialValue:  '© 2014-2017 广州辂轺信息科技有限公司 版权所有',
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <div className="edit-btn">
                        <Button onClick={this.reset}>重置</Button>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
const WrappedDemo = Form.create()(Demo);

export default WrappedDemo