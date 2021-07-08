import config from '../config/config';
import AxiosService from './axios-service';

const baseUrl = config.baseUrl + "/addressbook";
export default class AddressBookService {

    addAddressBook(data) {
        return AxiosService.postService(`${baseUrl}/create`, data);
    }
    getAddressBook() {
        return AxiosService.getService(`${baseUrl}/`);
    }
    getAddressBookId(id) {
        return AxiosService.getService(`${baseUrl}/get/${id}`,id);
    }
    updateAddressBook(data) {
        return AxiosService.putService(`${baseUrl}/update/${data.addressBookId}`, data);
    }
    deleteAddressBook(id) {
        return AxiosService.deleteService(`${baseUrl}/delete/${id}`);
      }
}
