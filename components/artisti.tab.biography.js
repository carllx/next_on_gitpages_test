import { css } from 'glamor'
import { PureComponent } from 'react'
import {ui }  from '~/utils/ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TAB from '~/components/artisti.tab.Wrapper'

class Button extends PureComponent {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div
             {...css({
                marginRight:this.props.landscape?'3rem':0,
                cursor:'pointer',
                // width:'3rem',/*居中*/
                color:this.props.on?ui.color.b_o1:ui.color.b_o2,
                fontWeight:this.props.on?900:100,
                userSelect: 'none',
             })}

             onClick={this.props.onClick}
            >{this.props.name}</div>
        )
    }
}



class Biography extends PureComponent {
    constructor(props){
        super(props);
        this.state = {on:'ALL'}
        this.handleClick  = this.onClick.bind(this)
        this.exhibitionButtons = {
            en:['ALL EXHIBITIONS','SOLO EXHIBITIONS','GROUP EXHIBITIONS'],
            it:['TUTTE LE MOSTRE','MOSTRE PERSONALI','MOSTRE COLLETTIVE'],
            zh:['所有展览','个展','群展'],
        }
    }

    onClick(name){
        this.setState({on:name})
    }

    render(){
        // debugger
        const EXHIBITIONS = this.props.contents.exhibitions
        const BIOGRAPHY = this.props.contents.biography
        let exhibitions={}


        if (this.state.on ==='Solo'){
            exhibitions = EXHIBITIONS[this.props.language][0]
        }else if (this.state.on ==='Group'){
            exhibitions = EXHIBITIONS[this.props.language][1]
        }else if(this.state.on ==='ALL'){
            // 遗憾 array 的数据没有合并在一起
            // 1.
            /*let obj = Object.assign({},{...this.props.exhibitions[this.props.language][0]},{...this.props.exhibitions[this.props.language][1]})*/
            const solo =EXHIBITIONS[this.props.language][0]
            const group =EXHIBITIONS[this.props.language][1]

            let all = Object.assign({},{...solo})
            for(let key in all){
                if(group[key]){
                    all[key]= all[key].concat(group[key])
                }
            }
            exhibitions = Object.assign({},{...group},{...all})
        }

        return(
            <div
            {...css({
                  position:'relative',
                  width:`${this.props.width}`,
                  margin:'auto',//居中
                  minHeight:'60vh',//为了footer
                  userSelect: 'none',
              })}
            className = {this.props.tabName}
            >


                {
                    BIOGRAPHY[this.props.language]
                        .split('\n')
                        .map((item, key) =>
                          <span key={`${this.props.tabName}_${key}_${this.props.language}`}>{item}<br/><br/></span>
                        )
                }




                <div
                  {...css({

                    display:'flex',
                    flexDirection:'row',
                    justifyContent:this.props.landscape?'flex-start':'center',/*如果是手机居中*/
                    // marginLeft:'auto',
                    // marginRight:'auto',
                    // alignItems: 'center',
                    marginTop:'2rem',
                    marginBottom:'3rem',
                })}
                >
                    <Button
                     name = {this.exhibitionButtons[this.props.language][0]}
                     landscape = {this.props.landscape}
                     width =  {this.props.width}
                     onClick={()=>{this.handleClick('ALL')}}
                     on = {this.state.on ==='ALL'}/>
                    <Button
                     name = {this.exhibitionButtons[this.props.language][1]}
                     landscape = {this.props.landscape}
                     width = {this.props.width}
                     onClick={()=>{this.handleClick('Solo')}}
                     on = {this.state.on ==='Solo'}/>
                    <Button
                     name = {this.exhibitionButtons[this.props.language][2]}
                     landscape = {this.props.landscape}
                     width = {this.props.width}
                     onClick={()=>{this.handleClick('Group')}}
                     on = {this.state.on ==='Group'}/>
                </div>

                {/* 个展&群展 */}
                {
                     Object.keys(exhibitions).map((item, index) =>
                            <div
                             {...css({
                                justifyContent:'flex-start',
                                display:'flex',
                                flexDirection:'row',
                             })}
                             key={`${this.props.tabName}_exhibitions_${Object.keys(item)}_${this.props.language}_${index}`}
                            >
                                <div
                                 {...css({
                                    color:ui.color.b_o2,
                                    fontWeight:900,

                                 })}
                                >{item}</div>
                                <div
                                 {...css({
                                    justifyContent:'flex-start',
                                    display:'flex',
                                    flexDirection:'column',
                                    marginLeft:this.props.landscape?'2rem':'0.8em',
                                    marginBottom:'1rem',
                                 })}
                                >
                                    {exhibitions[item].map((s,i)=>
                                        <p
                                        {...css({
                                          marginTop:'0.3em',
                                          marginBottom:'0.3em',
                                          userSelect: 'none',
                                       })}
                                         key = {`${this.props.tabName}_exhibitions_${Object.keys(item)}_${index}_${i}`}
                                         >{`${s}`}</p>
                                    )}
                                </div>
                            </div>
                        )
                }


            </div>
        )/*return*/
    }/*render*/
}

const mapStateToProps = (state) => {

    return ({
        // vw:state.Root.view_size.vw,
        // landscape:state.Root.view_size.is_landscape,
        language:state.Root.language,
        landscape:state.Root.view_size.is_landscape,
        // on:state.Tab.on,
    });
}


const Comp = connect(mapStateToProps,null)(Biography)
export default TAB()(Comp)
