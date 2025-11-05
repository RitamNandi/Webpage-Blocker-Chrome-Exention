// background.js redirected to ${chrome.runtime.getURL('block.html')}?targetUrl=${targetUrl}&reason=${reason}
document.addEventListener('DOMContentLoaded' , () => {
    const params = new URLSearchParams(window.location.search);

    const reason = params.get('reason') || 'No reason provided (configure in options page)';
    const targetUrl = params.get('targetUrl');

    const reasonElement = document.getElementById('block-reason');
    reasonElement.textContent = `Reason: ${reason}`;

    // if someone clicks to continue anyways, need to add that site to the temporary whitelist
    const continueButton = document.getElementById('proceed-button');
    
    continueButton.addEventListener('click', () => {

        if (!targetUrl) {
            return; // nothing we can do because we don't know where to redirect
        }

        const urlObject = new URL(targetUrl);
        const hostName = urlObject.hostname.replace('www.' , '');

        chrome.storage.local.get('tempWhiteList', ({tempWhiteList}) => {
            const passList = tempWhiteList || {};
            passList[hostName] = true; // we check this in background.js
            
            chrome.storage.session.set({tempWhiteList: passList}, () => {
                window.location.href = targetUrl;
            });

        });

    }); 

});