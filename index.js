import { Command } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(listContacts());
      break;

    case "get":
      if (!id) {
        console.warn("\x1B[31m User ID is required for getting contact!");
        return;
      }
      console.log(getContactById(id));
      break;

    case "add":
      if (!name || !email || !phone) {
        console.warn("\x1B[31m Please provide name, email and phone");
      }
      addContact(name, email, phone);
      break;

    case "remove":
      if (!id) {
        console.warn("\x1B[31m User ID is required for removing contact!");
        return;
      }
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
