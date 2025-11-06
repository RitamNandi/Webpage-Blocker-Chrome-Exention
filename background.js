chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.url) {
        const newUrl = new URL(changeInfo.url);
        const newHostname = newUrl.hostname.replace('www.', '');

        // edge case: this URL might be in the bypass list for now
        chrome.storage.session.get('tempWhiteList', ({tempWhiteList}) => {

            const passList = tempWhiteList || {}; // default to empty array
            // we should probably keep the pass list as single use

            if (passList[newHostname]) {
                delete passList[newHostname];
                chrome.storage.session.set({tempWhiteList: passList}) // revert back to the old tempWhiteList, the one without the page visited right now
                return;
            }

            // done with any white listing stuff, so now just need to check against the blockList
            chrome.storage.local.get('blockedSites', ({blockedSites}) => {

                const blockList = blockedSites || []; // default to empty array
                
                const matchingSite = blockList.find(site => newHostname.includes(site.url))

                if (matchingSite) {
                    // we found it in the blockpage, need to hit a redirect now
                    // get the info out of it
                    const targetUrl = encodeURIComponent(changeInfo.url);
                    const reason = encodeURIComponent(matchingSite.reason);
                    const redirectUrl = `${chrome.runtime.getURL('block.html')}?targetUrl=${targetUrl}&reason=${reason}`; // pass in reason
                    chrome.tabs.update(tabId, {url: redirectUrl});
                }
            })
        })
    }
})
