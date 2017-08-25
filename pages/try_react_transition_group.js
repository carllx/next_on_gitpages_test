import React, {Component} from 'react'
import glamorous from 'glamorous'
import {css} from 'glamor'
import Transition from 'react-transition-group/Transition';
import Head from 'next/head'

import {debounce} from '../utils/throttle'
import {mouseCenterElement} from '../utils/mouse'





const duration = 3000;

const defaultStyle = {
    borderRadius: '50%',
    position: 'absolute',
    height:    '247px',
    width:     '247px',
    background: 'rgba(0,0,0,.12)',
    backgroundColor:'rgba(33,33,33,.26)',

    transition: `opacity,transform ${duration}ms cubic-bezier(.4,0,1,1)`,
    opacity: 0,
    transform:'scale(0)'

}

const transitionStyles = {
  'entering':  { opacity: 1 ,transform:'scale(.9)'},
  'entered': { opacity: 0 ,transform:'scale(0)'},
};

const Cycle = ({ in: inProp ,onEntered : fn}) => (
  <Transition in={inProp} timeout={duration} onEntered ={fn}>
    {(status) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[status]}}
      />)}
  </Transition>
);

class Btn extends Component {
    constructor(props){
        super(props);
        this.state = { in: false };
    };


    setExcitState = () => {
      this.setState({ in: false });
    }

    setEnterState = () => {
      this.setState({ in: !this.state.in });
    }

    handleRemove = (i) => {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }

    render() {
      return (
        <div>
            <Cycle
             in={this.state.in}
             timeout={duration}
             mountOnEnter={true}
             onEntered={this.setExcitState}
             />


            <button style={{marginTop:'5rem'}} onClick={this.setEnterState}>Click to Enter</button>
        </div>
      );
    }
}



const Basic = glamorous.div({
    overflow:'hidden',
    position: 'absolute',
    width:'247px',
    height:'3rem',
    fontSize:'2rem',
    backgroundColor:'pink',
})

// export let Test =  HOC_Button(Basic)



entering,entered,exiting,exited









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

            <Btn/>
        </main>
    )};
}



