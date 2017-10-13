/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import { Button,Input, Form} from 'antd';
const FormItem = Form.Item;

class Demo extends React.Component {
    state = {};
    componentDidMount = ()=> {
        this.setState({
            imageUrl:'/logo.png'
        })
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
                <Form >
                    <FormItem
                        label="公司地址"
                        {...formItemLayout}>
                        {getFieldDecorator('address', {
                            initialValue:  '广州市天河区天河东路242号601室',
                        })(
                            <Input/>
                        )}
                    </FormItem>

                    <FormItem
                        label="公司电话"
                        {...formItemLayout}>
                        {getFieldDecorator('desc', {
                            initialValue:  '+86 020 87519370',
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <FormItem
                        label="公司传真"
                        {...formItemLayout}>
                        {getFieldDecorator('copyright', {
                            initialValue:  '+86 020 85262282',
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <FormItem
                        label="公司电邮"
                        {...formItemLayout}>
                        {getFieldDecorator('email', {
                            initialValue:  'info@amwares.com',
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <div className="edit-btn">
                        <Button >重置</Button>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
const WrappedDemo = Form.create()(Demo);

export default WrappedDemo