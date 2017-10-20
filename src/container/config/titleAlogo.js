/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import {Button, message, Icon, Upload, Input, Form} from 'antd';
const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    console.log(file)
    const isJPG = file.type .indexOf('image');
    const isLt10KB = file.size / 1024  < 10;
    if (!isLt10KB) {
        message.error('Image must smaller than 10kb!');
    }
    return isJPG && isLt10KB;
}
class Demo extends React.Component {
    state = {};
    componentDidMount = ()=> {
        this.setState({
            imageUrl:'/logo.png'
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    reset=()=>{
        this.props.form.resetFields();
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
                <Form >
                    <FormItem
                        {...formItemLayout}
                        label="公司Logo"
                    >
                        <div className="dropbox">
                            {getFieldDecorator('dragger', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload
                                    className="avatar-uploader"
                                    name="avatar"
                                    showUploadList={false}
                                    action="http//jsonplaceholder.typicode.com/posts/"
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