"use client";

import { PALIERS, PRODUITS, SEUIL_LIVRAISON, palierIndex, prixPalier } from "../data";

type Props = {
  ouvert: boolean;
  panier: Record<string, number>;
  commandes: number;
  onFermer: () => void;
  onChanger: (id: string, delta: number) => void;
  onCommander: () => void;
};

export default function Panier({ ouvert, panier, commandes, onFermer, onChanger, onCommander }: Props) {
  if (!ouvert) return null;

  const remise = PALIERS[palierIndex(commandes)].remise;
  const lignes = PRODUITS.filter((p) => panier[p.id]);
  const total = lignes.reduce((s, p) => s + panier[p.id] * prixPalier(p.base, remise), 0);
  const totalBase = lignes.reduce((s, p) => s + panier[p.id] * p.base, 0);
  const economie = totalBase - total;
  const manque = Math.max(0, SEUIL_LIVRAISON - total);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-encre/70" onClick={onFermer}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col bg-papier p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-titre text-2xl font-bold">Votre panier</h2>
          <button onClick={onFermer} className="font-bold hover:text-bleu">
            Fermer
          </button>
        </div>

        {lignes.length === 0 ? (
          <div className="mt-10">
            <p className="text-gris">Votre panier est vide. Choisissez une offre pour commencer.</p>
            <a
              href="#offres"
              onClick={onFermer}
              className="mt-4 inline-block rounded-xl bg-encre px-5 py-3 font-bold text-white"
            >
              Voir les offres
            </a>
          </div>
        ) : (
          <>
            <div className="mt-5 rounded-xl bg-white p-3 text-sm">
              {manque > 0 ? (
                <p>
                  Plus que <strong className="font-prix">{manque} €</strong> pour la livraison offerte.
                </p>
              ) : (
                <p>
                  <strong>Livraison offerte</strong> sur cette commande.
                </p>
              )}
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-encre/10">
                <div
                  className="h-full rounded-full bg-menthe"
                  style={{ width: `${Math.min(100, (total / SEUIL_LIVRAISON) * 100)}%` }}
                />
              </div>
            </div>

            <ul className="mt-5 flex-1 divide-y divide-encre/10 overflow-y-auto">
              {lignes.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-bold">{p.nom}</p>
                    <p className="font-prix text-sm text-gris">
                      {prixPalier(p.base, remise)} €{" "}
                      <span className="line-through">{p.base} €</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onChanger(p.id, -1)}
                      aria-label={`Retirer un ${p.nom}`}
                      className="h-8 w-8 rounded-lg border border-encre/20 font-bold hover:border-encre"
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-prix font-bold">{panier[p.id]}</span>
                    <button
                      onClick={() => onChanger(p.id, 1)}
                      aria-label={`Ajouter un ${p.nom}`}
                      className="h-8 w-8 rounded-lg border border-encre/20 font-bold hover:border-encre"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-encre/10 pt-4">
              <p className="flex justify-between text-sm text-gris">
                <span>Économie au palier actuel</span>
                <span className="font-prix font-bold text-menthe">−{economie} €</span>
              </p>
              <p className="mt-1 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="font-prix">{total} €</span>
              </p>
              <p className="mt-3 rounded-lg bg-bleu/10 p-2.5 text-xs text-bleu-fonce">
                Prix garanti : si un palier tombe après votre commande, la différence
                vous est remboursée.
              </p>
              <button
                onClick={onCommander}
                className="mt-4 w-full rounded-xl bg-encre py-3.5 font-bold text-white hover:bg-bleu"
              >
                Commander
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}