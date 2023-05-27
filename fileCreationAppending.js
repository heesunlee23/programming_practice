const { Client, FileCreateTransaction, FileAppendTransaction, Hbar, PrivateKey } = require('@hashgraph/sdk');
require("dotenv").config();
const fs = require('fs');

// Initialize Hedera client
const client = Client.forTestnet();
client.setOperator(process.env.MY_ACCOUNT_ID, process.env.MY_PRIVATE_KEY);
console.log('\nsubscriber.js: Connected to Testnet!');
console.log('------------------------------------------------------');

async function verifyMultimediaIntegrity(multimediaFilePath) {
    // Read the image file as a buffer
    const fileData = fs.readFileSync(multimediaFilePath);

    ////////////// File Creation: Upload the file to Hedera File Service ///////////////////
    const transactionId = await new FileCreateTransaction()
    .setContents("[FileCreateTransaction]")
    .execute(client);

    const receipt2 = await transactionId.getReceipt(client);
    const fileId = receipt2.fileId;

    console.log("Uploaded successfully. File ID:", fileId);

    ////////////////// File Appending ///////////////////////////////////
    const transaction2 = new FileAppendTransaction()
        .setFileId(fileId)
        .setContents(fileData)
        .setMaxTransactionFee(new Hbar(2))
        .freezeWith(client);

    //Sign with the file private key
    const privateKey = PrivateKey.generateED25519();
    const signTx = await transaction2.sign(privateKey);

    //Sign with the client operator key and submit to a Hedera network
    const txResponse2 = await signTx.execute(client);

    //Request the receipt
    const receipt3 = await txResponse2.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt3.status;

    console.log("FileAppendTransaction: the transaction consensus status is " +transactionStatus);
}

// replace path with yours
const multimediaFilePath = "D:/second_paper/experiment/hash.txt";

// 이 이미지를 s3에 업로드한다.

verifyMultimediaIntegrity(multimediaFilePath);
