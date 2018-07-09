<style lang="less" scoped="scoped">
	@import url("../../../assets/less/mixin.less");
	.content{
		height:100%;
		&:first-child{
			padding-right:8px;
		}
		&:last-child{
			background-color:rgba(19,66,119,.6);
	        border-radius:5px;
	        box-shadow: 0 0 1px 1px rgba(255,255,255,.1);
		}
	}
	.chart-wrapper{
		height:100%;
        .chart-box:first-child{
            height:calc(50% - 8px);
            margin-bottom: 8px;
        }
	}
	.chart-box{
        height:50%;
        .chart-item{
            height:calc(~'100% - 50px');
        }
	}
	.station-wrapper{
		position: relative;
		height:100%;
	}
</style>
<template>
  	<div class="content-wrapper row">
  		<div class="content col-xs-24 col-sm-9">
			<div class="chart-wrapper">
				<div class="chart-box">
					<div id="staffChart" class="chart-item"></div>
					<p class="notice">总座席数（{{total}}）人</p>
				</div>
				<div class="chart-box">
					<div id="clientChart" class="chart-item"></div>
					<p class="notice">当前等待人数过多，建议增加在线坐席</p>
				</div>
			</div>
  		</div>
  		<div class="content col-xs-24 col-sm-15">
			<div class="station-wrapper ">
				<v-table :baseCode="baseCode" :tableData="tableData"></v-table>
			</div>
  		</div>
  	</div>
</template>

<script>
	// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
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
      	timer:5000,
      	pageTimer:120000,
      	showNav:false,
      	baseCode:[{code:'READY',name:'就绪'},{code:'REST',name:'未就绪'},{code:'DELAY',name:'事后处理'},{code:'BUSY',name:'临时签退'}],
      	agentStatus:[],
      	channelStatus:{},
      	deskPeple:4,
      	columns:5,
      	tableData:[],
      	total:0
    }
  },
  mounted(){
	this.staffChart = echarts.init(document.getElementById('staffChart'));
	this.clientChart = echarts.init(document.getElementById('clientChart'));
	this.init();
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
  		this.staffChart.resize();
  		this.clientChart.resize();
  	},
  	init(){
  		this.$bg();
  		this.getData();
  		setTimeout(this.init,this.timer);
  	},
  	getData(){
  		let index=37;
  		this.agentStatus=[];
  		for(let i=0;i<index;i++){
  			this.agentStatus.push({
  				agentGroup:"成都组",
				account:'110'+''+(i+1),
	      		role:"agent",
				user:'张三',
				agentStatus:this.baseCode[this.randomNum(0,3)].code,
		    	channelStatus:"ZCALL",
		    	onlined:false,
  			})
  		}
  		this.channelStatus={"onCall":30,"queue":5};
  		this.total=this.agentStatus.length;
  		this.drawTable();
  		this.drawStaffChart();
  		this.drawClientChart();
  	},
  	drawTable(){
		this.desks=this.agentStatus.length%this.deskPeple==0?this.agentStatus.length/this.deskPeple:parseInt(this.agentStatus.length/this.deskPeple)+1;
		this.rows=this.desks%this.columns==0?this.desks/this.columns:parseInt(this.desks/this.columns)+1;
		let tdArr=this.sliceArr(this.agentStatus,this.deskPeple);
		this.tableData=this.sliceArr(tdArr,this.columns);
  	},
  	drawStaffChart(){
		var getLegendData=()=>{
			let temp=[];
			for(let i=0;i<this.baseCode.length;i++){
				temp.push(this.baseCode[i].name);
			}
			return temp;
		};
		var getSeriesData=()=>{
			let ready=0,rest=0,delay=0,busy=0;
			for(let i=0;i<this.agentStatus.length;i++){
				if(this.agentStatus[i].agentStatus=='READY'){
					ready++;
				}
				else if(this.agentStatus[i].agentStatus=='REST'){
					rest++;
				}
				else if(this.agentStatus[i].agentStatus=='DELAY'){
					delay++;
				}
				else if(this.agentStatus[i].agentStatus=='BUSY'){
					busy++;
				}
			}
			let tempCount=[ready,rest,delay,busy];
			let temp=[];
			for(let i=0;i<this.baseCode.length;i++){
				temp.push({
					name:this.baseCode[i].name,
					value:tempCount[i]
				});
			}
			return temp;
		};
		var option = {
		    title : {
		        text: '坐席状态',
		        x:'center',
		        textStyle:{
		        	color:'#fff'
		        }
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        textStyle:{
		        	color:'#fff',
		        	fontSize:14
		        },
		        data: getLegendData()
		    },
		    color:['#3FC4FF', '#FED530','#97A8FF','#E56EA3'],
		    series : [
		        {
		            name: '坐席状态',
		            type: 'pie',
		            radius: ['50%', '70%'],
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
		                		formatter: " {d}% \n {b} : {c}人 "
		                	}
		                }
		            }
		        }
		    ]
		};
	    this.staffChart.setOption(option);
  	},
  	drawClientChart(){
  		var getLegendData=function(obj){
			let tempArr=[];
			for(let key in obj){
				if(key=='onCall'){
					tempArr.push('实时通话量');
				}
				else if(key=='queue'){
					tempArr.push('实时排队数');
				}
			}
			return tempArr;
		};
		var getSeriesData=function(obj){
			let tempArr=[];
			for(let key in obj){
				if(key=='onCall'){
					tempArr.push({
						value:obj[key],
						name:'实时通话量'
					})
				}
				else if(key=='queue'){
					tempArr.push({
						value:obj[key],
						name:'实时排队数'
					})
				}
			}
			return tempArr;
		}
		var option = {
		    title : {
		        text: '通话排队',
		        x:'center',
		        textStyle:{
		        	color:'#fff'
		        } 
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        textStyle:{
		        	color:'#fff',
		        	fontSize:14
		        },
	            data:getLegendData(this.channelStatus)
		    },
		    color:['#3FC4FF','#E56EA3'],
		    series : [
		        {
		            name: '通话排队',
		            type: 'pie',
		            radius: ['50%', '70%'],
		            center: ['50%', '60%'],
		            data:getSeriesData(this.channelStatus),
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                },
		                normal:{
		                	label:{
		                		formatter: " {b} : {c}人 ({d}%)"
		                	}
		                }
		            }
		        }
		    ]
		};
	    this.clientChart.setOption(option);
  	},
  	fullScreen(){
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm = document.body; //overwrite the element (for IE)
            docElm.msRequestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        setTimeout(this.init,500);
  	},
  },
  components:{
  	'v-table':(resolve)=>{
  		require(['components/table'],resolve);
  	}
  }
}
</script>
