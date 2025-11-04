// background.js redirected to ${chrome.runtime.getURL('block.html')}?targetUrl=${targetUrl}&reason=${reason}

document.addEventListener('DOMContentLoaded' , () => {
    const params = new URLSearchParams(window.location.search);

    const reason = params.get('reason') || 'No reason provided (configure in options page)';

    const reasonElement = document.getElementById('block-reason');
    reasonElement.textContent = `Reason: ${reason}`;
});