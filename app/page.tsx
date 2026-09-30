"use client";

import { useCallback, useEffect, useState } from "react";
import Avis from "./components/Avis";
import BarreMobile from "./components/BarreMobile";
import Faq from "./components/Faq";
import Final from "./components/Final";
import Fonctionnement from "./components/Fonctionnement";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Offres from "./components/Offres";
import Panier from "./components/Panier";
import Toast from "./components/Toast";
import { OBJECTIF, PALIERS, palierIndex, type Produit } from "./data";

export default function Page() {
  const [commandes, setCommandes] = useState(1284);
  const [panier, setPanier] = useState<Record<string, number>>({});
  const [panierOuvert, setPanierOuvert] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const finToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    const id = setInterval(() => {
      setCommandes((c) => Math.min(OBJECTIF, c + 1 + Math.floor(Math.random() * 3)));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const idx = palierIndex(commandes);
  const nombre = Object.values(panier).reduce((s, n) => s + n, 0);

  function ajouter(p: Produit) {
    setPanier((prev) => ({ ...prev, [p.id]: (prev[p.id] ?? 0) + 1 }));
    setToast(`${p.nom} ajouté au panier.`);
  }

  function changer(id: string, delta: number) {
    setPanier((prev) => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  function commander() {
    setCommandes((c) => Math.min(OBJECTIF, c + nombre));
    setPanier({});
    setPanierOuvert(false);
    setToast(`Merci ! Votre commande fait avancer la jauge de ${nombre}.`);
  }

  return (
    <main>
      <Header
        nombre={nombre}
        onPanier={() => setPanierOuvert(true)}
        palier={idx + 1}
        remise={PALIERS[idx].remise}
        commandes={commandes}
      />
      <Hero commandes={commandes} onCommandes={setCommandes} />
      <Offres commandes={commandes} onAjouter={ajouter} />
      <Fonctionnement />
      <Avis />
      <Faq />
      <Final commandes={commandes} />
      <BarreMobile commandes={commandes} />

      <Panier
        ouvert={panierOuvert}
        panier={panier}
        commandes={commandes}
        onFermer={() => setPanierOuvert(false)}
        onChanger={changer}
        onCommander={commander}
      />
      <Toast message={toast} onFin={finToast} />
    </main>
  );
}