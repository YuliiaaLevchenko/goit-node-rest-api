const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve(__dirname, 'contacts.json');

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
      const contacts = JSON.parse(data);
      return contacts;
    } catch (error) {
      console.error('Error reading contacts:', error);
      throw error;
    }
  }

  async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  }

  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
      id: Date.now().toString(), 
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

    async function removeContact(contactId) {
        const contacts = await listContacts();
        const index = contacts.findIndex((c) => c.id === contactId);
      
        if (index !== -1) {
          const [removedContact] = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}
return null; 
    }

    module.exports = {
        listContacts,
        getContactById,
        addContact,
        removeContact, 
    }