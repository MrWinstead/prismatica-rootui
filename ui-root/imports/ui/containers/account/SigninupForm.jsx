
import React from "react";
import PropTypes from "prop-types";
import Blaze from "meteor/gadicc:blaze-react-component";

import { AccountPrefix, } from "./index";
import { DefaultLogger, } from "../../../../client/logging";

export const SigninFormPath = AccountPrefix + "signin";
export const SignupFormPath = AccountPrefix + "signup";

export const SigninupFormStates = {
    SIGN_IN: "signIn",
    SIGN_UP: "signUp",
};

export class SigninupForm extends React.Component {

    render() {
        DefaultLogger.debug({obj: {
            props: this.props,
        }}, "rendering signinup form");
        //state={this.props.formState}
        return (
            <Blaze template="atForm"
                   onSubmitHook={(e, r) => {this.handleFormSubmit(e, r)}}
            />
        );
    }
}

SigninupForm.propTypes = {
};
