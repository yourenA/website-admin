/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input} from 'antd';

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
                        <div className="advantage-tooltip" style={{width:'80%',margin:'20px auto'}}>
                            <small>该模块的ICON采用<b>'Font Awesome'</b>图标，在ICON字段中填入相关的'Font Awesome'图标名称，如'fa-address-book'。详情
                                <a target="_blank" href="http://www.fontawesome.com.cn/faicons/">http://www.fontawesome.com.cn/faicons/</a></small>
                        </div>
                        <FormItem
                            label={'描述'}
                            {...formItemLayout}>
                            {getFieldDecorator('description', {
                                initialValue: this.props.isEdit ? this.props.editRecord.description : '',
                                rules: [{required: true, message: `请输入描述`}],
                            })(
                                <Input  />
                            )}
                        </FormItem>
                        <FormItem
                            label={'ICON'}
                            {...formItemLayout}>
                            {getFieldDecorator('icon', {
                                initialValue: this.props.isEdit ? this.props.editRecord.icon : '',
                                rules: [{required: true, message: `请输入ICON`}],
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
