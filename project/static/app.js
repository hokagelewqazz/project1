const RECIPES = [
  { id: 1, title: "Идеальная паста", desc: "С сливочным соусом и беконом", time: 25, img: "/static/images/1.jpg", ing: "Паста, Сливки, Бекон, Сыр", steps: "1. Отварить пасту. 2. Обжарить бекон. 3. Смешать со сливками и сыром." },
  { id: 2, title: "Свежий салат", desc: "Легкий ужин за 10 минут", time: 10, img: "/static/images/2.jpg", ing: "Помидоры, Огурцы, Руккола, Масло", steps: "1. Нарезать овощи. 2. Заправить маслом." },
  { id: 3, title: "Шоколадный фондан", desc: "Жидкий шоколад внутри", time: 20, img: "/static/images/3.jpg", ing: "Шоколад, Масло, Яйца, Мука", steps: "1. Растопить шоколад. 2. Смешать. 3. Выпекать 10 минут." },
  { id: 4, title: "Домашний рамэн", desc: "Азиатский суп", time: 45, img: "/static/images/4.jpg", ing: "Лапша, Бульон, Яйцо, Лук", steps: "1. Сварить бульон. 2. Отварить лапшу." },
  { id: 5, title: "Полезный завтрак", desc: "Овсянка с ягодами", time: 15, img: "/static/images/5.jpg", ing: "Овсянка, Молоко, Ягоды, Мед", steps: "1. Сварить овсянку. 2. Добавить ягоды." },
  { id: 6, title: "Сочный бургер", desc: "С говяжьей котлетой", time: 30, img: "/static/images/6.jpg", ing: "Булочка, Фарш, Сыр", steps: "1. Обжарить котлету. 2. Собрать бургер." }
];

function getUsers() { return JSON.parse(localStorage.getItem("users") || "[]"); }
function saveUsers(u) { localStorage.setItem("users", JSON.stringify(u)); }
function getCurrentUser() { let e = localStorage.getItem("user"); return e ? getUsers().find(u => u.email === e) : null; }

function register() {
  let e = document.getElementById("email").value;
  let p = document.getElementById("password").value;
  let errBox = document.getElementById("error-msg");

  if (errBox) {
    errBox.style.display = "none";
    errBox.style.color = "#c62828";
    errBox.style.background = "#ffebee";
  }

  if(!e || !p) {
    if (errBox) { errBox.innerText = "Заполните все поля!"; errBox.style.display = "block"; }
    return;
  }
  
  let users = getUsers();
  if(users.find(u => u.email === e)) {
    if (errBox) { errBox.innerText = "Пользователь с таким Email уже существует!"; errBox.style.display = "block"; }
    return;
  }
  
  users.push({email: e, pass: p, favs: []});
  saveUsers(users); 
  window.location.href = "/login/?registered=1"; 
}

function login() {
  let e = document.getElementById("email").value;
  let p = document.getElementById("password").value;
  let errBox = document.getElementById("error-msg");
  
  if (errBox) {
    errBox.style.display = "none";
    errBox.style.color = "#c62828";
    errBox.style.background = "#ffebee";
  }

  if(!e || !p) {
    if (errBox) { errBox.innerText = "Заполните все поля!"; errBox.style.display = "block"; }
    return;
  }

  let u = getUsers().find(u => u.email === e && u.pass === p);
  if(u) { 
    localStorage.setItem("user", e); 
    window.location.href = "/"; 
  } else {
    if (errBox) { errBox.innerText = "Неверный Email или пароль!"; errBox.style.display = "block"; }
  }
}

function logout() { 
  localStorage.removeItem("user"); 
  window.location.href = "/"; 
}

function toggleFav(id) {
  let user = getCurrentUser();
  if(!user) {
    window.location.href = "/login/"; 
    return;
  }
  
  let users = getUsers(), me = users.find(u => u.email === user.email);
  if(me.favs.includes(id)) { 
    me.favs = me.favs.filter(f => f !== id); 
  } else { 
    me.favs.push(id); 
  }
  saveUsers(users); 
  window.location.reload();
}

function renderHeader() {
  let user = getCurrentUser(), el = document.getElementById("auth-block");
  if(el) {
    if(user) {
      el.innerHTML = `<span style="font-weight:600; color:#ff6b35; margin-right:15px;">👤 ${user.email}</span> <a href="#" onclick="logout()" style="color:#999;">Выйти</a>`;
    } else {
      el.innerHTML = `<a href="/login/" class="btn">Войти</a>`;
    }
  }
}

function addRecipe() {
  let user = getCurrentUser(); 
  if(!user) {
    window.location.href = "/login/";
    return;
  }
  
  let t = document.getElementById("title").value;
  let d = document.getElementById("desc").value;
  let tm = document.getElementById("time").value;
  let i = document.getElementById("ing").value;
  let s = document.getElementById("steps").value;
  
  if(!t || !d || !tm || !i || !s) return alert("Все поля обязательны!");
  
  let custom = JSON.parse(localStorage.getItem("custom") || "[]");
  custom.push({ 
    id: Date.now(), 
    title: t, 
    desc: d, 
    time: tm, 
    ing: i, 
    steps: s, 
    img: "/static/images/1.jpg",
    author: user.email 
  });
  
  localStorage.setItem("custom", JSON.stringify(custom)); 
  alert("Рецепт успешно добавлен!"); 
  window.location.href = "/";
}

function getAllRecipes() { 
  return RECIPES.concat(JSON.parse(localStorage.getItem("custom") || "[]")); 
}

function deleteRecipe(id) {
  if(!confirm("Ты уверен, что хочешь удалить этот рецепт?")) return;
  
  let custom = JSON.parse(localStorage.getItem("custom") || "[]");

  custom = custom.filter(r => r.id !== id);
  
  localStorage.setItem("custom", JSON.stringify(custom));
  
  window.location.href = "/";
}