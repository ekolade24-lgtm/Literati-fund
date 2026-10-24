// =====================================
// STUDENTS DONATE
// Front-end demonstration
// =====================================

// Sample student data.
// These are fictional examples for the prototype.

let students = [
{
id: 1,
name: “Amara Okafor”,
institution: “University of Lagos”,
course: “Medicine and Surgery”,
amountNeeded: 350000,
amountRaised: 100000,
story: “I am a medical student who needs financial assistance to pay my tuition fees and continue my education.”
},

{
    id: 2,
    name: "Daniel Adeyemi",
    institution: "University of Ibadan",
    course: "Computer Science",
    amountNeeded: 200000,
    amountRaised: 50000,
    story: "I am passionate about technology and hope to become a software developer. Financial difficulties have made paying my school fees challenging."
},
{
    id: 3,
    name: "Fatima Ibrahim",
    institution: "Ahmadu Bello University",
    course: "Biochemistry",
    amountNeeded: 150000,
    amountRaised: 75000,
    story: "I want to complete my degree and contribute to scientific research. I need support with my outstanding tuition fees."
}

];

// Store demo pledges during this browser session.

let donations = [];

let selectedStudentId = null;

// =====================================
// FORMAT MONEY
// =====================================

function formatMoney(amount) {
return new Intl.NumberFormat(“en-NG”, {
style: “currency”,
currency: “NGN”,
maximumFractionDigits: 0
}).format(amount);
}

// =====================================
// CREATE STUDENT CARDS
// =====================================

function displayStudents(studentList) {

const studentGrid = document.getElementById("studentGrid");
const emptyMessage = document.getElementById("emptyMessage");
studentGrid.replaceChildren();
emptyMessage.hidden = studentList.length !== 0;
studentList.forEach(function(student) {
    const percentage = Math.min(
        100,
        Math.round(
            (student.amountRaised / student.amountNeeded) * 100
        )
    );
    const remaining = Math.max(
        0,
        student.amountNeeded - student.amountRaised
    );
    const card = document.createElement("article");
    card.className = "student-card";
    const top = document.createElement("div");
    top.className = "student-card-top";
    const avatar = document.createElement("div");
    avatar.className = "student-avatar";
    avatar.textContent = student.name
        .split(" ")
        .map(function(part) {
            return part[0];
        })
        .slice(0, 2)
        .join("")
        .toUpperCase();
    const name = document.createElement("h3");
    name.textContent = student.name;
    const course = document.createElement("p");
    course.className = "student-course";
    course.textContent = student.course;
    top.append(avatar, name, course);
    const body = document.createElement("div");
    body.className = "student-card-body";
    const institution = document.createElement("p");
    institution.className = "institution";
    institution.textContent = student.institution;
    const story = document.createElement("p");
    story.className = "student-story";
    story.textContent = student.story;
    const fundingInfo = document.createElement("div");
    fundingInfo.className = "funding-info";
    const fundingLabel = document.createElement("div");
    fundingLabel.className = "funding-label";
    const raised = document.createElement("span");
    raised.textContent =
        formatMoney(student.amountRaised) + " raised";
    const target = document.createElement("strong");
    target.textContent = percentage + "%";
    fundingLabel.append(raised, target);
    const progressTrack = document.createElement("div");
    progressTrack.className = "progress-track";
    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressFill.style.width = percentage + "%";
    progressTrack.appendChild(progressFill);
    const remainingText = document.createElement("p");
    remainingText.className = "institution";
    remainingText.textContent =
        formatMoney(remaining) + " remaining";
    fundingInfo.append(
        fundingLabel,
        progressTrack,
        remainingText
    );
    const donateButton = document.createElement("button");
    donateButton.type = "button";
    donateButton.className = "btn btn-primary";
    donateButton.textContent =
        remaining === 0 ? "Fully Funded" : "Support This Student";
    donateButton.disabled = remaining === 0;
    donateButton.addEventListener("click", function() {
        openDonationModal(student.id);
    });
    body.append(
        institution,
        story,
        fundingInfo,
        donateButton
    );
    card.append(top, body);
    studentGrid.appendChild(card);
});
updateStatistics();

}

// =====================================
// UPDATE DASHBOARD STATISTICS
// =====================================

function updateStatistics() {

document.getElementById("studentCount").textContent =
    students.length;
document.getElementById("donationCount").textContent =
    donations.length;
const totalPledged = donations.reduce(
    function(total, donation) {
        return total + donation.amount;
    },
    0
);
document.getElementById("amountRaised").textContent =
    formatMoney(totalPledged);

}

// =====================================
// SEARCH STUDENTS
// =====================================

