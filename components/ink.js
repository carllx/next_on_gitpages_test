import React, {Component} from 'react'
import glamorous from 'glamorous'
import {css} from 'glamor'
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import {debounce} from '../utils/throttle';
import {mousePositionElement} from '../utils/mouse';


const duration = 320;

// UI

const defaultStyle_Ink = {
    pointerEvents: 'none',
    borderRadius:   '50%',
    position:       'absolute',
    height:         '1px',
    width:          '1px',
    background:     'rgba(0,0,0,.12)',
    backgroundColor:'rgba(33,33,33,.26)',
    transition:     `background,opacity,transform ${duration}ms cubic-bezier(.4,0,1,1)`,
    opacity:        0,
    transform:      'scale(0)'
}
const transitionStyles_Ink = {
  // entering, entered没有必要,
  // 'exited'no work ,已经不在了
  'exiting' :{
    opacity: 1 ,transform:'scale(600)',
  },
};


const InkTransition  = (props) => (
  <Transition
   {...props}
   in={props.inn}
   // appear
   // unmountOnExit
   // mountOnEnter
   >
    {(status) => (
      <div style={{
        left:props.x,
        top:props.y,
        ...defaultStyle_Ink,
        ...transitionStyles_Ink[status]}}
      />)}
  </Transition>
);


export class Ink_Btn extends Component {

    constructor(props){
        super(props);
        this.state = { items :[] };
    };

    // onExited的函数不接受 handleRemove=()=>{}的形式
    //

    addItem =(e) =>{

      // 获取鼠标坐标
      //
      // 父元素position 是static , 使用mousePositionDocument
      // 父元素position 是absolute , mousePositionElement
      const position = mousePositionElement(e);
      const x = position.x;
      const y = position.y;
      // 构建 ink 状态
      const newItems= this.state.items.concat([{
        id:Math.random(),
        in:true,
        x:x,
        y:y
      }])
      console.log('[addItem]' )

      this.setState({items:newItems})
    }

    toggleItemIn(){

      console.log('[STATE:]onEntered - toggleItemIn...')
      let newItems = this.state.items.slice();
      newItems[0].in =false;
      this.state.items = newItems
      this.setState({items:newItems})
      // setState()
    }

    handleRemove(id){


        const match = value => value['id'] != id;//将这个id的过滤掉
        const newItems = this.state.items.slice().filter(match)

        this.setState({items: newItems});
        console.log('[STATE:]onExiting - handleRemove');

        // let newItems = this.state.items.slice();//拷贝
        // newItems.splice(0, 1);//删除数组的第一个就对了
        // this.setState({items:newItems})
    }
    render() {

      let items = this.state.items.map((item)=>(
          <InkTransition
           timeout={{enter:0, exit:duration}}
           // onEnter = {()=>{console.log('[STATE:]onEnter')}}
           // onEntering = {()=>{console.log('[STATE:]onEntering')}}
           onEntered = {this.toggleItemIn.bind(this)}
           // onExit = {()=>{console.log('[STATE:]onExit')}}
           onExiting = {this.handleRemove.bind(this,item.id)}
           // onExited = {()=>{console.log('[STATE:]onExited')}}
           key = {item.id}
           x = {item.x}
           y = {item.y}
           // in = {false}
           // 直接在 in 设置不能实现动态传递
           // https://reactcommunity.org/react-transition-group/#Transition
           // 需要特别处理
           inn = {this.state.items[0].in}
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
             onClick={this.addItem}
             style={{
             overflow:'hidden',
             // position: 'absolute',
             userSelect:'none',

             marginTop:'3000px',
             // top:'300px',
             width:'10rem',
             height:'19rem',
             background:'pink'}}

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




