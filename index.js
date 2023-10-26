import { User } from "./User.js";

let userList = [];

const buttonSave = document.querySelector("#button-save");
const buttonGenerate = document.querySelector("#button-generate");

const inputName = document.querySelector("#nombre");

const inputAge = document.querySelector("#edad");
const inputDni = document.querySelector("#dni");
const inputEmail = document.querySelector("#email");
const inputPosition = document.querySelector("#puesto");
const inputLocation = document.querySelector("#localizacion");
const tbody = document.querySelector("tbody");

buttonSave.addEventListener("click", validateForm);

buttonGenerate.addEventListener("click", exportFile);

function updateTable() {
  tbody.innerHTML = "";
  userList.forEach((user) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdGender = document.createElement("td");
    const tdAge = document.createElement("td");
    const tdDni = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdPosition = document.createElement("td");
    const tdLocation = document.createElement("td");
    tdName.textContent = user.nombre;
    tdGender.textContent = user.genero;
    tdAge.textContent = user.edad;
    tdDni.textContent = user.dni;
    tdEmail.textContent = user.email;
    tdPosition.textContent = user.puesto;
    tdLocation.textContent = user.localizacion;

    tr.appendChild(tdName);
    tr.appendChild(tdGender);
    tr.appendChild(tdAge);
    tr.appendChild(tdDni);
    tr.appendChild(tdEmail);
    tr.appendChild(tdPosition);
    tr.appendChild(tdLocation);

    tbody.appendChild(tr);
  });
}

function validateLength(input) {
  return input.value.length >= 3;
}

function validateDNI(dni) {
  let letters = "TRWAGMYFPDXBNJZSQVHLCKE".split("");
  let dniNum = dni.value.substring(0, 8);
  let dniLetter = dni.value.substring(8);

  if (dniLetter.toUpperCase() == letters[dniNum % 23]) {
    return true;
  } else {
    return false;
  }
}

function validateAge(input) {
  return !isNaN(input.value) && input.value > 0 && input.value <= 120;
}

function validateEmail(input) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value);
}

function validateInputs(input, func) {
  if (func(input)) {
    input.classList.add("valid");
    input.classList.remove("invalid");
  } else {
    input.classList.remove("valid");
    input.classList.add("invalid");
  }
}

inputName.addEventListener("keyup", (event) => {
  validateInputs(event.target, validateLength);
});

inputAge.addEventListener("keyup", (event) => {
  validateInputs(event.target, validateAge);
});

inputDni.addEventListener("keyup", (event) => {
  validateInputs(event.target, validateDNI);
});

inputEmail.addEventListener("keyup", (event) => {
  validateInputs(event.target, validateEmail);
});

inputPosition.addEventListener("keyup", (event) => {
  validateInputs(event.target, validateLength);
});

inputLocation.addEventListener("keyup", (event) => {
  validateInputs(event.target, validateLength);
});

function generateUser() {
  const inputGender = document.querySelector('input[name="genero"]:checked');
  let user = new User(
    inputName.value,
    inputGender.value,
    inputAge.value,
    inputDni.value,
    inputEmail.value,
    inputPosition.value,
    inputLocation.value
  );

  userList.push(user);
  updateTable();
}

function validateForm() {
  if (
    (validateLength(inputName),
    validateAge(inputAge),
    validateDNI(inputDni),
    validateEmail(inputEmail),
    validateLength(inputPosition),
    validateLength(inputLocation))
  ) {
    generateUser();
  }
}

function exportFile() {
  if (userList.length != 0) {
    let data = "";
    userList.forEach((user) => {
      data +=
        data.length > 0 ? "," + JSON.stringify(user) : JSON.stringify(user);
    });

    let blob = new Blob([`{"users":[${data}]}`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "users.json";
    document.body.appendChild(link);
    link.click();
  }
}
