import { ethers } from "ethers";
import { Client, Session} from "@polycrypt/erdstall";
import {Address} from  "@polycrypt/erdstall/ledger";
import { EnclaveWSProvider, Enclave } from "@polycrypt/erdstall/enclave";

const ethRpcUrl = "ws://10.100.81.101:30313"; // local Ganache
const erdOperatorUrl = new URL("ws://127.0.0.1:8401/ws"); // local Erdstall Operator

const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl);
const erdClient = new Client(
  ethProvider,
  new URL("wss://operator.goerli.erdstall.dev:8401/ws"),
  );
const enclaveProvider = new EnclaveWSProvider(new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
const enclave = new Enclave(enclaveProvider);
enclave.connect();
await erdClient.initialize();
await erdClient.subscribe();

const wallet = ethers.Wallet.createRandom();
const address = Address.fromString(wallet.address);
console.log(address);
const session = new Session(address, wallet, enclave);
console.log("session created");
session.onboard();

export default session;

// Set up any event listeners needed by the application.
// client.on(event, handler);
// Then initialize the client and setup subscriptions.




