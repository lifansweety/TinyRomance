import resize from './resize'
import util from './util'

const width = 363;
const height = 643;

//与时间有关的设置均为毫秒数，本文件底部会自动转化为帧数。
// 大多属性都设有默认值，都可以不用修改   一般只需要修改中文文字
// 所有的文字暂时都不支持换行，字数多的请自行分为多段话。

const config = (function(){

	return {
		// 整体宽高
		width: width,  //---不建议改动
		height: height, //---不建议改动
		//canvas
		canvases:['fall', 'bg', 'firework', 'dialogue'],//---不建议改动
		// 飘落微粒产生间隔
		snowInterval: 60,
		heartInterval: 15,
		// 飘落微粒属性
		snow:{
			x: undefined,
			y: undefined,
			minSize: 5,
			maxSize: 10,
			size: undefined,
			speed: 0.5,
			opacity: 0.8
		},
		heart:{
			x: undefined,
			y: undefined,
			minSize: 15,
			maxSize: 20,
			size: undefined,
			speed: 1,
		},
		// 飘落的类型('snow', 'heart', 'mix')
		fallType: 'snow',

		// 阶段一
		dialogueOpt:{ 
			interval: 1500,  //两句话的间隔时间
			speed: 110,   //语速
			color1: '#ff00ff',
			font1: '17px Arial',
			color2: '#f97afb',
			color3: 'red',
			color4: '#ffff00',
			color5: '#00ff00',
			color6: '#00ffff',
			color7: '#fff',
		},
		// type对应上面的color与font  若没有对应的 则默认为color1或font1
		dialogue:[
			{type:4, name:'Feng', txt:'亲爱的雪琴同学，你我虽只一饭之缘'},
			{type:4, name:'Feng', txt:'但我知道你是个善良的好女孩'},
			{type:4, name:'Feng', txt:'你们工作辛苦，有时候还会受委屈，'},
			{type:4, name:'Feng', txt:'所以要求另一半需要特别体贴且包容'},
			{type:4, name:'Feng', txt:'然而初次的见面以及微信上聊天'},
			{type:4, name:'Feng', txt:'并没有给你留下这样的印象'},
			{type:4, name:'Feng', txt:'相反我的在意给了你咄咄逼人的感觉'},
			{type:4, name:'Feng', txt:'虽然这并不是真实的我'},
			{type:4, name:'Feng', txt:'我嘴很笨，不怎么会说话'},
			{type:4, name:'Feng', txt:'所以通宵做了这个小页面'},
			{type:4, name:'Feng', txt:'为我之前犯的错向你说声对不起'},
			{type:4, name:'Feng', txt:'希望我莽撞的行为你可以早日释怀'},
			{type:4, name:'Feng', txt:'总之一切随缘吧'},
			{type:4, name:'Feng', txt:'关灯了，看看理工男的另外一面'},

		],
		// 阶段二
		sunset: 1000,   // 天黑时间

	    // 阶段三
		fireworkInterval:[60, 240],// 烟花产生间隔 //---不建议改动
		//烟花的属性
		fireworks:{ 
			x: undefined,
			y: height,
			xEnd: undefined,
			yEnd: undefined,
			size: 2,
			radius: 2,  //烟花半径
			velocity: 4,  //速率
			opacity: 0.8,
			count: 300,   //炸裂后粒子数
			wait: undefined,  //消失后 => 炸裂  等待时间
			color: undefined,  //烟花颜色
		},
		fireWords:'一则笑话|妇女节到了|小女孩|对妈妈说|我和爸爸|今天过节|妈妈奇道|今天|是我过节啊|女孩说|因为|是父女节|撒花',  // '|' 为分隔符
		// hue:210 lightness 0
		skyColor:'hsla({hue}, 60%, {lightness}%, 0.2)',	
		fireOpt: {
			wordInterval: 1500, //每段话出现的间隔时间
		},
	
		//阶段四
		titleWords:'祝善良的|雪琴同学|心想事成', // '|' 为分隔符
		titleOpt:{
			gap: 4,
			size: 70,  //最后字的大小
			pSize: 8,
			delay: 2000, //
			distance: 120, //行间距
			e: 2000 //速率
		},
		


		/*******均不建议改动********/
		//字的参数
		shape:{
			mini: 1,   //组成字的粒子数  mini越大 粒子数越少
			gap: 2,   //粒子的间隔数 必须能被width整除
		},
		word:{  
			size: 70,
			y: 120
		}, 

		
	}
})();

//ms => 帧
config.dialogueOpt.interval = util.transTime(config.dialogueOpt.interval, 120);
config.dialogueOpt.speed = util.transTime(config.dialogueOpt.speed, 18);

config.sunset = util.transTime(config.sunset, 600);

config.fireOpt.wordInterval = util.transTime(config.fireOpt.wordInterval, 180);
config.fireOpt.denseTime = util.transTime(config.fireOpt.denseTime, 600);

config.titleOpt.delay = util.transTime(config.titleOpt.delay, 240);
config.titleOpt.e = util.transTime(config.titleOpt.e, 240);

resize(config.width, config.height, config.canvases);

export default config