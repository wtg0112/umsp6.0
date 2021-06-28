 import Echarts from "echarts";
export default {
    // 单条线方法--正常
    singleLine(myChart, xAxisData, barDate, title, company,legend, max, showText) {
        const self = this
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
                left: 'left',
                bottom: 'bottom',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '12',
                },
            },
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: '1%',
                right: '6%',
                bottom: '8%',
                containLabel: true,
            },
            toolbox: {
                show: true,
                right: '4%',
                feature: {
                    mark: { show: false },
                    dataView: { show: false, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: false },
                    saveAsImage: { show: false }
                },
            },
            calculable: true,
            legend: {
                top: 7,
                left: 0,
                data: [legend],
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
            },
            yAxis: {
                type: 'value',
                max: max,
                name: companyText,
                axisLabel: {
                    formatter: function(a) {
                      a = +a
                      return isFinite(a) ? Echarts.format.addCommas(+a) + '' : ''
                    }
                  }

            },
            dataZoom: [
                {
                  show: true,
                  start: 0,
                  end: 100
                },
                {
                  type: 'inside',
                  start: 0,
                  end: 100
                },
                {
                  show: true,
                  filterMode: 'empty',
                  width: 30,
                  height: '80%',
                  showDataShadow: false,
                  left: '93%'
                }
              ],
            series: [
                {
                    name:legend,
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
   
    //Y轴坐标轴单位特殊处理
    getBalance(value) {
        var balance
        if (value < 10) {
          return value * 100 + '条'
        } else if ((balance = value - 10) < 10) {
          balance = new String(balance).substring(0, 4)
          if (balance <= 1) {
            return '一百多条'
          }
          return balance + '(百)条'
        } else if ((balance = value - 20) < 10) {
          balance = new String(balance).substring(0, 4)
          if (balance <= 1) {
            return '一千多条'
          }
          return balance + '(千)条'
        } else if ((balance = value - 30) < 10) {
          balance = new String(balance).substring(0, 4)
          if (balance <= 1) {
            return '一万多条'
          }
          return balance + '(万)条'
        } else if ((balance = value - 40) < 10) {
          balance = new String(balance).substring(0, 4)
          if (balance <= 1) {
            return '十万多条'
          }
          return balance + '(十万)条'
        } else if ((balance = value - 50) < 10) {
          balance = new String(balance).substring(0, 4)
          if (balance <= 1) {
            return '一百万多条'
          }
          return balance + '(百万)条'
        } else if ((balance = value - 60) < 10) {
          balance = new String(balance).substring(0, 4)
          if (balance <= 1) {
            return '一千万多条'
          }
          return balance + '(千万)条'
        } else if ((balance = value - 70) < 10) {
          balance = new String(balance).substring(0, 4)
          if (balance <= 1) {
            return '一亿多条'
          }
          return balance + '(亿)条'
        }
      },
    // 单个柱状图方法
    column(myChart, xAxisData, barDate, title, legend,company,max,min,splitNum,barWidth) {
        const self = this
        if (barWidth == undefined || '') {
            barWidth = 'auto';
        }
        if (company == undefined || company == '') {
            company = '个';
        }
        let option = {
            title: {
                text: title,
                left: 'left',
                bottom: 'bottom',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: '12',
                },
            },
            toolbox: {
                right: '4%',
                show: true,
                feature: {
                    mark: { show: false },
                    dataView: { show: false, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: false },
                    saveAsImage: { show: false }
                },
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                  },
                formatter:function(params){
                    let tar=params[0]
                    let value=self.getBalance(tar.value)
                    return tar.name + '<br/>' + tar.seriesName + ' : ' + value
                },
            },
            legend: {
                top: 7,
                left: 0,
                data:[legend],
            },
            grid: {
                top: '15%',
                left: '1%',
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
                        rotate: 0,
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    name: company,
                    nameLocation: 'end',
                    nameGap: 12,
                    nameRotate: 0,
                    max: max,
                    min: min,
                    splitNumber:splitNum,
                    //默认以千分位显示，不想用的可以在这加一段
                    axisLabel: {
                        //调整左侧Y轴刻度， 直接按对应数据显示
                        show: true,
                        showMinLabel: true,
                        showMaxLabel: true,
                        formatter: function(value) {
                            if (value == 10) {
                                return '百条以上'
                              } else if (value == 20) {
                                return '千条以上'
                              } else if (value == 30) {
                                return '万条以上'
                              } else if (value == 40) {
                                return '十万条以上'
                              } else if (value == 50) {
                                return '百万条以上'
                              } else if (value == 60) {
                                return '千万条以上'
                              } else if (value == 70) {
                                return '亿条以上'
                              } else if (value == 80) {
                                return '十亿条以上'
                              } else {
                                return ''
                              }
                        },
                    },
                },
            ],
            dataZoom: [
                {
                  show: true,
                  start: 0,
                  end: 100
                },
                {
                  type: 'inside',
                  start: 0,
                  end: 100
                },
                {
                  show: true,
                  filterMode: 'empty',
                  width: 30,
                  height: '80%',
                  showDataShadow: false,
                  left: '93%'
                }
              ],
            series: [
                {
                    name: legend,
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

   