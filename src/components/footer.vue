<style  rel="stylesheet/less" lang="less" scoped>
	@import url("../assets/less/mixin.less");
	footer{
		position:fixed;
		bottom:0;
		left:0;
	    width:100%;
	    height:65px;
	    display:flex;
	    flex-wrap:nowrap;
	    justify-content: center;
	    align-items: center;
	    align-content: center;
	    .circle{
	    	width:12px;
	    	height:12px;
	    	border:1px solid whitesmoke;
	    	border-radius: 50%;
	    	margin:0 10px;
	    	&.active{
		    	width:15px;
		    	height:15px;
	    		background-color: white;
	    	}
	    }
	}
</style>
<template>
	<footer>
		<span v-for="i in len" class="circle" :class="i==index?'active':''" @click="getIndex(i)"></span>
	</footer>
</template>
<script>
export default {
	props:{
		index:Number,
		len:Number
	},
	methods:{
		getIndex(i){
			this.$emit('getIndex',i);
		}
	}
}
</script>