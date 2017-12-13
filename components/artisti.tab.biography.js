import { css } from 'glamor'
import { PureComponent } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TAB from '~/components/artisti.tab.Wrapper'


class Biography extends PureComponent {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div
            {...css({
                  position:'relative',
                  width:`${this.props.width}`,
                  margin:'auto',//居中
                  minHeight:'60vh',//为了footer
              })}
            className = {this.props.tabName}
            >
                {
                    this.props.contents[this.props.language]
                        .split('\n')
                        .map((item, key) =>
                          <span key={`${this.props.tabName}_${key}_${this.props.language}`}>{item}<br/></span>
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
        // on:state.Tab.on,
    });
}


const Comp = connect(mapStateToProps,null)(Biography)
export default TAB()(Comp)
