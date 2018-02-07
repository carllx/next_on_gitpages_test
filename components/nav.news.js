import { connect } from 'react-redux'
import {PureComponent} from 'react'
import { css } from 'glamor'
import {TweenMax} from "gsap";
import Link from 'next/link';
import {ui,GR}  from '~/utils/ui'
import Router from 'next/router'
// import markdown from 'markdown-in-js'
import outlines from  '~/static/contents/news'


const MyDATE = ({ children }) => (
  <div
    {...css({
        color:ui.color.b_o3,
        fontSize:'.8em',
        fontWeight:'bold',
    })}
  >
    {children}
  </div>
)

const Title = ({ children }) => (
  <div
    {...css({
        color:ui.color.b_o1,
        fontSize:'1.5em',
    })}
  >
    {children}
  </div>
)


class NavNews extends PureComponent {
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.nav_on !== this.props.nav_on) {
            //避免在打开父NAV时也执行
            if(nextProps.nav_on==='news') { //如果about激活
                this.show();
            }else if(this.props.nav_on==='news'){ //如果之前的是about现在状态已经切换
                this.close();
            }
        }
    }

    componentDidMount(){
        this.close();
    }

    _convertDate(lan ,date){
        if(lan === 'zh'){
            return new Date(date).toLocaleDateString('zh-cn',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        }else if(lan === 'it'){
            return new Date(date).toLocaleDateString('it-it',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        }else{
            return new Date(date).toLocaleDateString('en-us',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        }
    }

    show(){
        console.log('nav-News-show()')
        TweenMax.fromTo(
            ".News_Menu",
            0.6,
            {
                // rotationZ:15,
                autoAlpha:0,
            },{
                ease: Power4.easeOut,
                // rotationZ:0,
                autoAlpha:1,//opacity:1,visibility:'visible'
            },
            0.06);
    }

    close(){
        console.log('nav-News-close()')
        TweenMax.to(".News_Menu",
            0.5,
            {
                y:`90vh`,
                // rotationZ:-2,
                ease: Power4.easeOut,
                autoAlpha:0,//opacity:0,visibility:'hidden'
            },
            0.06);
    }

    _fillLinkWith(id){
        Router.push({
            // http://localhost:3000/artisti/EnzoCucchi
            // pathname :`/artisti/${id}`
            // http://localhost:3000/artisti?id=EnzoCucchi
            pathname: `/news/${id}`,
            shallow: true
        })

        // window.open(
        //                   `//www\.zhongart\.it/news/${id}`,
        //                   '_blank'
        //                 );
        //
    }

    render(){
        console.log(outlines[0].date)

        return(
            <div
                 {...css({
                    position:'fixed',
                    width: '100vw',
                    height:'100vh',
                    zIndex:9,
                    top:0,
                    left:0,
                    display: 'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    pointerEvents:'none', //避免遮挡Logo点击
                    overflow: 'hidden',//@parallax
                 })}
                 className = 'News_Menu'
                >
                <div
                 {...css({
                    display:'flex',
                    justifyContent:'center',

                    // backgroundColor:this.props.backgroundColor||ui.color.w_o2,
                 })}
                 className = {'News'}
                >
                    {outlines.map((item)=>
                        <div
                        {...css({
                            pointerEvents:'auto',
                            cursor:'pointer',
                        })}
                         key = {`${item.slug}-${this.props.language}`}
                         onClick = {()=>this._fillLinkWith(item.slug)}
                        >
                            <MyDATE>{this._convertDate(this.props.language ,item.date)}</MyDATE>
                            <Title>{item.title[this.props.language]}</Title>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,
    device:state.Root.device,
    nav_on:state.nav.on,
});


export default connect(mapStateToProps)(NavNews)
