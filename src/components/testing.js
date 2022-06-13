import { ethers, utils } from "ethers";
import { Session } from "@polycrypt/erdstall/session";
import { Address } from  "@polycrypt/erdstall/address";
import { Assets } from "@polycrypt/erdstall/assets";
import { Amount } from "@polycrypt/erdstall/amount";



// const ethRpcUrl = "ws://10.100.81.101:30313";

// const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
// const wallet = ethers.Wallet.fromMnemonic("noise axis utility traffic garden afford pelican quote category flash immune ceiling")
//             .connect(ethProvider);
// console.log(wallet.privateKey);
// const address = Address.fromString(wallet.address);
// console.log("Address", address);
// const session = new Session(address, wallet, new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
// console.log("session created");
// await session.initialize();
// console.log("initialized");
// // await session.onboard();
// console.log("onboarded");
// const perunToken = "0xefe8ef63995fb083502c6b2bd01871e084c8ab82";
// session.getAccount(address).then(res => {
//     console.log(res);
//     console.log(res.values.values);
//     // const prn = res.values.values.get(perunToken).value;
//     console.log(utils.formatEther(prn));
// });
// console.log(session.tokenProvider);
console.log(ethers.Wallet.createRandom().mnemonic.phrase);