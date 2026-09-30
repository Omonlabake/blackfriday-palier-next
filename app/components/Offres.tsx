"use client";

import { useState } from "react";
import {
  CATEGORIES,
  COULEURS,
  PALIERS,
  PRODUITS,
  palierIndex,
  prixPalier,
  type Categorie,
  type Produit,
} from "../data";

type Props = { commandes: number; onAjouter: (p: Produit) => void };

export default function Offres({ commandes, onAjouter }: Props) {
  const [cat, setCat] = useState<Categorie | "Tout">("Tout");

  const idx = palierIndex(commandes);
  const remise = PALIERS[idx].remise;
  const suivant = PALIERS[idx + 1];
  const liste = PRODUITS.filter((p) => cat === "Tout" || p.categorie === cat);

  return (
    <section id="offres" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-prix text-xs uppercase tracking-widest text-bleu">
            Palier {idx + 1} · −{remise} % en ce moment
          </p>
          <h2 className="mt-2 max-w-xl font-titre text-3xl font-bold tracking-tight md:text-5xl">
            Neuf offres, un seul prix : celui du palier.
          </h2>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer par catégorie">
          {(["Tout", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold transition-colors ${
                cat === c
                  ? "border-encre bg-encre text-white"
                  : "border-encre/15 bg-white hover:border-encre"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {liste.map((p) => {
          const [de, vers] = COULEURS[p.categorie];
          const prix = prixPalier(p.base, remise);
          const prochain = suivant ? prixPalier(p.base, suivant.remise) : null;
          return (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-encre/10 bg-white transition-shadow hover:shadow-xl hover:shadow-encre/10"
            >
              <div
                className="relative h-44 overflow-hidden"
                style={{ background: `linear-gradient(140deg, ${de}, ${vers})` }}
              >
                <span className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/15" />
                <span className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-white/10" />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-encre">
                  {p.categorie}
                </span>
                <span className="absolute right-4 top-4 rounded-lg bg-orange px-2.5 py-1 font-prix text-sm font-bold text-encre">
                  −{remise} %
                </span>
                <span className="absolute bottom-3 right-4 font-prix text-xs text-white/80">
                  réf. {p.id.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-titre text-xl font-bold leading-tight">{p.nom}</h3>
                <p className="mt-1 text-sm text-gris">
                  <span className="text-orange">★</span> {p.note} · {p.avis} avis
                </p>

                <p className="mt-4 flex items-baseline gap-3 font-prix">
                  <span key={prix} className="prix-chute text-4xl font-bold tracking-tight">
                    {prix} €
                  </span>
                  <span className="text-gris line-through">{p.base} €</span>
                </p>

                <p className="mt-2 text-sm text-gris">
                  {prochain ? (
                    <>
                      Au palier suivant :{" "}
                      <strong className="font-prix text-bleu">{prochain} €</strong>
                    </>
                  ) : (
                    <strong className="text-menthe">Prix plancher atteint</strong>
                  )}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span
                    className={`text-sm font-bold ${
                      p.stock < 30 ? "text-orange" : "text-gris"
                    }`}
                  >
                    {p.stock < 30 ? `Plus que ${p.stock}` : `${p.stock} en stock`}
                  </span>
                  <button
                    onClick={() => onAjouter(p)}
                    className="rounded-xl bg-bleu px-5 py-2.5 text-sm font-bold text-white hover:bg-bleu-fonce"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}