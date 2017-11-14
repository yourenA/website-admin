/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import {DatePicker} from 'antd';
import axios from 'axios'
import configJson from 'configJson' ;
import {getTimeDistance,getBetweemDay} from './../../common/common';
const {RangePicker} = DatePicker;
export default class Data extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {
            rangePickerValue: [],
            data:[]
        }
    }

    componentDidMount() {

        this.setState({
            rangePickerValue: getTimeDistance('month'),
        },function () {
            this.getInfo()
        });

    }

    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/visitor/interval`,
            method: 'post',
            data:{

                floor:this.state.rangePickerValue[0].format("YYYY-MM-DD"),
                cap:this.state.rangePickerValue[1].format("YYYY-MM-DD")
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data.arr,
                    },function () {
                        that.renderMap()
                    })

                }
            })
            .catch(function (error) {
                console.log(error)
            });

    }
    renderMap=()=>{
        console.log('render map')
        var myChart = window.echarts.init(document.querySelector('.map'));
        var date=getBetweemDay(this.state.rangePickerValue[0].format("YYYY-MM-DD"),this.state.rangePickerValue[1].format("YYYY-MM-DD"))
        var option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '',
            },
            toolbox: {},
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data:date
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }, {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }],
            series: [
                {
                    name: '访问次数',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }])
                        }
                    },
                    data: this.state.data
                }
            ]
        };

        myChart.setOption(option);
    }
    handleRangePickerChange = (rangePickerValue) => {
        this.setState({
            rangePickerValue,
        },function () {
            this.getInfo()
        });

    }

    isActive(type) {
        const {rangePickerValue} = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return;
        }
        if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
            return 'currentDate';
        }
    }

    selectDate = (type) => {
        this.setState({
            rangePickerValue: getTimeDistance(type),
        },function () {
           this.getInfo()
        });

    }

    render() {
        return (
            <div className="visitor-count">
                <div className="date-picker">
                    <div className="salesExtraWrap">
                        <div className="salesExtra">
                            <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
                                本周
                            </a>
                            <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
                                本月
                            </a>
                            <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
                                全年
                            </a>
                        </div>
                        <RangePicker
                            value={this.state.rangePickerValue}
                            onChange={this.handleRangePickerChange}
                            style={{width: 256}}
                        />
                    </div>
                </div>


                <div className="map">

                </div>
            </div>


        )
    }
}