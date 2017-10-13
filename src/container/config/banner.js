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
    console.log(isLt10KB);
    if (!isLt10KB) {
        message.error('Image must smaller than 10kb!');
    }
    return isJPG && isLt10KB;
}
class Demo extends React.Component {
    state = {};
    componentDidMount = ()=> {
        this.setState({
            imageUrl:'/pc1.jpg'
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
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
                </Form>
            </div>
        )
    }
}
const WrappedDemo = Form.create()(Demo);

export default WrappedDemo