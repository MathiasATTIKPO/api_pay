const payementServices = require('../services/payementServices');

exports.validateData = async (req, res) => {
};

exports.validatePayment = async (req, res) => {
    const { auth_token, phoneNumber, amount, identifier, network } = req.body;
    const io = req.io;
    //const {phoneNumber, amount} = req.body;


    if (!phoneNumber ||!amount||!auth_token ||!identifier ||!network) {
        return res.status(400).json({ error: 'Numéro de téléphone et montant sont requis.' });
   }

    try {
        const response = await payementServices.validate(auth_token, phoneNumber, amount, identifier, network);
        if (response.status === 'success') {
            io.emit('paymentStatus', { status: 'success', message: 'Paiement validé avec succès' });
            return res.json({ message: 'Demande de paiement envoyée. Veuillez confirmer sur votre téléphone.'});
        } else {
            io.emit('paymentStatus', { status: 'failed', message: 'Échec de la demande de paiement.' });
            return res.status(400).json({ error: 'Échec de la demande de paiement.' });
        }
    } catch (error) {
        console.error('Erreur lors de la validation du paiement:', error);
        io.emit('paymentStatus', { status: 'error', message: 'Erreur lors du traitement.' });
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};

