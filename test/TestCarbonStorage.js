const CarbonStorage = artifacts.require("CarbonStorage");

var accounts;
var owner;

var capacity = 20000;
var facility = 'Amsterdam';

contract('CarbonStorage', (accs) => {
  accounts = accs;
  owner = accounts[0];
});

it('can create storage', async() => {
  let tokenId = 1;
  let instance = await CarbonStorage.deployed();
  await instance.createStorage(capacity, tokenId, facility, {from: accounts[0]});
  const result = await instance.tokenIdToStorageInfo.call(tokenId);
  assert.equal(result.facility, 'Amsterdam');
  assert.equal(result.capacity.words[0], 20000);
});

it('lets user1 list their storage for sale', async() => {
  let instance = await CarbonStorage.deployed();
  let user1 = accounts[1];
  let tokenId = 2;
  let storagePrice = web3.utils.toWei(".01", "ether");
  await instance.createStorage(capacity, tokenId, facility, {from: user1});
  await instance.listStorage(tokenId, storagePrice, {from: user1});
  assert.equal(await instance.storagesForSale.call(tokenId), storagePrice);
});

it('user1 receives funds after the sale', async() => {
  let instance = await CarbonStorage.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let tokenId = 3;
  let storagePrice = web3.utils.toWei(".01", "ether");
  let balance = web3.utils.toWei(".05", "ether");
  await instance.createStorage(capacity, tokenId, facility, {from: user1});
  await instance.listStorage(tokenId, storagePrice, {from: user1});
  await instance.approve(user2, tokenId, {from: user1});
  let user1BalBeforeTx = await web3.eth.getBalance(user1);
  await instance.buyStorage(tokenId, {from: user2, value: balance});
  let user1BalAfterTx = await web3.eth.getBalance(user1);
  let value1 = Number(user1BalAfterTx) - Number(user1BalBeforeTx);
  let value2 = Number(storagePrice);
  assert.equal(value1, value2);
});

it('user2 decreases its balance after a sale', async() => {
  let instance = await CarbonStorage.deployed();
  let user1 = accounts[1];
  let user2 = accounts[2];
  let tokenId = 4;
  let storagePrice = web3.utils.toWei(".01", "ether");
  let balance = web3.utils.toWei(".05", "ether");
  await instance.createStorage(capacity, tokenId, facility, {from: user1});
  await instance.listStorage(tokenId, storagePrice, {from: user1});
  let user1BalBeforeTx = await web3.eth.getBalance(user1);
  let user2BalBeforeTx = await web3.eth.getBalance(user2);
  await instance.approve(user2, tokenId, {from: user1});
  await instance.buyStorage(tokenId, {from: user2, value: balance, gasPrice: 0});
  const user2BalAfterTx = await web3.eth.getBalance(user2);
  let value = Number(user2BalBeforeTx) - Number(user2BalAfterTx);
  assert.equal(value, storagePrice);
});
