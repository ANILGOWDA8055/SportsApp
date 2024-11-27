// Function to fetch and update the table in issued.html
async function fetchIssuedEquipment() {
    try {
        const response = await fetch('/api/issues'); // Fetch data from the API
        const issues = await response.json();
        const tableBody = document.querySelector('#issued tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        if (issues.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="9">No issued equipment found.</td>`;
            tableBody.appendChild(row);
            return;
        }

        issues.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.roll_no}</td>
                <td>${item.academic_year}</td>
                <td>${item.institute}</td>
                <td>${item.mobile_number}</td> <!-- New column for Mobile Number -->
                <td>${item.sport}</td>
                <td>${item.equipment}</td>
                <td>${new Date(item.date_issued).toLocaleDateString()}</td>
                <td>${item.issued_time}</td> <!-- Column for Issued Time -->
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching issued equipment:', error);
    }
}

// Fetch data when the page loads
window.onload = fetchIssuedEquipment;
