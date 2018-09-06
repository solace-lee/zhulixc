import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
import Index from '@/views/Index.vue';
const map = resolve => require(['@/views/map.vue'], resolve)
const Category = resolve => require(['@/components/category/category.vue'], resolve)
const member = resolve => require(['@/components/area/member.vue'], resolve)
const hot = resolve => require(['@/components/area/hot.vue'], resolve)
const duihuan = resolve => require(['@/components/area/duihuan.vue'], resolve)
const citypir = resolve => require(['@/components/area/citypir.vue'], resolve)
const hotspot = resolve => require(['@/components/index/hotspot.vue'], resolve)
const cunpin = resolve => require(['@/components/area/cunpin.vue'], resolve)
//发现页
const found = resolve => require(['@/components/found/found.vue'], resolve)
const hotspotparticulars = resolve => require(['@/components/index/hotspotparticulars.vue'], resolve)
// 绑定手机
const bound = resolve => require(['@/components/index/bound.vue'], resolve)
//搜索页
const search = resolve => require(['@/components/index/search.vue'], resolve)
//商品列表帅选页
const search2 = resolve => require(['@/components/index/search2.vue'], resolve)
//收货地址
const search3 = resolve => require(['@/components/index/search3.vue'], resolve)
//交易成功
const search4 = resolve => require(['@/components/index/search4.vue'], resolve)
//查看物流
const search5 = resolve => require(['@/components/index/search5.vue'], resolve)
//店铺详情
const search6 = resolve => require(['@/components/index/search6.vue'], resolve)
//用户评价
const search7 = resolve => require(['@/components/index/search7.vue'], resolve)
//微信支付
const daishouhuo = resolve => require(['@/views/daishouhuo.vue'], resolve)
//配送方式弹层
const share = resolve => require(['@/components/index/share.vue'], resolve)
//立即购买
const buy = resolve => require(['@/views/buy.vue'], resolve)
//店铺首页->主
const indexS = resolve => require(['@/components/index/indexS.vue'], resolve)
const shopMsg = resolve => require(['@/components/index/shopMsg.vue'], resolve)
//店铺首页2->新品上架
const indexS2 = resolve => require(['@/components/index/indexS2.vue'], resolve)
//店铺首页1->全部商品
const indexS1 = resolve => require(['@/components/index/indexS1.vue'], resolve)
//支付方式弹层
const share2 = resolve => require(['@/components/index/share2.vue'], resolve)
//抽奖页
const draw = resolve => require(['@/components/index/draw.vue'], resolve)
const drawsingle = resolve => require(['@/components/index/drawsingle.vue'], resolve)

const Car = resolve => require(['@/views/Car.vue'], resolve)
const User = resolve => require(['@/views/User.vue'], resolve)
const UserExamine = resolve => require(['@/views/UserExamine.vue'], resolve)

const Userpwd = resolve => require(['@/views/Userpwd.vue'], resolve)
const Useramend = resolve => require(['@/views/Useramend.vue'], resolve)
const Detail = resolve => require(['@/views/Detail.vue'], resolve)
const Search = resolve => require(['@/views/Search.vue'], resolve)
const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const payorder = resolve => require(['@/views/payorder.vue'], resolve)
// const shop = resolve => require(['@/components/shop/shop.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)
const register = resolve => require(['@/views/register.vue'], resolve)

const Group = resolve => require(['@/views/group.vue'], resolve)
const User5 = resolve => require(['@/views/User5.vue'], resolve)
const User3 = resolve => require(['@/views/User3.vue'], resolve)
const User2 = resolve => require(['@/views/User2.vue'], resolve)

const Kfc = resolve => require(['@/views/kfc.vue'], resolve)
const Category2 = resolve => require(['@/views/Category2.vue'], resolve)
const seek = resolve => require(['@/views/seek.vue'], resolve)
const shoplist = resolve => require(['@/views/shoplist.vue'], resolve)
const shopIndex = resolve => require(['@/components/shop/shopIndex.vue'], resolve)