function searchStudents() {

const searchInput = document.getElementById("searchInput");
const searchTerm = searchInput.value
    .trim()
    .toLowerCase();
const filteredStudents = students.filter(function(student) {
    return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.course.toLowerCase().includes(searchTerm) ||
        student.institution.toLowerCase().includes(searchTerm)
    );
});
displayStudents(filteredStudents);

}

document.getElementById(“searchButton”)
.addEventListener(“click”, searchStudents);

document.getElementById(“searchInput”)
.addEventListener(“input”, searchStudents);

// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById(“menuToggle”);
const navMenu = document.getElementById(“navMenu”);

menuToggle.addEventListener(“click”, function() {

const isOpen = navMenu.classList.toggle("active");
menuToggle.setAttribute("aria-expanded", String(isOpen));
menuToggle.textContent = isOpen ? "✕" : "☰";

});

navMenu.querySelectorAll(“a”).forEach(function(link) {

link.addEventListener("click", function() {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
});

});

// =====================================
// HELP REQUEST FORM
// =====================================

const helpForm = document.getElementById(“helpForm”);

helpForm.addEventListener(“submit”, function(event) {

event.preventDefault();
const name = document.getElementById("studentName")
    .value.trim();
const institution = document.getElementById("institution")
    .value.trim();
const course = document.getElementById("course")
    .value.trim();
const amount = Number(
    document.getElementById("feeAmount").value
);
const story = document.getElementById("studentStory")
    .value.trim();
if (
    !name ||
    !institution ||
    !course ||
    !story ||
    !Number.isSafeInteger(amount) ||
    amount <= 0
) {
    alert("Please enter valid information in every field.");
    return;
}
// Add the new request to the sample data.
const newStudent = {
    id: Date.now(),
    name: name,
    institution: institution,
    course: course,
    amountNeeded: amount,
    amountRaised: 0,
    story: story
};
students.push(newStudent);
// Refresh the student list.
document.getElementById("searchInput").value = "";
displayStudents(students);
helpForm.reset();
// Show the new request.
document.getElementById("students")
    .scrollIntoView({ behavior: "smooth" });
alert(
    "Your demo request has been added to the student list. " +
    "It is only stored in this browser session."
);

});

// =====================================
// OPEN DONATION MODAL
// =====================================

const donationModal = document.getElementById(“donationModal”);

function openDonationModal(studentId) {

const student = students.find(function(item) {
    return item.id === studentId;
});
if (!student) {
    return;
}
selectedStudentId = studentId;
document.getElementById("donationStudentName").textContent =
    student.name;
document.getElementById("donationAmount").value = "";
document.getElementById("donationAmount").max =
    Math.max(0, student.amountNeeded - student.amountRaised);
document.getElementById("donationMessage").textContent = "";
donationModal.hidden = false;
document.body.classList.add("modal-open");
document.getElementById("donorName").focus();

}

// =====================================
// CLOSE DONATION MODAL
// =====================================

function closeDonationModal() {

donationModal.hidden = true;
document.body.classList.remove("modal-open");
selectedStudentId = null;

}

document.getElementById(“closeModal”)
.addEventListener(“click”, closeDonationModal);

donationModal.addEventListener(“click”, function(event) {

if (event.target === donationModal) {
    closeDonationModal();
}

});

document.addEventListener(“keydown”, function(event) {

if (event.key === "Escape" && !donationModal.hidden) {
    closeDonationModal();
}

});

// =====================================
// RECORD DEMO DONATION
// =====================================

const donationForm = document.getElementById(“donationForm”);

donationForm.addEventListener(“submit”, function(event) {

event.preventDefault();
const student = students.find(function(item) {
    return item.id === selectedStudentId;
});
if (!student) {
    return;
}
const donationAmount = Number(
    document.getElementById("donationAmount").value
);
const donorName = document.getElementById("donorName")
    .value.trim();
const remaining =
    student.amountNeeded - student.amountRaised;
if (
    !Number.isSafeInteger(donationAmount) ||
    donationAmount <= 0 ||
    donationAmount > remaining
) {
    alert(
        "Please enter a valid positive whole-number amount " +
        "that does not exceed the student's remaining target."
    );
    return;
}
// This is a simulated pledge, not a real payment.
donations.push({
    studentId: student.id,
    donorName: donorName || "Anonymous",
    amount: donationAmount,
    date: new Date().toISOString()
});
// Update the sample student's progress.
student.amountRaised += donationAmount;
displayStudents(students);
document.getElementById("donationMessage").textContent =
    "Demo pledge recorded! Thank you for your generosity.";
donationForm.reset();
// Close the modal after showing the confirmation.
setTimeout(function() {
    closeDonationModal();
}, 1800);

});

// =====================================
// FOOTER YEAR
// =====================================

document.getElementById(“currentYear”).textContent =
new Date().getFullYear();

// =====================================
// INITIALISE WEBSITE
// =====================================

displayStudents(students);
