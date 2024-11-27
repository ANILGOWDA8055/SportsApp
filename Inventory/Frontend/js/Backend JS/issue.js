// Function to convert 24-hour time to 12-hour format
function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12; // Convert 0 to 12 for midnight
    return `${adjustedHour}:${minutes} ${ampm}`;
}

// Retrieving data and storing it in the database 
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('issuedEquipmentForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = {
            rollNo: document.getElementById('studentId').value,
            academicYear: document.getElementById('academicYear').value,
            institute: document.getElementById('issue-form-institute').value,
            mobileNumber: document.getElementById('mobileNumber').value, // New field
            issuedTime: convertTo12HourFormat(document.getElementById('issuedTime').value), // Convert to 12-hour format
            dateIssued: document.getElementById('dateIssued').value,
            sport: document.getElementById('sportSelect').value,
            equipment: Array.from(document.querySelectorAll('input[name="equipment"]:checked')).map(checkbox => checkbox.value),
            quantity: document.getElementById('quantityReturned').value,
            equip_condi: document.getElementById('condition').value
        };

        // Get the value of the input fields
        const rollNo = document.getElementById('studentId').value;
        const mobileNumber = document.getElementById('mobileNumber').value;

        // Regular expression to match exactly 9 alphanumeric characters for roll number
        const rollNoRegex = /^[a-zA-Z0-9]{9}$/;

        // Regular expression to match exactly 10 digits for mobile number
        const mobileNumberRegex = /^\d{10}$/;

        // Validate Roll No
        if (!rollNoRegex.test(rollNo)) {
            alert('The Student Roll No. must contain exactly 9 digits or alphabetic characters.');
            return; // Prevent form submission
        }

        // Validate Mobile Number
        if (!mobileNumberRegex.test(mobileNumber)) {
            alert('The Mobile Number must contain exactly 10 digits.');
            return; // Prevent form submission
        }

        // If both validations pass, proceed to submit the form
        fetch('http://localhost:3000/api/issue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to submit data');
            }
        })
        .then(data => {
            console.log('Data submitted successfully', data);
            alert("Equipment issued successfully");
            document.getElementById('issuedEquipmentForm').reset(); // Reset the form
        })
        .catch(error => {
            console.error('Error:', error);
        });   
    });
});
