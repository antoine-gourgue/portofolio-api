'use strict'

import nodemailer from 'nodemailer';
import Env from '@ioc:Adonis/Core/Env';

class ContactController {
  async post({ request, response }) {
    const data = request.only([
      'hs-firstname-contacts-1',
      'hs-lastname-contacts-1',
      'hs-email-contacts-1',
      'hs-phone-number-1',
      'hs-about-contacts-1'
    ]);

    // Vérifiez si l'adresse e-mail est présente
    if (!data['hs-email-contacts-1'] || !data['hs-email-contacts-1'].trim()) {
      return response.status(400).send({ message: "L'adresse e-mail est requise." });
    }

    // Configurer le transporter de nodemailer avec les variables d'environnement
    let transporter = nodemailer.createTransport({
      service: Env.get('MAIL_SERVICE'),
      auth: {
        user: Env.get('MAIL_USERNAME'),
        pass: Env.get('MAIL_PASSWORD')
      }
    });

    // Options du courriel
    let mailOptions = {
      from: data['hs-email-contacts-1'],
      to: Env.get('MAIL_FROM'),
      subject: 'Nouvelle demande de contact',
      html: `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                padding: 20px;
                background-color: #f4f4f4;
            }

            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            h2 {
                color: #333333;
                margin-top: 0;
            }

            ul {
                list-style-type: none;
                padding: 0;
            }

            li {
                margin-bottom: 10px;
                font-size: 16px;
                color: #666666;
            }

            li strong {
                color: #333333;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <h2>Nouvelle demande de contact</h2>
            <ul>
                <li><strong>Prénom:</strong> ${data['hs-firstname-contacts-1']}</li>
                <li><strong>Nom:</strong> ${data['hs-lastname-contacts-1']}</li>
                <li><strong>Email:</strong> ${data['hs-email-contacts-1']}</li>
                <li><strong>Téléphone:</strong> ${data['hs-phone-number-1']}</li>
                <li><strong>Détails:</strong> ${data['hs-about-contacts-1']}</li>
            </ul>
        </div>
    </body>
    </html>
  `
    };

    console.log("Données reçues:", data);
    console.log("Options de courrier:", mailOptions);

    try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return response.status(201).send({ message: 'Votre demande a été envoyée avec succès.' });
    } catch (error) {
      console.error("Erreur lors de l'envoi du courriel:", error);
      return response.status(500).send({ message: "Erreur lors de l'envoi du courriel." });
    }
  }
}

export default ContactController;
