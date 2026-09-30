"use client";

import {
  OBJECTIF,
  PALIERS,
  PRIX_BASE,
  PRODUIT_VEDETTE,
  fmt,
  palierIndex,
  prixPalier,
} from "../data";

type Props = { commandes: number; onCommandes: (n: number) => void };

export default function Hero({ commandes, onCommandes }: Props) {
  const idx = palierIndex(commandes);
  const palier = PALIERS[idx];
  const suivant = PALIERS[idx + 1];
  const prix = prixPalier(PRIX_BASE, palier.remise);
  const debut = palier.seuil;
  const fin = suivant ? suivant.seuil : OBJECTIF;
  const progression = Math.min(100, Math.max(0, ((commandes - debut) / (fin - debut)) * 100));
  const reste = suivant ? suivant.seuil - commandes : 0;

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="quadrillage pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-12 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* Colonne texte */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-encre/15 bg-white px-3.5 py-1.5 text-sm font-bold">
            <span className="h-2 w-2 rounded-full bg-orange" aria-hidden="true" />
            Black Friday 2026 · du 27 au 30 novembre
          </p>

          <h1 className="mt-6 font-titre text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Le prix{" "}
            <span className="underline decoration-orange decoration-[6px] underline-offset-[8px]">
              baisse
            </span>{" "}
            quand vous achetez.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gris">
            Sur Palier, chaque commande fait avancer la jauge. Quand un palier
            tombe, le prix baisse pour tout le monde. Et si vous avez déjà
            commandé, la différence vous est remboursée.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#offres"
              className="rounded-xl bg-bleu px-7 py-3.5 font-bold text-white shadow-lg shadow-bleu/30 hover:bg-bleu-fonce"
            >
              Voir les offres
            </a>
            <a
              href="#fonctionnement"
              className="rounded-xl border-2 border-encre px-7 py-3.5 font-bold hover:bg-encre hover:text-white"
            >
              Comment ça marche
            </a>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-encre/15 pt-6">
            <div>
              <dt className="text-xs text-gris">commandes en direct</dt>
              <dd className="mt-1 font-prix text-2xl font-bold">{fmt(commandes)}</dd>
            </div>
            <div>
              <dt className="text-xs text-gris">prix plancher</dt>
              <dd className="mt-1 font-prix text-2xl font-bold">−60 %</dd>
            </div>
            <div>
              <dt className="text-xs text-gris">paliers à franchir</dt>
              <dd className="mt-1 font-prix text-2xl font-bold">4</dd>
            </div>
          </dl>
        </div>

        {/* Carte escalier */}
        <div
          id="paliers"
          className="rounded-[28px] bg-encre p-5 text-white shadow-[0_30px_60px_-20px_rgba(35,64,255,0.45)] sm:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-prix text-xs uppercase tracking-widest text-white/60">
                Produit vedette
              </p>
              <h2 className="mt-1 font-titre text-xl font-bold">{PRODUIT_VEDETTE}</h2>
            </div>
            <span className="rounded-full bg-orange px-3 py-1 font-prix text-sm font-bold text-encre">
              −{palier.remise} %
            </span>
          </div>

          <p className="mt-4 flex items-baseline gap-3 font-prix">
            <span key={prix} className="prix-chute text-6xl font-bold tracking-tight sm:text-7xl">
              {prix} €
            </span>
            <span className="text-lg text-white/45 line-through">{PRIX_BASE} €</span>
          </p>

          <div className="mt-6">
            <div
              className="flex h-52 items-end gap-2 sm:gap-3"
              role="img"
              aria-label="Escalier des prix : le prix baisse à chaque palier"
            >
              {PALIERS.map((p, i) => {
                const prixP = prixPalier(PRIX_BASE, p.remise);
                const hauteur = (prixP / PRIX_BASE) * 100;
                const style =
                  i < idx
                    ? "bg-bleu text-white"
                    : i === idx
                    ? "palier-actuel bg-orange text-encre"
                    : "border-2 border-dashed border-white/25 text-white/50";
                return (
                  <div
                    key={p.seuil}
                    style={{ height: `${hauteur}%` }}
                    className={`flex flex-1 flex-col items-center rounded-t-xl pt-3 transition-colors duration-500 ${style}`}
                  >
                    <span className="font-titre text-lg font-bold leading-none sm:text-xl">
                      −{p.remise} %
                    </span>
                    <span className="mt-1.5 font-prix text-xs sm:text-sm">{prixP} €</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 flex gap-2 sm:gap-3">
              {PALIERS.map((p, i) => (
                <div
                  key={p.seuil}
                  className={`flex-1 text-center font-prix text-[10px] uppercase tracking-wide sm:text-[11px] ${
                    i === idx ? "text-orange" : "text-white/55"
                  }`}
                >
                  Palier {i + 1}
                  <br />
                  <span className="text-white/40">{fmt(p.seuil)}+</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white/[0.06] p-4">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              {suivant ? (
                <>
                  <p>
                    Prochain palier dans{" "}
                    <strong className="font-prix text-orange">{fmt(reste)} commandes</strong>
                  </p>
                  <p className="font-prix text-white/70">
                    → {prixPalier(PRIX_BASE, suivant.remise)} €
                  </p>
                </>
              ) : (
                <p>
                  <strong className="text-menthe">Prix plancher atteint.</strong> Plus bas,
                  ce n'est pas possible.
                </p>
              )}
            </div>
            <div
              className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progression)}
              aria-label="Progression vers le prochain palier"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-bleu to-orange transition-[width] duration-700"
                style={{ width: `${progression}%` }}
              />
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4 text-sm">
            <label htmlFor="ventes" className="mb-2 block text-white/60">
              Aperçu : simuler les ventes ({fmt(commandes)} commandes)
            </label>
            <input
              id="ventes"
              type="range"
              min={0}
              max={OBJECTIF}
              step={1}
              value={commandes}
              onChange={(e) => onCommandes(Number(e.target.value))}
              className="w-full accent-orange"
            />
          </div>
        </div>
      </div>
    </section>
  );
}