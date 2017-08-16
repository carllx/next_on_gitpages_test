import Link from 'next/link'
import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous,{withTheme} from 'glamorous'
import Logo from './logo'

import {ui}  from '../utils/ui'
// import fetch from 'isomorphic-fetch'

const BGContainer = glamorous.div({

		// fontSize:'0.3rem',
		zIndex:1,
		display:'flex',
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'space-around',

	    backgroundColor   :'#3b444f',
		// backgroundPosition:'50%',
		backgroundRepeat  :'no-repeat',
		backgroundSize    :'cover',

		overflow          :'hidden',
		position          :'absolute',
		left: 0,
		top: 0,

	},(props)=>({
		// isLandscape  --或 居中
		width:props.w?`${props.w}`:'100%',
		height:props.h?`${props.h}`:'100%',
		//在这里找渐变模板 https://webgradients.com/
		backgroundImage:props.src?`url(${props.src})`:'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',




	})
)

const Loading = glamorous.div({
		fontWeight: 100,
    	padding: '0.3em 3em',
    	fontSize: '0.4em',
		color:ui.color.secondary_on_light,
		flexDirection: 'row',
		alignItems:'center',
		justifyContent:'center',
		display:'flex',
		backgroundColor:ui.color.primary,

	},(props)=>({
		// color:props.onload?ui.color.secondary_on_light:ui.color.secondary_on_dark,
		// display:props.onload?'none':'flex',
	})
)

class IMG extends Component {

	constructor (props) {
      super(props); //url

      this.state = {//onload active
      	active:this.props.active,
      	onload:this.props.onload,
      };

    }

    componentWillMount(){
    	this.fethImg();
    }

    async fethImg () {
    	/*
    	http://res.cloudinary.com/responsivebreakpoints/image/upload/
    	c_crop,
    	h_403,
    	w_200
    	/v1502792912/00_Tempio_Malatestiano_gwfwy4.jpg
    	*/
        const h = window.innerHeight;
        const w = window.innerWidth;
    	const src =
    	`http://res.cloudinary.com/responsivebreakpoints/image/upload/`+
    	`c_crop,`+
    	// `h_${this.props.h},`+
    	`h_${h},`+
    	`w_${w}/`+
    	// `w_${this.props.w}/`+
    	`${this.props.org}`;

	    const response = await fetch( src );
	    const isOk = await response.ok;
	    if(isOk) this.setState({onload:true});
        this.setState({src:src});
        this.setState({w:w});
	    this.setState({h:h});
	}

	render(){
		return(
			<div>
				<BGContainer
				 w={this.state.w}
			 	 h={this.state.h}
				 // active={this.state.onload}
				 src={this.state.src}
                 >

					<Loading
					 // w={this.state.w}
			 		 // h={this.state.h}
					 // onload={this.state.onload}
                     >
                     {!this.state.onload?'Loading....':'WE \'RECOMMING..'}</Loading>

				</BGContainer>
			</div>

			);
	}
}
export default IMG;



