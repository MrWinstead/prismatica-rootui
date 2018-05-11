
import AccountsTemplates from "meteor/useraccounts:core"

handleFormSubmit(err, state) {
    DefaultLogger.debug({obj: {
            error: err,
            state: state,
        }}, "signinup submitted")

}

AccountsTemplates.configure({

});
