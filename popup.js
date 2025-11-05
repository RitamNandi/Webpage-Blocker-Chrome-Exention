document.addEventListener('DOMContentLoaded', () => {
    const optionsButton = document.getElementById('options-page');

    optionsButton.addEventListener('click' , () => {
        chrome.runtime.openOptionsPage(); // Chrome API to open the options page
    });

});