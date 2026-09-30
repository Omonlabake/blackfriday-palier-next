export type Palier = { seuil: number; remise: number };

export const PALIERS: Palier[] = [
  { seuil: 0, remise: 20 },
  { seuil: 800, remise: 30 },
  { seuil: 1600, remise: 45 },
  { seuil: 2400, remise: 60 },
];

export const OBJECTIF = 3200;
export const PRIX_BASE = 249;
export const PRODUIT_VEDETTE = "Casque Nova X2";

export const prixPalier = (base: number, remise: number) =>
  Math.round(base * (1 - remise / 100));

export function palierIndex(commandes: number) {
  let idx = 0;
  PALIERS.forEach((p, i) => {
    if (commandes >= p.seuil) idx = i;
  });
  return idx;
}

export const fmt = (n: number) =>
  String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export type Categorie = "Audio" | "Maison" | "Sport" | "Cuisine";

export const CATEGORIES: Categorie[] = ["Audio", "Maison", "Sport", "Cuisine"];

export const COULEURS: Record<Categorie, [string, string]> = {
  Audio: ["#2340ff", "#7d94ff"],
  Maison: ["#0b1020", "#3d4d85"],
  Sport: ["#ff5a1f", "#ffa56e"],
  Cuisine: ["#0e9f5c", "#7be0b0"],
};

export type Produit = {
  id: string;
  nom: string;
  categorie: Categorie;
  base: number;
  stock: number;
  note: number;
  avis: number;
};

export const SEUIL_LIVRAISON = 100;

export const PRODUITS: Produit[] = [
  { id: "nova", nom: "Casque Nova X2", categorie: "Audio", base: 249, stock: 42, note: 4.8, avis: 612 },
  { id: "bloc", nom: "Enceinte Bloc Mini", categorie: "Audio", base: 129, stock: 88, note: 4.6, avis: 341 },
  { id: "onde", nom: "Barre de son Onde", categorie: "Audio", base: 199, stock: 27, note: 4.7, avis: 208 },
  { id: "vento", nom: "Aspirateur Vento S", categorie: "Maison", base: 289, stock: 19, note: 4.7, avis: 455 },
  { id: "halo", nom: "Lampe Halo", categorie: "Maison", base: 79, stock: 64, note: 4.5, avis: 187 },
  { id: "cadran", nom: "Montre Cadran Pro", categorie: "Sport", base: 179, stock: 35, note: 4.6, avis: 298 },
  { id: "flex", nom: "Tapis Flex Pro", categorie: "Sport", base: 89, stock: 51, note: 4.4, avis: 143 },
  { id: "mixo", nom: "Robot Mixo", categorie: "Cuisine", base: 159, stock: 23, note: 4.8, avis: 376 },
  { id: "onyx", nom: "Cafetière Onyx", categorie: "Cuisine", base: 119, stock: 46, note: 4.6, avis: 262 },
];

export const AVIS = [
  {
    nom: "Karim B.",
    texte:
      "J'ai commandé au palier 1 et le prix a chuté deux fois après. J'ai été remboursé de 68 € sans rien demander. Je n'avais jamais vu ça.",
    note: 5,
  },
  {
    nom: "Léa M.",
    texte:
      "On s'est mis à plusieurs collègues pour faire monter la jauge. Le casque est arrivé en 2 jours et le son est vraiment bon.",
    note: 5,
  },
  {
    nom: "Thomas R.",
    texte:
      "Le concept est clair dès la première seconde. J'ai suivi la jauge toute la soirée, c'est presque un jeu.",
    note: 4,
  },
];

export const FAQ = [
  {
    q: "Comment fonctionnent les paliers ?",
    r: "Chaque commande fait avancer la jauge. Quand un seuil est franchi (800, 1 600 puis 2 400 commandes), la remise augmente sur tous les produits, pour tout le monde.",
  },
  {
    q: "Et si le prix baisse après ma commande ?",
    r: "Vous êtes remboursé de la différence automatiquement, sous 5 jours, sur le moyen de paiement utilisé. Vous payez toujours le prix le plus bas atteint.",
  },
  {
    q: "Le prix peut-il remonter ?",
    r: "Non. Un palier atteint ne se referme jamais : le prix affiché ne peut que baisser jusqu'à la fin de l'opération, le 30 novembre.",
  },
  {
    q: "Quand vais-je recevoir ma commande ?",
    r: "Les commandes sont expédiées sous 48 h. La livraison est offerte dès 100 € d'achat.",
  },
  {
    q: "Puis-je retourner un produit ?",
    r: "Oui, vous avez 30 jours pour changer d'avis, y compris pendant le Black Friday. Le retour est gratuit.",
  },
];