import { fmt } from "../data";

type Props = {
  nombre: number;
  onPanier: () => void;
  palier: number;
  remise: number;
  commandes: number;
};

export default function Header({ nombre, onPanier, palier, remise, commandes }: Props) {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-bleu text-white">
        <p className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-1.5 text-center font-prix text-[11px] uppercase tracking-wide sm:text-xs">
          <span
            className="pastille-live inline-block h-2 w-2 rounded-full bg-orange"
            aria-hidden="true"
          />
          <span>
            Palier {palier} atteint · −{remise} %
            <span className="hidden sm:inline">
              {" "}sur tout le site · {fmt(commandes)} commandes
            </span>
          </span>
        </p>
      </div>

      <div className="border-b border-encre/10 bg-papier/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2.5">
            <svg width="26" height="22" viewBox="0 0 26 22" aria-hidden="true">
              <rect x="0" y="0" width="6" height="22" rx="1.5" fill="#2340ff" />
              <rect x="7" y="5" width="6" height="17" rx="1.5" fill="#2340ff" />
              <rect x="14" y="10" width="6" height="12" rx="1.5" fill="#2340ff" />
              <rect x="21" y="15" width="5" height="7" rx="1.5" fill="#ff5a1f" />
            </svg>
            <span className="font-titre text-xl font-bold tracking-tight">PALIER</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
            <a href="#paliers" className="hover:text-bleu">Les paliers</a>
            <a href="#offres" className="hover:text-bleu">Les offres</a>
            <a href="#avis" className="hover:text-bleu">Avis</a>
            <a href="#faq" className="hover:text-bleu">Questions</a>
          </nav>

          <button
            onClick={onPanier}
            className="rounded-lg bg-encre px-4 py-2 text-sm font-bold text-white hover:bg-bleu"
          >
            Panier ({nombre})
          </button>
        </div>
      </div>
    </header>
  );
}