-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 08 fév. 2024 à 15:32
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `socienet`
--

-- --------------------------------------------------------

--
-- Structure de la table `coment`
--

CREATE TABLE `coment` (
  `id` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `idus` int(11) NOT NULL,
  `idpost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `coment`
--

INSERT INTO `coment` (`id`, `contenu`, `idus`, `idpost`) VALUES
(5, 'j(aime bien votre image', 27, 11),
(6, 'ania j\'aime bien le payasage', 26, 20),
(7, 'j\'adorere ma chérie ', 26, 20),
(8, 'holla', 26, 20);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `caption` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pht` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `usid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `caption`, `pht`, `usid`) VALUES
(11, 'c\'est la photo préférer ', 'acc.jpg', 26),
(21, 'dfghj', 'pht-1707400901046.jpg', 26),
(20, 'c\'est ma journée préféré ', 'IMG_20211228_152745_1.jpg', 27);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `nom` text NOT NULL,
  `email` text NOT NULL,
  `bio` text NOT NULL,
  `photo_profile` text NOT NULL,
  `password` varchar(60) NOT NULL,
  `telephone` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `adresse` varchar(60) NOT NULL,
  `id` int(11) NOT NULL,
  `prenom` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`nom`, `email`, `bio`, `photo_profile`, `password`, `telephone`, `username`, `adresse`, `id`, `prenom`) VALUES
('Massaid', 'safia@gmail.com', ' MySQL a retourné un résultat vide (c\'est à dire aucune ligne). (traitement en 0,0003 seconde(s).) ', 'photo_profile-1707402667486.jpg', '$2b$10$HHvdGflEbYgeVW0gYiS0f.M1YZ/qNoUnut2Xe1B5lEtnlv7q0jn0y', 676727041, 'SoFy', 'boghni tizi ouzou', 26, 'safia'),
('Halilou', 'ana@gmail.com', 'Exprimez-vous à travers des publications, des photos, des vidéos.', 'photo_profile-1707334799642.jpg', '$2b$10$IkDw0rSoIJSdHpn6IqLe4umcNRiCFcqEzP0fB9h.iljdCFrg/9V2a', 9876543, 'Any', 'mekla tizi ouzou', 27, '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `coment`
--
ALTER TABLE `coment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idus` (`idus`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `coment`
--
ALTER TABLE `coment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `coment`
--
ALTER TABLE `coment`
  ADD CONSTRAINT `idus` FOREIGN KEY (`idus`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
