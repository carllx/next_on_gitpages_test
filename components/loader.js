import React, {Component} from 'react'
import { rehydrate, css } from 'glamor'
import glamorous, {ThemeProvider} from 'glamorous'
import XHRProgress  from '../utils/Progress'
import Logo from './logo'
import {ui}  from '../utils/ui'




export const Loading = glamorous.div({

    // position:       'absolute',
    // zIndex:           2,
    // left:             0,
    // top:              0,
    fontWeight:     400,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    display:        'flex',
    backgroundColor:'rgba(0,0,0,.15)',
    width:          '100%',
    height:         '100%',

},(props)=>({
    fontSize:        props.size?props.size:'0.4em',
    color:           props.color?props.color:ui.color.secondary_on_dark,
})
)


const HOC_WithLoad = function(Component){
    return  class Bg_With_Loader extends Component {
        constructor (props) {
          super(props); //url
          this.state = {//onload active
            // w:this.state.w
            // h:this.state.h

            active:this.props.active,
            onload:this.props.onload,
            per: '0%',
          };
        }
        componentWillMount(){
            this.fethImg();
        }

        onProgress=(xhr) =>{
            if(xhr.lengthComputable){ // false的话total返回是0 ,github 上 json , js , txt
                let percentComplete = Math.round(xhr.loaded / xhr.total * 100)
                console.log(percentComplete,'%')
                this.setState({per: `${percentComplete}%`});
            }else{
              console.log('@onProgress 该资源无法计算byte长度')
            }

        }
        /**
         * http://res.cloudinary.com/responsivebreakpoints/image/upload/
         * c_crop,
         * h_403,
         * w_200
         * /v1502792912/00_Tempio_Malatestiano_gwfwy4.jpg
         */
        async fethImg () {
            const h = window.innerHeight;
            const w = window.innerWidth;
            const src =
            `http://res.cloudinary.com/responsivebreakpoints/image/upload/`+
            `c_crop,`+
            `h_${h},`+
            `w_${w}/`+
            `${this.props.org}`;
            // const response = await fetch( src )
            //     .then(res => ProgressWithFetch(res.body.getReader()));
            // const isOk = await response.ok;
            // hi pixel pic
            // `http://cdn.wallpapersafari.com/23/11/clBNRq.jpg`

            let XHR = new XHRProgress();
            XHR.onProgress = this.onProgress;
            let isOk = await XHR.send(src)

            if(isOk==true) this.setState({onload:true});
            this.setState({src:src});
            this.setState({w:w});
            this.setState({h:h});
        }
        render(){
            return(
                <div>


                    <Component
                     w={this.state.w}
                     h={this.state.h}
                     // active={this.state.onload}
                     src={this.state.src}
                     >

                         <Loading
                             // w={this.state.w}
                              // h={this.state.h}
                             onload={this.state.onload}
                        >
                            {!this.state.onload?this.state.per:'WE \'RECOMMING..'}
                        </Loading>
                    </Component>

                </div>
                );
        }
    }
}




export default HOC_WithLoad;




