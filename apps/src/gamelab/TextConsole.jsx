/** @file Grid over visualization */
import PropTypes from 'prop-types';
import React from 'react';

export const styles = {
  show: {
    display: ''
  },
  hide: {
    display: 'none'
  },
  console: {
    display: '',
    background: 'rgba(128,128,128,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
    width: '100%',
    transitionProperty: 'max-height',
    transitionDuration: '1s'
  },
  consoleOpen: {
    maxHeight: '108px',
    overflow: 'auto'
  },
  consoleClosed: {
    maxHeight: '18px',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  expandButton: {
    position: 'absolute',
    right: '0',
    zIndex: 3,
    minWidth: '16px',
    margin: '0px',
    border: '0px',
    padding: '0px',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    borderRadius: '0px',
    fontFamily: 'monospace'
  },
  paragraphStyle: {
    margin: '0px'
  }
};

/**
 * Grid layered over the play space.
 * Should be rendered inside a VisualizationOverlay.
 * @constructor
 */
export default class TextConsole extends React.Component {
  static propTypes = {
    // width, height, mouseX and mouseY are given in app-space, not screen-space
    width: PropTypes.number,
    height: PropTypes.number,
    show: PropTypes.bool.isRequired
  };

  state = {
    closed: true
  };

  getConsoleStyle() {
    return this.state.closed?
      {...styles.console, ...styles.consoleClosed} :
      {...styles.console, ...styles.consoleOpen};
    //return this.state.closed? styles.consoleClosed : styles.consoleOpen;
  }

  toggleStyle() {
    this.state.closed? this.expandConsole() : this.closeConsole();
  }

  delayCloseConsole() {
    this.closeConsole('2s');
  }

  closeConsole(delay = '0s') {
    styles.console.transitionDelay = delay;
    this.setState((state) => {
      return {closed: true};
    });
  }

  expandConsole() {
    styles.console.transitionDelay = '0s';
    this.setState((state) => {
      return {closed: false};
    });
  }

  getButtonStyle() {
    return this.state.closed? styles.expandButton : styles.hide;
  }

  render() {
    return (
      <div>
        <span
          id="text-console"
          className="text-console"
          style={this.getConsoleStyle()}
          onClick={() => this.toggleStyle()}
          onMouseLeave={() => this.delayCloseConsole()}
        >
          <p style={styles.paragraphStyle}>
            <b>Lorem</b> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style={styles.paragraphStyle}>
            <b>Lorem</b> ipsum
          </p>
          <p style={styles.paragraphStyle}>
            <b>Lorem</b> ipsum dolor
          </p>
          <p style={styles.paragraphStyle}>
            <b>Lorem</b> ipsum dolor sit amet, consectetur
          </p>
        </span>
        <button
          type="button"
          id="expand-collapse"
          style={this.getButtonStyle()}
          onClick={() => this.expandConsole()}
        >
          +
        </button>
      </div>
    );
  }
}


    // setTimeout(() => {
    //   this.closeConsole();
    // }, 2000);

/*
  getButtonText() {
    return this.state.closed? '+' : '-';
  }
*/

  // collapseButton: {
  //   position: 'absolute',
  //   right: '0',
  //   zIndex: 3,
  //   minWidth: '30px',
  //   margin: '0px',
  //   border: '0px',
  //   padding: '0px',
  //   fontSize: 'inherit',
  //   lineHeight: 'inherit',
  //   borderRadius: '0px'
  // },
