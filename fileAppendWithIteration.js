//Author: ChatGPT

const { Client, Transaction, Hbar, AccountId } = require("@hashgraph/sdk");

async function splitTransactionOversize(data) {
  // Hedera testnet account details
  const operatorAccountId = "<YOUR_OPERATOR_ACCOUNT_ID>";
  const operatorPrivateKey = "<YOUR_OPERATOR_PRIVATE_KEY>";

  // Create a Hedera client
  const client = Client.forTestnet();

  // Set the operator account ID and private key
  client.setOperator(operatorAccountId, operatorPrivateKey);

  // Determine the maximum transaction size limit (default: 4 KB)
  const maxTransactionSize = client.getMaxTransactionSize();

  // Split the data into smaller chunks
  const chunks = [];
  for (let i = 0; i < data.length; i += maxTransactionSize) {
    const chunk = data.slice(i, i + maxTransactionSize);
    chunks.push(chunk);
  }

  // Create and execute transactions for each chunk
  for (let i = 0; i < chunks.length; i++) {
    const chunkData = chunks[i];

    try {
      // Create a new transaction and set the chunk data
      const transaction = await new Transaction()
        .addTransfer(AccountId.fromString("<RECIPIENT_ACCOUNT_ID>"), Hbar.fromTinybars(1)) // Example transfer, modify as needed
        .setMaxTransactionFee(Hbar.fromTinybars(1)) // Example fee, modify as needed
        .setTransactionMemo("Split Transaction Oversize Example") // Example memo, modify as needed
        .setTransactionBytes(chunkData);

      // Sign and execute the transaction
      await transaction.signWithOperator(client);
      const transactionId = await transaction.execute(client);

      console.log(`Transaction ${i + 1} sent successfully. Transaction ID: ${transactionId}`);
    } catch (error) {
      console.log(`An error occurred while sending transaction ${i + 1}:`, error);
    }
  }
}

// Example usage
const data = "<YOUR_DATA>"; // Data to be split into smaller transactions
splitTransactionOversize(data);
