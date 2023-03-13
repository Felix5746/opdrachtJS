let error = [];

//Bij het drukken op de registreer knop zal de functie validateForm uitgevoerd worden
document.getElementById("registreer").addEventListener("click", validateForm);

//Alerts verbergen
document.getElementById("errors").style.display = "none";
document.getElementById("succes").style.display = "none";
document.getElementById("betalingsInfo").style.display = "none";

//Deze functie valideert het formulier
function validateForm() {
  event.preventDefault();

  error = [];
  document.querySelector("#errorsP").innerHTML = "";

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
  let voorwaarden = document.getElementById("voorwaarden");
  let betaling = document.querySelectorAll('input[name="betalingswijze"]');

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
  
  //Nagaan of postcode correct is ingevuld
  checkPc(postcode);

  //Nagaan of betaling correct is en toewijzen aan alert
  validatePayment(betaling);

  //Nagaan of de voorwaarden geaccepteerd zijn
  if(!voorwaarden.checked){
    error.push('Je moet de algemene voorwaarden accepteren')
  }

  //De juiste alerst tonen na all validatie
  if (error.length == 0) {
    document.getElementById("succes").style.display = "block";
    document.getElementById("betalingsInfo").style.display = "block";
    document.getElementById("errors").style.display = "none";
  } else {
    document.getElementById("errors").style.display = "block";
    document.getElementById("succes").style.display = "none";
    document.getElementById("betalingsInfo").style.display = "none";

    //Errors in alert plaatsen
    let paragraph;
    error.forEach((x) => {
      paragraph = document.createElement("p");
      paragraph.textContent = x;
      paragraph.classList.add("my-1");
      document.querySelector("#errorsP").appendChild(paragraph);
    });
  }
}

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
    const emailRegex = /^[^\s@]+@[a-zA-Z0-9][a-zA-Z0-9.-]*\.[^\s@]+$/;

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

//Functie die nagaat of de gebruikersnaam correct ingevuld is
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

//Functie die nagaat of de betalngswijze correct is aangeduid en deze ook weergeeft
function validatePayment(veld) {
  let betalingswijze;
  let alert = document.querySelector("#betalingsInfoP");

  veld.forEach((x) => {
    if (x.checked) betalingswijze = x.value;
  });

  if (betalingswijze == "") {
    error.push("Duidt een betaalwijze aan");
  } else {
    alert.textContent = "";
    alert.textContent = "Je betalingswijze is " + betalingswijze;
  }
}

//Functie die nagaat of postcode correct is ingevuld
function checkPc(veld){
  if(checkEmptyField(veld, 'het veld postcode is vereist')){
    if (veld.value < 1000 || veld.value > 9999){
      error.push('De waarde van de postcode moet tussen 1000 en 9999 liggen')
    }
  }
}