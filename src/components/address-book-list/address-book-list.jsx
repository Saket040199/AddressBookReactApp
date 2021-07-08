import React from 'react';
import './address-book-list.scss'
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import editIcon from '../../assets/icons/create-black-18dp.svg';
import { withRouter } from 'react-router-dom';
import AddressBookService from '../../services/addressbook';

const AddressBookList = (props) => {

  const edit = (id) => {
    props.history.push(`/form/${id}`);
  }

  const remove = (id) => {
    new AddressBookService().deleteAddressBook(id)
      .then(res => {
        window.location.reload();
      }).catch(error => {
        console.log(error);
      })

  }
  return (
    <table id="display" className="table">
      <tbody>
        <tr key={-1}>
          <th>FullName</th>
          <th>Address</th>
          <th>City</th>
          <th>State</th>
          <th>Zip Code</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
        {
          props.addressBookArray && props.addressBookArray.map((contact) => (
            <tr key={contact.addressBookId}>
              <td>{contact.name}</td>
              <td>{contact.address}</td>
              <td>{contact.city}</td>
              <td>{contact.state}</td>
              <td>{contact.zipCode}</td>
              <td>{contact.phoneNo}</td>
              <td><img src={deleteIcon} onClick={() => remove(contact.addressBookId)} alt="delete" />
                <img src={editIcon} onClick={() => edit(contact.addressBookId)} alt="edit" /></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )

}

export default withRouter(AddressBookList);
