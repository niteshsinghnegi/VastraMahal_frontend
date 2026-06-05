function renderAuthModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "authModal";

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" id="closeModal">&times;</span>

      <div class="tab-buttons">
        <button class="tab-btn active" data-tab="login">Login</button>
        <button class="tab-btn" data-tab="register">Register</button>
      </div>

      <form class="form-tab active" id="loginForm">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>

      <form class="form-tab" id="registerForm">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  initAuthModal();
}

function initAuthModal() {
  const modal = document.getElementById("authModal");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  document.getElementById("closeModal").onclick = () => {
    modal.classList.remove("show");
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  };

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".tab-btn")
        .forEach((b) => b.classList.remove("active"));

      document
        .querySelectorAll(".form-tab")
        .forEach((f) => f.classList.remove("active"));

      btn.classList.add("active");

      document
        .getElementById(btn.dataset.tab + "Form")
        .classList.add("active");
    });
  });

  // LOGIN
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    const success = await loginUser({
      email,
      password,
    });

    if (success) {
      modal.classList.remove("show");
      window.location.reload();
    }
  });

  // REGISTER
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    const success = await registerUser({
      name,
      email,
      password,
    });

    if (success) {
      modal.classList.remove("show");
      window.location.reload();
    }
  });
}

function openAuthModal() {
  document.getElementById("authModal").classList.add("show");
}

// ==========================
// REGISTER
// ==========================

const registerUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    console.log("REGISTER RESPONSE:", data);

    if (data.success) {
      if (data.token) {
        localStorage.setItem(
          "token",
          JSON.stringify(data.token)
        );
      }

      // User save
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      alert(data.message || "Register successful");
      return true;
    }

    alert(data.message || "Register failed");
    return false;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
    return false;
  }
};

// ==========================
// LOGIN
// ==========================

const loginUser = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    console.log("LOGIN RESPONSE:", data);

    if (data.success) {
      if (data.token) {
        localStorage.setItem(
          "token",
          JSON.stringify(data.token)
        );
      }

      // User save
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      alert(data.message || "Login successful");
      return true;
    }

    alert(data.message || "Login failed");
    return false;
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
    return false;
  }
};