import { css } from 'glamor'
import { PureComponent } from 'react'
import {ui }  from 'utils/ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TAB from 'components/artisti.tab.Wrapper'


/*根据title 显示selectText*/
class TitleButton extends PureComponent {
    constructor(props){
        super(props);
    }
    render(){

        return(
            <div
             {...css({
                // marginRight:'3rem',
                cursor:'pointer',
                // width:'3rem',/*居中*/
                color:this.props.activated?ui.color.b_o1:ui.color.b_o2,
                fontWeight:this.props.activated?900:100,
             })}
             className = {'TITLEBUTTON'}
             // key = {this.props.key}
             onClick={this.props.onClick}
            >{this.props.name}
            </div>
        )
    }
}



class SelectText extends PureComponent {
    constructor(props){
        super(props);
        this.state = {on:0}
        this.handleClick  = this.onClick.bind(this)
    }

    onClick(index){
        this.setState({on:index})
    }

    render(){

        const language = this.props.language
        const CONTENTS = this.props.contents
        const content = this.props.contents[this.state.on]['content'][language]||
        this.props.contents[this.state.on]['content']['en']||
        this.props.contents[this.state.on]['content']['it']||
        this.props.contents[this.state.on]['content']['zh']

        const title = this.props.contents[this.state.on]['title'][language]||
        this.props.contents[this.state.on]['title']['en']||
        this.props.contents[this.state.on]['title']['it']||
        this.props.contents[this.state.on]['title']['zh']

        const author = this.props.contents[this.state.on]['author'][language]||
        this.props.contents[this.state.on]['author']['en']||
        this.props.contents[this.state.on]['author']['it']||
        this.props.contents[this.state.on]['author']['zh']
        // debugger

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

                <div
                  {...css({

                    display:'flex',
                    flexDirection:'row',
                    justifyContent:this.props.landscape?'flex-start':'center',/*如果是手机居中*/
                    // marginLeft:'auto',
                    // marginRight:'auto',

                    marginTop:'2rem',
                    marginBottom:'3rem',
                })}
                >
                    {this.props.contents.map((item,index)=>
                        <TitleButton
                         name = {item['title'][language]}
                         onClick={()=>{this.handleClick(index)}}
                         activated = {this.state.on === index}
                         key = {'TITLEBUTTON'+language+index}
                         ></TitleButton>
                    )}
                </div>


                {/*title*/}
                <div
                 {...css({

                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',/*如果是手机居中*/
                    alignItems: 'center',
                    userSelect: 'none',
                    // marginLeft:'auto',
                    // marginRight:'auto',
                    marginTop:'2rem',
                    marginBottom:'3rem',
                })}>
                    {/*title*/}
                    <div>{`《${title}》`}</div>
                    {/*title*/}

                    {/*author*/}
                    <div
                    {...css({
                        color:ui.color.b_o2,
                    })}
                    >{author}</div>
                    {/*author*/}
                </div>

                {/* Selectext 内容 */}

                {
                    content
                        .split('\n')
                        .map((item, index) =>
                          <p
                           {...css({
                                textIndent: '2em',
                           })}
                           key={`${title}_${index}_${language}`}

                           >{item}<br/></p>
                        )
                }

                {/* Selectext 内容 */}


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


const Comp = connect(mapStateToProps,null)(SelectText)
export default TAB()(Comp)
