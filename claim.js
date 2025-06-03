
document.addEventListener("DOMContentLoaded", function () {
    const connectButton = document.getElementById("connectButton");
    const status = document.getElementById("status");

    async function connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            window.location.href = "claim-redirect.html";
            return;
        }

        connectButton.disabled = true;
        status.textContent = "Waiting for wallet...";

        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            status.textContent = "Connected: " + accounts[0];
        } catch (error) {
            status.textContent = "Connection failed. Please try again.";
            connectButton.disabled = false;
        }
    }

    connectButton.addEventListener("click", connectWallet);
});
