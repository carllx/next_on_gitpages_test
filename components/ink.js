import React, {Component} from 'react'
import glamorous from 'glamorous'
import {css} from 'glamor'
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import {debounce} from '../utils/throttle';
import {mouseCenterElement} from '../utils/mouse';


const duration = 300;


const defaultStyle_Ink = {
    borderRadius:   '50%',
    position:       'absolute',
    height:         '247px',
    width:          '247px',
    background:     'rgba(0,0,0,.12)',
    backgroundColor:'rgba(33,33,33,.26)',
    transition:     `opacity,transform ${duration}ms cubic-bezier(.4,0,1,1)`,
    opacity:        0,
    transform:      'scale(0)'
}
const transitionStyles_Ink = {

  'exiting' :{
    opacity: 1 ,transform:'scale(10)'
  },'exited' :{//no work ,已经不在了
    opacity: 0 ,color:'red'
  },
};


const InkTransition  = (props) => (
  <Transition
   {...props}

   in={props.innnnn}
   // appear
   // unmountOnExit
   // mountOnEnter
   >
    {(status) => (
      <div style={{
        ...defaultStyle_Ink,
        ...transitionStyles_Ink[status]}}
      />)}
  </Transition>
);


export class Btn extends Component {
    constructor(props){
        super(props);
        this.state = { items :[] };
    };
    addItem =() =>{
        //items 增加任意值为占位ID
        let newItems= this.state.items.concat([{id:Math.random(),in:true}])
        console.log('[addItem] try setState items:',newItems)
        this.setState({items:newItems})
        console.log('[addItem] state.items:',this.state.items)
    }

    toggleItemIn(){

      console.log('[STATE:]onEntered - toggleItemIn...')
      let newItems = this.state.items.slice();
      newItems[0].in =false;
      console.log(newItems)
      this.state.items = newItems
      this.setState({items:newItems})
      // setState()
    }

    handleRemove(){

        // ononExited的函数不能 handleRemove=()=>{}的形式
        //
        // const newItems = this.state.items.slice();//拷贝
        // newItems.splice(i, 1);//删除数组的第一个就对了
        //
        //
        // const match = value => value['id'] != id;
        // const newItems = this.state.items.filter(match)
        // this.setState({items: newItems});
        //
        //
        //

        console.log('[STATE:]onExiting - handleRemove');


        let newItems = this.state.items.slice();
        newItems.splice(0, 1);//删除数组的第一个就对了
        // this.state.items = newItems
        this.setState({items:newItems})
    }
    render() {

      let items = this.state.items.map((item)=>(
          <InkTransition
           timeout={{enter:0, exit:duration}}
           // onEnter = {()=>{console.log('[STATE:]onEnter')}}
           // onEntering = {()=>{console.log('[STATE:]onEntering')}}
           onEntered = {this.toggleItemIn.bind(this)}
           // onExit = {()=>{console.log('[STATE:]onExit')}}
           onExiting = {this.handleRemove.bind(this)}
           // onExited = {()=>{console.log('[STATE:]onExited')}}
           key = {item.id}
           // in = {this.state.items[0].in}
           in = {false}
           innnnn = {this.state.items[0].in} //直接在 in 设置不能实现动态传递
           >
            {(status) => (
              <div style={{
                ...defaultStyle_Ink,
                ...transitionStyles_Ink[status]}}
              />)}
          </InkTransition>)
      );
      return (
        <div>
            <div
             style={{marginTop:'5rem',userSelect:'none'}}
             onClick={this.addItem}
             >
              Click to Enter
              <TransitionGroup>
                {items}
              </TransitionGroup>
            </div>
        </div>
      );
    }
}







// appear:false
// enter:true
// exit:true
// in:true
// mountOnEnter:true
// unmountOnExit:true
// timeout:{…}
// children:fn()
// onEnter:noop()
// onEntered:fn()
// onEntering:noop()
// onExit:noop()
// onExited:onExited()
// onExiting:noop()


