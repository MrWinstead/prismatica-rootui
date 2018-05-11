import React from 'react';
import PropTypes from 'prop-types'

import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';
import { RaisedButton, } from "material-ui"
import { Delete, Pencil } from "mdi-material-ui"


export class TemplateInstanceAsCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCardDelete() {
        this.props.deletedCallback();
    }

    render() {
        return (
            <Card body>
                <CardHeader title={this.props.reportTemplate.name} />

                <CardText>{this.props.reportTemplate.text}</CardText>

                <CardActions>
                    <RaisedButton onClick={() => {
                        this.props.startLiveRenderingCallback()}}>
                        <Pencil />
                    </RaisedButton>
                    <RaisedButton onClick={() => {this.handleCardDelete()}}>
                        <Delete />
                    </RaisedButton>
                </CardActions>
            </Card>
        );
    }

}

TemplateInstanceAsCard.propTypes = {
    reportTemplate: PropTypes.object,
    deletedCallback: PropTypes.func,
    startLiveRenderingCallback: PropTypes.func,
};
