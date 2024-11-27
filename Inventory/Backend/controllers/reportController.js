const db = require('../config/db');
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const path = require('path');

// Function to generate day-wise report
exports.generateDayWiseReport = (req, res) => {
    const date = req.params.date; // Expecting format: YYYY-MM-DD

    const sqlSelect = `
        SELECT roll_no, academic_year, institute, mobile_number, sport, equipment, quantity, equip_condi, date_issued, issued_time, returned 
        FROM issues 
        WHERE DATE(date_issued) = ?`;
    
    db.query(sqlSelect, [date], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }

        if (results.length === 0) {
            return res.status(404).send('No data found for this date');
        }

        // Generate PDF as before, using results
        generatePDF(res, results, `Day-wise Report for ${date}`);
    });
};

// Function to generate month-wise report
exports.generateMonthWiseReport = (req, res) => {
    const month = req.params.month; // Expecting format: MM
    const year = req.params.year; // Expecting format: YYYY

    const sqlSelect = `
        SELECT roll_no, academic_year, institute, mobile_number, sport, equipment, quantity, equip_condi, date_issued, issued_time, returned 
        FROM issues 
        WHERE MONTH(date_issued) = ? AND YEAR(date_issued) = ?`;
    
    db.query(sqlSelect, [month, year], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }

        if (results.length === 0) {
            return res.status(404).send('No data found for this month');
        }

        // Generate PDF as before, using results
        generatePDF(res, results, `Month-wise Report for ${month}/${year}`);
    });
};

// Function to generate report for a date range
exports.generateDateRangeReport = (req, res) => {
    const { startDate, endDate } = req.params; // Expecting format: YYYY-MM-DD

    const sqlSelect = `
        SELECT roll_no, academic_year, institute, mobile_number, sport, equipment, quantity, equip_condi, date_issued, issued_time, returned 
        FROM issues 
        WHERE DATE(date_issued) BETWEEN ? AND ?`;
    
    db.query(sqlSelect, [startDate, endDate], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }

        if (results.length === 0) {
            return res.status(404).send('No data found for this date range');
        }

        // Generate PDF as before, using results
        generatePDF(res, results, `Report from ${startDate} to ${endDate}`);
    });
};

// Function to generate PDF
const generatePDF = async (res, results, title) => {
    const doc = new PDFDocument({ margin: 10, size: 'A4' });
    const fileName = `${title.replace(/\s+/g, '_')}.pdf`;
    const filePath = path.join(__dirname, '../reports/', fileName);

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Add logo image (update the path to your logo)
    const logoPath = path.join(__dirname, '../../Frontend/images/Manipal Logo.jpg'); 
    doc.image(logoPath, { width: 150, align: 'center' });
    doc.moveDown(4.0); // Add some space after the logo

    // Add title
    doc.fontSize(18).text(title, { align: 'center', underline: true });
    doc.moveDown(1);

    // Define the table structure
    const table = {
        title: '',
        headers: [
            { label: 'SL. NO.', property: 'slNo', width: 20 },
            { label: 'Student Roll No.', property: 'roll_no', width: 60 },
            { label: 'Institute (Academic year)', property: 'instituteWithYear', width: 120 },
            { label: 'Mobile Number', property: 'mobile_number', width: 70 },
            { label: 'Sport', property: 'sport', width: 60 },
            { label: 'Equipment Issued (Quantity)', property: 'equipmentIssued', width: 130 },
            // { label: 'Condition of Equipment', property: 'equip_condi', width: 60 },
            { label: 'Issued Date (Issued Time)', property: 'issuedDateTime', width: 60 },
            { label: 'Returned Date (Equipment condition)', property: 'returned', width: 60 },
        ],
        datas: results.map((issue, index) => ({
            slNo: index + 1,
            roll_no: issue.roll_no,
            instituteWithYear: `${issue.institute} (${issue.academic_year})`,
            mobile_number: issue.mobile_number,
            sport: issue.sport,
            equipmentIssued: `${issue.equipment} (Quantity-${issue.quantity})`,
            issuedDateTime: `${new Date(issue.date_issued).toLocaleDateString()} (${issue.issued_time})`, 
            returned: `${issue.returned} (${issue.equip_condi})` || 'Not Returned',
        })),
    };

    // Create the table in the PDF with borders
    await doc.table(table, {
        width: 800,
    });

    // Finalize the PDF and end the stream
    doc.end();

    writeStream.on('finish', () => {
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Error sending file:', err);
            }
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        });
    });

    writeStream.on('error', (err) => {
        console.error('Error writing file:', err);
        res.status(500).send('Error generating report');
    });
};
