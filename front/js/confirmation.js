const params = (new URL(document.location)).searchParams; //permet d'accéder aux paramètres contenu dans l'URL
const orderId = params.get("orderId"); // récupération de l'orderId
document.getElementById("orderId").textContent = orderId; //affichage de l'orderId