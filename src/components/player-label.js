import React from "react"

class PlayerLabel extends React.Component {

  constructor(props){
    super(props);
    this.wrapper = React.createRef();
    this.span = React.createRef();
    this.state = {
      wrapperWidth:0,
      spanWidth:0,
      requireAnimation:null,
      animationDuration:15
    };
  }

  getDimensions(){
    const
      wrapperWidth = this.wrapper.current.offsetWidth - 40,
      spanWidth = this.span.current.offsetWidth,
      requireAnimation = spanWidth>wrapperWidth;
    return {
      wrapperWidth:wrapperWidth,
      spanWidth:spanWidth,
      animationDuration:15*spanWidth/wrapperWidth,
      requireAnimation:requireAnimation,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const dimensions = this.getDimensions(),
      {requireAnimation} = dimensions;
    if(this.state.requireAnimation !== requireAnimation){
      this.setState(dimensions);
    }
  }

  render(){
    const {props} = this;
    return (<div ref={this.wrapper}{...props} className={`player__label ${props.className}`}>
      <span ref={this.span}
            className={`player__label__text ${this.state.requireAnimation?'player__label__text--animate':''}`}
            style={{
              animationDuration:`${this.state.animationDuration}s`,
            }}
      >{props.children}</span>
      <span className={`player__label__fade`} />
    </div>)
  }
}

export default PlayerLabel
