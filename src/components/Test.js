import { ethers } from "ethers";
import { Client, Session} from "@polycrypt/erdstall";
import {Address} from  "@polycrypt/erdstall/ledger";
import { EnclaveWSProvider, Enclave } from "@polycrypt/erdstall/enclave";
import { Asset, Assets } from "@polycrypt/erdstall/ledger/assets";


const ethRpcUrl = "ws://10.100.81.101:30313";

const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
const wallet = ethers.Wallet.fromMnemonic("noise axis utility traffic garden afford pelican quote category flash immune ceiling")
            .connect(ethProvider);
const address = Address.fromString(wallet.address);
console.log("Address", address);
const session = new Session(address, wallet, new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
console.log("session created");
await session.initialize();
console.log("initialized");
session.onboard().catch(err => {
    console.log(`error ${err}`);
})
console.log("onboarded");










