/**
 *  Besoin de comprendre comment fonctionne fetch ?
 *  C'est ici : https://fr.javascript.info/fetch
 */


let API_URL = "https://mmi.unilim.fr/~lajudie6/SAE3.DWeb-DI.03-Base/api/"; // URL de base de l'API (à définir)


/**
 *  getRequest
 * 
 *  Requête en GET l'URI uri. 
 *  Une requête en GET correspond à une demande de "lecture" de la ressource d'URI uri.
 * 
 *  Par exemple "http://.../articles" pour lire tous les articles
 *  Ou "http://.../articles/3" pour lire le artcile d'identifiant 3
 * 
 *  Le serveur renverra les données au format JSON.
 *  La fonction les retourne après conversion en objet Javascript (ou false si la requête a échoué)
 * 
 *  ATTENTION : La fonction est asynchrone, donc quand on l'appelle il ne faut pas oublier "await".
 *  Exemple : let data = await getRequest(http://.../api/articles);
 */
let getRequest = async function(uri){

    let options = {
        method: "GET"
    };

    try{
        var response = await fetch(API_URL+uri, options); // exécution (asynchrone) de la requête et attente de la réponse
    }
    catch(e){
        console.error("Echec de la requête : "+e); // affichage de l'erreur dans la console
        return false;
    }
    if (response.status != 200){
        console.error("Erreur de requête : " + response.status); // affichage de l'erreur dans la console
        return false; // si le serveur a renvoyé une erreur, on retourne false
    }  // si le serveur a renvoyé une erreur, on retourne false
    let $obj = await response.json(); // extraction du json retourné par le serveur (opération asynchrone aussi)
    return $obj; // et on retourne le tout (response.json() a déjà converti le json en objet Javscript)
}


/**
 *  postRequest
 * 
 *  Requête en POST l'URI uri. Par exemple "http://.../products"
 * 
 *  Une requête en POST correspond à une demande de création d'une ressource (dans l'exemple, création d'un artcile)
 *  Pour créer la ressource, on fournit les données utiles via le paramètre data.
 * 
 *  Le serveur retourne en JSON la nouvelle ressource créée en base avec son identifiant.
 *  La fonction retourne les données après conversion en objet Javascript (ou false si la requête a échoué)
 */
let postRequest = async function(uri, data){
    

    // Défition des options de la requêtes
    let options = {
        method: 'POST',
        body: data
    }

    try{
        var response = await fetch(API_URL+uri, options); // exécution (asynchrone) de la requête et attente de la réponse
    }
    catch(e){
        console.error("Echec de la requête : "+e); // affichage de l'erreur dans la console
        return false;
    }
    if (response.status != 200){
        console.error("Erreur de requête : " + response.status); // affichage de l'erreur dans la console
        return false; // si le serveur a renvoyé une erreur, on retourne false
    }
    let $obj = await response.json(); // extraction du json retourné par le serveur (opération asynchrone aussi)
    return $obj; // et on retourne le tout (response.json() a déjà converti le json en objet Javscript)
}


/**
 *  deleteRequest
 * 
 *  Requête en DELETE l'URI uri. Par exemple "http://.../products/3"
 * 
 *  Une requête en DELETE correspond à une demande de suppression d'une ressource.
 *  Par exemple : patchRequest("http://.../products/3") pour supprimer le artcile d'identifiant 3
 * 
 *  La fonction retourne true ou false selon le succès de l'opération
 */
let deleteRequest = async function(uri){
    // Défition des options de la requêtes
    let options = {
        method: 'DELETE'
    }

    try{
        var response = await fetch(API_URL+uri, options); // exécution (asynchrone) de la requête et attente de la réponse
    }
    catch(e){
        console.error("Echec de la requête : "+e); // affichage de l'erreur dans la console
        return false;
    }
    if (response.status != 200){
        console.error("Erreur de requête : " + response.status); // affichage de l'erreur dans la console
        return false; // si le serveur a renvoyé une erreur, on retourne false
    }
    let $obj = await response.json(); // extraction du json retourné par le serveur (opération asynchrone aussi)
    return $obj; // et on retourne le tout (response.json() a déjà converti le json en objet Javscript)

}


/** 
 *  patchRequest
 * 
 *  Requête en PATCH l'URI uri. Par exemple "http://.../products/3"
 * 
 *  Une requête en PATCH correspond à une demande de modification/mise à jour d'une ressource.
 *  Pour modifier la ressource, on fournit les données utiles via le paramètre data.
 *  Par exemple : patchRequest("http://.../products/3", {category:1} ) pour modifier la catégorie du artcile d'identifiant 3
 * 
 *  La fonction retourne true ou false selon le succès de l'opération
 */
let patchRequest = async function(uri, data){
   // Pas implémenté. TODO if needed.
}


export {getRequest, postRequest, deleteRequest }