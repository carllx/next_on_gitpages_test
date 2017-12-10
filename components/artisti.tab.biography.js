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
              })}
            className = {this.props.tabName}
            >
                {
                    this.props.contents
                        .split('\n')
                        .map((item, key) =>
                          <span key={`${this.props.tabName}_${key}`}>{item}<br/></span>
                        )
                }
            </div>
        )/*return*/
    }/*render*/
}


export default TAB()(Biography)
