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
            imageUrl:this.props.isEdit ? this.props.editRecord.imageUrl : '',
        };
    }

    componentDidMount() {

    }
    changeImg=()=>{
        var file = document.getElementById('slideFile'),
            img = document.getElementById('slidePreview'),
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
            wrapperCol: {span: 16},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} >
                    <div>
                        <FormItem
                            label={'标题'}
                            {...formItemLayout}>
                            {getFieldDecorator('title', {
                                initialValue: this.props.isEdit ? this.props.editRecord.title : '',
                            })(
                                <Input  />
                            )}
                        </FormItem>
                        <FormItem
                            label={'描述'}
                            {...formItemLayout}>
                            {getFieldDecorator('description', {
                                initialValue: this.props.isEdit ? this.props.editRecord.description : '',
                            })(
                                <Input  type="textarea" rows={3} />
                            )}
                        </FormItem>
                        <FormItem
                            label={'链接地址'}
                            {...formItemLayout}>
                            {getFieldDecorator('link', {
                                initialValue: this.props.isEdit ? this.props.editRecord.link : '',
                            })(
                                <Input   />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="图片"
                        >
                            <UploadImg  fileId="slideFile" imgId="slidePreview" changeImg={this.changeImg} imgUrl={this.props.editRecord?this.props.editRecord.slideshowUrl:''} />
                        </FormItem>
                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
