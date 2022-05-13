import { ethers } from "ethers";
import { Client } from "@polycrypt/erdstall";

const ethRpcUrl = "ws://127.0.0.1:8545/"; // local Ganache
const erdOperatorUrl = new URL("ws://127.0.0.1:8401/ws"); // local Erdstall Operator

const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl);
const erdClient = new Client(ethProvider, erdOperatorUrl);
// Set up any event listeners needed by the application.
// client.on(event, handler);
// Then initialize the client and setup subscriptions.
await erdClient.initialize();
await erdClient.subscribe();