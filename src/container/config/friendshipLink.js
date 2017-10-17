/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import {Button, Icon, Input, Form, Select, Col,Row} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class DynamicFieldSet extends React.Component {
    constructor(props) {
        super(props);
        this.uuid=this.props.friendshipLink.length-1;
        this.state = {};
    }
    remove = (k) => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        this.uuid++;
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys =  keys.concat(this.uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 18, offset: 6},
            },
        };
        const keysArr=[];
        for(let k in this.props.friendshipLink){
            keysArr.push(parseInt(k))
        }
        getFieldDecorator('keys', {initialValue: keysArr});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    required={false}
                    key={k}>
                    {getFieldDecorator(`topics-${k}`, {
                        initialValue: this.props.friendshipLink[k]?this.props.friendshipLink[k]:{name: '', url: ''},
                    })(<ThemeInput keys={keys} k={k} remove={this.remove}/>)}

                </FormItem>

            );
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                        <Icon type="plus"/> 添加友情链接
                    </Button>
                </FormItem>
                <div className="edit-btn">
                    <Button >重置</Button>
                    <Button type="primary" htmlType="submit">确定</Button>
                </div>
            </Form>
        );
    }
}

class ThemeInput extends React.Component {
    constructor(props) {
        super(props);

        const value = this.props.value || {};
        this.state = {
            name: value.name || '',
            url: value.url || "",
        };
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        if ('value' in nextProps) {
            const value = nextProps.value;
            this.setState(value);
        }
    }

    handleNumberChange = (e) => {
        const name = e.target.value;
        if (!('value' in this.props)) {
            this.setState({name});
        }
        this.triggerChange({name});
    }
    handleCurrencyChange = (e) => {
        const url = e.target.value;
        if (!('value' in this.props)) {
            this.setState({url});
        }
        this.triggerChange({url});
    }
    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {
        const state = this.state;
        return (
        <Row gutter={16}>
            <Col className="gutter-row deletePadding" span={3}>
                <div className="gutter-box"> 名称:</div>
            </Col>
            <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                    <Input
                        type="text"
                        value={state.name}
                        onChange={this.handleNumberChange}
                    />
                </div>
            </Col>
            <Col className="gutter-row" span={1}>
                <div className="gutter-box"> url:</div>
            </Col>
            <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                    <Input
                        type="text"
                        value={state.url}
                        onChange={this.handleCurrencyChange}
                    />
                </div>
            </Col>
            <Col className="gutter-row" span={2}>
                <div className="gutter-box">
                    {
                        this.props.keys.length > 1 ? <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => this.props.remove(this.props.k)}
                        /> : null}
                        </div>
            </Col>

        </Row>




        );
    }
}

const WrappedDemo = Form.create()(DynamicFieldSet);

export default WrappedDemo