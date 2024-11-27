// Fetching start and end date in report page
document.getElementById('dateRangeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    window.location.href = `/api/report/range/${startDate}/${endDate}`;
    document.getElementById('dateRangeForm').reset(); // Reset the form
});
// Fetching start and end date in report page