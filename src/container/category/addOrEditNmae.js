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
            imageUrl:this.props.isEdit ? this.props.editRecord.image : '',
        };
    }

    componentDidMount() {
    }
    changeImg=()=>{
        var file = document.getElementById('categoryFile'),
            img = document.getElementById('categoryPreview'),
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
            <Form onSubmit={this.handleSubmit}>
                    <div>
                        <FormItem
                            label={'分类名称'}
                            {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: this.props.isEdit ? this.props.editRecord.name : '',
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
                            {...formItemLayout}
                            label="分类图片"
                        >
                            <UploadImg  fileId="categoryFile" imgId="categoryPreview" changeImg={this.changeImg} imgUrl={this.props.editRecord?this.props.editRecord.classifyUrl:''} />
                        </FormItem>
                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
