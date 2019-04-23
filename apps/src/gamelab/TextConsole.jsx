/** @file Grid over visualization */
import PropTypes from 'prop-types';
import React from 'react';
import Transition from 'react-transition-group/Transition';

export const styles = {
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
  },

};

export const transitionStyles = {
  entering: {
    overflow: 'auto',
    maxHeight: '108px'
  },
  entered: {
    overflow: 'auto',
    maxHeight: '108px'
  },
  exiting: {
    overflow: 'auto',
    maxHeight: '18px'
  },
  exited: {
    maxHeight: '18px',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
};

/**
 * Grid layered over the play space.
 * Should be rendered inside a VisualizationOverlay.
 * @constructor
 */
export default class TextConsole extends React.Component {
  static propTypes = {
    consoleMessages: PropTypes.array.isRequired
  };

  state = {
    closed: true,
    inProp: false,
    duration: 1000,
    spokenLines: []
  };

  toggleConsole() {
    // refs.elt.scrollTop = text_console.elt.scrollHeight;
    styles.console.transitionDelay = '0s';
    this.setState((state) => {
      return {inProp: !this.state.inProp, duration: 1000};
    });
  }

  getButtonStyle() {
    if (this.state.inProp || !(this.props.consoleMessages.length)) {
      return styles.hide;
    } else {
      return styles.expandButton;
    }
  }

  renderLine(message) {
    return (
      <p style={styles.paragraphStyle}>
        {message.name &&
          <b>{message.name}: </b>
        }
        {message.text}
      </p>
    );
  }

  getLines(state) {
    //debugger;
    // For testing
    // this.state.spokenLines = ["Hi", "My name is", "jessie", "what's your name?", "I like dogs", "and cats", "what do you like?", "very long string very long string very long string very long string very long string very long string"];
    //
    if (state === 'exited' && this.props.consoleMessages.length > 0) {
      return this.renderLine(this.props.consoleMessages[this.props.consoleMessages.length - 1]);
    }

    return this.props.consoleMessages.map(message => (
      this.renderLine(message)
    ));
  }

  render() {
    return (
      <div>
       <Transition in={this.state.inProp} timeout={this.state.duration}>
         {(state) => (
            <span
              id="text-console"
              className="text-console"
              onClick={() => this.toggleConsole()}
              // onMouseLeave={() => this.mouseLeave()}
              // onMouseEnter={() => this.mouseEnter()}
              style={{
                ...styles.console,
                ...transitionStyles[state]
              }}
            >
              {this.getLines(state)}
            </span>
          )}
        </Transition>
        <button
          type="button"
          id="expand-collapse"
          style={this.getButtonStyle()}
          onClick={() => this.toggleConsole()}
        >
          +
        </button>
      </div>
    );
  }
}


// <p style={styles.paragraphStyle}>
//                 <b>Lorem</b> ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
//               </p>
//               <p style={styles.paragraphStyle}>
//                 <b>Lorem</b> ipsum
//               </p>
//               <p style={styles.paragraphStyle}>
//                 <b>Lorem</b> ipsum dolor
//               </p>
//               <p style={styles.paragraphStyle}>
//                 <b>Lorem</b> ipsum dolor sit amet, consectetur
//               </p>

  // getConsoleStyle() {
  //   return this.state.closed?
  //     {...styles.console, ...styles.consoleClosed} :
  //     {...styles.console, ...styles.consoleOpen};
  //   //return this.state.closed? styles.consoleClosed : styles.consoleOpen;
  // }

  // toggleStyle() {
  //   this.state.closed? this.expandConsole() : this.closeConsole();
  // }

  // delayCloseConsole() {
  //   this.closeConsole('2s');
  // }

  // closeConsole(delay = '0s') {
  //   styles.console.transitionDelay = delay;
  //   this.setState((state) => {
  //     return {closed: true};
  //   });
  // }

  // expandConsole() {
  //   styles.console.transitionDelay = '0s';
  //   this.setState((state) => {
  //     return {closed: false};
  //   });
  // }

  // getButtonStyle() {
  //   return this.state.closed? styles.expandButton : styles.hide;
  // }

  // mouseLeave() {
  //   styles.console.transitionDelay = '0s';
  //   this.setState((state) => {
  //     return {inProp: false, duration: 1000};
  //   })
  // }

  // mouseEnter() {
  //   styles.console.transitionDelay = '0s';
  //   this.setState((state) => {
  //     return {inProp: true, duration: 1000};
  //   });
  // }


//     <Transition in={this.state.inProp} timeout={1000}>
    //   </Transition>
          //onClick={() => this.toggleStyle()}
          //onMouseLeave={() => this.delayCloseConsole()}

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
