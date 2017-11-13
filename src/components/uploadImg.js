/**
 * Created by Administrator on 2017/10/11.
 */
import React, {Component} from 'react';
import './uploadImg.less'
import  plus from './../images/plus.png'
import configJson from 'configJson' ;
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="dropbox">
                <div className="banner-uploader">
                    <div className="ant-upload ant-upload-select ant-upload-select-text">
                                    <span className="ant-upload" role="button">
                                        <input type="file" id={this.props.fileId} accept=""  onChange={this.props.changeImg}/>
                                        <img src={this.props.imgUrl?`${configJson.prefix}${this.props.imgUrl}`:plus}  id={this.props.imgId} alt=""/>
                                    </span>
                    </div>
                </div>
            </div>

        );
    }
}

export default Detail;