const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

const listContacts = async()=>  {
   const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const  getContactById = async(contactId) => {
 const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

const addContact = async ({name, email, phone}) => {
 const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removedContact;
};

module.exports = {
   listContacts,
    getContactById,
    addContact,
    removeContact
}