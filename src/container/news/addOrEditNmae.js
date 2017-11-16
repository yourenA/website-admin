/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input,Button} from 'antd';
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
        var file = document.getElementById(`${this.props.editRecord?'editNewsFile':'newsFile'}`),
            img = document.getElementById(`${this.props.editRecord?'editNewsPreview':'newsPreview'}`),
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
        const {getFieldDecorator} = this.props.form;
        return (
            <Form >
                    <div>
                        <FormItem
                            >
                            {getFieldDecorator('description', {
                                initialValue: this.props.isEdit ? this.props.editRecord.description : '',
                            })(
                                <Input  type="textarea" rows={5} />
                            )}
                        </FormItem>
                        <FormItem
                        >
                            <UploadImg style={{maxWidth:'50%'} } fileId={this.props.editRecord?'editNewsFile':'newsFile'} imgId={this.props.editRecord?'editNewsPreview':'newsPreview'} changeImg={this.changeImg} imgUrl={this.props.editRecord?this.props.editRecord.imageUrl:''} />

                        </FormItem>
                        { this.props.isEdit ?null: <Button type='primary' className='submit' onClick={this.props.addData}>提交</Button>
                        }

                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
