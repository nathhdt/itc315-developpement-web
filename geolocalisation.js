// Paramétrage des options de l'API
var options = {
  enableHighAccuracy: true,
  timeout: 9000
};

// Fonction pour créer des coordonnées
function coordinate(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
}

// Fonction de succès géolocalisation
function geoSuccess(position) {
	// On récupère les coordonnées
	const latitude = position.coords.latitude.toFixed(2);
	const longitude = position.coords.longitude.toFixed(2);
	const precision = position.coords.accuracy;

	// Informations dans la console
	console.log("Latitude : " + latitude + "°, longitude : " + longitude + "°");

	// Calcul de la distance entre l'utilisateur et l'ESIREM
	const distance = calculDistance(position.coords, new coordinate(47.31217410927473, 5.073972299663364)).toFixed(2);

	// On remplit la div 'position'
	document.getElementById("position").innerHTML = "<p>Votre position est: <span class='boldResult'>{" + latitude + ", " + longitude + "}</span> (avec une précision ≈ " + precision + "m)</p>";

	// On remplit la div 'distance'
	document.getElementById("distance").innerHTML = "<p>Vous êtes à <span class='boldResult'>" + distance + "km</span> de l'ESIREM</p>";
}

// Fonction d'erreur géolocalisation
function geoError(error) {
	// Informations dans la console
	console.warn("Erreur: (" + error.code + ") " + error.message);

	// On remplit la div 'position'
	document.getElementById("position").innerHTML = "<p>Impossible de vous localiser.</p><p>Erreur: (" + error.code + ") " + error.message + "</p>";
}

// Fonction pour calculer la distance entre deux positions
function calculDistance(startCoords, destCoords) {
	var startLatRads = degresEnRadians(startCoords.latitude);
	var startLongRads = degresEnRadians(startCoords.longitude);
	var destLatRads = degresEnRadians(destCoords.latitude);
	var destLongRads = degresEnRadians(destCoords.longitude);
	var Radius = 6371; // Rayon de la Terre en KM
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;
    
    return distance;
}

// Fonction qui convertit les degrés en radians
function degresEnRadians(degres) {
	var radians = (degres * Math.PI) / 180;

	return radians;
}

// Au chargement de la page
window.addEventListener("load", () => {
	// On vérifie que l'API est disponible pour le navigateur, et donc utilisable
	if ("geolocation" in navigator) {
  		navigator.geolocation.getCurrentPosition(geoSuccess, geoError, options);
	} else {
  		window.alert("La géolocalisation n'est pas disponible pour votre navigateur.");
  		geoError();
	}
});