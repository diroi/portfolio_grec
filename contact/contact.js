document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Récupération des données du formulaire
        const formData = new FormData(form);

        // Envoi des données au serveur
        fetch('/send-email', { // Assuming your backend is served from the same domain
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de l\'envoi du formulaire.');
            }
            return response.json(); // Si vous attendez une réponse JSON du serveur
        })
        .then(data => {
            // Gestion de la réponse du serveur
            console.log(data); // Vous pouvez faire autre chose avec la réponse du serveur
            alert('Votre message a été envoyé avec succès ! Nous vous répondrons dès que possible.');
            form.reset(); // Réinitialisation du formulaire
        })
        .catch(error => {
            // Gestion des erreurs
            console.error('Erreur:', error);
            alert('Une erreur s\'est produite lors de l\'envoi du formulaire. Veuillez réessayer plus tard.');
        });
    });
});
