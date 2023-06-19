const formSignup = document.getElementById("UserSignUp-form");
const message = document.querySelector('#message');
formSignup.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const username = document.getElementById("username").value;
  const cnic = document.getElementById("cnic").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;
  
  try {
    const response = await fetch("/Users/signup", {
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
    console.log(data);
    if (data.success === 0) {
      message.innerHTML = "Invalid signup credentials. Please try again.";
    } else if (data.success === 1) {
      window.location.href = "/UserHome.html";
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
});