import Link from 'next/link'
import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous,{withTheme} from 'glamorous'
import Logo from './logo'

import {ui  ,gr}  from '../utils/ui'

// glamor
// css.global(
// 	'@font-face', {
// 		fontFamily: 'fontZai', src: "url('../static/SFElectrotome-Bold.woff') format('woff')"
// 	}
// );
//
// let abc = css({
//   // 'color': 'red',
//   // ':hover': { color: 'blue' },
//   // 'html.ie9 & span.title': { fontWeight: 'bold' },
//   // '@media(min-width: 300px)': { fontSize: 20 }
// })





// DATA

const paths = [
	// {'str':'主页',  'url':'/index'},
	{'str':'艺术家','url':'/artista'},
	{'str':'展览',  'url':'/mostre'},
	{'str':'新闻',  'url':'/eventi'},
	{'str':'关于',  'url':'/about'}
]

const AContainer = glamorous.div({

    	position: 'relative',
		cursor: 'pointer',
	    // color: 'rgba(0, 0, 0, 0.69)',
	},(props)=>({

	})
);



const SVG_style=css({

	position: 'fixed',
    bottom: '0%',
    width: '100%',
    height: '50%',
})
class SVG extends Component {

	constructor (props) {
      super(props)
      this.state = {
      	// width:this.props.width,
      	// isLandscape:this.props.isLandscape

      }
    }


	render(){
		let width = this.props.width;
		let height = width*gr(5)-width*gr(8);
		return(
			<svg
			 {...css({

				position: 'fixed',
			    bottom: '0%',
			    width:  `${width}px`,
			    height: `${height}px`,
			})}
			 // viewBox={`0 0 ${width} 294.12`}
			>
			<filter id="dropshadow" height="130%">
			    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
			    <feComponentTransfer xmlns="http://www.w3.org/2000/svg">
			      <feFuncA type="linear" slope="0.2"/>
			    </feComponentTransfer>

			    <feOffset dx="-10" dy="-10" result="offsetblur"/>
			    <feMerge>
			      <feMergeNode/>
			      <feMergeNode in="SourceGraphic"/>
			    </feMerge>
			</filter>
				<polygon
				 {...SVG_style}
				 filter='url(#dropshadow)'
				 fill={ui.color.w_o1}
				 display = {!this.props.isLandscape}
				 stroke="none"
				 points={
 				  `0,       ${width*gr(6)} `+//left_top
 				  `${width},${width*gr(7)} `+//right_top
 				  `${width},${height} `+//right_bottom
 				  `0,       ${height} `//left_bottom

	 				  }//
	 			/>

			</svg>

			);

	};
};





const A = glamorous.div({

		cursor: 'pointer',

	},(props)=>({

	})
);





// ELEMENT

const Container = glamorous.div({

		fontSize:`${gr(7)}rem`,
		position:'fixed',
		zIndex:1,
		display:'flex',
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'space-around',


	},(props)=>({
		// isLandscape  --或 居中
		left: props.isLandscape? 0:'50%',
		top: props.isLandscape? 0:'100%',
		transform: props.isLandscape? 'translate(0, 0)':'translate(-50%, -100%)' ,
		width:props.isLandscape? 'auto':'100%',

		// boxShadow: props.isLandscape? `0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2)`:`0 -16px 24px 2px rgba(0,0,0,.14),0 -6px 30px 5px rgba(0,0,0,.12),0 -8px 10px -5px rgba(0,0,0,.2)`,

	})
)




const LinkItems = paths.map((paths,index) =>
	<AContainer key={'Container'+ index}>
		<Link
		 href= {paths.url}
		 key={'link'+ index}
		>
  			<glamorous.Div
  			 padding ={`${gr(6)}rem`}
  			>
  			{paths.str}
  			</glamorous.Div>
  		</Link>
	</AContainer>
);

// extended component with theme prop

class Nav extends Component {

	constructor (props) {
      super(props)
  //     this.state = {
  //     	isLandscape: this.props.isLandscape,
		// width : this.props.width,
  //     }
    }

	onClick = value => {
    	console.log(value, '来自 child 的 value 变化');

  	}
	render(){
		return(
			<div onClick={this.onClick}>
				{/*<div>{this.state.h}</div>*/}
				<Container isLandscape = {this.props.isLandscape}>

					{LinkItems}

				</Container>
				<SVG
				isLandscape= {this.props.isLandscape}
				width = {this.props.width}
				/>


			</div>

			);

	};
};
export default Nav;
