document.addEventListener('DOMContentLoaded', () => {
    const optionsButton = document.getElementById('options-page');

    optionsButton.addEventListener('click' , () => {
        chrome.runtime.optnOptionsPage(); // Chrome API to open the options page
    });

});