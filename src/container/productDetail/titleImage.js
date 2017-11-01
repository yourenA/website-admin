/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input, Icon, Upload,message,Button} from 'antd';
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

class AddOrEditNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl:this.props.imageUrl
        };
    }

    componentDidMount() {

    }
    handleChange = (info) => {
        console.log(info)
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                    <div>
                        <FormItem
                            label={'产品名称'}
                            {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: this.props.isEdit ? this.props.editRecord.title : '',
                            })(
                                <Input  />
                            )}
                        </FormItem>
                        <FormItem
                            label={'顶部图片'}
                            {...formItemLayout}
                        >
                            <div className="dropbox">
                                {getFieldDecorator('dragger', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload
                                        className="banner-uploader"
                                        name="avatar"
                                        showUploadList={false}
                                        action="http//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {
                                             this.state.imageUrl ?
                                                <img src={this.state.imageUrl} alt="" className="title-image" /> :
                                                <Icon type="plus" className="banner-uploader-trigger" />
                                        }
                                    </Upload>
                                )}
                            </div>
                        </FormItem>
                        <div className="edit-btn">
                            <Button >重置</Button>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </div>
                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
