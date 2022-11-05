import * as web3 from '@solana/web3.js';

const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
const program_id = new web3.PublicKey('H6N37xT1X3zWztCvkqKGeEVpS6ZbaTQmUZm82tezdUBg')

const key: Uint8Array = Uint8Array.from([
  34, 26, 232, 202, 195, 222, 242, 177, 164, 7, 171, 227, 217, 154, 58, 200,
	226, 79, 57, 68, 124, 189, 53, 32, 79, 164, 147, 75, 49, 168, 81, 93, 163,
	144, 76, 126, 148, 78, 7, 128, 166, 155, 64, 172, 104, 96, 235, 70, 82, 217,
	106, 55, 174, 147, 231, 62, 143, 24, 57, 2, 141, 79, 137, 96,
]);
async function main() {
	const data : Buffer = Buffer.from("\0")
  let signer = web3.Keypair.fromSecretKey(key);
  await connection.getBalance(
    signer.publicKey
  ).then((r : any) => console.log(r / web3.LAMPORTS_PER_SOL));
	const transaction = new web3.Transaction().add(
		new web3.TransactionInstruction({
			programId: program_id,
			keys: [],
			data
		})
	)
	await web3.sendAndConfirmTransaction(connection, transaction, [signer]).then(sig => console.log(sig))
}

main()
	.then(() => process.exit(0))
	.catch((e) => {
		console.error(e);
		process.exit(1);
});