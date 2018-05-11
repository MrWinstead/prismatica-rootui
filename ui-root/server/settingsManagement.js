
import Bunyan from "bunyan"
import { Meteor } from "meteor/meteor"

import {ConfigureAccounts} from "./accounts/configuration";
import { DefaultLogger } from "./logging";

// This could be troublesome in the future since it isn't stored in Mongodb
const currentSettings = {...Meteor.settings};

export const settingNameRPCReportRender = "RpcReportRender";

export function getSettingValue(settingName) {
    let settingValue = currentSettings[settingName];
    DefaultLogger.debug({
        settingName: settingName,
        value: settingValue,
    }, "fetching setting");

    return settingValue;
}

function loadSettings() {
    if(process.env.PRISMATICA_RPC_REPORT_RENDER) {
        currentSettings[settingNameRPCReportRender] =
            process.env.PRISMATICA_RPC_REPORT_RENDER;
    }

    if(process.env.PRISMATICA_LOG_DEBUG){
        DefaultLogger.level(Bunyan.DEBUG);
    }

    if(process.env.PRISMATICA_LOG_INFO){
        DefaultLogger.level(Bunyan.INFO);
    }

    ConfigureAccounts();
}

Meteor.startup(loadSettings);
