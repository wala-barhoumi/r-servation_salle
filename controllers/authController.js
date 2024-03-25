const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de l'utilisateur." });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Vérifier si l'utilisateur existe dans la base de données
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Nom utilisateur ou mot de passe incorrect." });
        }

        // Vérifier si le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Nom utilisateur ou mot de passe incorrect." });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la connexion." });
    }
};

exports.logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Déconnexion réussie." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la déconnexion." });
    }

};
