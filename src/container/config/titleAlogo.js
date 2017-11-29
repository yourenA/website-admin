/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import {Button, message, Input, Form} from 'antd';
import axios from 'axios'
import configJson from 'configJson' ;
import UploadImg from './../../components/uploadImg'
import './titleAlogo.less'
import { processResult} from './../../common/common.js';
const FormItem = Form.Item;

class Demo extends React.Component {
    state = {};
    componentDidMount = ()=> {

        this.getInfo()
    }
    getInfo=()=>{
        const that=this;
        axios({
            url: `${configJson.prefix}/baseInfo`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if(response.data.status===200){
                    that.setState({
                        logoUrl:response.data.data[0].logoUrl,
                        name:response.data.data[0].name,
                        description:response.data.data[0].description,
                        copyright:response.data.data[0].copyright,
                    })
                }else{
                    message.error(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    reset=()=>{
        this.props.form.resetFields();
        this.handleSubmit()
        // this.props.form.setFieldsValue({
        //     title:this.state.title,
        //     desc:this.state.desc,
        //     copyright:this.state.copyright
        // })
    }
    handleSubmit = (e) => {
        e?e.preventDefault():null;
        const that=this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(document.querySelector('#file').value)
                var formData = new FormData();
                formData.append("name",values.name);
                formData.append("description",values.description);
                formData.append("copyright",values.copyright);
                if(document.querySelector('#file').files[0]){
                    formData.append("logoUrl",document.querySelector('#file').files[0]);
                }
               axios({
                    url: `${configJson.prefix}/baseInfo/edit`,
                    method: 'POST',
                    data:formData,
                   withCredentials:true
                })
                    .then(function (response) {
                        console.log(response.data)
                        processResult(response)
                    }).catch(function (error) {
                    console.log('获取出错', error);
                })
            }
        });
    }
    changeImg=()=>{
        console.log('changeImg')
        var elem = document.getElementById('file'),
            img = document.getElementById('preview'),
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
                        label="公司Logo"
                    >
                        <UploadImg  fileId="file" imgId="preview" changeImg={this.changeImg} imgUrl={this.state.logoUrl} />
                    </FormItem>

                    <FormItem
                        label="公司名称"
                        {...formItemLayout}>
                        {getFieldDecorator('name', {
                            initialValue:this.state.name,
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem
                        label="公司描述"
                        {...formItemLayout}>
                        {getFieldDecorator('description', {
                            initialValue: this.state.description,
                        })(
                            <Input type="textarea" rows={6} />
                        )}
                    </FormItem>
                    <FormItem
                        label="版权信息"
                        {...formItemLayout}>
                        {getFieldDecorator('copyright', {
                            initialValue: this.state.copyright,
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <div className="edit-btn">
                        {/*<Button onClick={this.reset}>重置</Button>*/}
                        <Button type="primary" htmlType="submit">确定</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
const WrappedDemo = Form.create()(Demo);

export default WrappedDemo