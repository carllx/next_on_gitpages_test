import { Component } from 'react'
import { TweenMax } from 'gsap'
// import { Test } from '../components/button'
import {Motion, spring} from 'react-motion';
import {css} from 'glamor'






const demo0 =css({
    borderRadius: '4px',
    backgroundColor: 'rgb(240, 240, 232)',
    position: 'relative',
    margin: '5px 3px 10px',
    width: '450px',
    height: '50px',
  })
const demo0_block = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    backgroundColor: 'rgb(130, 181, 198)',
  }


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  };

  handleMouseDown = () => {
    this.setState({open: !this.state.open});
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.handleMouseDown();
  };

  render() {
    return (
      <main>
        <button
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}>
          Toggle
        </button>

        <Motion style={{x: spring(
                this.state.open ? 400 : 0,
                {stiffness: 30, damping: 30}
            )}}>
          {({x}) =>
            // children is a callback which should accept the current value of
            // `style`
            <div {...demo0}>
                <div
                    style = {
                    Object.assign({},
                        demo0_block,
                        {
                            WebkitTransform: `translate3d(${x}px, 0, 0)`,
                            transform: `translate3d(${x}px, 0, 0)`,
                    })
                } />
            </div>
          }
        </Motion>
      </main>
    );
  };
}



