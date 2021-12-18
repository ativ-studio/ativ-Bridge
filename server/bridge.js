const fs = require('fs');
const { ethers } = require('ethers');
const crypto = require('crypto-js');

const configs = JSON.parse(fs.readFileSync('server/config.json'));

let provider = ethers.getDefaultProvider('ropsten');

const ownerAddress = configs.ownerAddress;
const ownerPrivateKey = configs.ownerPrivateKey;
const wallet = new ethers.Wallet(ownerPrivateKey, provider);

const ativVotes = new ethers.Contract(configs.ativVotes, JSON.parse(fs.readFileSync('abis/AtivVotes.json')), provider);
const ipnft = new ethers.Contract(configs.ipnft, JSON.parse(fs.readFileSync('abis/IPNFT.json')), provider);
const masterChef = new ethers.Contract(configs.masterChef, JSON.parse(fs.readFileSync('abis/MasterChef.json')), provider);

const ativVotesWithSigner = ativVotes.connect(wallet);
const ipnftWithSigner = ipnft.connect(wallet);
const masterChefWithSigner = masterChef.connect(wallet);

// provider.getBlockNumber().then((blockNumber) => {
//     console.log("Current block number: " + blockNumber);
// });

async function migrateAtivFromSolana(account, amount) {
    /*
        From Solana
        ...
    */

    tx = await ativVotesWithSigner.migrateFrom(account, amount);
    console.log(tx);
}

async function migrateAtivToSolana(account, amount) {
    tx = await ativVotesWithSigner.migrateTo(account, amount);
    console.log(tx);

    /*
        To Solana
        ...
    */
}

async function migrateNftFromSolana(to, tokenId, musicId, gain) {
    /*
        From Solana
        ...
    */

    tx = await ipnftWithSigner.migrateFrom(to, tokenId, musicId, gain);
    console.log(tx);
}

async function migrateNftToSolana(from, tokenId) {
    tx = await ipnftWithSigner.migrateTo(from, tokenId);
    console.log(tx);

    /*
        To Solana
        ...
    */
}

function hexToBigInt(inputString) {
    return BigInt("0x" + crypto.SHA256(inputString).toString());
}

/* Test */
// migrateAtivToSolana("0x9bF58625f37e6178F3da17825B0C3B043adDcBdE", 10000);
// migrateNftFromSolana(
//     "0x9bF58625f37e6178F3da17825B0C3B043adDcBdE",
//     12345,
//     950327,
//     2
// );
console.log(hexToBigInt("Hello, World!").toString());
