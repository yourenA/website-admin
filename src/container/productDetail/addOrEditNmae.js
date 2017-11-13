/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input} from 'antd';
import UploadImg from './../../components/uploadImg'
const FormItem = Form.Item;

class AddOrEditNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }
    changeImg=()=>{
        var file = document.getElementById('contentFile'),
            img = document.getElementById('contentPreview'),
            reader = new FileReader();
        var files = file.files;
        if (files && files[0]) {
            reader.onload = function (ev) {
                img.src = ev.target.result;
            }
            reader.readAsDataURL(files[0]);//在客户端上传图片之后通过 readAsDataURL() 来显示图片。
        }
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
                                initialValue: this.props.isEdit ? this.props.editRecord.description : '',
                            })(
                                <Input  type="textarea" rows={5} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="内容块图片"
                        >
                            <UploadImg  fileId="contentFile" imgId="contentPreview" changeImg={this.changeImg} imgUrl={this.props.editRecord?this.props.editRecord.contentUrl:''} />
                        </FormItem>

                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
