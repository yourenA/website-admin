/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input, Icon, Upload,message} from 'antd';
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
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                    <div>
                        <FormItem
                            label={'产品名称'}
                            {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: this.props.isEdit ? this.props.editRecord.title : '',
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
