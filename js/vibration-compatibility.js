document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON file
    fetch('../json/vibration.json')
        .then(response => response.json())
        .then(data => {
            // Call a function to generate the table with the compatibility data
            generateCompatibilityTable(data);
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

function generateCompatibilityTable(data) {
    // Find the API you're looking for (in this case, the 'vibrate' method)
    const apiData = data.api.Vibration;
    
    // Access the compatibility data for the method
    const compatibility = apiData.__compat.support;

    // Define supported browsers you want to show (Chrome, Edge, Firefox, etc.)
    const browsers = ['chrome', 'edge', 'firefox', 'safari', 'opera'];

    // Get the table container
    const tableContainer = document.querySelector('.compatibility-table');

    // Create table elements
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Create the header row
    let headerRow = document.createElement('tr');
    let th = document.createElement('th');
    th.textContent = 'Browser';
    headerRow.appendChild(th);
    
    browsers.forEach(browser => {
        let th = document.createElement('th');
        th.textContent = capitalizeFirstLetter(browser);
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the data row for Desktop
    let desktopRow = document.createElement('tr');
    let desktopCell = document.createElement('td');
    desktopCell.textContent = 'Desktop';
    desktopRow.appendChild(desktopCell);

    browsers.forEach(browser => {
        let td = document.createElement('td');
        const browserData = compatibility[browser];
        if (browserData) {
            // Check for desktop support (ignoring mobile-only versions)
            let version = browserData.version_added || 'No';
            td.textContent = version;
        } else {
            td.textContent = 'No';
        }
        desktopRow.appendChild(td);
    });

    tbody.appendChild(desktopRow);

    // Create the data row for Mobile
    let mobileRow = document.createElement('tr');
    let mobileCell = document.createElement('td');
    mobileCell.textContent = 'Mobile';
    mobileRow.appendChild(mobileCell);

    browsers.forEach(browser => {
        let td = document.createElement('td');
        const browserData = compatibility[browser];
        if (browserData) {
            // Check for mobile support (if available)
            let version = browserData.version_added || 'No';
            td.textContent = version;
        } else {
            td.textContent = 'No';
        }
        mobileRow.appendChild(td);
    });

    tbody.appendChild(mobileRow);

    // Append the body to the table
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

// Helper function to capitalize the first letter of browser names
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}