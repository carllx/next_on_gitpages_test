module.exports.ui = {
	color:{
		primary:"rgba(255, 255, 255 ,1)",
		secondary:"rgb(33, 33, 33)",
		secondary_secondary:"rgb(55, 55, 55)",
		backdrop :"rgba(0, 0, 0, .50)",
		disabled_on_light:'rgba(0,0,0,.38)',
		secondary_on_light:'rgba(0,0,0,.54)',
		primary_on_light:'rgba(0,0,0,.87)',
		disabled_on_dark:'rgba(255,255,255,.38)',
		secondary_on_dark:'rgba(255,255,255,.54)',
		primary_on_dark:'rgba(255,255,255,.87)',

		w_o1:"rgba(255, 255, 255 ,.87)",
		w_o2:"rgba(255, 255, 255 ,.54)",
		w_o3:"rgba(255, 255, 255 ,.38)",
		w_1:"rgb(238,238,238 )",
		w_2:"rgb(222,222,222)",
		w_3:"rgb(205,205,205)",

		b_o1:'rgba(0,0,0,.87)',
		b_o2:'rgba(0,0,0,.54)',
		b_o3:'rgba(0,0,0,.38)',
		b_1: 'rgb(11,11,11)',
		b_2: 'rgb(33,33,33)',
		b_3: 'rgb(55,55,55)',
	},
	// breakpoint
	breakpoints:{
		xsmall: '20em',
		small : '30em',
		medium: '40em',
		large : '55em',
		xlarge: '70em'
	},
}







//golden Ratio

module.exports.gr = function( ROOT ){
  const goldenRatio =  (1+ Math.sqrt(5) )/2//1.618

  // if(px) return  result * px
  // vw
  let result = 10 / Math.pow( goldenRatio , ROOT )//10x=全宽
  return result

}


module.exports.GR = {

	goldenRatio:function(){
		return  (1+ Math.sqrt(5) )/2//1.618
	},

	rem : function( ROOT ){//WIDTH = 10rem
		const g = this.goldenRatio()
		return 10 / Math.pow( g , ROOT )//WIDTH = 10rem
	},

	vw:function( ROOT ){
		const g = this.goldenRatio()
		return 100 / Math.pow( g , ROOT )//WIDTH = 100vw
	},

	px:function( ROOT, fullWidth ){
		const g = this.goldenRatio()
		return fullWidth / Math.pow( g , ROOT )//WIDTH = fullWidth
	}
}



module.exports.makeKEY = ()=>{
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }



/**
 * 将1d array 转换成 xy/z 数组
	arr = [1,1,2,2,3,3,4,4] =>
	[[1,1], [2,2], [3,3], [4,4]]
 * @param  {[type]} arr [description]
 * @param  {[type]} d   [2 => xy, 3 => xyz]
 * @return {[type]}     [description]
 */
module.exports.getVectorArr =(arr, d )=>{
	let newArr = [];
	let clone = [...arr]
	while(clone.length) newArr.push(clone.splice(0,d));
	return newArr
	// newArr.reduce((prev, curr)=> prev+' '+curr)
	// "1,1 2,2 3,3 4,4"

}


/*
 问题:造成 reflow, offsetParent 0000
 //  参考 https://gist.github.com/paulirish/5d52fb081b3570c81e3a )
 */
function elementInViewport(element){
	const vw = window.innerWidth; // 用公共值
	const vh = window.innerHeight;// 用公共值
	// 一些过滤条件
	if (!element ||
		!element.offsetParent ) return false;
	//如果 父element 被隐藏, 跳过(会造成 reflow
	// visibility == 'hidden' , display == 'none' , opacity == 0
	const {visibility,display,opacity} = getComputedStyle(element)
	if (visibility=='hidden'||
	 	display=='none'||
	 	opacity==0
	 ) return false;
	// console.log(visibility,display,opacity)

	const { top, left, bottom, right } = element.getBoundingClientRect();

	return (
		top >= 0 &&
		left >= 0 &&
		bottom <= vh &&
		right <= vw
	);
}
// elementInViewport($0)


/**
 * [parallax 3d] 参考http://keithclark.co.uk/articles/pure-css-parallax-websites/
 * 用于根据定义的translateZ 生成正确的scale
 * @param  {float} translateZ  +-0.01
 * @param  {float} perspective [1~10]
 * @return {translateZ,scale}
 */
module.exports.perspZ =(translateZ , perspective)=>{
    const scale = 1 + (translateZ * -1) / perspective
    return {translateZ:translateZ,scale:scale}
}
