function toggleMenu(){
  document.getElementById("menu").classList.toggle("show");
}

// Detect if running in Railway production or local development
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_BASE_URL = isProduction 
  ? 'https://perpustakaan-deploy-production.up.railway.app/api'
  : 'http://localhost:3000/api';

console.log(`🌐 Environment: ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`);
console.log(`📡 API URL: ${API_BASE_URL}`);

async function register(){
  const user={
    nama:regNama.value,
    nim:regNim.value,
    username:regUsername.value,
    password:regPassword.value
  };

  if(!user.nama||!user.nim||!user.username||!user.password){
    alert("Lengkapi data");
    return;
  }

  try {
    const response = await fetch(API_BASE_URL + '/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    const data = await response.json();
    
    if (!response.ok) {
      alert(data.error || "Registrasi gagal");
      return;
    }

    alert("Pendaftaran berhasil!");
    location.href="perpustakaan-frontend/index.html";
  } catch (error) {
    console.error("Register error:", error);
    alert("Error: " + error.message);
  }
}

async function login(){
  const u=username.value;
  const p=password.value;

  try {
    const response = await fetch(API_BASE_URL + '/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: u, password: p })
    });

    const data = await response.json();
    
    if (!response.ok) {
      alert(data.error || "Login gagal");
      return;
    }

    const user = data.user;
    localStorage.setItem("login","true");
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("nama", user.nama);
    location.href="perpustakaan-frontend/dashboard.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Error: " + error.message);
  }
}

function checkLogin(){
  if(!localStorage.getItem("login")){
    location.href="index.html";
  }
}

function logout(){
  localStorage.removeItem("login");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("nama");
  location.href="index.html";
}

// ===== ADMIN AUTHENTICATION =====


function checkAdminLogin(){
  if (!localStorage.getItem('admin_login')) {
    location.href = 'login-admin.html';
  }
}

function adminLogout(){
  localStorage.removeItem('admin_login');
  localStorage.removeItem('admin_user');
  location.href = 'index.html';
}
