/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import { Button,Input, Form,message} from 'antd';
import axios from 'axios'
import configJson from 'configJson' ;
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
            url: `${configJson.prefix}/contact`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if(response.data.status===200){
                    that.setState({
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
        console.log(that.state.imageUrl)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const that=this;
                axios({
                    url: `${configJson.prefix}/contact/edit`,
                    method: 'post',
                    data:{...values}
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