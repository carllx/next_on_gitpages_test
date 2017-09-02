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
module.exports.gr = function( rooot , px ){
  const goldenRatio =  (1+ Math.sqrt(5) )/2//1.618

  if(px) return  result * px
  // vw
  let result = 10 / Math.pow( goldenRatio , rooot )
  return result

}
// 584.628
