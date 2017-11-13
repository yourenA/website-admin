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
            wrapperCol: {span: 16},
        };
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
                            label={'URL'}
                            {...formItemLayout}>
                            {getFieldDecorator('url', {
                                initialValue: this.props.isEdit ? this.props.editRecord.url : '',
                                rules: [{required: true, message: `请输入URL`}],
                            })(
                                <Input  />
                            )}
                        </FormItem>
                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
