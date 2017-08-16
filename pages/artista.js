import { Component } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import { css } from 'glamor'
import glamorous from 'glamorous'



import Nav from '../components/nav'
import Carta from '../components/carta'


import {DEVICE}  from '../utils/device'
import {default as dataArtists} from '../static/contents/artist'

// css.global('html, body', 	
//   { padding: '3rem 1rem', 
//   margin: 0, 
//   background: 'papayawhip', 
//   minHeight: '100%', 
//   fontFamily: 'Helvetica, Arial, sans-serif', 
//   fontSize: '24px' })


function ugent(){
    if (typeof window == 'undefined') return
    if (typeof navigator == 'undefined') return
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // const device = new DEVICE();
    // device.init();
    return userAgent
}

export default class extends Component {

	


	render () {
	return (
	  <main >
	    <Head>
	      <title>中艺国际-艺术家</title>
	    </Head>
	    
	    

	    <glamorous.Div paddingTop='21rem'>
	    	<Carta />
	    </glamorous.Div>
	    <Nav device= {'mobile'} />
	  </main>
	)
	}

}

// <section>
//   {this.props.postList.map(post => <Post {...post} key={post.id} />)}
// </section>