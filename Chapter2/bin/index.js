#!/usr/bin/env node

const yargs = require("yargs");
const dotenv = require("dotenv");

const graph = require("./graph");

// read in settings
dotenv.config();

const options = yargs
    .usage("Usage: --op <operation_name> --id <user_id> --user <user_account> --prop <user_account_property>")
    .option("op", { alias: "operation", describe: "operation name", type: "string", demandOption: true })
    .option("id", { alias: "identity", describe: "user id", type: "string", demandOption: false })
    .option("user", { alias: "user", describe: "user account", type: "object", demandOption: false })
    .option("prop", { alias: "property", describe: "user account property", type: "object", demandOption: false })
    .argv;

const main = async() => {
    console.log(yargs.argv);
    console.log(`You have selected "${options.operation}"`);

    switch (yargs.argv['op']) {
        case "getUsers":
            let users = await graph.getUsers();
            console.log(users);
            break;
        case "getUser":
            let user = await graph.getUser(yargs.argv['id']);
            console.log(user);
            break;
        case "updateUser":
            const property = {
                businessPhones: [
                  "+1 425 555 0109"
                ],
                officeLocation: "US"
              };

            let updatedUser = await graph.updateUser(yargs.argv['id'], property);
            console.log(updatedUser);
            break;
        case "createUser":
            const user = {
                accountEnabled: true,
                displayName: "Adele Vance",
                mailNickname: "AdeleV",
                userPrincipalName: "AdeleV@msaljsb2c.onmicrosoft.com",
                "passwordProfile" : {
                  forceChangePasswordNextSignIn: true,
                  password: "xWwvJ]6NMw+bWH-d"
                }
              };

            let newUser = await graph.createUser(user);
            console.log(newUser);
            break;
        case "deleteUser":
            let deletedUser = await graph.deleteUser(yargs.argv['id']);
            console.log(deletedUser);
            break;
        default:
            console.log('select a Graph operation');
            break;
    }
};

main();