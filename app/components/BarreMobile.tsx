import { PALIERS, PRIX_BASE, PRODUIT_VEDETTE, palierIndex, prixPalier } from "../data";

type Props = { commandes: number };

export default function BarreMobile({ commandes }: Props) {
  const remise = PALIERS[palierIndex(commandes)].remise;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-white/10 bg-encre px-4 py-3 text-white md:hidden">
      <p className="text-sm leading-tight">
        {PRODUIT_VEDETTE}
        <br />
        <span className="font-prix font-bold text-orange">
          {prixPalier(PRIX_BASE, remise)} €
        </span>{" "}
        <span className="font-prix text-white/50 line-through">{PRIX_BASE} €</span>
      </p>
      <a
        href="#offres"
        className="shrink-0 rounded-lg bg-orange px-4 py-2 text-sm font-bold text-encre"
      >
        Voir les offres
      </a>
    </div>
  );
}