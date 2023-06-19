console.log("testing---");
const form = document.getElementById("UserLogin-form");
const message = document.querySelector('#message');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const cnic = document.getElementById("cnic").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  
  try {
    const response = await fetch("/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        cnic,
        email,
        password
      })
    });
  
    const data = await response.json();

    if (data.success === 0) {
      message.innerHTML = "Invalid login credentials. Please try again.";
    } else if (data.success === 1) {
      window.location.href = "/UserHome.html";
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});


