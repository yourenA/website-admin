/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import { Button,Input, Form} from 'antd';
import axios from 'axios'
import configJson from 'configJson' ;
import { processResult} from './../../common/common.js';
import UploadImg from './../../components/uploadImg'
const FormItem = Form.Item;

class Demo extends React.Component {
    state = {};
    componentDidMount = ()=> {
        this.getInfo()
    }
    getInfo=()=>{
        const that=this;
        axios({
            url: `${configJson.prefix}/contact`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if(response.data.status===200){
                    that.setState({
                        contactUrl:response.data.data[0].contactUrl,
                        address:response.data.data[0].address,
                        tel:response.data.data[0].tel,
                        fax:response.data.data[0].fax,
                        email:response.data.data[0].email,
                    })
                }else{
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    handleSubmit = (e) => {
        e?e.preventDefault():null;
        const that=this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const that=this;
                var formData = new FormData();
                formData.append("address",values.address);
                formData.append("tel",values.tel);
                formData.append("fax",values.fax);
                console.log('contact 图片',document.querySelector('#contactFile').files[0])
                if(document.querySelector('#contactFile').files[0]){
                    console.log('拥有图片')
                    formData.append("contactUrl",document.querySelector('#contactFile').files[0]);
                }
                axios({
                    url: `${configJson.prefix}/contact/edit`,
                    method: 'post',
                    data:formData
                })
                    .then(function (response) {
                        console.log(response);
                        processResult(response)
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        });
    }
    changeImg=()=>{
        console.log('changeImg')
        var elem = document.getElementById('contactFile'),
            img = document.getElementById('contactPreview'),
            reader = new FileReader();
        var files = elem.files;
        console.log('img',img)
        if (files && files[0]) {
            reader.onload = function (ev) {
                img.src = ev.target.result;
            }
            reader.readAsDataURL(files[0]);//在客户端上传图片之后通过 readAsDataURL() 来显示图片。
        }
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        return (
            <div >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="页面图片"
                    >
                        <UploadImg  fileId="contactFile" imgId="contactPreview" changeImg={this.changeImg} imgUrl={this.state.contactUrl} />
                    </FormItem>
                    <FormItem
                        label="公司地址"
                        {...formItemLayout}>
                        {getFieldDecorator('address', {
                            initialValue:  this.state.address,
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem
                        label="公司电话"
                        {...formItemLayout}>
                        {getFieldDecorator('tel', {
                            initialValue:  this.state.tel,
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <FormItem
                        label="公司传真"
                        {...formItemLayout}>
                        {getFieldDecorator('fax', {
                            initialValue:  this.state.fax,
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <FormItem
                        label="公司电邮"
                        {...formItemLayout}>
                        {getFieldDecorator('email', {
                            initialValue: this.state.email,
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <div className="edit-btn">
                        <Button type="primary" htmlType="submit" >确定</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
const WrappedDemo = Form.create()(Demo);

export default WrappedDemo