import Web3 from "web3";
import CarbonStorageArtifact from "../../build/contracts/CarbonStorage.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CarbonStorageArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        CarbonStorageArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  createStorage: async function() {
    const { createStorage } = this.meta.methods;
    const capacity = document.getElementById("capacity").value;
    const facility = document.getElementById("facility").value;
    const id = document.getElementById("storageId").value;
    await createStorage(capacity, id, facility).send({from: this.account});
    App.setStatus(`Storage owner: ${this.account}\nFacility: ${facility}\nCapacity: ${capacity}\n Storage ID: ${id}`);
  },

  lookUp: async function (){
    const { lookUpTokenIdToStorageInfo } = this.meta.methods;
    const id = document.getElementById("lookId").value;
    const result = await lookUpTokenIdToStorageInfo(id).call();
    console.log(result);
    App.setStatus(`Owner: ${result[3]}\n Facility: ${result[0]}\n Capacity: ${result[1]}\n Timestamp: ${result[2]}\n Storage ID: ${id}`);
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"),);
  }

  App.start();
});
