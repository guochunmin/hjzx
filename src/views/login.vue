<style lang="less">
	@import url("../assets/less/mixin.less");
	.login-wrapper{
		.center();
		padding:40px 100px;
		color:#fff;
		h1{
			line-height:40px;
			text-align: center;
			font-size:2rem;
		}
	}
	.login-group{
		margin-top:15px;
		margin-bottom:15px;
		label{
			display:inline-block;
			width:60px;
			font-size:1.6rem;
			padding-right:10px;
			text-align: justify;
		}
	}
	input{
		width:200px;
		height:40px;
		text-indent: 10px;
		border:1px solid #ddd;
		color:#333;
		background-color: #fff;
	}
	.login{
		width:200px;
		line-height:40px;
		background: -webkit-linear-gradient(top,#0A6CB5 0%,#064F97,#0A6CB5 100%);
		color:#fff;
		cursor: pointer;
		font-size:1.6rem;
		&:hover{
			background: -webkit-gradient(linear, 0 0, 0 100%, from(#0A6CB5), color-stop(0, #1858A0), to(#0A6CB5));
			background: -webkit-linear-gradient(#0A6CB5 0%, #1858A0 0%, #0A6CB5 100%);
			background: -moz-linear-gradient(#0A6CB5 0%, #1858A0 0%, #0A6CB5 100%);
			background: -o-linear-gradient(#0A6CB5 0%, #1858A0 0%, #0A6CB5 100%);
			background: linear-gradient(#0A6CB5 0%, #1858A0 0%, #0A6CB5 100%);
		}
		&.abnormal{
			background: -webkit-linear-gradient(top,#173F82 0%,#0A6CB5 60%,#173F82 100%);
		}
	}
</style>
<template>
	<div class="login-wrapper chart-box">
		<h1>登录</h1>
		<div class="login-group">
			<label>用 户 名</label>
		    <input type="text" placeholder="账号 |手机" :value="username">
		</div>
		<div class="login-group">
			<label>密		码</label>
			<input type="password" placeholder="请输入密码" :value="password">
			<input type="hidden" :value="key">
		</div>
		<div class="login-group">
			<label></label>
			<button class="login" :class="logined?'abnormal':'normal'" @click="login">登录</button>
		</div>
	</div>
</template> 

<script>
	const sha1 = require("crypto-js/SHA1");
	export default{
		data(){
			return {
				key:'',
				username:'root',
				password:'root',
				width:0,
				height:0,
				logined:false
			}
		},
		mounted(){
			this.init();
			this.watchPage();
		},
		watch:{
			width(old,New){
				this.init();
			},
			height(old,New){
				this.init();
			}
		},
		methods:{
			watchPage(){
				window.onresize=()=>{
					this.width=document.documentElement.clientWidth,
					this.height=document.documentElement.clientHeight
				},
				window.onkeyup=(e)=>{
					if(e.keyCode=='122'){
						this.width=document.documentElement.clientWidth,
						this.height=document.documentElement.clientHeight
					}
				}
			},
			init(){
				this.$bg();
			},
			login(){
				this.logined=true;
				if(this.trim(this.username).length==0){
					alert('用户名不能为空!', '提示');
            		return;
				}
				if(this.trim(this.password).length==0){
					alert('密码不能为空!', '提示');
            		return;
				}
				let ciphertext = this.username + this.password;
				
		        for (var i = 0; i < 1024; i++) {
		            ciphertext = sha1(ciphertext);
		        }
				this.key=ciphertext.toString();
				this.$jq.ajax({
		        	url:'http://grp01.idc.easycon.cn/user/open/auth',
		        	type:'post',
		        	data:{
		        		username:this.username,
		        		password:this.key
		        	},
		        	success:(function(res){
		        		this.successHandle(res);
		        	}).bind(this)
		        })
			},
			successHandle(data){
				switch(data){
					case 0:
						console.log('密码错误');
						break;
					case -1:
						console.log('用户不存在');
						break;
					case -2:
						console.log('密码过期');
						break;
					case -3:
						console.log('用户账号过期');
						break;
					case -4:
						console.log('用户账号锁定');
						break;
					default:
//						console.log('认证成功');
		        		this.logined=false;
						this.$router.push('/index/realTimeStatus');
						break;
					
				}
			}
			
		}
	}
</script>