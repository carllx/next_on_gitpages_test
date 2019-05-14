import React, {Component} from 'react'
import glamorous from 'glamorous'
import {mouseCenterElement} from '../utils/mouse'




const Cycle = glamorous.span({

        // transformOrigin: 'center center';
        borderRadius: '50%',
        position: 'absolute',
        height:    '247px',
        width:     '247px',
        background: 'rgba(0,0,0,.12)',
        backgroundColor:'rgba(33,33,33,.26)',
        transitionDuration: '.45s',
        transitionProperty: 'opacity,transform',
        transitionTimingFunction: 'cubic-bezier(.4,0,1,1)',

    },(props)=>({
        opacity:   props.active?1:0,
        transform: props.active?`scale(.9) `:`scale(0)`,
        top:       props.active?props.y:0,
        left:      props.active?props.x:0,

    })
)

const HOC_Button = function(Comp){

    return class _Btn extends Component {
        constructor(props){
            super(props);
            this.state = {
                x:     0,
                y:     0,
                active:false,
            };
            this.ms= 450;

        };

        cleanXbtn = ()=>{
            this.setState({active:false});
            // console.log(this);
        }

        handleObtn = (e)=>{

            // @ mouse.js 计算鼠标在元素中的相对位置
            const position = mouseCenterElement(e);

            const x = position.x;
            const y = position.y;
            // 清理之前的等待响应 , 防止重复点击
            if (this.timeoutFn) clearTimeout(this.timeoutFn);

            this.setState({
                x:x,
                y:y,
                active:true
            })
            // 间隔事假
            this.timeoutFn = setTimeout(this.cleanXbtn,this.ms)

        }

        render(){

            return(
                <div>
                    <Comp onClick= {this.handleObtn}>

                        <Cycle
                         x= {this.state.x}
                         y= {this.state.y}
                         active= {this.state.active}
                         size={this.state.size}
                        />

                        <span
                         style={{
                        userSelect:  'none',
                        }}

                        >{'kkkkkkk'}</span>



                    </Comp>
                </div>
        )}
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

export let Test =  HOC_Button(Basic)
