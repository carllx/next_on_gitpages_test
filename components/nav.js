import Link from 'next/link'
import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous,{withTheme} from 'glamorous'
import Logo from './logo'

import {ui}  from '../utils/ui'

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
	{'str':'主页',  'url':'/index'},
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

const A = glamorous.div({

		cursor: 'pointer',
		
	},(props)=>({

	})
);


// ELEMENT

const NavContainer = glamorous.div({

		fontSize:'0.3rem',
		position:'fixed',
		zIndex:1,
		display:'flex',
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'space-around',
	    backgroundColor:'white',
	    
	    
	},(props)=>({
		// isLandscape  --或 居中
		left: props.isLandscape? 0:'50%',
		top: props.isLandscape? 0:'100%',
		transform: props.isLandscape? 'translate(0, 0)':'translate(-50%, -100%)' ,
		width:props.isLandscape? 'auto':'100%',	
		padding:props.isLandscape? '2em':'1em',
		boxShadow: props.isLandscape? `0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.2)`:`0 -16px 24px 2px rgba(0,0,0,.14),0 -6px 30px 5px rgba(0,0,0,.12),0 -8px 10px -5px rgba(0,0,0,.2)`,

	})
)




// const LinkItems = paths.map((paths,index) =>
//   <Link href= {paths.url} >
//   	<A>{paths.str}</A>
//   </Link>
// );

const LinkItems = paths.map((paths,index) =>
	<AContainer key={'Container'+ index}>
		<Link href= {paths.url} key={'A'+ index}>
  			<A>{paths.str}</A>
  		</Link>
	</AContainer>
);

// extended component with theme prop

class Nav extends Component {

	constructor (props) {
      super(props)
      this.state = {}
      
    }

	onClick = value => {
    	console.log(value, '来自 child 的 value 变化');

  	}
	render(){
		return(
			<div onClick={this.onClick}>	
				{/*<div>{this.state.h}</div>*/}
				<NavContainer isLandscape = {this.props.isLandscape}>
				
					{LinkItems}
				
				</NavContainer>

				<Logo device={this.props.device}  isLandscape = {this.props.isLandscape}/ >
			</div>

			);
			
	}
}
export default Nav;
// <Link href= '/index'>
// 		<a>主页</a>
// 	</Link>
// 	<Link href= '/artista'>
// 		<a>艺术家</a>
// 	</Link>
// 	<Link href= '/mostre'>
// 		<a>展览</a>
// 	</Link>
// 	<Link href= '/eventi'>
// 		<a>新闻</a>
// 	</Link>
// 	<Link href= '/about'>
// 		<a>关于</a>
// 	</Link>