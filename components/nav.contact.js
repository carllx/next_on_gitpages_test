import { connect } from 'react-redux'
import {PureComponent} from 'react'
import { css } from 'glamor'
import {TweenMax} from "gsap";

import {perspZ  ,GR}  from '~/utils/ui'
// import { GoogleMap, Marker } from "react-google-maps"

// import LOGO  from '~/components/svg/icons_logo'
import LOGO  from '~/components/svg/icons_logo_marca'


import {Mobile,Address,Mail,Phone}  from '~/components/svg/icons_static_svg'

import {Twitter,WeiChat,Youtube,Viemo,Weibo,Facebook,Instagram}  from '~/components/svg/icons_social_svg'


import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 43.7738564, lng: 11.2512034 }}
    defaultOptions={{ styles: MapStyles }}
  >
    <Marker
      position={{ lat: 43.7738564, lng: 11.2512034 }}
    />
  </GoogleMap>
));





class NavContact extends PureComponent {

    constructor(props){
        super(props)
        this.PERSP = 1000;
    }

    componentDidMount(){

        // 初始关闭 artisti显示
        TweenMax.set(
            "#nav_contact",
            {
                y:`${this.props.view_size.vh}`,
                autoAlpha:0,
                pointerEvents: 'none',
            })

    }

    //Immutable??redux
    componentWillReceiveProps(nextProps){
        if(nextProps.nav_on !== this.props.nav_on) {
            //避免在打开父NAV时也执行
            // nextProps.nav_on==='contact'?this.show():this.close();
            //
            if(nextProps.nav_on==='contact') { //如果contact激活
                this.show();
            }else if(this.props.nav_on==='contact'){ //如果之前的是contact现在状态已经切换
                this.close();
            }
        }
    }
    //stagger
    show(){
        console.log('nav-Artisti -show()')
        TweenMax.fromTo(
            "#nav_contact",
            0.5,
            {
                y:`${this.props.view_size.vh}`,
                opacity:0,
                // pointerEvents: 'none',
            },{
                y:0,
                ease: Power4.easeOut,
                // pointerEvents: 'visible',
                autoAlpha:1,//opacity:1,visibility:'visible'
            },
            0.2);

        var tl = new TimelineMax({repeat:0,delay:0.3})
        tl.staggerTo(//targets, duration, fromVars, toVars
                '.social_icons',
                0.02,//
                {
                    fill:'black',
                    // delay:2,

                },0.05)
            .staggerTo(//targets, duration, fromVars, toVars
                '.social_icons',
                0.01,//
                {
                    fill:'none',
                    // delay:2,
                },0.05)
            .set('.social_icons', {clearProps:"all"});//还原 原有的hover 样式
    }
    close(){
        console.log('nav-About-close()')
        TweenMax.to("#nav_contact",
            0.3,
            {
                y:`${this.props.view_size.vh/9}`,
                // ease: Power4.easeOut,
                // pointerEvents: 'none',
                autoAlpha:0,//opacity:0,visibility:'hidden'
            },
            0.05);
    }

