
import React from 'react';
import { MuiThemeProvider } from "material-ui/styles";
import { RaisedButton } from "material-ui"

// Deprecated
import { Alert, Row } from "reactstrap"

import { DefaultLogger } from "../../../../client/logging";
import { DefaultTheme } from "../../Theme";
import { DeleteTemplate } from "../../../api/reports/methods";
import { ReportTemplates } from "../../../api/reports/models";

import { LiveTemplateRendering } from
        "../../components/reports/LiveTemplateRendering";
import { TemplateInstanceCreate } from
        "../../components/reports/TemplateInstanceCreate";
import { TemplatesDisplayAsCards } from
        "../../components/reports/TemplatesDisplayAsCards";

export default class TemplateManager extends React.Component {

    constructor() {
        super();
        this.state = {
            showNewTemplateForm: false,
            showLiveTemplateRendering: false,

            selectedTemplateForManualRendering: null,

            anyTemplatesListed: false,
            listedTemplates: {},
            knownTemplatesCursor: null,
            knownTemplatesObservationHandle: null,
        };

        // TODO: this can't go one forever! We'll need to prune this eventually
        this.state.knownTemplatesCursor = ReportTemplates.find();
        this.observeTemplateChanges(this.state.knownTemplatesCursor);
    }

    componentWillUnmount() {
        this.state.knownTemplatesObservationHandle.stop()
    }

    observeTemplateChanges(cursor) {
        const addedOrChangedFunction = (_id, fields) => {
            this.state.anyTemplatesListed = true;

            fields._id = _id;

            const newState = {...this.state};
            newState.listedTemplates[_id] = fields;

            DefaultLogger.debug({obj:{
                updatedId: _id,
                fields: fields,
                newState: newState,
                currentState: this.state,
            }}, "update to template");
            this.setState(newState);
        };
        this.state.knownTemplatesObservationHandle = cursor.observeChanges({
            added: addedOrChangedFunction,
            changed: addedOrChangedFunction,
            removed: (_id) => {
                DefaultLogger.debug({obj: {
                    templateId: _id,
                }}, "removing template");
                let finalState = {...this.state};
                delete finalState.listedTemplates[_id];
                this.setState(finalState);
            }
        });
    }

    startTemplateLiveRendering(reportTemplate) {
        this.setState({selectedTemplateForManualRendering: reportTemplate,
            showLiveTemplateRendering: true})
    }

    toggleDisplayTemplateInstanceCreate() {
        this.setState({showNewTemplateForm: !this.state.showNewTemplateForm})
    }

    toggleDisplayManualTemplateRendering() {
        this.setState({showLiveTemplateRendering:
            !this.state.showLiveTemplateRendering})
    }

    templateWasDeleted(template) {
        let numberDeleted = DeleteTemplate.call({templateId: template._id});
        DefaultLogger.info({obj:{
            templateId: template._id,
            numberDeleted: numberDeleted,
        }}, "deleted template");
        this.setState({deletedReportTemplateId: template._id})
    }

    renderLiveTemplateRendering() {
        return (
        <Row>
            <LiveTemplateRendering
                onComplete={() => {this.toggleDisplayManualTemplateRendering()}}
                templateToRender={this.state.selectedTemplateForManualRendering}
            />
        </Row>
        );
    }

    renderMultipleTemplatesPresent() {
        return (
        <TemplatesDisplayAsCards
            templatesToList={this.state.listedTemplates}
            deletedCardCallback={
                (id) => { this.templateWasDeleted(id)}}
            startLiveRenderingCallback={
                (id) => {this.startTemplateLiveRendering(id)}}
        />
        );
    }

    renderNoReportTemplatesPresent() {
        return (
          <Alert color="warning">no report templates created</Alert>
        );
    }

    renderTemplateInstances() {
        if(this.state.anyTemplatesListed) {
            return this.renderMultipleTemplatesPresent();
        } else {
            return this.renderNoReportTemplatesPresent();
        }
    }

    renderTemplateInstanceCreate() {
        return (
        <Row>
            <TemplateInstanceCreate
                onComplete={() => {this.toggleDisplayTemplateInstanceCreate()}}
            />
        </Row>
        )
    }

    renderManagerTopBar() {
        return (
        <Row>
            <h1>Template Management</h1>
            <RaisedButton color={this.state.showNewTemplateForm ?
                    "warning" : "success"}
                onClick={() => {this.toggleDisplayTemplateInstanceCreate()}}>
                {this.state.showNewTemplateForm ? "Cancel" : "New"}
            </RaisedButton>
        </Row>
        );
    }

    render() {
        return (
        <MuiThemeProvider muiTheme={DefaultTheme}>
        <div>
            { this.renderManagerTopBar() }
            { this.state.showNewTemplateForm ? this.renderTemplateInstanceCreate() : null }
            { this.state.showLiveTemplateRendering ? this.renderLiveTemplateRendering() : null }
            { this.renderTemplateInstances() }
        </div>
        </MuiThemeProvider>
        );

    }

}
