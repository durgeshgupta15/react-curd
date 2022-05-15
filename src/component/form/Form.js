import { Component } from "react";
import { validateField } from '../../utils/FormValidator'
import Curd from "../curd/Curd";
import { createUser, updateUser } from '../../services/apiService';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                phone1: '',
                phone2: '',
                phone3: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                qualification: '',
                comments: ''
            },
            formErrors: {
                firstName: null,
                lastName: null,
                email: null,
                phone1: null,
                address1: null,
                address2: null,
                city: null,
                state: null,
                zipCode: null,
                country: null,
                qualification: null,
                comments: null
            },
            type: '',
            id: ''
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        const { form, formErrors } = this.state;
        let formObj = {};
        formObj = {
            ...form,
            [name]: value
        };

        this.setState({ form: formObj }, () => {
            let formErrorsObj = {};

            const errorMsg = validateField(name, value);
            formErrorsObj = { ...formErrors, [name]: errorMsg };
            this.setState({ formErrors: formErrorsObj });
        });
    };

    validateForm = (form, formErrors, validateFunc) => {
        const errorObj = {};
        Object.keys(formErrors).map(x => {
            let refValue = null;
            const msg = validateFunc(x, form[x], refValue);
            if (msg) errorObj[x] = msg;
        });
        return errorObj;
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { form, formErrors } = this.state;
        const errorObj = this.validateForm(form, formErrors, validateField);
        if (Object.keys(errorObj).length !== 0) {
            this.setState({ formErrors: { ...formErrors, ...errorObj } });
            return false;
        }
        console.log("Data: ", form);
        console.log('type: ', this.state.type)

        let body = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phoneNumber: form.phone1 + form.phone2 + form.phone3,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            state: form.state,
            zipCode: form.zipCode,
            country: form.country,
            qualification: form.qualification,
            comments: form.comments,
        }

        if (this.state.type == 'update') {
            const response = await updateUser(this.state.id, body);
            console.log('response: ', response)
        } else {
            const response = await createUser(body);
            console.log('response: ', response)
        }
        

        this.setState({
            form: {...this.state.form,
                firstName: '',
                lastName: '',
                email: '',
                phone1: '',
                phone2: '',
                phone3: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                qualification: '',
                comments: ''
            }
        })
    };

    getUser = (val) => {
        console.log('val: ', val);
        let phone1 = val.phoneNumber.substring(0, 3);
        let phone2 = val.phoneNumber.substring(3, 6);
        let phone3 = val.phoneNumber.substring(6)
        this.setState({
            form: {
                ...this.state.form,
                firstName: val.firstName,
                lastName: val.lastName,
                phone1: phone1,
                phone2: phone2,
                phone3: phone3,
                email: val.email,
                address1: val.address1,
                address2: val.address2,
                city: val.city,
                state: val.state,
                zipCode: val.zipCode,
                country: val.country,
                qualification: val.qualification,
                comments: val.comments
            },
            type: val.type,
            id: val._id
        })
    }

    updateUser = async (id, body) => {
        const response = await updateUser(id, body);
        console.log('response: ', response)
    }

    render() {
        const { form, formErrors } = this.state;
        return (
            <>
                <div className="container">
                    <div className="register col-md-5 col-sm-6">
                        <h1 className="title"><strong>Bio Data</strong>
                        </h1>


                        <form role="form">
                            <div className="form-group">
                                <label className="reg_txt">Name <span>*</span></label>
                                <div className="controls form-inline d-flex">
                                    <div className="flex" style={{ marginRight: '15px' }}>
                                        <input
                                            type="text"
                                            className="input-name w-100"
                                            placeholder="First"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange}
                                        />
                                        {formErrors.firstName && (
                                            <span className="err">{formErrors.firstName}</span>
                                        )}
                                    </div>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            className="input-name"
                                            name="lastName"
                                            style={{ width: '100%' }}
                                            placeholder="Last"
                                            value={form.lastName}
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange} />
                                        {formErrors.lastName && (
                                            <span className="err">{formErrors.lastName}</span>
                                        )}
                                    </div>


                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="form-group">
                                <label className="reg_txt">Email  <span>*</span></label>
                                <input
                                    type="text"
                                    className="form-register text"
                                    id=""
                                    placeholder="E-mail"
                                    name="email"
                                    value={form.email}
                                    onChange={this.handleChange}
                                    onBlur={this.handleChange} />
                                {formErrors.email && (
                                    <span className="err">{formErrors.email}</span>
                                )}
                            </div>

                            <div className="clearfix"></div>

                            <div className="form-group" style={{ height: '70px', marginBottom: '25px' }}>
                                <label className="reg_txt">Phone Number  <span>*</span></label>
                                <div className="clearfix"></div>
                                <div className="wsite-form">
                                    <input
                                        type="text"
                                        className="text input-name1"
                                        name="phone1"
                                        minLength = "3"
                                        value={form.phone1}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange} />
                                </div>
                                <div className="line">-</div>
                                <div className="wsite-form">
                                    <input
                                        type="text"
                                        className="text input-name1"
                                        name="phone2"
                                        minLength= "3"
                                        value={form.phone2}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange} />
                                </div>
                                <div className="line">-</div>
                                <div className="wsite-form">
                                    <input
                                        type="text"
                                        className="text input-name1"
                                        name="phone3"
                                        minLength= "4"
                                        value={form.phone3}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange} />
                                </div>
                                {formErrors.phone1 && (
                                    <span className="err">{formErrors.phone1}</span>
                                )}
                            </div>

                            <div className="clearfix"></div>

                            <div className="form-group">
                                <label className="reg_txt">Address  <span>*</span></label>
                                <div className="d-flex  flex-column" style={{ marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        className="form-register text"
                                        id=""
                                        placeholder="Line 1"
                                        name="address1"
                                        value={form.address1}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange} />
                                    {formErrors.address1 && (
                                        <span className="err">{formErrors.address1}</span>
                                    )}

                                </div>
                                <div className="d-flex flex-column">
                                    <input
                                        type="text"
                                        className="form-register text"
                                        id=""
                                        placeholder="Line 2"
                                        name="address2"

                                        value={form.address2}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange} />
                                    {formErrors.address2 && (
                                        <span className="err">{formErrors.address2}</span>
                                    )}
                                </div>


                            </div>

                            <div className="form-group">
                                <div className="controls form-inline d-flex">

                                    <div className="d-flex flex-column" style={{ marginRight: '15px' }}>
                                        <input
                                            type="text"
                                            className="input-name w-100"
                                            name="city"
                                            placeholder="City"
                                            value={form.city}
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange} />
                                        {formErrors.city && (
                                            <span className="err">{formErrors.city}</span>
                                        )}
                                    </div>
                                    <div className="d-flex flex-column">
                                        <input
                                            type="text"
                                            className="input-name w-100"
                                            placeholder="State"
                                            name="state"
                                            value={form.state}
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange} />
                                        {formErrors.state && (
                                            <span className="err">{formErrors.state}</span>
                                        )}

                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="controls form-inline d-flex">
                                    <div className="d-flex flex-column" style={{ marginRight: '15px' }}>
                                        <input
                                            type="text"
                                            className="input-name w-100"
                                            placeholder="Zip Code"
                                            name="zipCode"
                                            value={form.zipCode}
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange} />
                                        {formErrors.zipCode && (
                                            <span className="err">{formErrors.zipCode}</span>
                                        )}
                                    </div>
                                    <div className="d-flex flex-column">
                                        <input
                                            type="text"
                                            className="input-name w-100"
                                            placeholder="Country"
                                            name="country"
                                            value={form.country}
                                            onChange={this.handleChange}
                                            onBlur={this.handleChange} />
                                        {formErrors.country && (
                                            <span className="err">{formErrors.country}</span>
                                        )}
                                    </div>


                                </div>
                            </div>

                            <div className="form-group">
                                <label className="reg_txt">Write Your qualification <span>*</span></label>
                                <input
                                    type="text"
                                    className="form-register text"
                                    id=""
                                    placeholder=""
                                    name="qualification"
                                    value={form.qualification}
                                    onChange={this.handleChange}
                                    onBlur={this.handleChange} />
                                {formErrors.qualification && (
                                    <span className="err">{formErrors.qualification}</span>
                                )}
                            </div>


                            <div className="clearfix"></div>

                            <div className="form-group">
                                <label className="reg_txt">Comment  <span>*</span></label>
                                <textarea
                                    className="form-register text"
                                    value={form.comments}
                                    name="comments"
                                    onChange={this.handleChange}
                                    onBlur={this.handleChange} ></textarea>
                                {formErrors.comments && (
                                    <span className="err">{formErrors.comments}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-default submit"
                                    style={{ width: '97%' }}
                                    onClick={(e) => { this.handleSubmit(e) }}>
                                    Submit</button>
                            </div>
                        </form>

                    </div>

                    <div className="col-md-6 tabt">
                        <Curd sendData={this.getUser} />
                    </div>

                </div>
            </>
        )
    }
}

export default Form;