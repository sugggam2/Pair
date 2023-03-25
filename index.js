const Web3 = require('web3');
const TelegramBot = require('node-telegram-bot-api');
const provider = new Web3.providers.WebsocketProvider('wss://bsc-mainnet.nodereal.io/ws/v1/8e7a3d218c70494692559bf50b4fa2f8');
const web3 = new Web3(provider);

const factoryABI = require('./PancakeSwapV2Factory.json');
const factoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'; // PancakeSwap V2 Factory contract address
const factoryContract = new web3.eth.Contract(factoryABI, factoryAddress);

const botToken = '6056867912:AAGy1Fo1onz7ePTB5Ro7b7ZiOMz9DDE4cPc';
const chatId = '-1001730782996';
const bot = new TelegramBot(botToken);

// Create a regular expression that matches the token you're interested in
// Regular expression that matches the desired input data of the transaction
// Regular expression that matches the first 10 characters of the input data


factoryContract.events.PairCreated()
  .on('data', async (event) => {
    // Get the transaction object for the event
    const tx = await web3.eth.getTransaction(event.transactionHash);
    // Check if the transaction's input data matches the desired input data
    if (tx.input.toLowerCase().startsWith('0x60a06040')) {
      const message = `Pair created: ${event.returnValues.pair}`;
      bot.sendMessage(chatId, message);
      console.log(`Sending message to Telegram chat: ${message}`);
      console.log("------------------------------------------");
    }
  })
  .on('error', error => {
    console.error('PairCreated Error:', error);
  });


