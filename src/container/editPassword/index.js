/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input,Layout,Button,Breadcrumb,message} from 'antd';
import configJson from 'configJson' ;
import { processResult} from './../../common/common';
import axios from 'axios'
const {Content,} = Layout;
const FormItem = Form.Item;

class AddOrEditNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }
    cancel=()=>{
        this.props.history.push('/')
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const that=this;
        this.props.form.validateFields({ force: true },
            (err, values) => {
                if (!err) {
                    if(values.password!==values.repeatPassword){
                        message.error('两次密码不相同');
                        return false
                    }else{
                        axios({
                            url: `${configJson.prefix}/user/edit/1`,
                            method:'POST',
                            data:values,
                        })
                            .then(function (response) {
                                console.log(response.data)
                                processResult(response)
                            }).catch(function (error) {
                            console.log('获取出错', error);
                        })
                    }
                }
            }
        );
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 9},
        };
        const username = localStorage.getItem('username') || sessionStorage.getItem('username');
        return (
            <div className="content config">
                <Content style={{background: '#fff', padding: '10px'}}>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item>修改密码</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form  className="login-form">
                        <div>
                            <FormItem
                                label={'账号'}
                                {...formItemLayout}>
                                {getFieldDecorator('user', {
                                    initialValue: username,
                                })(
                                    <Input  disabled={true}/>
                                )}
                            </FormItem>
                            <FormItem
                                label={'密码'}
                                {...formItemLayout}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: `请输入密码`}],
                                })(
                                    <Input  type='password'/>
                                )}
                            </FormItem>
                            <FormItem
                                label={'重复密码'}
                                {...formItemLayout}>
                                {getFieldDecorator('repeatPassword', {
                                    rules: [{required: true, message: `请重复密码`}],
                                })(
                                    <Input  type='password'/>
                                )}
                            </FormItem>
                            <FormItem
                                style={{textAlign:'center'}}>
                                <Button  style={{marginRight:'10px'}} onClick={this.cancel}>
                                    取消
                                </Button>
                                <Button   type="primary" onClick={this.handleSubmit} >
                                    确定
                                </Button>
                            </FormItem>
                        </div>
                    </Form>
                    </Content>
                </div>

        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