const UserFf2 = resolve => require(['@/views/UserFf2.vue'], resolve)
// 钱包
const wallet = resolve => require(['@/views/wallet.vue'], resolve)
const wallet1 = resolve => require(['@/views/wallet1.vue'], resolve)
const walletCarry = resolve => require(['@/views/walletCarry.vue'], resolve)
const integral = resolve => require(['@/views/integral.vue'], resolve)

const Ptuan = resolve => require(['@/views/Ptuan.vue'], resolve)
const shipping = resolve => require(['@/views/shipping.vue'], resolve)
const shipping2 = resolve => require(['@/views/shipping2.vue'], resolve)
const shippingadd = resolve => require(['@/views/shippingadd.vue'], resolve)
const shoppingCart = resolve => require(['@/views/shoppingCart.vue'], resolve)
const put1 = resolve => require(['@/views/put1.vue'], resolve)
const User4 = resolve => require(['@/views/User4.vue'], resolve)

const UserErWeiMa = resolve => require(['@/views/UserErWeiMa.vue'], resolve)
const UserPerformance = resolve => require(['@/views/UserPerformance.vue'], resolve)
const attention = resolve => require(['@/views/attention.vue'], resolve)
// 我的银行卡
const bank = resolve => require(['@/views/bank.vue'], resolve)
const bankMsg = resolve => require(['@/views/bankMsg.vue'], resolve)

const queren = resolve => require(['@/views/queren.vue'], resolve)
const queren2 = resolve => require(['@/views/queren2.vue'], resolve)
const ruzhuIndex = resolve => require(['@/components/index/ruzhuIndex.vue'], resolve)
const ruzhu = resolve => require(['@/components/index/ruzhu.vue'], resolve)
const ruzhu2 = resolve => require(['@/components/index/ruzhu2.vue'], resolve)
const ruzhu2Agent = resolve => require(['@/components/index/ruzhu2Agent.vue'], resolve)
const ruzhu3 = resolve => require(['@/components/index/ruzhu3.vue'], resolve)
const ruzhu3Agent = resolve => require(['@/components/index/ruzhu3Agent.vue'], resolve)
const line = resolve => require(['@/views/line.vue'], resolve)
const line2 = resolve => require(['@/views/line2.vue'], resolve)
const line3 = resolve => require(['@/views/line3.vue'], resolve)
const line4 = resolve => require(['@/views/line4.vue'], resolve)
const line5 = resolve => require(['@/views/line5.vue'], resolve)
const bjy = resolve => require(['@/views/bjy.vue'], resolve)
const myshop = resolve => require(['@/views/myshop.vue'], resolve)
const Msg = resolve => require(['@/views/Msg.vue'], resolve)
const affirmOrder = resolve => require(['@/views/affirmOrder.vue'], resolve)
const Kefu = resolve => require(['@/views/Kefu.vue'], resolve)


