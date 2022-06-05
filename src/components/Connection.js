import { ethers } from "ethers";
import { Session} from "@polycrypt/erdstall";
import { Address } from  "@polycrypt/erdstall/ledger";


export default async function Connection(mnemonic) {
    
    const ethRpcUrl = "ws://10.100.81.101:30313";
    const ethProvider = new ethers.providers.JsonRpcProvider(ethRpcUrl)
    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
                .connect(ethProvider);
    const address = Address.fromString(wallet.address);
    console.log("Address", address);
    const session = new Session(address, wallet, new URL("wss://operator.goerli.erdstall.dev:8401/ws"));
    console.log("session created");
    await session.initialize();
    console.log("initialized");
    await session.onboard();
    console.log("onboarded");
    return session;

    
}
