const etapes = [
  ["01", "Vous commandez", "Chaque commande, la vôtre comme celle des autres, fait avancer la jauge."],
  ["02", "Un palier tombe", "À 800, 1 600 et 2 400 commandes, la remise augmente sur tous les produits."],
  ["03", "La différence vous revient", "Vous avez déjà payé ? Le trop-perçu vous est remboursé automatiquement."],
];

export default function Fonctionnement() {
  return (
    <section id="fonctionnement" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-prix text-xs uppercase tracking-widest text-bleu">Le principe</p>
        <h2 className="mt-2 max-w-2xl font-titre text-3xl font-bold tracking-tight md:text-5xl">
          Vous ne pouvez pas payer trop cher.
        </h2>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {etapes.map(([n, titre, texte]) => (
            <li
              key={n}
              className="rounded-2xl border border-encre/10 bg-papier p-6"
            >
              <span className="font-prix text-5xl font-bold text-bleu">{n}</span>
              <h3 className="mt-4 font-titre text-xl font-bold">{titre}</h3>
              <p className="mt-2 text-gris">{texte}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-encre p-6 text-white">
          <p className="max-w-xl">
            <strong className="font-titre text-lg">Prix garanti.</strong>{" "}
            <span className="text-white/75">
              Vous payez toujours le prix le plus bas atteint, même si vous avez
              commandé avant.
            </span>
          </p>
          <a
            href="#offres"
            className="rounded-xl bg-orange px-6 py-3 font-bold text-encre hover:brightness-110"
          >
            Voir les offres
          </a>
        </div>
      </div>
    </section>
  );
}