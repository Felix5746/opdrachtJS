let error;

//Bij het drukken op de registreer knop zal de functie validateForm uitgevoerd worden

document.getElementById("registreer").addEventListener("click", validateForm);

document.getElementById("errors").hidden = true;
document.getElementById("succes").hidden = true;
document.getElementById("betalingsInfo").hidden = true;

function checkEmptyField(veld, melding) {
  if (veld.value.trim() == "") {
    error.push(melding);
    return false;
  }
  return true;
}

function validateEmail(email) {
  //ChatGPT
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm() {
  event.preventDefault();
  let emailNotEmpty;
  error = [];
  document.getElementById("errorsP").textContent = "";

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

  checkEmptyField(voornaam, "Het veld voornaam is vereist");
  checkEmptyField(naam, "Het veld naam is vereist");
  checkEmptyField(gebruikersnaam, "Het veld gebruikersnaam is vereist");
  emailNotEmpty = checkEmptyField(email, "Het veld email is vereist");
  checkEmptyField(adres, "Het veld wachtwoord is vereist");
  checkEmptyField(wachtwoord, "Het veld herhaal wachtwoord is vereist");
  checkEmptyField(herhaalWachtwoord, "Het veld adres is vereist");
  checkEmptyField(land, "Gelieve een land te selecteren");
  checkEmptyField(provincie, "Gelieve een provincie te selecteren");

  if (emailNotEmpty == true) {
    if (!validateEmail(email)) {
      error.push("E-mail adres is niet correct");
    }
  }
  if (error.length == 0) {
    document.getElementById("succes").hidden = false;
    document.getElementById("betalingsInfo").hidden = false;
    document.getElementById("errors").hidden = true;
  } else {
    document.getElementById("errors").hidden = false;
    document.getElementById("succes").hidden = true;
    document.getElementById("betalingsInfo").hidden = true;

    error.forEach((x) => {
      document.getElementById("errorsP").textContent += x + `\n`;
    });
  }
}
