import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      redirect:'/login'
    },
    {
      path: '/login',
      name:'login',
      component: (resolve)=>{
      	require(['views/login'],resolve);
      }
    },
		{
			path:'/index',
      name:'index',
      component: (resolve)=>{
      	require(['views/index'],resolve);
      },
			children:[
			    {
			      path: '',
			      redirect:'realTimeStatus'
			    },
			    {
			      path: 'realTimeStatus',
			      name:1,
			      component: (resolve)=>{
			      	require(['views/index/child/realTimeStatus'],resolve);
			      }
			    },
			    {
			      path: 'index2',
			      name:2,
			      component: (resolve)=>{
			      	require(['views/index/child/index2'],resolve);
			      }
			    },
			    {
			      path: 'trafficCase',
			      name:3,
			      component: (resolve)=>{
			      	require(['views/index/child/trafficCase'],resolve);
			      }
			    },
			    {
			      path: 'index4',
			      name:4,
			      component: (resolve)=>{
			      	require(['views/index/child/index4'],resolve);
			      }
			    },
			    {
			      path: 'index5',
			      name:5,
			      component: (resolve)=>{
			      	require(['views/index/child/index5'],resolve);
			      }
			    },
			    {
			      path: 'index6',
			      name:6,
			      component: (resolve)=>{
			      	require(['views/index/child/index6'],resolve);
			      }
			    }
    	]
		}
  ]
})
router.beforeEach((to,from,next)=>{
//	console.log(document.cookie)
	next();
})
export default router;