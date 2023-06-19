
const message = document.querySelector('#message');
const officerForm = document.getElementById("OfficerLogin-form")

officerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const EmployeeID = document.getElementById("EmployeeID").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  
  try {
    const response = await fetch("/Officer/OfficerLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        EmployeeID,
        password
      })
    });
  
    const data = await response.json();

    if (data.success === 0) {
      message.innerHTML = "Invalid login credentials. Please try again.";
    } else if (data.success === 1) {
      window.location.href = "/OfficerHome.html";
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});


