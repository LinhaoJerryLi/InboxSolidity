const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "MCode here",
  "https://rinkeby.infura.io/v3/***"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Account: ", accounts[0]);

  const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi There!"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to: ", inbox.options.address);
  provider.engine.stop();
};
deploy();
