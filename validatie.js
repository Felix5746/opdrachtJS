let error = [];

//Bij het drukken op de registreer knop zal de functie validateForm uitgevoerd worden
document.getElementById("registreer").addEventListener("click", validateForm);

//Alerts verbergen
document.getElementById("errors").hidden = true;
document.getElementById("succes").hidden = true;
document.getElementById("betalingsInfo").hidden = true;



//Functie die nagaat of een veld ingevuld is
function checkEmptyField(veld, melding) {
  if (veld.value.trim() == "") {
    error.push(melding);
    return false;
  }
  return true;
}

//Functie die nagaat of het emailaders juist is ingevuld
function validateEmail(email) {
  if (checkEmptyField(email, "Het veld email is vereist")) {
    //ChatGPT
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value))
      error.push("E-mail adres is niet correct");
  }
}

//Functie die nagaat of het wachtwoord correct is ingevuld
function validatePassword(password, rPassword) {
  let passwordNotEmpty = checkEmptyField(
    password,
    "Het veld wachtwoord is vereist"
  );

  if (password.value.length < 8 && password.value.length != 0)
    error.push("Je wachtwoord is te kort");

  let rPasswordNotEmpty = checkEmptyField(
    rPassword,
    "Het veld herhaal wachtwoord is vereist"
  );
  if (rPasswordNotEmpty) {
    if (password.value != rPassword.value)
      error.push("Je wachtwoorden komen niet overeen");
  }
}

function validateUsername(username) {
  //ChatGPT
  const pattern1 = /^[a-zA-Z0-9_.-]*$/;
  const pattern2 = /^[a-zA-Z0-9_]/;

  if (checkEmptyField(username, "Het veld gebruikersnaam is vereist")) {
    if (!pattern1.test(username.value)) {
      error.push(
        "De gebruikersnaam mag enkel bestaan uit letters, cijfers, '.', '_', '-'"
      );
    }
    if (!pattern2.test(username.value)) {
      error.push("De gebruikersnaam mag niet beginnen met een '.' of een '-'");
    }
    if (username.value.length < 2) {
      error.push("De gebruikersnaam moet meer dan 1 karakter bevatten");
    }
  }
}

function validateForm() {
  event.preventDefault();

  error = [];
  document.querySelector('#errorsP').innerHTML = "";

  //Variabelen declareren en elementen inladen
  let voornaam = document.getElementById("voornaam");
  let naam = document.getElementById("naam");
  let gebruikersnaam = document.getElementById("gebruikersnaam");
  let email = document.getElementById("email");
  let wachtwoord = document.getElementById("wachtwoord");
  let herhaalWachtwoord = document.getElementById("herhaalWachtwoord");
  let adres = document.getElementById("adres");
  let land = document.getElementById("land");
  let provincie = document.getElementById("provincie");
  let postcode = document.getElementById("postcode");
  let nieuwsbrief = document.getElementById("nieuwsbrief");
  let voorwaarden = document.getElementById("voorwaarden");
  let betaling = document.getElementsByName("betalingswijze");

  //Nagaan of naam, voornaam ingevuld zijn
  checkEmptyField(voornaam, "Het veld voornaam is vereist");
  checkEmptyField(naam, "Het veld naam is vereist");

  //Nagaan of de gebruikersnaam correct is ingevuld
  validateUsername(gebruikersnaam);

  //Nagaan of het e-mailadres correct is opgesteld
  validateEmail(email);

  //Nagaan of het wachtwoord correct is ingevuld
  validatePassword(wachtwoord, herhaalWachtwoord);

  //Nagaan of overige verplichte gegevens ingevuld zijn
  checkEmptyField(adres, "Het veld adres is vereist");
  checkEmptyField(land, "Gelieve een land te selecteren");
  checkEmptyField(provincie, "Gelieve een provincie te selecteren");

  //De juiste alerst tonen na all validatie
  if (error.length == 0) {
    document.getElementById("succes").hidden = false;
    document.getElementById("betalingsInfo").hidden = false;
    document.getElementById("errors").hidden = true;
  } else {
    document.getElementById("errors").hidden = false;
    document.getElementById("succes").hidden = true;
    document.getElementById("betalingsInfo").hidden = true;
    
    //Errors in alert plaatsen
    let paragraph;
    error.forEach((x) => {
      paragraph = document.createElement('p');
      paragraph.textContent = x;
      paragraph.classList.add('my-1');
      document.querySelector("#errorsP").appendChild(paragraph);
    });
  }
}
