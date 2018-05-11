import React from 'react';
import Radium from 'radium';
import {AccountCircle, Creation, File, Polymer, }
    from "mdi-material-ui"
import {AppBar, } from "material-ui"
import {Link, } from "react-router-dom"
import {Meteor, } from "meteor/meteor";
import {MuiThemeProvider,} from 'material-ui/styles';

import {SigninFormPath} from "./account/SigninupForm";

class NavbarTop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getStyles() {
        return {
            topNav: {
                position: "absolute",
                zIndex: "2000",
                backgroundColor: "#363b4e",
                color: "#99a2ac",
                height: "50px",
                width: "100%",
                top: "0px",
                right: "0px",
                left: "0px",
                borderBottom: "2px solid ##272c3c"
            },
            navText: {
                position: "relative",
                top: "15px"
            },
            navIcons: {
                position: "relative",
                top: "5px"
            },
            searchCont: {
                position: "relative",
                zIndex: "2012",
                float: "left",
                marginLeft: "20px",
                marginRight: "30px",
                width: "260px",
                minHeight: "50px"
            },
            searchText: {
                position: "relative",
                top: "0px"
            },
            topBtn: {
                position: "relative",
                zIndex: "2012",
                float: "left",
                top: "5px",
                marginRight: "30px",
                width: "35px"
            },
            pnameCont: {
                position: "relative",
                zIndex: "2012",
                float: "right",
                overflow: "hidden",
                marginRight: "10px",
                width: "100px",
                minHeight: "50px",
                maxHeight: "50px"
            },
            settingsCont: {
                position: "relative",
                zIndex: "2012",
                float: "right",
                top: "5px",
                marginRight: "30px",
                width: "90px"
            },
            navbarWidget: {
                fontSize: "70px",
                height: "32px",
                width: "32px",
                lineHeight: "20px",
            },
            appbarIcons: {
                paddingTop: "10px",
                paddingLeft: "10px",
                fontSize: "42px",
                lineHeight: "20px",
                TextDecoration: "none"
            }
        };
    }

    renderWidgets(styles) {
        return (
            <div>
            <Link to="/">
                <Polymer color="#475070" hoverColor="yellow"
                         style={styles.navbarWidget}
                />
            </Link>

            <Link to="/ReportTool">
               <Creation color="#475070" hoverColor="yellow"
                         style={styles.navbarWidget}
               />
            </Link>
            <Link to="/reports/TemplateManager">
              <File color="#475070" hoverColor="yellow"
                    style={styles.navbarWidget}
              />
            </Link>
        </div>
        );
    }

    renderTopSearch(styles) {
        return (
            <div style={[styles.searchCont]}>
                <span style={[styles.searchText]}> </span>
            </div>
        )
    }

    renderAccountDisplay(styles) {
        const currentUser = Meteor.user();
        let currentUsernameDisplay = null;
        if(currentUser) {
            currentUsernameDisplay = (
                <div style={[styles.pnameCont]}>
                    <div style={[styles.navText]}>
                        { currentUser.username }
                    </div>
                </div>
            );
        }

        return(
            <div>
                { currentUsernameDisplay }
                <Link to={SigninFormPath}>
                    <AccountCircle color="#475070" hoverColor="yellow"/>
                </Link>
            </div>
        )
    }

    render() {
        const styles = this.getStyles();
        return (
            <MuiThemeProvider>
            <AppBar style={[styles.topNav]}
                iconElementLeft={this.renderWidgets(styles)}
                iconElementRight={this.renderAccountDisplay(styles)}>

                { this.renderTopSearch(styles) }

            </AppBar>
            </MuiThemeProvider>
        );
    }
}

export default Radium(NavbarTop);
