export const validateField = (name, value) => {
    let errorMsg = null;
    switch (name) {
        case "firstName":
            if (!value) errorMsg = "Please enter First Name.";
            break;
        case "lastName":
            if (!value) errorMsg = "Please enter Last Name.";
            break;
        case "email":
            if (!value) errorMsg = "Please enter Email.";
            else if (
                !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                )
            )
                errorMsg = "Please enter valid Email.";
            break;
        case "phone1":
            if (!value) errorMsg = "Please enter Mobile.";
            break;
        case "address1":
            if (!value) errorMsg = "Please enter Address1.";
            break;
        case "address2":
            if (!value) errorMsg = "Please enter Address2.";
            break;
        case "state":
            if (!value) errorMsg = "Please enter State.";
            break;
        case "city":
            if (!value) errorMsg = "Please enter City.";
            break;
        case "zipCode":
            if (!value) errorMsg = "Please enter ZipCode.";
            else if(value.length < 6) errorMsg = "Zipcode should be more than 6 character"
            break;

        case "country":
            if (!value) errorMsg = "Please select Country.";
            break;
        case "qualification":
            if (!value) errorMsg = "Please enter Qualification.";
            break;
        case "comments":
            if (!value) errorMsg = "Please enter Comments.";
            break;

        default:
            break;
    }
    return errorMsg;
};