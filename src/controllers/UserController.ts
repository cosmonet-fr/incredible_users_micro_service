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


export const login = async (req: Request, res: Response) => {
  const { language } = req.params;
  const { login, password } = req.body;
  const regex = /^[a-zA-Z0-9_.\-+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const searchField = regex.test(login) ? 'email' : 'login';

  try {
    // Rechercher l'utilisateur par login ou email
    const user = await User.findOne({
      where: {
        [Op.or]: [{ [searchField]: login }]
      }
    });

    if (user) {
      // Vérifier le mot de passe
      const currentPassword = await Password.findOne({
        where: {
          user_id: user.user_id,
          is_current: true
        }
      });

      if (currentPassword && await argon2.verify(currentPassword.password_hash, password)) {
        // Générer le token JWT
        const token = jwt.sign(user.toJSON(), secretKey, { algorithm: 'RS256', expiresIn: '720h' });
        res.json({
          response: texts.login_ok[language] || texts.login_ok.en,
          user,
          token
        });
      } else {
        res.status(401).json({ error: texts.login_not_found[language] || texts.login_not_found.en });
      }
    } else {
      res.status(401).json({ error: texts.login_not_found[language] || texts.login_not_found.en });
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: texts.db_internal_error[language] || texts.db_internal_error.en });
  }
};