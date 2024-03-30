const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

const contactsList = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
/*below is code that allow to invoke function's result to be displayed in terminal when 'node contacts.js' is wrtitten .
(async () => {
  try {
    const contacts = await contactsList();
    console.table(contacts);
  } catch (error) {
    console.error("Błąd:", error);
  }
})();*/

const getContactById = async (contactId) => {
  const contacts = await contactsList();
  return contacts.find(({ id }) => id === contactId);
};
/*
(async () => {
  try {
    const contactsbyId = await getContactById("AeHIrLTr6JkxGE6SN-0Rw");
    console.table(contactsbyId);
  } catch (error) {
    console.error("Błąd:", error);
  }
})();*/

const removeContact = async (contactId) => {
  const contacts = await contactsList();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};
/*
(async () => {
  try {
    const contactsbyId = await removeContact("AeHIrLTr6JkxGE6SN-0Rw");
      console.table(contactsbyId);
      
  } catch (error) {
    console.error("Błąd:", error);
  }
})();*/

const addContact = async (name, email, phone) => {
  const contacts = await contactsList();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

(async () => {
  try {
    const newContact = await addContact(
      "mango",
      "mango@gmail.com",
      "322-22-22"
    );
    console.table(newContact);
  } catch (error) {
    console.error("Błąd:", error);
  }
})();
