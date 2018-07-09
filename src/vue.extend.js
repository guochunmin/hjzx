export default
{
    install(Vue)
    {
		Vue.prototype.randomNum=function(min,max){
			var num=Math.floor(Math.random()*(max-min+1)+min);
			return num;
		};
		Vue.prototype.sliceArr=function(array, size) {
		    var result = [];
		    for (var x = 0; x < Math.ceil(array.length / size); x++) {
		        var start = x * size;
		        var end = start + size;
		        result.push(array.slice(start, end));
		    }
		    return result;
		};
		Vue.prototype.trim=function( text ) {
			return text.replace(/(^\s*)|(\s*$)/g, "");
		};
        Vue.prototype.$bg=function(){
        	var drawBG=function(){
				this.width=document.body.clientWidth;
				this.height=document.body.clientHeight;
				this.cell={
					w:10,
					h:10
				};
				this.init=function(){
					if(document.getElementById("bg")){
						document.getElementsByTagName('body')[0].removeChild(document.getElementById("bg"));
					}
					this.canvas=document.createElement("canvas");
					this.ctx=this.canvas.getContext("2d");
					this.canvas.style.backgroundColor="#0E5389";
					this.canvas.width=this.width;
					this.canvas.height=this.height;
					this.canvas.setAttribute('id','bg');
					this.drawGrid();
					this.drawHeader();
					this.drawCircle(this.width*0.4,50);
					document.getElementsByTagName('body')[0].insertBefore(this.canvas,document.getElementsByClassName('wrapper')[0]);
				};
				this.drawLine=function(direction,opacity){
					this.ctx.beginPath();
					this.ctx.strokeStyle="rgba(255,255,255,"+opacity+")";
				    if(direction && direction=='col'){
				    	this.ctx.moveTo(this.cell.w,0);
				    	this.ctx.lineTo(this.cell.w,this.height);
				    }
				    else{
				    	this.ctx.moveTo(0,this.cell.h);
				    	this.ctx.lineTo(this.width,this.cell.h);
				    }
					this.ctx.stroke();
				};
				this.drawGrid=function(){
					for(let i=0;i<parseInt(this.height/this.cell.h);i++){
						this.ctx.save();
				    	this.ctx.translate(0,(i-1)*this.cell.h);
						if(i%5==0){
							this.drawLine('row','.1');
						}
						else{
							this.drawLine('row','.05');
						}
						this.ctx.restore();
					}
					for(let i=0;i<parseInt(this.width/this.cell.w);i++){
						this.ctx.save();
				    	this.ctx.translate((i-1)*this.cell.w,0);
						if(i%5==0){
							this.drawLine('col','.1');
						}
						else{
							this.drawLine('col','.05');
						}
						this.ctx.restore();
					}
				};
				this.drawHeader=function(){
					var bh=80,bw=80,bw1=250,bx=20;
					this.ctx.beginPath();
					this.ctx.moveTo(0,0);
					this.ctx.lineTo(0,bh);
					this.ctx.lineTo(bw,bh);

					this.ctx.lineTo(bw+bx,bh-bx);
					this.ctx.lineTo(bw+bx+bw1,bh-bx);
					this.ctx.lineTo(bw+bx+bw1+bx,bh);
					
					
					this.ctx.lineTo(this.width-bw-bx-bw1-bx,bh);
					this.ctx.lineTo(this.width-bw-bx-bw1,bh-bx);
					this.ctx.lineTo(this.width-bw-bx,bh-bx);
					this.ctx.lineTo(this.width-bw,bh);
					
					this.ctx.lineTo(this.width-bw,bh);
					this.ctx.lineTo(this.width,bh);
					this.ctx.lineTo(this.width,0);
					this.ctx.closePath();
					this.ctx.strokeStyle = "rgba(255,255,255,.4)";
					this.ctx.fillStyle="rgba(17,110,175,.8)";
					this.ctx.fill();
					this.ctx.stroke();
				};
				this.drawCircle=function(a, b){
					var ox = 0.5 * a,oy = 0.6 * b;
					var x0=this.width*0.5,x=this.width*0.4,y=this.height-35;
					this.ctx.save(); 
					this.ctx.translate(x0, y);
					this.ctx.shadowOffsetX = 15; // 阴影Y轴偏移
					this.ctx.shadowOffsetY = 15; // 阴影X轴偏移
					this.ctx.shadowBlur = 14; // 模糊尺寸
					this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 颜色
					var gradient = this.ctx.createLinearGradient(-x, -y, x, y);
					gradient.addColorStop(0, 'rgba(255,255,255,0)');
					gradient.addColorStop(0.4, 'rgba(255,255,255,.03)');
					gradient.addColorStop(0.5, 'rgba(255,255,255,.08)');
					gradient.addColorStop(0.6, 'rgba(255,255,255,.03)');
					gradient.addColorStop(1, 'rgba(255,255,255,0)');
					this.ctx.fillStyle = gradient;
					this.ctx.beginPath();
					this.ctx.moveTo(0,b);   
			        this.ctx.bezierCurveTo(ox, b, a, oy, a, 0);  
			        this.ctx.bezierCurveTo(a, -oy, ox, -b, 0, -b);  
			        this.ctx.bezierCurveTo(-ox, -b, -a, -oy, -a, 0);  
			        this.ctx.bezierCurveTo(-a, oy, -ox, b, 0, b);  
			        this.ctx.closePath();
					this.ctx.fill();
					this.ctx.restore();
				};
				this.init();
				return this;
			}
        	return new drawBG();
        }
    }
}