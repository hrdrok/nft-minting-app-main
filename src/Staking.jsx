import './styles/reset.css';
import Web3 from 'web3';
import axios from 'axios';
import React, { Component } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import styled from "styled-components";

export const Button = styled.button`
  padding: 20px;
  border-radius: 15px;
  border: white;
  background-color: #86C232; 
  padding: 15px;
  font-weight: bold;
  color: #ffffff;
  width: 175px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(#474B4F);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(#474B4F);
  -moz-box-shadow: 0px 6px 0px -2px rgba(#474B4F);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }`;

const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseExtension",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "baseURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxMintAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "maxSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_mintAmount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_state",
				"type": "bool"
			}
		],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseExtension",
				"type": "string"
			}
		],
		"name": "setBaseExtension",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newBaseURI",
				"type": "string"
			}
		],
		"name": "setBaseURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newmaxMintAmount",
				"type": "uint256"
			}
		],
		"name": "setmaxMintAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "walletOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",  
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

const VAULTABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "NFTStaked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "NFTUnstaked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "claimForAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract Collection",
				"name": "_nft",
				"type": "address"
			},
			{
				"internalType": "contract N2DRewards",
				"name": "_token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenIds",
				"type": "uint256[]"
			}
		],
		"name": "earningInfo",
		"outputs": [
			{
				"internalType": "uint256[1]",
				"name": "info",
				"type": "uint256[1]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "tokensOfOwner",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "ownerTokens",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalStaked",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vault",
		"outputs": [
			{
				"internalType": "uint24",
				"name": "tokenId",
				"type": "uint24"
			},
			{
				"internalType": "uint48",
				"name": "timestamp",
				"type": "uint48"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var account = null;
var contract = null;
var vaultcontract = null;


const NFTCONTRACT = "0x5230b083AaAe9e43dEB9bA5ebCAFaa31A643c1EF";
const STAKINGCONTRACT = "0xaa954504A4BbEAaCB8E822D4c20Bc7A3F84e8B75"
const apikey = "RJ323IPVIYH6HC6MARNFPR2WQN3M9PDKSE";
const endpoint = "https://api.bscscan.com"
const openseaapi = "https://testnets-api.opensea.io/api/v1/assets";
const nftpng = "https://ipfs.io/ipfs/QmZ51LRcHt3t29BCkTBzJpb1KMCHCNH5uEGeFFFqgJzHPu/";

const providerOptions = {
	binancechainwallet: {
		package: true
	  },
	  walletconnect: {
		package: WalletConnectProvider,
		options: {
		  infuraId: "3cf2d8833a2143b795b7796087fff369"
		}
	},
	walletlink: {
		package: WalletLink, 
		options: {
		  appName: "Net2Dev NFT Minter", 
		  infuraId: "3cf2d8833a2143b795b7796087fff369",
		  rpc: "", 
		  chainId: 4, 
		  appLogoUrl: null, 
		  darkMode: true 
		}
	  },
};

const web3Modal = new Web3Modal({
	network: "rinkeby",
	theme: "dark",
	cacheProvider: true,
	providerOptions 
  });


class App extends Component {
	constructor() {
		super();
		this.state = {
			balance: [],
			nftdata: [],
		};
	}

	async componentDidMount() {
		
		await axios.get((endpoint + `?module=stats&action=tokensupply&contractaddress=${NFTCONTRACT}&apikey=${apikey}`))
		.then(outputa => {
            this.setState({
                balance:outputa.data
            })
            console.log(outputa.data)
        })

		await axios.get((openseaapi + `?asset_contract_addresses=${NFTCONTRACT}&format=json&order_direction=asc&offset=0&limit=20`))
		.then(outputb => {
			const { assets } = outputb.data
            this.setState({
                nftdata:assets
            })
            console.log(outputb.data)
        })
	}
  
  render() {
	const {balance} = this.state;
	const {nftdata} = this.state;

	async function connectwallet() { 
		var provider = await web3Modal.connect();
		var web3 = new Web3(provider); 
		await provider.send('eth_requestAccounts'); 
		var accounts = await web3.eth.getAccounts(); 
		account = accounts[0]; 
		document.getElementById('wallet-address').textContent = account; 
		contract = new web3.eth.Contract(ABI, NFTCONTRACT);
		vaultcontract = new web3.eth.Contract(VAULTABI, STAKINGCONTRACT);
  }
  async function mint() {
		  var _mintAmount = Number(document.querySelector("[name=amount]").value); 
		  var mintRate = Number(await contract.methods.cost().call()); 
		  var totalAmount = mintRate * _mintAmount; 
		contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) }); 
	  } 
  
  async function stakeit() {
	  var tokenids = Number(document.querySelector("[name=stkid]").value);
	  vaultcontract.methods.stake([tokenids]).send({from: account});
  }
  
  async function unstakeit() {
	  var tokenids = Number(document.querySelector("[name=stkid]").value);
	  vaultcontract.methods.unstake([tokenids]).send({from: account});
  }
  
  async function claimit() {
	  var tokenids = Number(document.querySelector("[name=stkid]").value);
	  vaultcontract.methods.claim([tokenids]).send({from: account});
  }
  
  async function verify() {
	  var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
	  document.getElementById('stakedbalance').textContent = getbalance; 
  }
  
  async function enable() {
	  contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({from: account});
	}

  async function rewardinfo() {
	 var tokenid = Number(document.querySelector("[name=stkid]").value);
	 var rawearn = await vaultcontract.methods.earningInfo(account, ([tokenid])).call();
	 var earned =  String(rawearn).split(",")[0];
	 var earnedrwd = Web3.utils.fromWei(earned);
	 var rewards = Number(earnedrwd).toFixed(2);
	 document.getElementById('earned').textContent = rewards;
   }
  return (
 <div className='container'>
<div className='row'>
  <form class="gradient col-lg-5 mt-5" style={{backgroundColor: "#343a40",borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"25px"}}>
    <h4 style={{color:"#FFFFFF"}}>Portal</h4>
    <h5 style={{color:"#6B6E70"}}>Please connect your wallet</h5>
    
    <div class="card" id='wallet-address' style={{backgroundColor: "#343a40", marginTop:"3px",boxShadow:"1px 1px 4px #000000"}}>
      <label for="floatingInput" style={{color:"#6B6E70"}}>Wallet Address</label>
      </div>
      <div className="App" style={{background: 22262}}>
		<Button onClick={connectwallet} style={{marginBottom:"5px",marginTop:"25px",color:"#6B6E70", marginRight:'25px',marginLeft:'35px'}}>Connect Wallet</Button>
		<Button onClick={enable} style={{marginBottom:"5px",marginTop:"5px",color:"#6B6E70", marginRight:'25px'}}>Enable Staking</Button>
		</div>
  </form>
  <form class="gradient col-lg-3 mt-5 mr-3" style={{backgroundColor: "#343a40", borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
    <h4 style={{color:"#FFFFFF"}}>Staking Vault</h4>
	<h5 style={{color:"#6B6E70"}}>Verify Amount Staked</h5>
	<Button onClick={verify} style={{color:"#6B6E70"}}>Verify</Button>
	<div id='stakedbalance' style={{marginTop:"5px",color:"#61892F",fontWeight:"bold",textShadow:"1px 1px 2px #000000", fontSize:"35px" }}>
      <label for="floatingInput">NFT Balance</label>
      </div>
  </form>
  <form class="gradient col-lg-3 mt-5 mr-3" style={{backgroundColor: "#343a40", borderRadius:"25px",boxShadow:"1px 1px 15px #000000", marginRight:"5px"}}>
  <h5 style={{color:"#FFFFFF"}}> Staking Rewards</h5>
	<Button onClick={rewardinfo}>Earned CK Rewards</Button>
	<div id='earned' style={{color: "#6B6E70",marginTop:"5px", fontSize:'35px',fontWeight:'bold',textShadow:"1px 1px 2px #000000"}}><p style={{color:'#61892F', fontSize:"35px"}}>Earned Tokens</p></div>
	<input name="stkid" style={{color: "#39FF14",fontSize:'25px',fontWeight:'bold',textShadow:"1px 1px 2px #000000",width:'50px',backgroundColor:'#00000000'}}/>
	<label className="col-4" style={{color:'#6B6E70'}}>NFT ID</label>
	<div className='col-12 mt-2'>
      <div style={{color:'#6B6E70'}}>Claim Rewards</div>
      <Button className="mb-2" onClick={claimit}>Claim</Button>
    </div>
  </form>
  <div className="row items mt-3">
  <div className="ml-3 mr-3" style={{display: "inline-grid",gridTemplateColumns: "repeat(4, 5fr)",columnGap: "10px"}}>
  {nftdata.map((assets, i )=> {
	    	async function stakeit() {
			vaultcontract.methods.stake([assets.token_id]).send({from: account});
		  	}
		  	async function unstakeit() {
			vaultcontract.methods.unstake([assets.token_id]).send({from: account});
		  	}
	  return (
			<div className="card mt-3" key={i} >
            	<div className="image-over">
					<img className="card-img-top"  src={nftpng + assets.token_id +'.png'} alt="" />
					</div>
					<div className="card-caption col-12 p-0">
                    	<div className="card-body">
							<h5 className="mb-0">Crackin Krakens #{assets.token_id}</h5>
							<h5 className="mb-0 mt-2">Location Status<p style={{color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000"}}>{assets.owner.address}</p></h5>
                    	<div className="card-bottom d-flex justify-content-between">
						<input key={i} type="hidden" id='stakeid' value={assets.token_id} />
							<Button className="mb-2 mt-3 col-5" style={{marginLeft:'2px'}} onClick={stakeit}>Stake it</Button>
							<Button className="mb-2 mt-3 col-5" style={{marginLeft:'2px'}} onClick={unstakeit}>Unstake it</Button>
							</div>
					</div>
                </div>
            </div>
        );
    })}
	</div>
</div>
  </div>
	</div>
  			);
	};
}

export default App;
