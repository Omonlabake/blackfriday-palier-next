import { AVIS } from "../data";

export default function Avis() {
  return (
    <section id="avis" className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <p className="font-prix text-xs uppercase tracking-widest text-bleu">Avis clients</p>
      <h2 className="mt-2 max-w-2xl font-titre text-3xl font-bold tracking-tight md:text-5xl">
        4,9 sur 5 sur plus de 3 100 commandes.
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {AVIS.map((a) => (
          <figure key={a.nom} className="rounded-2xl border border-encre/10 bg-white p-6">
            <span aria-label={`${a.note} sur 5`} className="text-orange">
              {"★".repeat(a.note)}
              <span className="text-encre/20">{"★".repeat(5 - a.note)}</span>
            </span>
            <blockquote className="mt-4 text-encre/85">{a.texte}</blockquote>
            <figcaption className="mt-5 text-sm font-bold">
              {a.nom} <span className="font-normal text-gris">· achat vérifié</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}