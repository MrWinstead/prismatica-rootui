import React, { Component } from 'react';
import Radium, { Style, StyleRoot }  from 'radium';
import NavbarTop from './NavbarTop';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStyles() {
    return {
      landingFooter: {
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%"
      },
    };
  }

  render() {
    const styles = this.getStyles();
    return (
        <StyleRoot>
            <Style rules={{
                    body: {
                    backgroundColor: "#e4e5e6",
                    color: "black",
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
                }}}
            />
            <NavbarTop />
            <div>
                {this.props.children}
            </div>
        </StyleRoot>
    );
  }
}

export default Radium(Layout);