    render(){
        const { view_size, language, device ,nav_on } = this.props
        const desktop = device ==='desktop';
        const {vw,vh,is_landscape} = view_size;
        const show =  nav_on ==='contact'
        const mapWidth =  is_landscape?`${GR.px(1,vw)}`:`${GR.px(1,vw)}`
        const margin_w = is_landscape?`${GR.vw(3)}`:`${GR.vw(5)}`
        // const zp = is_landscape?this.Zp.pc:this.Zp.mobile
        const top = is_landscape?`${GR.px(4,vh)}px`:`${GR.px(6,vh)}px`//手机端  nav bg 斜边的高度+margin

        return(

            <div
             {...css({
                display:'flex',
                flexDirection:'column',
                /*居中*/
                 position: 'absolute',
                 top:top,//手机端 nav bg 斜边的高度+margin
                 left:0,
                 // marginLeft:`${margin_w}vw`,
                 // marginRight:`${margin_w}vw`,
                 width:'100%',
                 pointerEvents:'none',
                 justifyContent:'center',
                 // alignContent: 'center',
                 //初始, 隐藏
                 visibility:'hidden',
             })}
             className = 'contact'
             id = 'nav_contact' // 3D 效果
            >
                {/*LOGO*/}
                {/*<div
                 {...css({
                    position:'relative',
                    width:`${w}vw`,//暂时
                    backfaceVisibility:'hidden',
                    transform:`translateZ(${zp.logo.translateZ}px) scale(${zp.logo.scale})`
                 })}
                >
                    <LOGO/>
                </div>*/}

                <div {...css({
                    display:'flex',
                    justifyContent:'center',
                    width:'100%',
                    marginBottom:'2.5em',
                    pointerEvents:'none',
                })}>
                    <LOGO size= {60}/>
                </div>

                <div {...css({
                    display:'flex',
                    justifyContent:'center',
                    width:'100%',
                    marginBottom:'1.5em',
                })}>
                    Presidente: Xiuzhong Zhang
                </div>
                {/* SOCIAL App */}
                <div {...css({
                    display:'flex',
                    width:'100%',
                    flexDirection:'row',
                    justifyContent:'center',
                    marginBottom:'2em',
                    pointerEvents:'auto',

                })}>

                    <div {...css({marginRight:'1em'})} className = 'flashIcons'><Twitter/></div>
                    <div {...css({marginRight:'1em'})} className = 'flashIcons'><WeiChat/></div>
                    <div {...css({marginRight:'1em'})} className = 'flashIcons'><Weibo/></div>
                    <div {...css({marginRight:'1em'})} className = 'flashIcons'><Facebook/></div>
                    <div {...css({marginRight:'1em'})} className = 'flashIcons'><Instagram/></div>
                    <div {...css({marginRight:'1em'})} className = 'flashIcons'><Youtube/></div>
                    <div {...css({marginRight:'1em'})} className = 'flashIcons'><Viemo/></div>

                </div>



                <div {...css({
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems: 'center',
                    width:'100%',
                    marginBottom:'1em',
                })}>


                    {/*主要信息*/}
                        {/*Mail*/}
                        <div {...css({display:'flex',flexDirection:'row',width: '21em',})}>
                            <div {...css({marginRight:'1.5em'})}><Mail size={18}/></div>
                            info@zhongart.it
                        </div>
                        {/*Tel./Fax */}
                        <div {...css({display:'flex',flexDirection:'row',width: '21em',})}>
                            <div {...css({marginRight:'1.5em'})}><Phone size={18}/></div>
                            +39  055 268308
                        </div>
                        {/*Cell. */}
                        <div {...css({display:'flex',flexDirection:'row',width: '21em',})}>
                            <div {...css({marginRight:'1.5em'})}><Mobile size={18}/></div>
                            +39  32721  83721
                        </div>
                        {/*Address*/}
                        <div {...css({display:'flex',flexDirection:'row',width: '21em',})}>
                            <div {...css({marginRight:'1.5em'})}><Address size={18}/></div>
                            Via del Giglio, 10-50123 ,Firenze, Italia
                        </div>
                    </div>




                    <div {...css({
                        display:'flex',
                        justifyContent:'center',
                        width:'100%',
                        pointerEvents:'auto',
                    })}>
                        <MapWithAMarker
                          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBQdch5IcgcQaKNG76sbMQv1MEBEKLeQ-8&v=3.exp&libraries=geometry,drawing,places"
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{
                            height:is_landscape?'60vh':`100vw`,
                            width:is_landscape?'100vw':`100vw`,
                            // marginLeft:`-${margin_w}vw`,//居中
                            backgroundColor: 'hsla(0, 0%, 0%, 0)' }} />}
                          mapElement={<div style={{ height: `100%` }} />}

                        />
                    </div>





                {/*<div id = 'map' {...css({height:'300px',width:'300px'})}/>*/}
                {/*主要信息*/}






                 {/*desktop?

                        <MOUSE_POS_DISPATCHER
                         track={show} //开启
                         windowId={'nav'} //监听元素
                        />
                    :

                        <DEVICE_ORIEN_DISPATCHER
                         track={show} //开启
                        />
                */}
            </div>
    )}

}






const mapStateToProps = (state) => ({
    view_size:state.Root.view_size,
    language:state.Root.language,
    device:state.Root.device,
    // mouse:state.Root.mouse,
    // gyo:state.Root.gyo,
    nav_on:state.nav.on,
});




// export default Nav;
export default connect(mapStateToProps)(NavContact)

const MapStyles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#120d19"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#efefef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#7a7a7a"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#7a7a7a"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#7a7a7a"
            },
            {
                "lightness": 70
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#353535"
            }
        ]
    }
]





/*
icons_mobile.js
icons_Weibo.js
icons_youtube.js
icons_Address.js
icons_Facebook.js
icons_Instagram.js
icons_Mail.js
icons_Phone.js
icons_Twitter.js
icons_Video.js
icons_Viemo.js
icons_Wechat.js
icons-site.js
icons-Weibo.js
icons_info.js
icons_logo.js
icons_quote_right.js
icons_quote_left.js
icons_chevron-left.js
icons_chevron-right.js
 */



/*<iframe
 src={`https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=-33.9,151.14999999999998&zoom=12&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:labels%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada%7Cvisibility:off&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size={480x360}`}
 width={mapWidth}
 height="200"
 frameborder="0"
 ></iframe>*/
/*有效*/
/*<iframe
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1359.939041885581!2d11.251240249295027!3d43.77398979302729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb39cef323dcfa7e0!2zWkFJIOS4reiJuuWbvemZhQ!5e0!3m2!1szh-CN!2sit!4v1514654536015"
 width={mapWidth}
 height="200"
 frameborder="0"
 ></iframe>*/
