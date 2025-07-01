
document.addEventListener('DOMContentLoaded', async () => {
  const claimButton = document.getElementById('claimButton');
  const popup = document.getElementById('popup');
  const copyEthBtn = document.getElementById('copyEth');
  const copyBscBtn = document.getElementById('copyBsc');
  const ethAddress = '0x945e6ad527e19a09f6d29a7b1dd95d065a485203';
  const bscAddress = '0x945e6aD527E19a09f6d29a7b1DD95d065a485203';

  claimButton.addEventListener('click', async () => {
    // 模拟领取成功
    showPopup();
  });

  function showPopup() {
    document.getElementById('popup-message').innerText = 
      '✅ Successfully claimed. Please import the token manually.';

    popup.style.display = 'block';

    copyEthBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(ethAddress);
    });

    copyBscBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bscAddress);
    });
  }
});
