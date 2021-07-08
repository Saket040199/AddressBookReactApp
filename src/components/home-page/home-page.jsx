import React from 'react';
import addIcon from '../../assets/icons/add-24px.svg';
import searchIcon from '../../assets/icons/search_icon.svg';
import './home-page.scss';
import { Link } from 'react-router-dom';
import AddressBookService from '../../services/addressbook';
import AddressBookList from '../address-book-list/address-book-list';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAddressBookArray: [],
            addressBookArray: []
        }
        this.addressBookService = new AddressBookService();
    }

    componentDidMount() {
        this.getAddressBook();
    }

    getAddressBook = () => {
        this.addressBookService.getAddressBook()
            .then(ResponseDTO => {
                let responseData = ResponseDTO.data;
                this.setState({ allAddressBookArray: responseData.data })
                this.setState({ addressBookArray: responseData.data })
                console.log(this.state.addressBookArray);
            }).catch(error => {
                console.log(error);
            })
    }

    search = async (event) => {
        let searchName = event.target.value;
        await this.setState({ addressBookArray: this.state.allAddressBookArray })
        let addressBook = this.state.addressBookArray;
        if (searchName.trim().length > 0)
            addressBook = addressBook.filter((book) => book.name.toLowerCase().indexOf(searchName.toLowerCase()) > -1);
        this.setState({ addressBookArray: addressBook })
    }

    render() {
        return (
            <div className="body">
                <div className="main-content">
                    <div className="header-content">
                        <div className="heading">
                            Address Book
                            <div className="add-count">
                                {this.state.addressBookArray.length}
                            </div>
                        </div>
                        <div className="search-box" onClick={this.openSearch}>
                            <input className="search-input" onChange={this.search} type="text" />
                            <img className="search-icon" src={searchIcon} alt="Search Icon" />
                        </div>
                        <Link to="form" className="add-button">
                            <img className="addIcon" src={addIcon} alt="Add Button" />Add Contact
                        </Link>
                    </div>
                    <div className="table-main">
                        <AddressBookList addressBookArray={this.state.addressBookArray} />
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
