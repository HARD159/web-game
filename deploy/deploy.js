'use strict';


/* 
Как деплоить:
SERVER_IP=188.166.88.166  SERVER_USER=root node <путь к deploy.js> 

*/
const { SERVER_IP, SERVER_USER, SERVER_SSH_KEY } = process.env;
if (!SERVER_IP && !SERVER_USER) {
    console.error('ERROR: SERVER_IP, SERVER_USER variables are empty');
    process.exit(1);
}

const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs').promises;
let FILE_LOGGER = null;

const LOG_FILE_PATH = 'deploy_log.txt'
const SERVER_PROJECT_DIR  = '/root/prod/';
const PROJECT_REPO = 'https://github.com/HARD159/web-game.git';
const REMOTE_SERVICE_NAME  = `${path.basename(SERVER_PROJECT_DIR)}_web_1`;

const runCommand = async (cmd, cwd) => {
    await log(`running ${cmd}...`);
    return new Promise((resolve, reject) => {
        const options = cwd ? { cwd } : null;

        exec(cmd, options, (error, stdout, stderr) => {
            if (error) {
                if (stderr) {
                    log(`stderr ${stderr}`)
                }
                return reject(`exec error: ${error}`);
            } else if (stderr) {
                log(`STDERR ${stderr}`);
            }
            return resolve(stdout)
        })
    })
}

const remoteCall = async (cmd) => {
    const keyFile = SERVER_SSH_KEY ? `-i ${SERVER_SSH_KEY}` : '';
    const remoteSSHCommand = `ssh ${SERVER_USER}@${SERVER_IP} ${keyFile} "${cmd}"`;
    const res = await runCommand(remoteSSHCommand);
    if (res) {
        await log('REMOTE STDOUT\n', res);
    }
    return res;
};

const log = async (...args) => {
    const now = new Date();
    const options = {
        hour12: false,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const timeString = now.toLocaleString('en-us', options);
    const data = args.join(' ');
    
    if (FILE_LOGGER){
        console.log(data)
        await FILE_LOGGER.write(`\n${timeString} ${String(data)}`) 
    } else {
        console.log('WARN: LOGGER IS NOT INIT', data)
    }
}

const initLogger = async () => {
    FILE_LOGGER = await fs.open(LOG_FILE_PATH, 'a+');
}

const deployCode = async () => {
    await remoteCall(`rm -rf ${SERVER_PROJECT_DIR}`);
    await remoteCall(`git clone ${PROJECT_REPO} ${SERVER_PROJECT_DIR}`);
    await remoteCall(`docker-compose -f ${SERVER_PROJECT_DIR}/docker-compose.yml up --force-recreate --build -d`);
    await log(`${REMOTE_SERVICE_NAME} is started`);
}

const run = async () => {
    try {
        await initLogger()
        await deployCode();
        await log('DEPLOYED!')
        await log(`\nOpen browser at ${SERVER_IP}:3000\n`)
    } catch (error) {
        await log('FAILED!');
        await log(error);
    }

    if (FILE_LOGGER) {
        await FILE_LOGGER.close()
    }
}

run()
