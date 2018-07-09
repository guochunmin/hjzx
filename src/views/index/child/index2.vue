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
            height:calc(~'100% - 50px');
        }
	}
</style>
<template>
  	<div class="content-wrapper row">
  		<div class="content col-xs-24 col-sm-12">
			<div class="chart-box">
				<div id="lineChart" class="chart-item"></div>
				<p class="notice">当前话务汇总人数：<span>{{totalPeople}}</span>	人</p>
			</div>
  		</div>
  		<div class="content col-xs-24 col-sm-12">
			<div class="chart-box">
				<div id="pieChart" class="chart-item"></div>
				<p class="notice">今日呼入汇总：<span>{{totalPhone}}</span>	次</p>
			</div>
  		</div>
  	</div>
</template>

<script>
	// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
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
      pageTimer:120000,
      totalPeople:25,
      totalPhone:1500,
      showNav:false,
      today:{},
      real:{},
      weekly:[]
    }
  },
  mounted(){
	this.lineChart = echarts.init(document.getElementById('lineChart'));
	this.pieChart = echarts.init(document.getElementById('pieChart'));
	this.init();
  	this.$bg();
	this.watchPage();
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
  		this.lineChart.resize();
  		this.pieChart.resize();
  	},
  	init(){
		this.getData();
  	},
  	getData(){
  		this.totalPeople=0;
  		this.today={"noAnswerRate":0,"loss":23,"lossRate":0,"labourRate":0,"noAnswer":13,"labour":34};
  		this.real={"ready":0,"login":0,"queue":0};
  		this.weekly=[{"date":"06-21","callIn":32,"toLabour":24,"answer":29},{"date":"06-22","callIn":23,"toLabour":45,"answer":23},{"date":"06-23","callIn":31,"toLabour":33,"answer":56},{"date":"06-24","callIn":24,"toLabour":34,"answer":23},{"date":"06-25","callIn":34,"toLabour":21,"answer":18},{"date":"06-26","callIn":24,"toLabour":24,"answer":12},{"date":"06-27","callIn":21,"toLabour":31,"answer":19}];
  		for(var key in this.real){
  			console.log(key)
  			this.totalPeople+=this.real[key];
  		}
  		this.drawLineChart();
  		this.drawPieChart();	
  	},
  	drawLineChart(){
  		var legendData=['呼入量','转人工量','接听量'];
  		var getDateData=()=>{
  			let dateArr=[];
  			for(let i=0;i<this.weekly.length;i++){
  				dateArr.push(this.weekly[i].date);
  			}
  			return dateArr;
  		};
		var getSeriesData=(key)=>{
  			let temp=[];
  			for(let i=0;i<this.weekly.length;i++){
  				for(let k in this.weekly[i]){
  					if(k==key){
  						temp.push(this.weekly[i][k]);
  					}
  				}
  			}
  			return temp;
		}
		var option = {
		    title: {
		        text: '最近一周热线统计',
		        x:'center',
		        textStyle:{
		        	color:'#fff'
		        },
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    color:['#3FC4FF','#42B983','#E56EA3'],
		    legend: {
		        orient: 'vertical',
		        textStyle:{
		        	color:'#fff',
		        	fontSize:14
		        },
		        left: 'left',
		        data: legendData
		    },
		    grid: {
		        left: '5%',
		        right: '5%',
		        top: '15%',
		        bottom: '5%',
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: getDateData(),
		        axisLine:{
		        	lineStyle:{
		        		color:"#fff"
		        	}
		        }
		    },
		    yAxis: {
		        type: 'value',
		        axisLine:{
		        	lineStyle:{
		        		color:"#fff",
		        		width:"0"
		        	}
		        }
		    },
		    series: [
		        {
		            name:'呼入量',
		            type:'line',
		            stack: '总量',
		            data:getSeriesData('callIn')
		        },
		        {
		            name:'转人工量',
		            type:'line',
		            stack: '总量',
		            data:getSeriesData('toLabour')
		        },
		        {
		            name:'接听量',
		            type:'line',
		            stack: '总量',
		            data:getSeriesData('answer')
		        }
		    ]
		};
		this.lineChart.setOption(option);
  	},
  	drawPieChart(){
  		var getLegendData=()=>{
			let temp=[];
			for(let key in this.today){
				if(key=='labour'){
					temp.push('今日人工接听');
				}
				else if(key=='loss'){
					temp.push('今日话损');
				}
				else if(key=='noAnswer'){
					temp.push('今日未接听数');
				}
			}
			return temp;
		};
		this.totalPhone=0;
//    totalPeople:25,
//    totalPhone:1500,
		var getSeriesData=()=>{
			let tempArr=[];
			for(let key in this.today){
				if(key=='labour'){
					this.totalPhone+=this.today[key];
					tempArr.push({
						value:this.today[key],
						name:'今日人工接听'
					})
				}
				else if(key=='loss'){
					this.totalPhone+=this.today[key];
					tempArr.push({
						value:this.today[key],
						name:'今日话损'
					})
				}
				else if(key=='noAnswer'){
					this.totalPhone+=this.today[key];
					tempArr.push({
						value:this.today[key],
						name:'今日未接听数'
					})
				}
			}
			return tempArr;
		}
		var option = {
		    title : {
		        text: '今日客户服务热线统计',
		        x:'center',
		        textStyle:{
		        	color:'#fff'
		        } 
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: " {a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        textStyle:{
		        	color:'#fff',
		        	fontSize:14
		        },
	            data:getLegendData()
		    },
		    color:['#3FC4FF','#E56EA3','#B2FA58','#FED530'],
		    series : [
		        {
		            name: '通话排队',
		            type: 'pie',
		            radius: ['40%', '60%'],
		            center: ['50%', '60%'],
		            data:getSeriesData(),
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                },
		                normal:{
		                	label:{
		                		formatter: "{b}:\n\n{c} ({d}%)"
		                	}
		                }
		            }
		        }
		    ]
		};
	    this.pieChart.setOption(option);
  	}
 }
}
</script>
