const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint pour recevoir les données du formulaire
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Configuration du transporteur d'e-mails
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Utilisez votre service de messagerie
        auth: {
            user: 'qvs.code@gmail.com', // Adresse e-mail de l'expéditeur
            pass: 'nr49lO1X' // Mot de passe de l'expéditeur
        }
    });

    // Options de l'e-mail
    const mailOptions = {
        from: "qvs.code@gmail.com", // Utilise l'email de l'expéditeur
        to: email, // Utilise l'email de l'expéditeur également comme destinataire
        subject: 'Nouveau message de contact', // Sujet de l'e-mail
        text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}` // Contenu de l'e-mail
    };

    // Envoi de l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
            res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
        } else {
            console.log('E-mail envoyé:', info.response);
            res.status(200).send('E-mail envoyé avec succès !');
        }
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
