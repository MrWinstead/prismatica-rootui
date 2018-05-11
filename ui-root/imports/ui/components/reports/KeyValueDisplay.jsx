
import React from 'react'
import PropTypes from 'prop-types'
import { IconButton, TextField, } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import { Creation, Delete } from "mdi-material-ui"

import { DefaultLogger, } from "../../../../client/logging";

export class KeyValueDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            variableToBeCreatedName: null,
            variableToBeCreatedValue: null,
        };
    }

    renderSingleKeyValuePair(key, value) {
        return (
            <div>
            <TextInput
                floatingLabelText={key}
                value={value}
                onChange={(e) => {
                    this.props.keyChangedCallback(key, e.target.value)
                }}
            />
            <IconButton onClick={() => {
                this.props.keyDeletedCallback(key);
            }}
            ><Delete/></IconButton>
            </div>
        );
    }

    renderKeyValuePairCreate() {
        return(
        <div className="container">
        <TextField
            hintText="New Variable Name"
            value={this.state.variableToBeCreatedName}
            onChange={(e) => {
                this.setState({variableToBeCreatedName: e.target.value})
            }}
        />
        <TextField
            hintText="New Variable Value"
            value={this.state.variableToBeCreatedValue}
            onChange={(e) => {
                this.setState({variableToBeCreatedValue: e.target.value})
            }}
        />
        <IconButton onClick={() => {
            this.props.keyCreatedCallback(
                this.state.variableToBeCreatedName,
                this.state.variableToBeCreatedValue);
            this.setState({
                variableToBeCreatedName: null,
                variableToBeCreatedValue: null,
            });
        }}>
            <Creation />
        </IconButton>
        </div>
        );
    }

    render() {
        return(
        <div className="container">
            {Object.keys(this.props.keyValuePairs).map((key) => {
                const value = this.props.keyValuePairs[key];

                DefaultLogger.debug({obj: {key: key, value}},
                    "displaying kv pair");
                return this.renderSingleKeyValuePair(key, value);
            })}
            { this.renderKeyValuePairCreate() }
        </div>
        );
    }

}

KeyValueDisplay.propTypes = {
    label: PropTypes.string,
    keyValuePairs: PropTypes.object,
    keyCreatedCallback: PropTypes.func,
    keyChangedCallback: PropTypes.func,
    keyDeletedCallback: PropTypes.func,
};
