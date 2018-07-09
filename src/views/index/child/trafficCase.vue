<style lang="less" scoped="scoped">
	@import url("../../../assets/less/mixin.less");
	.content{
		height:100%;
		&:first-child{
			padding-right:10px;
		}
	}
	.chart-box{
        height:100%;
        .chart-item{
            height:100%;
        }
	}
</style>
<template>
  	<div class="content-wrapper row">
  		<div class="content col-xs-24">
			<div class="chart-box">
				<div id="barChart" class="chart-item"></div>
			</div>
  		</div>
  	</div>
</template>

<script>
	// 引入基本模板
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
    	width:0,
    	height:0,
      timer:60000,
      pageTimer:120000
    }
  },
  mounted(){
	this.barChart = echarts.init(document.getElementById('barChart'));
	this.init();
  	this.$bg();
	this.watchPage();
//	setTimeout(()=>{
//		this.$router.push('/index/realTimeStatus');
//	},this.pageTimer);
  },
	watch:{
		width(old,New){
			this.watchHanlder();
		},
		height(old,New){
			this.watchHanlder();
		}
	},
  methods:{
  	watchPage(){
		window.onresize=()=>{
			this.width=document.documentElement.clientWidth,
			this.height=document.documentElement.clientHeight
		};
		window.onkeyup=(e)=>{
			if(e.keyCode=='122'){
				this.width=document.documentElement.clientWidth,
				this.height=document.documentElement.clientHeight
			}
		};
  	},
  	watchHanlder(){
  		this.$bg();
  		this.barChart.resize();
  	},
  	init(){
  		this.drawBarChart();
  	},
  	drawBarChart(){
  		let option = {
		    title: {
		        text: '今日话务分析',
		        left:'center',
		        textStyle:{
		        	color:'#fff'
		        } 
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: function (params) {
		            var tar = params[1];
		            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
		        }
		    },
		    color:['#3FC4FF'],
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type : 'category',
		        splitLine: {show:false},
		        axisLine:{
		        	lineStyle:{
		        		color:"#fff"
		        	}
		        },
		        data : ['总通话量','改管','点火','抢修','咨询','查询','改密','投诉']
		    },
		    yAxis: {
		        type : 'value',
		        axisLine:{
		        	lineStyle:{
		        		color:"#fff",
		        		width:"0"
		        	}
		        }
		    },
		    series: [
		        {
		            name: '辅助',
		            type: 'bar',
		            stack:  '总量',
		            barWidth:'60px',
		            itemStyle: {
		                normal: {
		                    barBorderColor: 'rgba(0,0,0,0)',
		                    color: 'rgba(0,0,0,0)'
		                },
		                emphasis: {
		                    barBorderColor: 'rgba(0,0,0,0)',
		                    color: 'rgba(0,0,0,0)'
		                }
		            },
		            data: [0, 150, 135, 130, 55, 30, 20,0]
		        },
		        {
		            name: '生活费',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'inside'
		                }
		            },
		            data:[160, 10, 15, 5, 75, 25,10,20]
		        }
		    ]
		};
		this.barChart.setOption(option);
  	}
  }
}
</script>
