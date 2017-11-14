/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import axios from 'axios'
import configJson from 'configJson' ;
import city from './city.json'
export default class Data extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {}
    }
    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/visitor/city`,
            method: 'get',
        })
            .then(function (response) {
                console.log(response);
                if (response.data.status === 200) {
                    that.setState({
                        data: response.data.data,
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
        var myChart = window.echarts.init(document.querySelector('.city'));
        var geoCoordMap =city;
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };

        var option = {
            backgroundColor: '#2c343c',
            title: {
                text: '',
                x:'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.name + ' : ' + params.value[2];
                }
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x:'right',
                data:['次数'],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                min: 0,
                max: 200,
                calculable: true,
                inRange: {
                    color: ['#50a3ba', '#eac736', '#d94e5d']
                },
                textStyle: {
                    color: '#fff'
                }
            },
            geo: {
                map: 'china',
                roam: true,//是否开启鼠标缩放和平移漫游
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            series: [
                {
                    name: '次数',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(this.state.data),
                    symbolSize: 12,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    }
                }
            ]
        }

        myChart.setOption(option);
    }
    componentDidMount() {
        this.getInfo();

    }

    render() {
        return (
                <div className="city">
                </div>

        )
    }
}