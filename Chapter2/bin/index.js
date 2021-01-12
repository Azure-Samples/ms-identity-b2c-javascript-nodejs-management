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
            let users = await graph.getUsers();
            console.log(users);
            break;
        case 'getUser':
            if (yargs.argv['id']) {
                let user = await graph.getUser(yargs.argv['id']);
                console.log(user);
            } else {
                console.log('Missing id parameter: --id <user_id>');
            }
            break;
        case 'updateUser':

            // sample query
            yargs.argv['prop'] = {
                businessPhones: [
                  '+1 425 555 0109'
                ],
                officeLocation: 'US'
              };

            if (yargs.argv['id']) {
                if (yargs.argv['prop']) {
                    let updatedUser = await graph.updateUser(yargs.argv['id'], yargs.argv['prop']);
                    console.log(updatedUser);
                } else {
                    console.log('Missing prop parameter: --prop <user_account_property>');
                }
            } else {
                console.log('Missing id parameter: --id <user_id>');
            }
            break;
        case 'createUser':

            // sample query
            yargs.argv['user'] = {
                accountEnabled: true,
                displayName: 'Adele Vance',
                mailNickname: 'AdeleV',
                userPrincipalName: 'AdeleV@msaljsb2c.onmicrosoft.com',
                'passwordProfile' : {
                  forceChangePasswordNextSignIn: true,
                  password: 'xWwvJ]6NMw+bWH-d'
                }
              };

            if (yargs.argv['user']) {
                let newUser = await graph.createUser(yargs.argv['user']);
                console.log(newUser);
            } else {
                console.log('Missing user parameter: --user <user_account>');
            }
            break;
        case 'createUsersFromFile':
            if (yargs.argv['path']) {
                await graph.createUsersFromFile(yargs.argv['path']);
                console.log('User(s) created.');
            } else {
                console.log('Missing user parameter: --user <user_account>');
            }
            break;
        case 'deleteUser':
            if (yargs.argv['id']) {
                await graph.deleteUser(yargs.argv['id']);
                console.log('User deleted.');
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