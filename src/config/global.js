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
			font1: '15px Arial',
			color2: '#f97afb',
			color3: 'red',
			color4: '#ffff00',
			color5: '#00ff00',
			color6: '#00ffff',
			color7: '#fff',
		},
		// type对应上面的color与font  若没有对应的 则默认为color1或font1
		dialogue:[
			{type:4, name:'Feng', txt:'亲爱的lulu，今天是我们认识的第16天'},
			{type:4, name:'Feng', txt:'时间虽不长，但我知道你是个善良的好女孩'},
			{type:4, name:'Feng', txt:'我不知道你对我的第一印象怎么样'},
			{type:4, name:'Feng', txt:'但你给我的第一印象就跟那天的天气一样'},
			{type:4, name:'Feng', txt:'阳光很好，bug很少'},
			{type:4, name:'Feng', txt:'你打字很快'},
			{type:4, name:'Feng', txt:'提问跟炮弹一样，直接又热情，哈哈哈'},
			{type:4, name:'Feng', txt:'口头禅是尴尬而又不失礼貌的微笑'},
			{type:4, name:'Feng', txt:'你的个性很容易给人留下好感'},
			{type:4, name:'Feng', txt:'善良，谦逊，有品位，乐观，热情'},
			{type:4, name:'Feng', txt:'跟你聊天特别好玩，是一位很好的朋友'},
			{type:4, name:'Feng', txt:'而我是非常典型的技术宅，话少腼腆'},
			{type:4, name:'Feng', txt:'不善交流，不善讨女孩子开心'},
			{type:4, name:'Feng', txt:'有些话对着屏幕才敢说出口'},
			{type:4, name:'Feng', txt:'是你的出现让我明白世界为什么有妻管严'},
			{type:4, name:'Feng', txt:'这些人都是心甘情愿并乐在其中'},
			{type:4, name:'Feng', txt:'将来我也一定是其中的一员'},
			{type:4, name:'Feng', txt:'我会帮助另一半做她喜欢的事，让她开心'},
			{type:4, name:'Feng', txt:'因为只有她开心我才会开心'},
			{type:4, name:'Feng', txt:'目前我们是好朋友，所以上面这句土不拉几'},
			{type:4, name:'Feng', txt:'可以当做没看见，哈哈哈'},
			{type:4, name:'Feng', txt:'我脸皮其实很薄，每次约你见面'},
			{type:4, name:'Feng', txt:'既特别期待又特别忐忑'},
			{type:4, name:'Feng', txt:'因为我经常会说错话，惹人不快'},
			{type:4, name:'Feng', txt:'如果有冒犯过你'},
			{type:4, name:'Feng', txt:'我在这里跟你道歉'},
			{type:4, name:'Feng', txt:'今天不能陪你喝咖啡，放点烟花给你看'},

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
		fireWords:'情不知所起|一往而深|怎奈何|如花美眷|终不敌|似水流年|恨不知所踪|又岂知|爱恨情仇|终难忘|刻骨铭心|人生两喜|代码和你',  // '|' 为分隔符
		// hue:210 lightness 0
		skyColor:'hsla({hue}, 60%, {lightness}%, 0.2)',	
		fireOpt: {
			wordInterval: 1500, //每段话出现的间隔时间
		},
	
		//阶段四
		titleWords:'祝善良的|世如同学|520快乐', // '|' 为分隔符
		titleOpt:{
			gap: 4,
			size: 60,  //最后字的大小
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