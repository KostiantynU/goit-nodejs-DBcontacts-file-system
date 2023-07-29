const { program } = require('commander');
const contacts = require('./db');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);
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

invokeAction(argv);
