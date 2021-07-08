import React from 'react'
import './form.scss'
import cancelButton from '../../assets/images/cross.png'
import { Link, withRouter } from 'react-router-dom';
import AddressBookService from '../../services/addressbook';

const initalValue = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phoneNumber: '',
    id: '',
    isUpdate: false,
    error: {
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: ''
    },
    valid: {
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phoneNumber: ''
    }

}

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            phoneNumber: '',
            id: '',
            isUpdate: false,
            error: {
                name: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                phoneNumber: ''
            },
            valid: {
                name: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                phoneNumber: ''
            }
        }
    }


    componentDidMount = () => {
        let id = this.props.match.params.id;
        if (id !== undefined && id !== '') {
            this.getBookById(id);
        }
    }

    getBookById = (id) => {
        new AddressBookService().getAddressBookId(id)
            .then(ResponseDTO => {
                let responseData = ResponseDTO.data;
                this.setContactData(responseData.data);
            }).catch(error => {
                console.log(error);
            })
    }
    setContactData = (contact) => {
        this.setState({
            id: contact.addressBookId,
            name: contact.name,
            address: contact.address,
            city: contact.city,
            state: contact.state,
            zip: contact.zipCode,
            phoneNumber: contact.phoneNo,
            isUpdate: true
        });
    }

    onChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        this.checkValidation(event.target.name, event.target.value)
    }

    checkValidation = (field, value) => {
        if (field === 'name') {

            if (value.length === 0) {
                this.initializeMessage('name', '');
            }
            else {
                const NAME_REGEX = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}?$");
                if (NAME_REGEX.test(value)) {
                    this.initializeMessage('name', '');
                } else {
                    this.initializeMessage('name', 'Name is Invalid!');
                }
            }
        }

        if (field === 'address') {
            if (value.length === 0) {
                this.initializeMessage('address', 'Address is a required field !!');
            }
            else
                this.initializeMessage('address', '');
        }

        if (field === 'city') {
            if (value.length === 0) {
                this.initializeMessage('city', 'City is a required field !!');
            }
            else
                this.initializeMessage('city', '');
        }

        if (field === 'state') {
            if (value.length === 0) {
                this.initializeMessage('city', 'State is a required field !!');
            }
            else
                this.initializeMessage('city', '');
        }

        if (field === 'zip') {

            if (value.length === 0) {
                this.initializeMessage('zip', '');
            }
            else {
                const NAME_REGEX = RegExp("^[0-9]{6}?$");
                if (NAME_REGEX.test(value)) {
                    this.initializeMessage('zip', '');
                } else {
                    this.initializeMessage('zip', 'Zip is Invalid!');
                }
            }
        }

        if (field === 'phoneNumber') {

            if (value.length === 0) {
                this.initializeMessage('phoneNumber', '');
            }
            else {
                const NAME_REGEX = RegExp("^[6-9]{1}[0-9]{9}?$");
                if (NAME_REGEX.test(value)) {
                    this.initializeMessage('phoneNumber', '');
                } else {
                    this.initializeMessage('phoneNumber', 'Phone Number is Invalid!');
                }
            }
        }
    }

    initializeMessage = (field, errorMessage, validMessage) => {
        this.setState(previousState => ({
            error: {
                ...previousState.error,
                [field]: errorMessage
            }
        }));
        this.setState(previousState => ({
            valid: {
                ...previousState.valid,
                [field]: validMessage
            }
        }));
    }

    save = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let contactObject = {
            addressBookId:this.state.id,
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zip,
            phoneNo: this.state.phoneNumber
        }
        console.log(contactObject);
        if (this.state.isUpdate) {
            new AddressBookService().updateAddressBook(contactObject)
                .then(responseText => {
                    this.props.history.push("/home");
                }).catch(error => {
                    console.log(error);
                })
        } else {
            new AddressBookService().addAddressBook(contactObject)
                .then(responseDTO => {
                    console.log(responseDTO);
                    this.props.history.push("/home");
                }).catch(error => {
                    console.log(error);
                });
            this.reset();
            
        }

    }
    reset = () => {
        this.setState({ ...initalValue });
    }

    render() {
        return (
            <div className="body">

                <div className="main-content">
                    <form className="form" onReset={this.reset} onSubmit={this.save}>

                        <header className="form-header">
                            <span>   PERSON ADDRESS FORM </span>
                            <span>
                                <Link to=''><img className="cancel-img" src={cancelButton} alt="" /></Link>
                            </span>
                        </header>

                        <div className="row-content">
                            <label for="name">Name</label>
                            <input className="text-field" type="text" placeholder=" Full Name " value={this.state.name} onChange={this.onChangeHandler} name="name" id="name" />
                            <valid-message className="valid-name" htmlFor="name">{this.state.valid.name}</valid-message>
                            <error-output className="name-error" htmlFor="name">{this.state.error.name}</error-output>
                        </div>

                        <div className="row-content">
                            <label for="address">Address</label>
                            <input className="text-field" type="text" value={this.state.address} placeholder="Address" name="address" id="address" onChange={this.onChangeHandler} />
                            <valid-message className="valid-name" htmlFor="address">{this.state.valid.address}</valid-message>
                            <error-output className="name-error" htmlFor="address">{this.state.error.address}</error-output>

                        </div>

                        <div className="row-content field ">

                            <input type="text" name="city" value={this.state.city} placeholder="Enter City" id="city" onChange={this.onChangeHandler} />
                            <valid-message className="valid-name" htmlFor="city">{this.state.valid.city}</valid-message>
                            <error-output className="name-error" htmlFor="city">{this.state.error.city}</error-output>

                            <select name="state" id="state" value={this.state.state} onChange={this.onChangeHandler} >
                                <option value="" disabled selected>Select State</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Laddakh">Laddakh</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </select>
                            <valid-message className="valid-name" htmlFor="state">{this.state.valid.state}</valid-message>
                            <error-output className="name-error" htmlFor="state">{this.state.error.state}</error-output>

                            <input type="text" id="zip" name="zip" value={this.state.zip} placeholder="Zip Code..." onChange={this.onChangeHandler} />
                            <valid-message className="valid-name" htmlFor="zip">{this.state.valid.zip}</valid-message>
                            <error-output className="name-error" htmlFor="zip">{this.state.error.zip}</error-output>

                        </div>

                        <div className="row-content">
                            <label for="phone-number">Phone-Number</label>
                            <input className="text-field" type="text" value={this.state.phoneNumber} placeholder="Phone Number" name="phoneNumber" onChange={this.onChangeHandler} />
                            <valid-message className="valid-name" htmlFor="phoneNumber">{this.state.valid.phoneNumber}</valid-message>
                            <error-output className="name-error" htmlFor="phoneNumber">{this.state.error.phoneNumber}</error-output>
                        </div>

                        <div className="buttonParent">
                            {/* <a href="../pages/homepage.html" class="resetButton button cancelButton">Cancel</a> */}
                            <div className="submit-reset">
                                <button className="submitButton button" id="submit">Submit</button>
                                <button className="resetButton button" type="reset" id="reset">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default withRouter(Form);