const farm = resolve => require(['@/components/farm/farm.vue'], resolve)
const duckhouse = resolve => require(['@/components/farm/duckhouse.vue'], resolve)
const henhouse = resolve => require(['@/components/farm/henhouse.vue'], resolve)
//
const author = resolve => require(['@/views/wx.vue'], resolve)
export default new Router({
  routes: [{
    path: '/',
    name: '首页',
    component: Index
  },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    //发现
    {
      path: '/found',
      name: 'found',
      component: found
    },
  //个人中心我的店铺
  {name:myshop,path:'/myshop',component:myshop},

  {
    path: '/indexS',
    name: '店铺首页',
    component: indexS,
    children: [{
      path: '/indexS/:tab',
      component: indexS
    }]
  }, 
    {
      path: '/shopMsg',
      name: '店铺详情',
      component: shopMsg
      
    }, 
  {
    path: '/author',
    component: indexS,
  },
  {
    path: '/draw',
    name: '抽奖页',
    // redirect: '/draw/all',
    component: draw,
    children: [{
      path: '/draw/:tab',
      component: draw
    }]
  },
    {
      path: '/drawsingle',
      name: 'drawsingle',
      // redirect: '/draw/all',
      component: drawsingle,
      children: [{
        path: '/drawsingle/:tab',
        component: draw
      }]
    },

  {
    path: '/share2',
    name: '支付方式弹层',
    // redirect: '/share2/all',
    component: share2,
    children: [{
      path: '/share2/:tab',
      component: share2
    }]
  },
  {
    path: '/indexS1',
    name: '店铺首页',
    // redirect: '/indexS1/all',
    component: indexS1,
    children: [{
      path: '/indexS1/:tab',
      component: indexS1
    }]
  },
  {
    path: '/indexS2',
    name: '店铺首页',
    // redirect: '/indexS2/all',
    component: indexS2,
    children: [{
      path: '/indexS2/:tab',
      component: indexS2
    }]
  },
  // 客服
    { name: "Kefu", path:'/Kefu',component:Kefu},
  {
    path: '/hotspot',
    name: '热点资讯',
    // redirect: '/hotspot/all',
    component: hotspot,
    children: [{
      path: '/hotspot/:tab',
      component: hotspot
    }]
  },
    {
      path: '/hotspotparticulars',
      name: '热点详情',
      // redirect: '/hotspot/all',
      component: hotspotparticulars,
    },
  {
    path: '/share',
    name: '商品详情分享页',
    // redirect: '/share/all',
    component: share,
    children: [{
      path: '/share/:tab',
      component: share
    }]
  },
  {
    path: '/bound',
    name: '绑定手机',
    // redirect: '/bound/all',
    component: bound,
    children: [{
      path: '/bound/:tab',
      component: bound
    }]
  },
  {
    path: '/search2',
    name: '商品列表帅选页',
    // redirect: '/search2/all',
    component: search2,
    children: [{
      path: '/search2/:tab',
      component: search2
    }]
  },
  {
    path: '/search3',
    name: '商品列表帅选页',
    // redirect: '/search3/all',
    component: search3,
    children: [{
      path: '/search3/:tab',
      component: search3
    }]
  },
  {
    path: '/search4',
    name: '交易成功',
    // redirect: '/search4/all',
    component: search4,
    children: [{
      path: '/search4/:tab',
      component: search4
    }]
  },
  {
    path: '/search5',
    name: '查看物流',
    // redirect: '/search5/all',
    component: search5,
    children: [{
      path: '/search5/:tab',
      component: search5
    }]
  },
  {
    path: '/search6',
    name: '店铺详情',
    // redirect: '/search6/all',
    component: search6,
    children: [{
      path: '/search6/:tab',
      component: search6
    }]
  },
  {
    path: '/search7',
    name: '用户评价',
    // redirect: '/search7/all',
    component: search7,
    children: [{
      path: '/search7/:tab',
      component: search7
    }]
  },
  {
    path: '/search',
    name: '搜索页',
    // redirect: '/search/all',
    component: search,
    children: [{
      path: '/search/:tab',
      component: search
    }]
  },
  // 入驻首页
  { path:'/ruzhuIndex',name:'ruzhuIndex',component:ruzhuIndex},
  {
    path: '/ruzhu',
    name: '入驻',
    redirect: '/ruzhu/all',
    component: ruzhu,
    children: [{
      path: '/ruzhu/:tab',
      component: ruzhu
    }]
  },
  {
    path: '/ruzhu2',
    name: '商家入驻信息',
    // redirect: '/ruzhu2/all',
    component: ruzhu2,
    children: [{
      path: '/ruzhu2/:tab',
      component: ruzhu2
    }]
  },
  // 代理商入驻信息
    {
      path: '/ruzhu2Agent',
      name: 'ruzhu2Agent',
      component: ruzhu2Agent,
    },
    // 代理商提交后
    {
      path: '/ruzhu3Agent',
      name: 'ruzhu3Agent',
      component: ruzhu3Agent,
    },

  {
    path: '/ruzhu3',
    name: '审核通过',
    redirect: '/ruzhu3/all',
    component: ruzhu3,
    children: [{
      path: '/ruzhu3/:tab',
      component: ruzhu3
    }]
  },
  {
    path: '/category',
    name: 'category',
    // redirect: '/category/all',
    component: Category
  },
  // 会员专区
    {
      path: '/member',
      name: 'member',
      component: member
    },
    // 热卖专区
    {
      path: '/hot',
      name: 'hot',
      component: hot
    },
    //一村一品
    {
      path: '/cunpin',
      name: 'cunpin',
      component: cunpin
    },
    //积分兑换
    {
      path: '/duihuan',
      name: 'duihuan',
      component: duihuan
    },
    // 市价专区
    {
      path: '/citypir',
      name: 'citypir',
      component: citypir
    },

  {
    // 优惠券
    path: '/Kfc',
    name: '优惠券',
    // redirect: '/Kfc/all',
    component: Kfc,
    children: [{
      path: '/Kfc/:tab',
      component: Kfc
    }]
  },
  {
    // 确认订单
    path: '/queren',
    name: '确认订单',
    // redirect: '/queren/all',
    component: queren,
    children: [{
      path: '/queren/:tab',
      component: queren
    }]
  },
  {
    // 确认订单,支付完成
    path: '/queren2',
    name: '确认订单',
    // redirect: '/queren2/all',
    component: queren2,
    children: [{
      path: '/queren2/:tab',
      component: queren2
    }]
  },
  {
    // 订单详情
    path: '/line',
    name: '订单详情',
    // redirect: '/line/all',
    component: line,
    children: [{
      path: '/line/:tab',
      component: line
    }]
  },
  {
    // 买家已付款
    path: '/line2',
    name: '买家已付款',
    // redirect: '/line2/all',
    component: line2,
    children: [{
      path: '/line2/:tab',
      component: line2
    }]
  },
  {
    // 买家已发货
    path: '/line3',
    name: '买家已发货',
    // redirect: '/line3/all',
    component: line3,
    children: [{
      path: '/line3/:tab',
      component: line3
    }]
  },
  {
    // 交易完成
    path: '/line4',
    name: '交易完成',
    // redirect: '/line4/all',
    component: line4,
    children: [{
      path: '/line4/:tab',
      component: line4
    }]
  },
  {
    // 评价
    path: '/line5',
    name: '评价',
    // redirect: '/line5/all',
    component: line5,
    children: [{
      path: '/line5/:tab',
      component: line5
    }]
  },
  {
    path: '/group/:id',
    name: '拼团商城',
    redirect: '/group/all',
    component: Group,
    children: [{
      path: '/group/:tab',
      component: Group
    }]
  },
  {
    path: '/buy',
    name: '立即购买',
    // redirect: '/buy/all',
    component: buy,
    children: [{
      path: '/buy/:tab',
      component: buy
    }]
  },
  {
    path: '/Ptuan',
    name: '团购商品详情',
    // redirect: '/Ptuan/all',
    component: Ptuan,
    children: [{
      path: '/Ptuan/:tab',
      component: Ptuan
    }]
  },
  {
    path: '/UserFf2',
    name: '查看全部订单',
    // redirect: '/UserFf2/all',
    component: UserFf2,
    children: [{
      path: '/UserFf2/:tab',
      component: UserFf2
    }]
  }, {
    path: '/UserFf2',
    name: '待收货',
    // redirect: '/UserFf2/all',
    component: UserFf2,
    children: [{
      path: '/UserFf2/:tab',
      component: UserFf2
    }]
  },
  // 钱包
    { name: 'wallet', path: '/wallet', component: wallet },
    { name: 'wallet1', path: '/wallet1', component: wallet1 },
    { name: 'walletCarry', path: '/walletCarry', component: walletCarry},
    //积分
    { name: 'integral', path: '/integral', component: integral},

    // 找回密码
    { name: 'Userpwd', path: '/Userpwd', component: Userpwd},
    {
      path: '/Msg',
      name: 'Msg',
      component: Msg,
    },
  {
    path: '/daishouhuo',
    name: '微信支付',
    // redirect: '/daishouhuo/all',
    component: daishouhuo,
    children: [{
      path: '/daishouhuo/:tab',
      component: daishouhuo
    }]
  },
  {
    path: '/UserFf2',
    name: '待付款',
    // redirect: '/UserFf2/all',
    component: UserFf2,
    children: [{
      path: '/UserFf2/:tab',
      component: UserFf2
    }]
  },
  {
    path: '/UserFf2',
    name: '待发货',
    // redirect: '/UserFf2/all',
    component: UserFf2,
    children: [{
      path: '/UserFf2/:tab',
      component: UserFf2
    }]
  },
  {
    path: '/UserFf2',
    name: '完成',
    // redirect: '/UserFf2/all',
    component: UserFf2,
    children: [{
      path: '/UserFf2/:tab',
      component: UserFf2
    }]
  },
  {
    path: '/shipping',
    name: '收货地址',
    // redirect: '/shipping/all',
    component: shipping,
    children: [{
      path: '/shipping/:tab',
      component: shipping
    }]
  },
  {
    path: '/shipping2',
    name: '添加收货地址',
    // redirect: '/shipping2/all',
    component: shipping2,
    // children: [{
    //   path: '/shipping2/:tab',
    //   component: shipping2
    // }]
  },
    {
      path: '/shippingadd',
      name: 'shippingadd',
      component: shippingadd,
      // children: [{
      //   path: '/shipping2/:tab',
      //   component: shipping2
      // }]
    },
  {
    path: '/attention',
    name: '关注',
    // redirect: '/attention/all',
    component: attention,
    children: [{
      path: '/attention/:tab',
      component: attention
    }]
  },
  {
    path: '/put1',
    name: '收藏夹',
    // redirect: '/put1/all',
    component: put1,
    children: [{
      path: '/put1/:tab',
      component: put1
    }]
  },
  // 充值中心
  {
    path: '/User3',
    name: '充值中心',
    // redirect: '/User3/all',
    component: User3,
    children: [{
      path: '/User3/:tab',
      component: User3
    }]
  },
    {
    path: '/User5',
    name: '资料认证',
    component: User5,
  },
  {
    path: '/User2',
    name: '会员中心',
    // redirect: '/User2/all',
    component: User2,
    children: [{
      path: '/User2/:tab',
      component: User2
    }]
  },
   
  {
    path: '/User4',
    name: '会员充值',
    // redirect: '/User4/all',
    component: User4,
    children: [{
      path: '/User4/:tab',
      component: User4
    }]
  },
  {
    path: '/bjy',
    name: '编辑页',
    // redirect: '/bjy/all',
    component: bjy,
    children: [{
      path: '/bjy/:tab',
      component: bjy
    }]
  }, {
    path: '/car',
    name: '购物车页',
    component: Car
  },
  // 购物车
  {
    path: '/shoppingCart',
    name: '购物车',
    // redirect: '/shoppingCart/all',
    component: shoppingCart,
    children: [{
      path: '/shoppingCart/:tab',
      component: shoppingCart
    }]
  },
  {
    path: '/car/pay',
    name: '支付页',
    component: Pay
  },
   
  {
    path: '/user',
    name: '用户页',
    component: User,
    meta: {
      // requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
    },
    
  },
    { path: "/Useramend", name: 'Useramend', component: Useramend},
    // 二维码
    { path: "/UserErWeiMa", name: 'UserErWeiMa', component: UserErWeiMa },
    // 业绩
    { path: "/UserPerformance", name: 'UserPerformance', component: UserPerformance },
    { path: "/UserExamine", name: 'UserExamine', component: UserExamine },
   

  {
    path: '/Category2',
    name: '列表页',
    component: Category2
  },
    {
      path: '/seek',
      name: '列表页',
      component: seek
    },
  {
    path: '/shoplist',
    name: '商家列表页',
    component: shoplist
  },
  
  {
    path: '/detail',
    name: '详情页',
    component: Detail
  }, {
    path: '/search',
    name: '搜索页',
    component: Search
  }, 
  
  {
    path: '/login',
    name: '登录页',
    component: Login
  },
  {
    path: "/register",
    name: 'register',
    component: register
  },
    {
      path: '/payorder',
      name: 'payorder',
      component: payorder
    },
    {
      path: '/bank',
      name: 'bank',
      component: bank
    },
    {
      path: '/bankMsg',
      name: 'bankMsg',
      component: bankMsg
    },


    { name: 'farm', path: '/farm', component: farm },
    { name: 'duckhouse', path: '/duckhouse', component: duckhouse },
    { name: 'henhouse', path: '/henhouse', component: henhouse},
  ]
})
