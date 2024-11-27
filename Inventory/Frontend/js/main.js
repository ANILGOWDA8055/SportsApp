// FrontEnd scripts
// Login page validation and storing username
document.getElementById('loginForm').addEventListener('submit', validateLogin);

async function validateLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    const usernameInput = document.getElementById('usernameInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usernameInput, passwordInput }),
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.message); // Show success message
            // Store the username in local storage
            localStorage.setItem('username', usernameInput);
            // Redirect to home.html
            window.location.href = 'home.html';
        } else {
            console.error(result.message); // Show error message
            document.getElementById('error-message').innerText = result.message;
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (error) {
        console.error('Error logging in:', error);
        document.getElementById('error-message').innerText = "An error occurred. Please try again.";
        document.getElementById('error-message').style.display = 'block';
    }
}
  // login page validation

  // Change Password page
  document.getElementById('changePasswordForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Retrieve the username from local storage
    const username = localStorage.getItem('username');
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        document.getElementById('message').innerText = "New passwords do not match.";
        return;
    }

    try {
        const response = await fetch('/api/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, currentPassword, newPassword }),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').innerText = result.message; // Show success message
        } else {
            document.getElementById('message').innerText = result.message; // Show error message
        }
    } catch (error) {
        console.error('Error changing password:', error);
        document.getElementById('message').innerText = "An error occurred. Please try again.";
    }
});

