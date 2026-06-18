document.getElementById("feedback-btn").addEventListener("click", function() {
    const feedback = document.querySelector("textarea").value;
    if (feedback.trim() === "") {
        alert("Please enter feedback!");
    } else {
        alert("Thank you for your feedback: " + feedback);
        document.querySelector("textarea").value = "";
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
}
