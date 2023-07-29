const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const contacts = require('./db');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      return console.log(contactsList);
      break;
    case 'get':
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
      break;
    case 'remove':
      const deletedContact = await contacts.removeContact(id);
      return console.log(deletedContact);
      break;
    case 'add':
      const addedContact = await contacts.addContact(name, email, phone);
      return console.log(addedContact);
      break;
    case 'editContact':
      const contactToEdit = await contacts.editContact(id, { name, email, phone });
      return console.log(contactToEdit);
      break;
    default:
      return console.warn('\x1B[31m Unknown action type!');
  }
};

const argArray = hideBin(process.argv);
const { argv: argObject } = yargs(argArray);
invokeAction(argObject);
