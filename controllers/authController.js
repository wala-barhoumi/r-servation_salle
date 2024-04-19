const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.getSignup=async (req,res)=>{
    res.render('signup');
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
        }

        // Créer un nouvel utilisateur
        user = new User({ username, email, password });

        // Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Enregistrer l'utilisateur dans la base de données
        await user.save();

        res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de l enregistrement de l utilisateur.' });
    }
};

// Fonction de connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe dans la base de données
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Générer un jeton JWT
        const token = jwt.sign({ userId: user._id }, ' cle secret1m78547pv', { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
};
exports.getLogin = async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error rendering login page.' });
    }
};

// Function to handle user logout
exports.logout = async (req, res) => {
    try {
        res.redirect('/login'); // Redirect the user to the login page after logout
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging out.' });
    }
};

