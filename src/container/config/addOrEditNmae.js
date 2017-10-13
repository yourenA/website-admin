/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input,Cascader} from 'antd';

const FormItem = Form.Item;

class AddOrEditNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        const residences = [{
            value: '北京',
            label: '北京',
        }, {
            value: '江苏',
            label: '江苏',
            children: [{
                value: '南京',
                label: '南京',
            }],
        }, {
            value: '广东',
            label: '广东',
            children: [{
                value: '广州',
                label: '广州',
            },{
                value: '佛山',
                label: '佛山',
            }],
        }];
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                    <div>
                        <FormItem
                            label={'名称'}
                            {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: this.props.isEdit ? this.props.editRecord.name : '',
                                rules: [{required: true, message: `请输入名称`}],
                            })(
                                <Input  />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="城市"
                        >
                            {getFieldDecorator('residence', {
                                initialValue:this.props.isEdit ? this.props.editRecord.province? [this.props.editRecord.province,this.props.editRecord.city]:[this.props.editRecord.city] :  [],
                                rules: [{ type: 'array', required: true, message: '请选择城市' }],
                            })(
                                <Cascader placeholder="请选择" options={residences} />
                            )}
                        </FormItem>
                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
