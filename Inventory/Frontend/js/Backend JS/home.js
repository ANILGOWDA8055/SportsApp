document.addEventListener('DOMContentLoaded', function() {
    const totalEquipmentElement = document.getElementById('totalEquipment');
    const availableEquipmentElement = document.getElementById('availableEquipment');
    const issuedEquipmentElement = document.getElementById('issuedEquipment');
    const returnedEquipmentElement = document.getElementById('returnedEquipment');
    const institutionEquipment = document.getElementById('institutionEquipment');
    const damagedEquipmentElement = document.getElementById('damagedEquipment');

    function updateEquipmentCounts() {
        fetch('http://localhost:3000/api/equipment-counts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch equipment counts');
                }
                return response.json();
            })
            .then(data => {
                totalEquipmentElement.innerText = data.total_equipment;
                availableEquipmentElement.innerText = data.available_equipment;
                issuedEquipmentElement.innerText = data.issued_equipment;
                returnedEquipmentElement.innerText = data.returned_equipment;
                institutionEquipment.innerText = data.institution_equipment;
                damagedEquipmentElement.innerText = data.damaged_equipment;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    updateEquipmentCounts();
});

    // Function to fetch equipment counts
    // async function fetchEquipmentCounts() {
    //     try {
    //         const response = await fetch('/api/equipment-counts');
    //         const counts = await response.json();
    //         document.getElementById('returnedEquipment').textContent = counts.returned_count;
    //         document.getElementById('damagedEquipment').textContent = counts.damaged_count;
    //     } catch (error) {
    //         console.error('Error fetching equipment counts:', error);
    //     }
    // }

    // // Fetch counts when the page loads
    // window.onload = fetchEquipmentCounts;