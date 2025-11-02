document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('table-body');

    function renderTable() {
        // need to do DOM manipulation here to build out the table
        chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
            tableBody.innerHTML = ''; // clear what we have in the table now
            blockedSites.forEach(site => {
                // make HTML string
                const row = `
                    <tr>
                    <td>${site.url}</td>
                    <td>${site.reason}</td>
                    <td>
                        <button class="delete-btn" data-url="${site.url}">🗑️</button>
                    </td>
                    </tr>
                `;
                
                tableBody.innerHTML += row; // add the new entry into the table body
            });
        });
    }

    renderTable();

    const addForm = document.getElementById('add-site-form');
    const urlInput = document.getElementById('site-url');
    const reasonInput = document.getElementById('site-reason');

    addForm.addEventListener('submit' , (event) => {

        event.preventDefault(); // stops the default behavior of reloading the page
        const newURL = urlInput.value;
        const newReason = reasonInput.value;

        // need to update the blockedSites storage
        chrome.storage.local.get('blockedSites', ({ blockedSites }) => {
            blockedSites.push({url: newURL, reason: newReason});
            chrome.storage.local.set({blockedSites: blockedSites}, () => {
                renderTable();
                // reset the values
                urlInput.value = '';
                newReason.value = '';
            })
        });

    });

});