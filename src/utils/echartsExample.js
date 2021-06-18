export default {
    // 单条线方法--正常
    singleLine(myChart, xAxisData, barDate, title, company, max, showText) {
        if (max == '') {
            max = undefined;
        }
        let splitNumber = 0;
        let maxNumber = Math.ceil(Math.max.apply(null, barDate));
        if (maxNumber == 0) {
            splitNumber = 1;
        } else {
            splitNumber = 5;
        }
        let companyText = '';
        if (company == undefined || company == '') {
            companyText = '个';
        } else {
            companyText = company;
        }
        let option = {
            title: {
                text: title,
                left: 'center',
                bottom: 'bottom',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '12',
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(params) {
                    let dataText = '';
                    if (showText == undefined) {
                        dataText = title + ':' + params[0].data;
                    } else {
                        dataText = showText + ':' + params[0].data;
                    }

                    return dataText;
                },
            },
            grid: {
                left: '6%',
                right: '6%',
                bottom: '8%',
                containLabel: true,
            },
            toolbox: {
                right: '4%',
                feature: {
                    saveAsImage: {},
                },
            },
            legend: {
                top: 7,
                left: 47,
                data: [''],
            },
            xAxis: {
                type: 'category',
                // boundaryGap: false,
                data: xAxisData,
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                },
            },
            yAxis: {
                type: 'value',
                max: max,
                name: '（单位：' + companyText + '）',
                splitNumber: splitNumber, //  平均分为5份
            },
            series: [
                {
                    data: barDate,
                    type: 'line',
                    areaStyle: {},
                    label: {
                        show: true,
                    },
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default',
                            },
                            lineStyle: {
                                //线的颜色
                                color: '#FFAEB7',
                            },
                            //以及在折线图每个日期点顶端显示数字
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: 'rgb(137,87,161)',
                                },
                                formatter: function(params) {
                                    let dataText = '';
                                    dataText = params.data;
                                    return dataText;
                                },
                            },
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);
    },
    // 两条折线--两个坐标轴图形方法--company为数组[左，右]
    doubleLine(myChart, legendData, xAxisData, lineOneData, lineTwoData, company, title, rounding, maxData, minData) {
        if (rounding == undefined || rounding == '') {
            rounding = [true, true];
        }
        let splitNumber1 = 5;
        let splitNumber2 = 5;
        let interval = 0;
        let interval1 = 0;
        if (rounding[0]) {
            interval = Math.ceil((Math.max.apply(null, lineOneData) - Math.min.apply(null, lineOneData)) / 5);
        } else {
            interval = Math.ceil(((Math.max.apply(null, lineOneData) - Math.min.apply(null, lineOneData)) / 5) * 100) / 100;
        }
        if (rounding[1]) {
            interval1 = Math.ceil((Math.max.apply(null, lineTwoData) - Math.min.apply(null, lineTwoData)) / 5);
        } else {
            interval1 = Math.ceil(((Math.max.apply(null, lineTwoData) - Math.min.apply(null, lineTwoData)) / 5) * 100) / 100;
        }
        let max;
        let max1;
        if (maxData == undefined) {
            max = (interval * 5 + Math.min.apply(null, lineOneData)).toFixed(2);
            max1 = (interval1 * 5 + Math.min.apply(null, lineTwoData)).toFixed(2);
        } else {
            if (maxData[0] != '') {
                interval = maxData[0] / 5;
                max = maxData[0].toFixed(2);
            } else {
                max = (interval * 5 + Math.ceil(Math.min.apply(null, lineOneData))).toFixed(2);
            }
            if (maxData[1] != '') {
                max1 = maxData[1].toFixed(2);
                interval1 = maxData[1] / 5;
            } else {
                max1 = (interval1 * 5 + Math.ceil(Math.min.apply(null, lineTwoData))).toFixed(2);
            }
        }
        let min;
        let min1;
        if (minData == undefined) {
            if (max <= 1) {
                min = 0;
                max = 1;
                interval = 0.2;
            } else {
                min = Math.min.apply(null, lineOneData).toFixed(2);
            }
            if (max1 <= 1) {
                min1 = 0;
                max1 = 1;
                interval1 = 0.2;
            } else {
                min1 = Math.min.apply(null, lineTwoData).toFixed(2);
            }
        } else {
            if (minData[0] != '') {
                min = minData[0];
            } else {
                min = Math.min.apply(null, lineOneData).toFixed(2);
            }
            if (minData[1] != '') {
                min1 = minData[1];
            } else {
                min1 = Math.min.apply(null, lineTwoData).toFixed(2);
            }
        }
        if (max == 1) {
            splitNumber1 = 1;
            interval = 1;
        }
        if (max1 == 1) {
            splitNumber2 = 1;
            interval1 = 1;
        }
        var option = {
            color: ['rgb(137,87,161)', '#d66e49'],
            title: {
                text: title,
                left: 'center',
                bottom: 'bottom',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '12',
                },
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    let tooltipText = '';
                    tooltipText =
                        params[0].seriesName + '：' + params[0].value + company[0] + '<br/>' + params[1].seriesName + '：' + params[1].value + company[1];
                    return tooltipText;
                },
            },
            toolbox: {
                right: '4%',
                feature: {
                    saveAsImage: {},
                },
            },
            legend: {
                data: legendData,
                left: '8%',
            },
            grid: {
                left: '6%',
                right: '6%',
                bottom: '8%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                axisLabel: {
                    interval: 0,
                    rotate: 30,
                },
            },
            yAxis: [
                {
                    type: 'value',
                    name: '(单位：' + company[0] + ')',
                    splitNumber: splitNumber1,
                    min: min,
                    max: max, // 计算最大值
                    interval: interval, //  平均分为5份
                },
                {
                    type: 'value',
                    name: '(单位：' + company[1] + ')',
                    splitNumber: splitNumber2,
                    min: min1,
                    max: max1, // 计算最大值
                    interval: interval1, //  平均分为5份
                },
            ],
            series: [
                {
                    name: legendData[0],
                    type: 'line',
                    smooth: true,
                    data: lineOneData,
                    yAxisIndex: 0,
                    itemStyle: {
                        color: '#FFC108',
                        normal: {
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: 'rgb(137,87,161)',
                                },
                                formatter: function(params) {
                                    let dataText = '';
                                    if (rounding[0] == false) {
                                        dataText = params.data + '%';
                                    } else {
                                        dataText = params.data;
                                    }
                                    return dataText;
                                },
                            },
                        },
                    },
                },
                {
                    name: legendData[1],
                    type: 'line',
                    smooth: true,
                    yAxisIndex: 1,
                    data: lineTwoData,
                    itemStyle: {
                        color: '#FC8A8A',
                        normal: {
                            label: {
                                show: true,
                                position: 'top',
                                offset: [0, -10],
                                textStyle: {
                                    color: 'rgb(137,87,161)',
                                },
                                formatter: function(params) {
                                    let dataText = '';
                                    if (rounding[1] == false) {
                                        dataText = params.data + '%';
                                    } else {
                                        dataText = params.data;
                                    }
                                    return dataText;
                                },
                            },
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);
    },
    // 单个柱状图方法
    column(myChart, xAxisData, barDate, title, company, barWidth) {
        if (barWidth == undefined || '') {
            barWidth = 'auto';
        }
        if (company == undefined || company == '') {
            company = '人';
        }
        let option = {
            title: {
                text: title,
                left: 'center',
                bottom: 'bottom',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '12',
                },
            },
            toolbox: {
                right: '4%',
                feature: {
                    saveAsImage: {},
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}' + company,
            },
            color: 'rgb(137,87,161)',
            grid: {
                top: 30,
                right: 70,
                bottom: 50,
                left: 60,
            },
            legend: {
                top: 7,
                left: 47,
                data: [''],
            },
            grid: {
                top: '15%',
                left: '5%',
                right: '6%',
                bottom: '5%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {
                        interval: 0,
                        rotate: 30,
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '(单位：' + company + ')',
                    nameLocation: 'end',
                    nameGap: 12,
                    nameRotate: 0,
                    //默认以千分位显示，不想用的可以在这加一段
                    axisLabel: {
                        //调整左侧Y轴刻度， 直接按对应数据显示
                        show: true,
                        showMinLabel: true,
                        showMaxLabel: true,
                        formatter: function(value) {
                            return value;
                        },
                    },
                },
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    yAxisIndex: 0,
                    barWidth: barWidth, //柱图宽度
                    data: barDate,
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: function(params) {
                            let firstParams = params.data;
                            return firstParams;
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);
    }
}

   