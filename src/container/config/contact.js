/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import { Button,Input, Form} from 'antd';
const FormItem = Form.Item;

class Demo extends React.Component {
    state = {};
    componentDidMount = ()=> {
        this.getInfo()
    }
    getInfo=()=>{
        const that=this;
        console.log('getInfo');
        setTimeout(function () {
            that.setState({
                address:'广州市天河区天河东路242号601室',
                phone:'+86 020 87519370',
                fax:'+86 020 85262282',
                email:'info@amwares.com'
            })
        },2000)

    }
    reset=()=>{
        this.props.form.resetFields();
        this.handleSubmit()
    }
    handleSubmit = (e) => {
        e?e.preventDefault():null
        const that=this
        console.log(that.state.imageUrl)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                /*this.setState({
                    address:values.address,
                    phone:values.phone,
                    fax:values.fax,
                    email:values.email
                })*/
                /*  axios({
                 url: `http://localhost:3000/users`,
                 method: 'POST',
                 data:values
                 })
                 .then(function (response) {

                 console.log(response.data)
                 }).catch(function (error) {
                 console.log('获取出错', error);
                 })*/
            }
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        const imageUrl = this.state.imageUrl;
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
                        {getFieldDecorator('phone', {
                            initialValue:  this.state.phone,
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
                        <Button onClick={this.reset}>重置</Button>
                        <Button type="primary" htmlType="submit" >确定</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
const WrappedDemo = Form.create()(Demo);

export default WrappedDemo