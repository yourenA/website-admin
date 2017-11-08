/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input, Icon, Upload,message} from 'antd';
const FormItem = Form.Item;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
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

class AddOrEditNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl:this.props.isEdit ? this.props.editRecord.image : '',
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
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                    <div>
                        <FormItem
                            label={'内容块标题'}
                            {...formItemLayout}>
                            {getFieldDecorator('title', {
                                initialValue: this.props.isEdit ? this.props.editRecord.title : '',
                            })(
                                <Input  />
                            )}
                        </FormItem>
                        <FormItem
                            label={'内容块描述'}
                            {...formItemLayout}>
                            {getFieldDecorator('description', {
                                initialValue: this.props.isEdit ? this.props.editRecord.desc : '',
                            })(
                                <Input  type="textarea" rows={5} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="内容块图片"
                        >
                            <div className="dropbox">
                                {getFieldDecorator('dragger', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload
                                        className="banner-uploader"
                                        name="profile"
                                        showUploadList={false}
                                        action="http://localhost:3000/profile"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {
                                            this.state.imageUrl ?
                                                <img src={this.state.imageUrl} alt="" className="banner category" /> :
                                                <Icon type="plus" className="banner-uploader-trigger" />
                                        }
                                    </Upload>
                                )}
                            </div>
                        </FormItem>


                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
