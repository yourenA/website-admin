/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input, Button} from 'antd';
import pc1 from './../../images/3.jpg'
import UploadImg from './../../components/uploadImg'
import configJson from 'configJson' ;
import { processResult} from './../../common/common';
import axios from 'axios'

const FormItem = Form.Item;

class AddOrEditNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productData:{}
        };
    }

    handleSubmit = (e) => {
        e?e.preventDefault():null
        const that=this
        console.log(that.state.imageUrl)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var formData = new FormData();
                formData.append("name",values.name);
                if(document.querySelector('#productDetailFile').files[0]){
                    formData.append("productUrl",document.querySelector('#productDetailFile').files[0]);
                }
                axios({
                    url: `${configJson.prefix}/product/edit/${this.props.productId}`,
                    method: 'POST',
                    data:formData,
                    withCredentials:true
                })
                    .then(function (response) {
                        console.log(response.data)
                        processResult(response);
                        that.props.getInfo()
                    }).catch(function (error) {
                    console.log('获取出错', error);
                })
            }
        });
    }
    changeImg=()=>{
        var file = document.getElementById('productDetailFile'),
            img = document.getElementById('productDetailPreview'),
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
                                initialValue: this.props.productData.name,
                            })(
                                <Input  />
                            )}
                        </FormItem>
                        <FormItem
                            label={'顶部图片'}
                            {...formItemLayout}
                        >
                            <UploadImg  fileId="productDetailFile" imgId="productDetailPreview" changeImg={this.changeImg} imgUrl={this.props.productData.productUrl} />
                        </FormItem>
                        <div className="edit-btn">
                            <Button type="primary" htmlType="submit">确定</Button>
                        </div>
                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
