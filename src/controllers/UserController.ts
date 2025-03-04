import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { User } from '../models/User';
import { Password } from '../models/Password';
import texts from '../texts/users.json';
import { Op } from 'sequelize';

// Lire la clé privée à partir du fichier
const secretKey = fs.readFileSync(path.resolve(__dirname, '../../secret.key'), 'utf8');

export const signup = async (req: Request, res: Response) => {
  const { language } = req.params;
  const { email, login, password, utc, country } = req.body;
  const userId = uuidv4();

  try {
    // Vérifier si le login ou l'email existe déjà
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ login }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: texts.login_or_email_exists[language] || texts.login_or_email_exists.en });
    }

    const hashPass = await argon2.hash(password);

    // Créer un nouvel utilisateur
    await User.create({
      user_id: userId,
      login,
      email,
      is_active: process.env.NEW_USER_IS_ACTIVATE_BY_DEFAULT || false,
      is_root: false,
      is_admin: false,
      is_moderator: false,
      is_blocked: false,
      is_being_deleted: false,
      avatar: null,
      language,
      utc,
      country_id: country
    });

    // Sauvegarder le mot de passe
    await Password.create({
      user_id: userId,
      password_hash: hashPass
    });

    // Génération du token JWT pour l'activation
    const token = jwt.sign({ userId }, secretKey, { algorithm: 'RS256', expiresIn: '20m' });
    const activationLink = `${process.env.BACK_HOST}/users/activate?token=${token}`;

    // Envoi de l'email d'activation avec la langue choisie
    // await sendMail(email, language, 'accountActivation', { activationLink });

    res.status(200).json({ response: texts.singup_ok[language] || texts.singup_ok.en });

  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ error: texts.singup_echec[language] || texts.singup_echec.en });
  }
};
