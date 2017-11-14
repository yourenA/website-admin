/**
 * Created by Administrator on 2017/9/13.
 */
import React from 'react'
import axios from 'axios'
import configJson from 'configJson' ;
export default class Data extends React.Component {

    constructor(props) {
        super(props);
        //构造函数用法
        //常用来绑定自定义函数，切记不要在这里或者组件的任何位置setState，state全部在reducer初始化，相信对开发的后期很有帮助
        this.state = {}
    }

    componentDidMount() {
        this.getInfo();

    }
    getInfo = ()=> {
        const that = this;
        axios({
            url: `${configJson.prefix}/visitor/device`,
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
        var myChart = window.echarts.init(document.querySelector('.proportion'));
        let data=[];
        const keymap={pc:'电脑',phone:'手机',ipad:'平板'}
        for(let key in this.state.data){
            data.push({name:keymap[key],value:this.state.data[key]})
        }
        console.log(data)
        var option = {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['电脑','手机','平板']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
    render() {
        return (
                <div className="proportion">
                </div>

        )
    }
}