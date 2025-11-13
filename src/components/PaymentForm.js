// Dans votre composant de paiement (PaymentForm.js)
import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ amount, videoId }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [operator, setOperator] = useState('AIRTEL');
    const [status, setStatus] = useState(null);

    const handleSubmit = async () => {
        setStatus('PENDING');
        try {
            const response = await axios.post('https://votre-backend.com/api/initiate-payment', {
                amount,
                phoneNumber,
                operator,
                userId: 'USER_ID_ACTUEL', // ID de l'utilisateur connecté
            });

            // Si la requête au backend réussit, le pop-up USSD a été envoyé.
            setStatus('CONFIRMATION_SENT');
            alert('Veuillez confirmer la transaction sur votre téléphone !');

            // (Optionnel) Ici, vous pouvez implémenter un "polling" (vérification régulière)
            // vers un endpoint de votre backend pour savoir quand le webhook est reçu.

        } catch (error) {
            setStatus('FAILED');
            alert('Erreur lors de l\'initiation du paiement.');
        }
    };

    // ... (JSX pour le formulaire)
};