<style lang="less">
	@import url("../../assets/less/mixin.less");
	.bounceRight-enter-active {
  		animation: bounce-right-in .5s;
	}
	.bounceRight-leave-active {
		animation: bounce-right-out .5s;
	}
	.bounceLeft-enter-active {
  		animation: bounce-left-in .5s;
	}
	.bounceLeft-leave-active {
		animation: bounce-left-out .5s;
	}
	@keyframes bounce-right-in {
	  0% {
	    transform: translate(100%,-100%);
	  }
	  50% {
	    transform: translate(50%,-100%);
	  }
	  100% {
	    transform: translate(0,-100%);
	  }
	}
	@keyframes bounce-right-out {
	  0% {
	    transform: translate(0,0);
	  }
	  50% {
	    transform: translate(-50%,0);
	  }
	  100% {
	    transform: translate(-100%,0);
	  }
	}
	@keyframes bounce-left-in {
	  0% {
	    transform: translate(-100%,-100%);
	  }
	  50% {
	    transform: translate(-50%,-100%);
	  }
	  100% {
	    transform: translate(0,-100%);
	  }
	}
	@keyframes bounce-left-out {
	  0% {
	    transform: translate(0,0);
	  }
	  50% {
	    transform: translate(50%,0);
	  }
	  100% {
	    transform: translate(100%,0);
	  }
	}
	.main-wrapper{
		/*height:calc(~'100% - 80px');*/
		position: relative;
		height:100%;
		box-sizing: border-box;
		padding-top:140px;
		padding-bottom:85px;
	}
	.content-wrapper{
		/*height:calc(~'100% - 65px');*/
		width:90%;
		height:100%;
		box-sizing: border-box;
		margin:0 auto;
		color:#fff;
		padding:5px;
	}
	.chart-item{
	    box-sizing: border-box;
	    padding-top:10px;
	    padding-left:10px;
	}
	.notice{
	    line-height:50px;
	    text-align: center;
	    font-size: 1.6rem;
	    font-weight: 600;
	    margin:0;
	}
</style>
<template>
	<div v-swipeleft="left" v-swiperight="right" class="main-wrapper">
		<transition :name="tranName">
			<router-view></router-view>
		</transition>
		<v-footer :index="index" :len="pageAll" @getIndex="getIndex"></v-footer>
	</div>
</template>
<script>
export default {
	data(){
		return {
			pageAll:3,
			index:this.$route.name,
			tranName:"bounceRight",
			isClick:false,
			pageTimer:5000,
			interval:null,
		}
	},
	mounted(){
		this.interval=setInterval(this.left,this.pageTimer);
	},
	watch:{
		$route(n,o){
			this.index=n.name;
			if(this.isClick){
				if(n.name>=o.name){
					this.tranName='bounceRight';
				}
				else{
					this.tranName='bounceLeft';
				}
			}
		},
	},
	methods:{
		swipeleft(){
			let index=this.$route.name;
			if(index==this.pageAll){
				index=0;
			}
			index++;
			this.isClick=false;
			this.tranName="bounceRight";
			this.$router.push({name:index});
		},
		left(){
			clearInterval(this.interval);
			this.swipeleft();
			this.interval=setInterval(this.swipeleft,this.pageTimer);
		},
		right(){
			clearInterval(this.interval);
			let index=this.$route.name;
			if(index==1){
				index=this.pageAll+1;
			}
			index--;
			this.tranName="bounceLeft";
			this.$router.push({name:index});
			this.interval=setInterval(this.swipeleft,this.pageTimer);
		},
		getIndex(index){
			clearInterval(this.interval);
			this.isClick=true;
			this.$router.push({name:index});
			this.interval=setInterval(this.swipeleft,this.pageTimer);
		}
	},
  	components:{
  		'v-footer':(resolve)=>{
  			require(['components/footer'],resolve);
  		}
  	}
}
</script>
