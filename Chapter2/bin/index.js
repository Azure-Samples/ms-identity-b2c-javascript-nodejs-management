#!/usr/bin/env node

// read in env settings
require('dotenv').config();

const yargs = require('yargs');
const graph = require('./graph');

const options = yargs
    .usage('Usage: --op <operation_name> --id <user_id> --user <user_account> --prop <user_account_property> --path <JSON_path>')
    .option('op', { alias: 'operation', describe: 'operation name', type: 'string', demandOption: true })
    .option('id', { alias: 'identity', describe: 'user id', type: 'string', demandOption: false })
    .option('user', { alias: 'user', describe: 'user account', type: 'object', demandOption: false })
    .option('prop', { alias: 'property', describe: 'user account property', type: 'object', demandOption: false })
    .options('path', { alias: 'path', describe: 'JSON path', type: 'string', demandOption: false })
    .argv;

const main = async() => {
    console.log(`You have selected: ${options.op}`);
    
    switch (yargs.argv['op']) {
        case 'getUsers':
            try {
                let users = await graph.getUsers();
                console.log(users);   
            } catch (error) {
                console.log(error);
            }
            break;
        case 'getUser':
            if (yargs.argv['id']) {
                try {
                    let user = await graph.getUser(yargs.argv['id']);
                    console.log(user);   
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('Missing id parameter: --id <user_id>');
            }
            break;
        case 'updateUser':

            // example query
            // const userToUpdate = {
            //     businessPhones: [
            //       '+1 425 555 0109'
            //     ],
            //     officeLocation: 'US'
            //   };

            if (yargs.argv['id']) {
                if (yargs.argv['prop']) {
                    try {
                        let updatedUser = await graph.updateUser(yargs.argv['id'], yargs.argv['prop']);
                        console.log(updatedUser);   
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log('Missing prop parameter: --prop <user_account_property>');
                }
            } else {
                console.log('Missing id parameter: --id <user_id>');
            }
            break;
        case 'createUser':

            // example query
            // const userToCreate = {
            //     accountEnabled: true,
            //     displayName: 'Adele Vance',
            //     userPrincipalName: 'AdeleV@msaljsb2c.onmicrosoft.com',
            //     mailNickname: 'AdeleV',
            //     'passwordProfile' : {
            //       forceChangePasswordNextSignIn: true,
            //       password: 'xWwvJ]6NMw+bWH-d'
            //     }
            //   };

            if (yargs.argv['user']) {
                try {
                    let newUser = await graph.createUser(yargs.argv['user']);
                    console.log(newUser);   
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('Missing user parameter: --user <user_account>');
            }
            break;
        case 'createUsersFromFile':
            if (yargs.argv['path']) {
                try {
                    await graph.createUsersFromFile(yargs.argv['path']);
                    console.log('User(s) created.');   
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('Missing user parameter: --user <user_account>');
            }
            break;
        case 'deleteUser':
            if (yargs.argv['id']) {
                try {
                    await graph.deleteUser(yargs.argv['id']);
                    console.log('User deleted.');   
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('Missing id parameter: --id <user_id>');
            }
            break;
        default:
            console.log('Select a Graph operation first');
            break;
    }
};

main();