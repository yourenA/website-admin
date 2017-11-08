/**
 * Created by Administrator on 2017/3/24.
 */
import React from 'react';
import {Form, Input, Icon, Upload,message,Button} from 'antd';
import pc1 from './../../images/3.jpg'
const FormItem = Form.Item;
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    console.log(file)
    const isJPG = file.type .indexOf('image');
    const isLt10KB = file.size / 1024  < 10;
    if (!isLt10KB) {
        message.error('Image must smaller than 10kb!');
    }
    return isJPG && isLt10KB;
}

class AddOrEditNameForm extends React.Component {
    constructor(props) {
        super(props);
        this.originImageUrl='';
        this.state = {
            imageUrl:'',
            name:''
        };
    }

    componentDidMount() {
        this.getInfo();

    }
    getInfo=()=>{
        this.setState({
            name:'产品一',
            imageUrl:pc1
        },function () {
            this.originImageUrl=this.state.imageUrl
        })
    }
    handleChange = (info) => {
        console.log(info)
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
        }
    }
    reset=()=>{
        this.props.form.resetFields();
        this.setState({
            imageUrl:this.originImageUrl
        },function () {
            this.handleSubmit()
        })

    }
    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    handleSubmit = (e) => {
        e?e.preventDefault():null
        const that=this
        console.log(that.state.imageUrl)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log('imageUrl',this.state.imageUrl)
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
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                    <div>
                        <FormItem
                            label={'产品名称'}
                            {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: this.state.name,
                            })(
                                <Input  />
                            )}
                        </FormItem>
                        <FormItem
                            label={'顶部图片'}
                            {...formItemLayout}
                        >
                            <div className="dropbox">
                                {getFieldDecorator('dragger', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload
                                        className="banner-uploader"
                                        name="profile"
                                        showUploadList={false}
                                        action="http://localhost:3000/profile"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {
                                             this.state.imageUrl ?
                                                <img src={this.state.imageUrl} alt="" className="title-image" /> :
                                                <Icon type="plus" className="banner-uploader-trigger" />
                                        }
                                    </Upload>
                                )}
                            </div>
                        </FormItem>
                        <div className="edit-btn">
                            <Button onClick={this.reset}>重置</Button>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </div>
                    </div>
            </Form>
        );
    }
}

const WrappedForm = Form.create()(AddOrEditNameForm);
export default WrappedForm;
