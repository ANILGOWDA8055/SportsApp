// Function to fetch the issue record based on Student Roll No.
document.getElementById('fetchIssue').addEventListener('click', async () => {
    const rollNo = document.getElementById('rollNo').value;
    try {
        const response = await fetch(`/api/issues/${rollNo}`);
        
        if (response.ok) {
            const issue = await response.json();
            const tableBody = document.querySelector('#issued tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${issue.roll_no}</td>
                <td>${issue.academic_year}</td>
                <td>${issue.institute}</td>
                <td>${issue.sport}</td>
                <td>${issue.equipment}</td>
                <td>${new Date(issue.date_issued).toLocaleDateString()}</td>
                <td>${issue.issued_time}</td>
                <td>${issue.mobile_number}</td>
            `;
            tableBody.appendChild(row);
        } else {
            const errorMessage = await response.text();
            alert(errorMessage); // Show error message to the user
        }
    } catch (error) {
        console.error('Error fetching issue:', error);
    }
});

// Function to handle the return of equipment
document.getElementById('issued-form-button').addEventListener('click', async () => {
    const rollNo = document.getElementById('rollNo').value;
    const condition = document.getElementById('condition').value;

    const returnData = {
        rollNo,
        condition,
        returnedDate: new Date().toISOString().split('T')[0] // Get today's date in YYYY-MM-DD format
    };

    try {
        const response = await fetch('/api/return', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(returnData)
        });

        if (response.ok) {
            alert('Equipment returned successfully!');
            document.getElementById('issued').querySelector('tbody').innerHTML = ''; // Clear the table
            document.getElementById('rollNo').value = ''; // Clear the input field
            document.getElementById('condition').value = 'Select Condition'; // Reset dropdown to default
        } else {
            throw new Error('Failed to return equipment');
        }
    } catch (error) {
        console.error('Error returning equipment:', error);
    }
});