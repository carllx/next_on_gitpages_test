import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'



export default class extends Component {
  static async getInitialProps ({ query }) {
    // fetch single post detail
    // const response = await fetch(`http://localhost:3000/static/contents/artisti/${query.id}.js`)
    // const post = await response['module']['exports']
    const post = require(`../static/contents/artisti/${query.id}`);

    return { ...post }
  }
  constructor(props){
        super(props)
        // this.state = {}
    }

  render () {
    return (
      <main>
        <Head>
          <title>{this.props.title}</title>

        </Head>

        <h1>{this.props.title}</h1>

        <p>{this.props.description.it}</p>

        <Link href='/'>
          <a>Go back to home</a>
        </Link>
      </main>
    )
  }
}




// <section>
//   {this.props.postList.map(post => <Post {...post} key={post.id} />)}
// </section>
// import Nav from '../components/nav'
// import Carta from '../components/carta'

// import {DEVICE}  from '../utils/device'
// import {default as dataArtists} from '../static/contents/artist'

// css.global('html, body',
//   { padding: '3rem 1rem',
//   margin: 0,
//   background: 'papayawhip',
//   minHeight: '100%',
//   fontFamily: 'Helvetica, Arial, sans-serif',
//   fontSize: '24px' })
