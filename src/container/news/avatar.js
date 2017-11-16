/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form} from 'antd';
import UploadImg from './../../components/uploadImg'
const FormItem = Form.Item;


class AddOrEditNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl:this.props.imageUrl
        };
    }

    componentDidMount() {
    }
    changeImg=()=>{
        var file = document.getElementById('avatarFile'),
            img = document.getElementById('avatarPreview'),
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
        return (
            <form>
                    <div>
                        <FormItem
                        >
                                <UploadImg  fileId="avatarFile" imgId="avatarPreview" changeImg={this.changeImg} imgUrl={this.props.editRecord?this.props.editRecord.classifyUrl:''} />
                        </FormItem>

                    </div>
            </form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
