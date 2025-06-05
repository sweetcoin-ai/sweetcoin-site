
document.addEventListener("DOMContentLoaded", async function () {
    const status = document.getElementById("status");
    const BSC_PARAMS = {
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com'],
    };

    const contractAddress = "0x423cb73772b3c45eab15bba33a5cb3188a512dd6";
    const contractABI = [{"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "to", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "Claim", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "to", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "Mint", "type": "event"}, {"inputs": [], "name": "aiController", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "account", "type": "address"}], "name": "hasClaimed", "outputs": [{"internalType": "bool", "name": "", "type": "bool"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "INITIAL_SUPPLY", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "mintClaimAmount", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address", "name": "to", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"}], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [], "name": "multiSigAddress", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "name", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "symbol", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "decimals", "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address", "name": "account", "type": "address"}], "name": "balanceOf", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function"}];

    function isMobile() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }

    function redirectToWallet() {
        if (isMobile()) {
            // Deep link to MetaMask app
            window.location.href = "https://metamask.app.link/dapp/" + window.location.href.replace(/^https?:\/\//, "");
        } else {
            alert("请安装 MetaMask 插件或用钱包 App 打开链接。");
        }
    }

    async function switchToBSC() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: BSC_PARAMS.chainId }]
            });
        } catch (switchError) {
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [BSC_PARAMS]
                });
            } else {
                throw switchError;
            }
        }
    }

    async function claimTokens(account) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        try {
            const alreadyClaimed = await contract.methods.hasClaimed(account).call();
            if (alreadyClaimed) {
                alert("您已经领取过代币。");
                return;
            }
            await contract.methods.claim().send({ from: account });
            alert("领取成功！请导入代币 SWTC，合约地址：" + contractAddress);
        } catch (error) {
            alert("领取失败：" + error.message);
        }
    }

    async function init() {
        if (typeof window.ethereum === 'undefined') {
            redirectToWallet();
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            await switchToBSC();
            await claimTokens(account);
        } catch (err) {
            console.error("自动领取出错：", err);
            redirectToWallet();
        }
    }

    await init();
});
