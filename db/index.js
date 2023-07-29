const fs = require('fs/promises');
const path = require('path');
const { nanoid: nanoId } = require('nanoid');

const contactsPath = path.join(__dirname, '/contacts.json');

async function listContacts() {
  const contactsArray = await fs.readFile(contactsPath);
  return JSON.parse(contactsArray);
}

async function getContactById(contactId) {
  const contactsArray = await listContacts();
  const contactById = contactsArray.find(el => el.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contactsArray = await listContacts();
  const indx = contactsArray.findIndex(el => el.id === contactId);
  if (indx === -1) return null;
  const [deletedContact] = contactsArray.splice(indx, 1);
  fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contactsArray = await listContacts();
  const newContact = { id: nanoId(), name, email, phone };
  contactsArray.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return newContact;
}

async function editContact(id, data) {
  const contactsArray = await listContacts();
  const editedIndx = contactsArray.findIndex(el => el.id === id);
  if (editedIndx === -1) return null;
  contactsArray[editedIndx] = { ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return contactsArray[editedIndx];
}

module.exports = { listContacts, getContactById, removeContact, addContact, editContact };
