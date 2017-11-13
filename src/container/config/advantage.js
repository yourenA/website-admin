/**
 * Created by Administrator on 2017/6/13.
 */
import React from 'react'
import {Button, Icon, Input, Form,  Col,Row} from 'antd';
import axios from 'axios'
import configJson from 'configJson' ;
import {processResult} from './../../common/common.js';
const FormItem = Form.Item;

class DynamicFieldSet extends React.Component {
    constructor(props) {
        super(props);
        this.uuid=0;
        this.state = {
            data:[]
        };
    }
    componentDidMount() {
        this.getInfo();
    }
    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/advantage`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data
                    },function () {
                        this.uuid=this.state.data.length
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            });

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
        console.log(this.uuid)
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
       e? e.preventDefault():null;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let topic=[]
                for (let k in values) {
                    if (k.indexOf('topics') >= 0) {
                        topic.push({description:values[k].description,icon:values[k].icon})
                    }
                }
                console.log("topic",topic)
                axios({
                    url: `${configJson.prefix}/advantage/edit`,
                    method: 'POST',
                    data: {advantageArr:topic},
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
    reset=()=>{
        this.props.form.resetFields();
        this.handleSubmit()
    }
    renderList=()=>{
        const {getFieldDecorator, getFieldValue} = this.props.form;
        const keysArr=[];
        for(let k in this.state.data){
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
                        initialValue: this.state.data[k]?this.state.data[k]:{description: '', icon: ''},
                    })(<ThemeInput keys={keys} k={k} remove={this.remove}/>)}
                </FormItem>
            );
        });
        return formItems
    }
    render() {
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {span: 24, offset: 0},
                sm: {span: 18, offset: 6},
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                {this.renderList()}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                        <Icon type="plus"/> 添加字段
                    </Button>
                </FormItem>
                <div className="edit-btn">
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
            description: value.description || '',
            icon: value.icon || "",
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
        const description = e.target.value;
        if (!('value' in this.props)) {
            this.setState({description});
        }
        this.triggerChange({description});
    }
    handleCurrencyChange = (e) => {
        const icon = e.target.value;
        if (!('value' in this.props)) {
            this.setState({icon});
        }
        this.triggerChange({icon});
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
            <Col className="deletePadding" span={3}>
                <div className=" float-right"> 描述:</div>
            </Col>
            <Col className="gutter-row" span={8}>
                <div className="">
                    <Input
                        type="text"
                        value={state.description}
                        onChange={this.handleNumberChange}
                    />
                </div>
            </Col>
            <Col className="deletePadding" span={3}>
                <div className="   float-right"> ICON:</div>
            </Col>
            <Col className="gutter-row" span={7}>
                <div className=" ">
                    <Input
                        type="text"
                        value={state.icon}
                        onChange={this.handleCurrencyChange}
                    />
                </div>
            </Col>
            <Col className="gutter-row" span={2}>
                <div className=" ">
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