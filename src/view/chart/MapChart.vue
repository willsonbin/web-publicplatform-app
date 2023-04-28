<template>
 <div id="map-chart" style="width: 100%;height:100%;"></div>
</template>

<script>
import resize from './mixins/resize'
export default {
  mixins: [resize],
  props: {
    dataSource: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      option: {},
      data: {
        flowVoList: [],
        scatterList: []
      },
      chart: ''
    }
  },
  watch: {
    dataSource: {
      handler (newVal) {
        if (!newVal) {
          this.data = {
            flowVoList: [],
            scatterList: []
          }
        } else {
          this.data.flowVoList = newVal.flowVoList || []
          this.data.scatterList = newVal.scatterList || []
        }
        console.log(this.data)
        this.setChartOption()
      },
      deep: true
    }
  },
  methods: {
    setChartOption () {
      if (!this.chart) {
        this.chart = this.$echarts.init(document.getElementById('map-chart'))
      }
      this.option = {
        tooltip: {
          show: true,
          // backgroundColor: 'rgba(255,255,255)',
          extraCssText: 'box-shadow: 0 0 3px #dbdbdb;',
          padding: 10,
          formatter: function (params) {
            console.log(params)
            return params.value[2] || ''
          }
        },
        geo: {
          map: 'world',
          label: {
            emphasis: {
              show: false
            }
          },
          zoom: 1.3,
          roam: true, // 是否允许缩放
          scaleLimit: {
            min: 1 // 最小缩放
          },
          itemStyle: {
            normal: {
              areaColor: '#7CBDEF',
              borderColor: '#5EA6E0'
            },
            emphasis: {
              areaColor: '#BBD7F2'
            }
          }
        },
        series: [
          {
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.7,
              color: 'yellow',
              symbolSize: 3,
              constantSpeed: 70
            },
            lineStyle: {
              normal: {
                color: '#E1FFFF',
                opacity: 0.1,
                width: 1,
                curveness: 0.2
              }
            },
            data: this.data.flowVoList
          },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 3,
            symbol: 'circle',
            symbolSize: 12,
            label: {
              show: false
              // color: '#333',
              // position: 'bottom',
              // formatter: function (params) {
              //   return params.data[2] || ''
              // }
            },
            itemStyle: {
              normal: {
                color: '#FFD510',
                borderColor: '#2363E4',
                borderWidth: 1,
                opacity: 0.8
              }
            },
            data: this.data.scatterList
          }
        ]
      }
      this.chart.setOption(this.option, true)
    }
  }
}
</script>
