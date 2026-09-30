import { PALIERS, fmt, palierIndex } from "../data";

type Props = { commandes: number };

export default function Final({ commandes }: Props) {
  const idx = palierIndex(commandes);
  const suivant = PALIERS[idx + 1];

  return (
    <>
      <section className="bg-bleu text-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center md:py-24">
          <h2 className="font-titre text-3xl font-bold tracking-tight md:text-5xl">
            {suivant
              ? `Encore ${fmt(suivant.seuil - commandes)} commandes avant −${suivant.remise} %.`
              : "Le prix plancher est atteint."}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Le prix ne peut que baisser. Commandez maintenant : la différence vous
            sera remboursée si un palier tombe.
          </p>
          <a
            href="#offres"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-bleu hover:bg-papier"
          >
            Choisir mon offre
          </a>
        </div>
      </section>

      <footer className="bg-encre px-5 py-10 pb-28 text-sm text-white/55 md:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="font-titre text-lg font-bold text-white">PALIER</p>
          <p>Livraison · Retours · Conditions de vente · Contact</p>
          <p>© 2026 Palier. Site réalisé pour la Calibration Q4.</p>
        </div>
      </footer>
    </>
  );
}