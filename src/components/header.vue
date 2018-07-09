<style  rel="stylesheet/less" lang="less" scoped>
	@import url("../assets/less/mixin.less");
	header{
		position:fixed;
		top:0;
		left:0;
	    width:100%;
		height:80px;
		color:#fff;
		text-align: center;
	}
	.header-main{
		.center();
		display: inline-block;
		white-space: nowrap;
		padding-top:10px;
		text-align:left;
		.title-wrapper{
			display: inline-block;
			margin-right:10px;
			padding-right:10px;
			border-right:2px solid #fff;
			h1{
				font-size:2.4rem;
				letter-spacing:3px;
			}
			p{
				font-size:1.4rem;
			}
		}
		.time-wrapper{
			display: inline-block;
			.date-box{
				font-size:1.4rem;
			}
			.time-box{
				font-size:2.4rem;
				letter-spacing:3px;
			}
		}
	}
	.right-nav{
		position: relative;
		float:right;
		.iconfont{
			font-size:3rem;
			padding-right:30px;
			line-height:80px;
		}
		nav{
			position: absolute;
			right:2px;
			top:70px;
			text-align: center;
			padding-left:20px;
			padding-right:20px;
			background-color:rgba(19,66,119,.7);
		    box-shadow: 0 0 1px 1px rgba(255,255,255,.1);
		    border-radius:5px;
			a{
				display:block;
				white-space: nowrap;
				line-height:40px;
				font-size:1.6rem;
			}
		}
	}
</style>
<template>
	<header>
		<div class="header-main">
			<div class="title-wrapper">
				<h1>西南油气田燃气客户服务热线  95XXX <i></i></h1>
				<p>Gas customer service hotline 95XXX in southwest oil and gas field<i></i></p>
			</div>
			<div class="time-wrapper">
				<p class="date-box">{{day}}<i></i></p>
				<p class="time-box">{{time}}<i></i></p>
			</div>
		</div>
		<div class="right-nav">
			<i class="iconfont" :class="showNav?'icon-close':'icon-nav'" @click="navState"></i>
			<!--<i class="iconfont" :class="showNav?'icon-close':'icon-nav'"></i>-->
			<nav v-if="showNav">
				<router-link to="/realTimeStatus" title="实时状态">实时状态</router-link>
				<router-link to="/index2">热线统计</router-link>
				<router-link to="/trafficCase" title="话务分析">话务分析</router-link>
				<router-link to="/index4">index4</router-link>
				<router-link to="/index5">index5</router-link>
				<router-link to="/index6">index6</router-link>
			</nav>
		</div>
	</header>
</template>
<script>
export default {
	data(){
		return {
			day:"",
			time:""
		}
	},
	props:{
		showNav:{
			type:Boolean,
			default:false
		}
	},
	mounted(){
		this.getTime();
	},
	methods:{
		getTime(){
			let that=this;
			const day=new Date();
			const y=day.getFullYear();
			const m=this.matchNum(day.getMonth()+1);
			const d=this.matchNum(day.getDate());
			const w=' 星期'+'日一二三四五六'.charAt(day.getDay());
			const h=this.matchNum(day.getHours());
			const min=this.matchNum(day.getMinutes());
			const s=this.matchNum(day.getSeconds());
			this.day=y+'-'+m+'-'+d+w;
			this.time=h+':'+min+':'+s;
			setTimeout(function(){
				that.getTime(day)
			},10);
		},
		matchNum(num){
			if(num<10){
				return ''+'0'+num;
			}
			return num;
		},
		navState(){
			this.$emit('navState');
		}
	}
}
</script>