// Search bar in available-equipments
function searchTable() {
  const input = document.getElementById("searchBar");
  const filter = input.value.toUpperCase();
  const table = document.getElementById("equipmentTable");
  const tr = table.getElementsByTagName("tr"); 

  for (let i = 1; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[1]; // Access the second column
      if (td) {
          let txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}
// Search bar in available-equipments

// Issued Equipments Form

// 1) Displaying particular institute table
function showTable() {
    // Hide all tables first
    var tables = document.querySelectorAll('.institute-table');
    tables.forEach(function(table) {
        table.style.display = 'none';
    });
  
    // Get the selected value  
    var selectedInstitute = document.getElementById('issue-form-institute').value;
  
    // Display the table corresponding to the selected institute
    if (selectedInstitute) {
        document.getElementById(selectedInstitute).style.display = 'block';
    }
  }
  // 1) Displaying particular institute table
  
function updateEquipmentList() {
    const sportSelect = document.getElementById("sportSelect");
    const selectedSport = sportSelect.value;
    const equipmentList = document.getElementById("equipmentList");
    const checkboxContainer = document.getElementById("checkboxContainer");
  
    // Clear any existing checkboxes
    checkboxContainer.innerHTML = "";
  
    // Define equipment items based on the selected sport
    const equipmentItems = {
        Cricket: ["SS TON PROFESSIONAL", "SG Test Batting Pad", "SG Test Batting Thermo plastic Gloves (Right Handed Batsmen)", "SG Test Batting Thermo plastic Gloves (Left  Handed", "SG Acetech Helmet","SG Test Wicket keeping Pad","SG Tet Wicket keeping gloves","SG Profile Abdomen Gaurd","SG Ultimete (Combo) Thigh Pad(Right Handed  Batsmen)","SG test Thigh Pad(Left Handed Batsmen)","SG Test Leather Ball","SG Club Leather Ball","SG. Synthetic Ball","SG Club Inner Gloves","SG Prosoft synthetic Cricket Ball (Red)","Omtex katchet","Omtex pug goal Net","Skyer Bat","Easton Cyclone Softball Bat","Mitts Ans Professional Baseball/Softball (Right Handed Batsmen)","Mitts Ans Professional Baseball/Softball (Right Handed Batsmen)","SS Cricket Score Book"],
        Football: ["Goal net (Goalpost)", "Corner flags", "Soccer ball", "Red card and yellow  card", "Refree's assistant flags","Refree's assistant ferseys","Whistle","Agility (speed) ladder","Soccer training carry bags","Training marker cones & tricones","Speed training hurdles (6 & 12)","Training hurdle carry bags","Spring loaded training poles (6)","Soccer training rings","Vests (bibs)","Stopwatch","Skipping ropes","Mini target goal posts","Soccer rebound board","Soccer manniequis"],
        Basketball: ["Basketball(Rubber) SIze-5,6,7","Basketball(Leather) SIze-5,6,7","Table Kit(Official Kit)","Cone","Bibs","Whistle","Stop Watch","BasketBall Net"],
        Volleyball: ["Volleyball Match ball Spartan", "Volleyball NET", "Volleyball Wire", "Volleyball Table Score Board","Assitant Refree Flag"],
        Archery:["Recurve Bow","Indian round bow","Butrus","Target Stand","Arm Guard","Chess Guard","Quibar","Finger Hab(Recorve)","Finger Tab(Indian Round)","Face 180cm","Face 120cm","Bow Box(Recurve)","Point","Nock Recurve","Floch","Arrow Recurve","Bow Bag","Face Pin","Arrow Gum","Bow Stand"],
        Badminton:["Grip","Net","racket","Shuttle Clock(Plastic)","Shuttle Clock(Feather)"],
        Boxing:["Boxing Gloves","Head Guard","Mouth Guard","Boxing tape","Groin Guard","Boxing Shoes","Punching bag","Kidney Belt","Groining Protector","Hand Pads","Heavy Bag","Reflex Bag","Upper Cut Bag","Body Target"],
        Fencing:["Epee Weapor","Mask","Glove","Sleeve","Bib","Jacket","Stocking","Fencing Shoe","Body Wire","Head Wire","Plasstrom","Lame","Body card","Scoring Machine","Fencing Bag"],
        Handball:["Handball NET (Goalpost)","Handball Ball - Women","Handballball - Men"],
        Hockey:["Stick (Flase, Vaijyanti, Tykka, Rakshak)","Hockey  - Ball","Goal Keeper Kit","Corner Flag Moveable","Goal Net","Goal Post","NET- CLIP","Face mask","Abdomen gaurd","Glves"],
        MarchPastDrum:["Mrach Past Drum"],  
        TableTennis:["Table tennis- TABLE","Table tennis- Ball","Table tennis - Racket","Table tennis - Net","Table poweder","Arena (SIDE) / anteena","NET- CLIP"],
        TrackandField:["Take off board","Hammer (4kg, 7.26 kg)","Measuring tape (Steel 30 m)","Cross Bars (HJ/PV)","Discuss (M/W- 2kg, 1kg, 1.50kg )","Clapper","Starting blocks","Measuring tape (100 m)","Leveller (horizontal jumps)","Hurdles (standard)","Uprights (High Jump)","Uprights   (Pole Vault)","Niwad (60m and 100m)","Check marks","Official Flags (red, white and yellow)","Spring Board (take off skill)","Shot put (M/W- 7.26kg/ 4 kg)","Javelin (Mens)","GI wire (track marking)","Hammer and Dicuss Safety Cage","Stopwatch"],
        TugandWar:["Tug & WarRope"]
    };
    // If a valid sport is selected, display its equipment
    if (selectedSport && equipmentItems[selectedSport]) {
        // Show the equipment list div
        equipmentList.style.display = "block";
  
        // Create checkboxes for the selected sport's equipment
        equipmentItems[selectedSport].forEach(item => {
            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "equipment";
            checkbox.value = item;
  
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(item));   
  
            const br = document.createElement("br");
            label.appendChild(br);
  
            checkboxContainer.appendChild(label);
        });
    } else {
        // Hide the equipment list if no sport or invalid sport is selected
        equipmentList.style.display = "none";
    }
  }
  
  function toggleCheckboxes() {
    const checkboxContainer = document.getElementById("checkboxContainer");
    checkboxContainer.style.display = checkboxContainer.style.display === "none" ? "block" : "none";
  }
  // Issued equipments form
