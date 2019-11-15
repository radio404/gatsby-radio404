import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {Component} from "react"
import logoSVG from "../images/logo-radio404-black-and-white.svg"

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.PlayPause = this.PlayPause.bind(this);
  }

  PlayPause(){
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    console.log('PlayPause',currentState);
  }

  render(){
    return (<header className={'site-header'}>
      <div>
        <h1 className={'site-header__logo'}>
          <Link to="/">
            <img src={logoSVG} alt={`radio404`}/>
            <span>{`radio404`}</span>
          </Link>
        </h1>
        <div className="player">
          <div className="player__buttons">
            <button type="button" className={(this.state.active ? 'playing ': '')+ 'play-button'} onClick={this.PlayPause} />
          </div>
          <div className="now-playing">
            <div className={`now-playing__track`}>New Heights (Visions of Aisha Malik)</div>
            <div className={`now-playing__artist`}>Kamaal Williams, Darkhouse Family</div>
          </div>
        </div>
      </div>
    </header>
  )}
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
