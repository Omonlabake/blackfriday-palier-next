import { FAQ } from "../data";

export default function Faq() {
  return (
    <section id="faq" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <p className="font-prix text-xs uppercase tracking-widest text-bleu">Questions</p>
        <h2 className="mt-2 font-titre text-3xl font-bold tracking-tight md:text-5xl">
          Ce qu'on nous demande le plus.
        </h2>

        <div className="mt-8 divide-y divide-encre/10 border-y border-encre/10">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold">
                {f.q}
                <span
                  className="text-2xl leading-none text-orange transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-gris">{f.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}