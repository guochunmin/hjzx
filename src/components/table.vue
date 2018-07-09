<template>
	<div class="table-wrapper">
	<table>
		<caption>员工座位分布图</caption>
		<tbody>
			<tr v-for="trItem in tableData">
				<td v-for="tdItem in trItem">
					<div class="desk">
						<div v-for="item in tdItem" class="staff" :class="item.agentStatus">
							<i class="iconfont icon-personal"></i>
							<span>{{item.account}}</span>
						</div>
					</div>
				</td>
			</tr>
			<!--<tr>
				<td v-for="i in 5">
					<div class="desk">
						<div class="staff READY">
							<i class="iconfont icon-personal"></i>
							<span>1102</span>
						</div>
						<div class="staff REST">
							<i class="iconfont icon-personal"></i>
							<span>1102</span>
						</div>
						<div class="staff BUSY">
							<i class="iconfont icon-personal"></i>
							<span>1102</span>
						</div>
						<div class="staff DELAY">
							<i class="iconfont icon-personal"></i>
							<span>1102</span>
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<td v-for="i in 4">
					<div class="desk">
						<div class="staff READY">
							<i class="iconfont icon-personal"></i>
							<span>1102</span>
						</div>
						<div class="staff REST">
							<i class="iconfont icon-personal"></i>
							<span>1102</span>
						</div>
						<div class="staff BUSY">
							<i class="iconfont icon-personal"></i>
							<span>1102</span>
						</div>
						<div class="staff DELAY">
							<i class="iconfont icon-personal"></i>
							<span>1102</span>
						</div>
					</div>
				</td>
			</tr>-->
			
		</tbody>
	</table>
		<div class="legend-wrapper">
			<div v-for="item in baseCode" class="staff" :class="item.code">
				<i class="iconfont icon-personal"></i>
				<span>{{item.name}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			baseCode:Array,
			tableData:Array
		}
	}
</script>

<style lang="less">
@width:120;
@margin:2;
@top:35;
@left:35;
.table-wrapper{
	width:95%;
	height:100%;
	margin:0 auto;
}
table{
    width:100%;
    height:calc(~'100% - 160px');
    caption{
        font-size:2rem;
        font-weight: 800;
        line-height:80px;
    }
    tr td{
    	&:nth-child(even) .desk{
    		margin-top:80px;
    	}
    }
}
.desk{ 
    width:unit(@width + @margin,px);
    height:unit(@width + @margin,px);
    background: url('../assets/images/table.png') no-repeat center center;
    background-size:40px;
    position: relative;
    .staff{
    	position: absolute;
    	top:50%;
    	left:50%;
    	transform: translate(-50%,-50%);
    	text-align:center;
    	font-size:1.2rem;
    	.iconfont{
    		display:block;
    		font-size:4rem;
    		font-weight:600;
    	}
        &:nth-child(1){
        	margin-top:unit(-@top,px);
        	margin-left:unit(-@left,px);
        }
        &:nth-child(2){
        	margin-top:unit(-@top,px);
        	margin-left:unit(@left,px);
        }
        &:nth-child(3){
        	margin-top:unit(@top,px);
        	margin-left:unit(-@left,px);
        }
        &:nth-child(4){ 
        	margin-top:unit(@top,px);
        	margin-left:unit(@left,px);
        }
    }
}
.legend-wrapper{
	text-align: center;
	height:80px;
	line-height:80px;
	.staff{
		display:inline-block;
		margin-right:15px;
    	.iconfont{
    		font-size:3.6rem;
    		font-weight:600;
    	}
    	span{
    		font-size:1.6rem;
    	}
	}
}
.READY{
    color: #3FC4FF;
}
.REST{
    color: #FED530;
}
.DELAY{
    color: #97A8FF;
}
.BUSY{
    color: #E56EA3;
}

</style>