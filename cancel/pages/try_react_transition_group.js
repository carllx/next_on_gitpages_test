import React, {Component} from 'react'
import Head from 'next/head'


import {Ink_Btn} from '../components/ink.js'





export default class extends Component {
  constructor(props) {
    super(props);

  };


  render() {
    return (
        <main>
            <Head>
                <title>try_Reat+Transition+Group</title>
            </Head>

            <Ink_Btn/>
        </main>
    )};
}



