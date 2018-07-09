<template>
	<div class="wrapper">
		<v-header @navState="onNavState" :showNav="showNav"></v-header>
	    <router-view></router-view>
	</div>
</template>
<script>
export default {
	data(){
		return {
			showNav:false,
//			height:0,
//			width:0,
//			bg:null
		}
	},
//	mounted(){
//		this.bg=this.$bg();
//		window.onresize=()=>{
//			this.width=document.documentElement.clientWidth,
//			this.height=document.documentElement.clientHeight
//		},
//		window.onkeyup=(e)=>{
//			if(e.keyCode=='122'){
//				this.width=document.documentElement.clientWidth,
//				this.height=document.documentElement.clientHeight
//			}
//		}
//	},
	methods:{
		onNavState(){
			this.showNav=!this.showNav;
		}
	},
//	watch:{
//		width(old,New){
//			this.$bg();
//		},
//		height(old,New){
//			this.$bg();
//		}
//	},
	components:{
	  	'v-header':(resolve)=>{
	  		require(['components/header'],resolve);
	  	}
	}
}
</script>