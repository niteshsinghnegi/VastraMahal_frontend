const token = JSON.parse(localStorage.getItem("token"));

async function getProfile() {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function logoutUser() {
  localStorage.removeItem("token");
  alert("Logout successfully!");
}

// Global functions
window.getProfile = getProfile;
window.logoutUser = logoutUser;