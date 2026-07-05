import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* Ikony: Tabler Icons (MIT), inline dla zerowych zaleznosci runtime */
const PATHS = {
  microphone: ['M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z', 'M5 10a7 7 0 0 0 14 0', 'M8 21l8 0', 'M12 17l0 4'],
  sparkles: ['M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z'],
  handStop: ['M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5', 'M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5', 'M14 5.5a1.5 1.5 0 0 1 3 0v6.5', 'M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47'],
  typography: ['M4 20l3 0', 'M14 20l7 0', 'M6.9 15l6.9 0', 'M10.2 6.3l5.8 13.7', 'M5 20l6 -16l2 0l7 16'],
  shieldCheck: ['M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06', 'M15 19l2 2l4 -4'],
  lock: ['M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z', 'M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0', 'M8 11v-4a4 4 0 1 1 8 0v4'],
  key: ['M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z', 'M15 9h.01'],
  check: ['M5 12l5 5l10 -10'],
  volume: ['M15 8a5 5 0 0 1 0 8', 'M17.7 5a9 9 0 0 1 0 14', 'M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5'],
  chevronDown: ['M6 9l6 6l6 -6'],
  arrowRight: ['M5 12l14 0', 'M13 18l6 -6', 'M13 6l6 6'],
  helpCircle: ['M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', 'M12 16v.01', 'M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483'],
  click: ['M3 12l3 0', 'M12 3l0 3', 'M7.8 7.8l-2.2 -2.2', 'M16.2 7.8l2.2 -2.2', 'M7.8 16.2l-2.2 2.2', 'M12 12l9 3l-4 2l-2 4l-3 -9'],
  fileText: ['M14 3v4a1 1 0 0 0 1 1h4', 'M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z', 'M9 9l1 0', 'M9 13l6 0', 'M9 17l6 0'],
  alertCircle: ['M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0', 'M12 8v4', 'M12 16l.01 0'],
};

function Icon({ name, className = 'size-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {PATHS[name].map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-cream/95 border-b border-black/[0.08]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5 text-lg font-extrabold tracking-[-0.02em]">
          <img src="./logo-teresa.png" alt="" className="size-8 object-contain" />
          Teresa
        </a>
        <nav className="hidden items-center gap-8 text-sm font-600 font-semibold text-ink/70 md:flex" aria-label="Główna nawigacja">
          <a className="transition-colors duration-200 hover:text-teal-deep" href="#jak-dziala">Jak działa</a>
          <a className="transition-colors duration-200 hover:text-teal-deep" href="#cennik">Cennik</a>
          <a className="transition-colors duration-200 hover:text-teal-deep" href="#faq">FAQ</a>
        </nav>
        <a href="#cennik"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-teal-deep">
          Odbierz 30 dni za darmo
        </a>
      </div>
    </header>
  );
}

function PhoneMockup() {
  return (
    <div className="relative [perspective:1800px]">
      <div aria-hidden="true"
        className="absolute -bottom-10 left-1/2 h-9 w-3/4 -translate-x-1/2 rounded-[50%] bg-carbon/30 blur-xl" />
      <div className="relative aspect-[9/19] w-[280px] [transform:rotateY(-7deg)_rotateX(2deg)] rounded-[44px] bg-carbon p-[10px] shadow-[0_36px_70px_-24px_rgba(16,18,20,0.45)] sm:w-[304px]">
        <div className="flex h-full flex-col overflow-hidden rounded-[35px] bg-paper px-5 pb-5 pt-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[13px] font-bold">
              <img src="./logo-teresa.png" alt="" className="size-4 object-contain" /> Teresa
            </span>
            <span className="text-[12px] font-semibold text-ink/40">09:41</span>
          </div>
          <div className="my-auto py-6">
            <p className="text-center text-[12px] font-semibold text-ink/50">Dzień dobry</p>
            <p className="mx-auto mt-2 max-w-[210px] text-center text-[22px] font-extrabold leading-tight tracking-[-0.02em]">
              W czym mogę Ci dziś pomóc?
            </p>
            <button type="button" aria-label="Naciśnij i mów"
              className="mx-auto mt-9 grid size-[84px] place-items-center rounded-full bg-teal-deep text-white ring-8 ring-teal/20">
              <Icon name="microphone" className="size-8" />
            </button>
            <p className="mx-auto mt-5 max-w-[160px] text-center text-[12px] font-medium leading-snug text-ink/50">
              Naciśnij i powiedz, czego potrzebujesz
            </p>
          </div>
          <div className="rounded-2xl border border-black/[0.08] bg-white p-4">
            <p className="text-[11px] font-semibold text-ink/45">Możesz powiedzieć</p>
            <p className="mt-1 text-[14px] font-bold">„Chcę wysłać zdjęcie”</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  A/B test, alternatywne H1 do podmiany:
  B: "Telefon przestaje być tematem waszych rozmów o 21:00."
  C: "Mama znowu radzi sobie sama. Ty odzyskujesz wieczory."
*/
function Hero() {
  const reduce = useReducedMotion();
  const enter = (delay = 0) => reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: 'easeOut', delay },
      };
  return (
    <section id="top" className="bg-cream pb-16 pt-20 md:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.05fr_0.95fr]">
        <motion.div {...enter(0)}>
          <h1 className="max-w-xl text-[37px] font-extrabold leading-[1.06] tracking-[-0.02em] md:text-[51px]">
            Teresa pomoże Twoim bliskim, gdy Ty <span className="text-teal-deep">nie możesz odebrać.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">
            Mama dzwoni trzeci raz tego dnia, bo zniknęła jej ikona galerii.
            A Ty jesteś w pracy. Nie chodzi o to, że nie chcesz pomagać.
            Chodzi o to, że nie zawsze możesz.
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-ink/60">
            Teresa odbiera te pytania za Ciebie. Senior mówi jej własnymi słowami,
            czego potrzebuje, a ona głosem prowadzi go krok po kroku i pokazuje na
            ekranie, gdzie dotknąć. Każdy ruch wykonuje sam. Ty odzyskujesz spokojne
            wieczory, senior pewność, że da sobie radę.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#cennik"
              className="rounded-full bg-teal-deep px-7 py-4 text-base font-bold text-white transition-colors duration-200 hover:bg-[#266A6A]">
              Odbierz 30 dni za darmo
            </a>
            <a href="#demo"
              className="rounded-full border border-black/[0.15] px-7 py-4 text-base font-bold text-ink transition-colors duration-200 hover:border-teal-deep hover:text-teal-deep">
              Zobacz demo
            </a>
          </div>
        </motion.div>
        <motion.div {...enter(0.1)} className="justify-self-center md:justify-self-end">
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="noise relative bg-graphite py-20 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.1fr_1fr] md:gap-24">
        <div>
          <p className="text-[92px] font-extrabold leading-none tracking-[-0.03em] text-teal md:text-[120px]">13%</p>
          <p className="mt-6 max-w-md text-xl leading-relaxed text-white/80">
            Tylko tylu seniorów w Polsce ma podstawowe umiejętności cyfrowe.
            Średnia unijna jest ponad dwukrotnie wyższa.
          </p>
        </div>
        <div>
          <p className="border-t border-white/10 py-6 text-lg leading-relaxed text-white/80">
            <b className="font-extrabold text-teal">10 mln</b> Polaków ma dziś ponad 60 lat.
          </p>
          <p className="border-t border-white/10 py-6 text-lg leading-relaxed text-white/80">
            <b className="font-extrabold text-teal">47%</b> właścicieli smartfonów po sześćdziesiątce
            używa ich wyłącznie do dzwonienia.
          </p>
          <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/40">
            Dane: GUS i Eurostat, 2024–2025. W korzystaniu z internetu przez osoby 65–74 lata
            Polska jest 22. z 27 krajów UE.
          </p>
        </div>
      </div>
    </section>
  );
}

function TrustBand() {
  const items = ['Nie zna haseł', 'Nie robi przelewów', 'Nie przejmuje ekranu', 'Zrezygnuj, kiedy chcesz'];
  return (
    <section className="noise relative bg-graphite py-9 text-white" aria-label="Zasady bezpieczeństwa Teresy">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 md:justify-between">
        {items.map(item => (
          <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-white/80">
            <Icon name="check" className="size-4 text-teal" /> {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function VoiceBubble({ bars, children }) {
  return (
    <div className="ml-auto mt-4 w-fit max-w-[260px] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-sm font-medium text-white first:mt-0">
      <span className="mb-1.5 flex h-4 items-center gap-[3px]" aria-hidden="true">
        {bars.map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-teal" style={{ height: `${h}px` }} />
        ))}
      </span>
      {children}
    </div>
  );
}

function TeresaSays() {
  return (
    <p className="flex items-center gap-1.5 text-xs font-bold text-teal-deep">
      <img src="./logo-teresa.png" alt="" className="size-3.5 object-contain" /> Teresa
      <Icon name="volume" className="ml-0.5 size-3.5 text-teal-deep/55" />
    </p>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: '1',
      title: 'Senior mówi własnymi słowami',
      text: '„Za małe litery”, „gdzie jest mój PDF”, „chcę wysłać zdjęcie”. Bez nazw aplikacji i bez żargonu.',
    },
    {
      n: '2',
      title: 'Teresa układa plan',
      text: 'Zwykłe zdanie zamienia w kolejne kroki i prowadzi przez nie głosem.',
    },
    {
      n: '3',
      title: 'Mówi jedną wskazówkę naraz',
      text: 'I pokazuje ją na ekranie. W tempie seniora, nigdy trzy rzeczy naraz.',
    },
  ];
  return (
    <section id="jak-dziala" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="max-w-2xl text-[32px] font-extrabold tracking-[-0.02em] md:text-[44px]">
          AI może wreszcie tłumaczyć technologię po ludzku.
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/65">
          Nie po to, żeby zastąpić człowieka. Po to, żeby pomóc mu działać samodzielnie.
        </p>
        <div className="mt-16 grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <ol>
            {steps.map(s => (
              <li key={s.n} className="flex gap-7 border-t border-black/[0.08] py-8 first:border-t-0 first:pt-0">
                <span className="text-4xl font-extrabold leading-none tracking-[-0.02em] text-teal-deep">{s.n}</span>
                <div>
                  <h3 className="text-[22px] font-bold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/60">{s.text}</p>
                </div>
              </li>
            ))}
            <li className="border-t border-black/[0.08] pt-8">
              <p className="max-w-md font-semibold leading-relaxed">
                Każde dotknięcie ekranu senior wykonuje sam.
                Teresa niczego nie klika i niczego nie zmienia w telefonie.
              </p>
            </li>
          </ol>
          <div id="demo" className="rounded-3xl border border-black/[0.08] bg-paper p-6 md:p-8">
            <VoiceBubble bars={[6, 12, 16, 10, 14, 7, 11, 5]}>Chcę wysłać zdjęcie do wnuczka.</VoiceBubble>
            <div className="mt-4 max-w-[320px] rounded-2xl rounded-bl-md border border-black/[0.08] bg-white px-4 py-4">
              <TeresaSays />
              <p className="mt-2 text-sm font-bold">Dobrze, zrobimy to razem.</p>
              <p className="mt-1 text-sm leading-relaxed text-ink/60">
                Najpierw otwórz Wiadomości. Strzałka na ekranie pokazuje Ci ich ikonę.
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-black/[0.08]">
                <div className="h-full w-1/3 rounded-full bg-teal-deep" />
              </div>
              <p className="mt-1.5 text-[11px] font-semibold text-ink/45">Krok 1 z 3</p>
            </div>
            <VoiceBubble bars={[9, 5, 13, 8, 6]}>Otworzyłam.</VoiceBubble>
            <div className="mt-4 max-w-[320px] rounded-2xl rounded-bl-md border border-black/[0.08] bg-white px-4 py-4">
              <TeresaSays />
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                Świetnie. Dotknij rozmowy z wnuczkiem, podświetliłam ją ramką.
                Za chwilę dodamy zdjęcie.
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-black/[0.08]">
                <div className="h-full w-2/3 rounded-full bg-teal-deep" />
              </div>
              <p className="mt-1.5 text-[11px] font-semibold text-ink/45">Krok 2 z 3</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const bubbles = [
    { text: 'Nie wiem, gdzie kliknąć', icon: 'click', delay: '0s', pos: 'left-0 top-[3%] sm:left-[3%] sm:top-[14%]' },
    { text: 'Za małe są litery', icon: 'typography', delay: '-1.5s', pos: 'right-0 top-[15%] sm:right-[2%] sm:top-[5%]' },
    { text: 'Gdzie jest mój PDF?', icon: 'fileText', delay: '-3s', pos: 'left-0 bottom-[22%] sm:left-0 sm:bottom-[18%]' },
    { text: 'Boję się, że coś zepsuję', icon: 'alertCircle', delay: '-2s', pos: 'right-0 bottom-[7%] sm:right-0 sm:bottom-[21%]' },
    { text: 'Jak się zalogować?', icon: 'key', delay: '-0.7s', pos: 'bottom-0 left-1/2 -translate-x-1/2 sm:left-[57%] sm:translate-x-0' },
  ];
  return (
    <section className="border-t border-black/[0.06] bg-paper py-20">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h2 className="text-[32px] font-extrabold tracking-[-0.02em] md:text-[44px]">
          Znasz te telefony w środku dnia.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/65">
          Ty jesteś w pracy, a bliski utknął na prostej rzeczy. To nie brak
          umiejętności, tylko technologia, która za rzadko mówi ludzkim językiem.
        </p>
        <div className="relative mx-auto mt-14 h-[600px] max-w-3xl sm:mt-16 sm:h-[500px]">
          <div className="absolute left-1/2 top-1/2 grid size-[220px] -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-teal-whisper px-6 text-center shadow-[0_0_0_20px_rgba(227,241,241,0.45)] sm:size-[290px]">
            <span className="mx-auto mb-3 grid size-11 place-items-center rounded-full bg-white text-teal-deep sm:mb-4">
              <Icon name="microphone" className="size-5" />
            </span>
            <p className="text-[18px] font-bold leading-snug tracking-[-0.01em] sm:text-[22px]">
              „Chcę tylko<br />załatwić prostą sprawę.”
            </p>
          </div>
          {bubbles.map(b => (
            <span key={b.text} style={{ animationDelay: b.delay }}
              className={`animate-float absolute flex items-center gap-2.5 rounded-full border border-black/[0.06] bg-white px-4 py-3 text-sm font-semibold text-ink/75 shadow-[0_15px_40px_rgba(62,51,44,0.08)] ${b.pos}`}>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream text-teal-deep">
                <Icon name={b.icon} className="size-4" />
              </span>
              {b.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Plan({ name, price, period, tagline, features, cta, href, featured = false, dimmed = false, badge }) {
  return (
    <article className={[
      'relative flex flex-col rounded-3xl border bg-[#1B1E21] p-8',
      featured ? 'border-teal md:scale-105' : 'border-white/10',
      dimmed ? 'opacity-50 saturate-50' : '',
    ].join(' ')}>
      {badge && (
        <span className="absolute -top-3.5 left-8 rounded-full bg-teal px-3.5 py-1.5 text-xs font-bold text-carbon">{badge}</span>
      )}
      <h3 className="text-2xl font-extrabold tracking-[-0.02em]">{name}</h3>
      <p className="mt-2 min-h-10 text-sm leading-relaxed text-white/55">{tagline}</p>
      <p className="mt-5 border-b border-white/10 pb-6">
        <span className="text-4xl font-extrabold tracking-[-0.02em]">{price}</span>
        <span className="ml-2 text-sm text-white/50">{period}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map(f => (
          <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-white/80">
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-teal" /> {f}
          </li>
        ))}
      </ul>
      <a href={href}
        className={[
          'mt-8 rounded-full px-6 py-3.5 text-center text-base font-bold transition-colors duration-200',
          featured
            ? 'bg-teal text-carbon hover:bg-[#82C4C4]'
            : 'border border-white/20 text-white hover:border-teal hover:text-teal',
        ].join(' ')}>
        {cta}
      </a>
    </article>
  );
}

function Bridge() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <p className="text-[26px] font-extrabold leading-tight tracking-[-0.02em] md:text-[34px]">
          Tych liczb nie zmienisz w całej Polsce.
          <br className="hidden md:block" /> W swojej rodzinie wystarczy jedna instalacja.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/60">
          Kwadrans na konfigurację dziś to setki spokojniejszych telefonów w przyszłości.
        </p>
      </div>
    </section>
  );
}

function BillingToggle({ yearly, onChange }) {
  const option = (active) =>
    `rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200 ${
      active ? 'bg-teal text-carbon' : 'text-white/65 hover:text-white'
    }`;
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <div role="group" aria-label="Okres rozliczenia" className="flex rounded-full border border-white/15 p-1">
        <button type="button" aria-pressed={!yearly} onClick={() => onChange(false)} className={option(!yearly)}>
          Miesięcznie
        </button>
        <button type="button" aria-pressed={yearly} onClick={() => onChange(true)} className={option(yearly)}>
          Rocznie
        </button>
      </div>
      <span className={`rounded-full bg-teal px-3.5 py-1.5 text-xs font-bold text-carbon transition-opacity duration-200 ${yearly ? '' : 'opacity-60'}`}>
        Rocznie oszczędzasz 38%
      </span>
    </div>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(false);
  const billing = yearly ? 'rok' : 'miesiac';
  return (
    <section id="cennik" className="noise relative bg-carbon py-20 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-[32px] font-extrabold tracking-[-0.02em] md:text-[44px]">Płacisz Ty. Korzysta senior.</h2>
        <p className="mt-4 max-w-xl text-white/60">
          Jeden abonament na jeden telefon: mamy, taty, babci albo dziadka.
          Anulujesz jednym kliknięciem.
        </p>
        <BillingToggle yearly={yearly} onChange={setYearly} />
        <div className="mt-14 grid items-start gap-5 md:grid-cols-3">
          <Plan
            name="Na początek" price="0 zł" period="na zawsze" dimmed
            tagline="Bez karty i bez zobowiązań."
            features={[
              'Funkcje systemowe telefonu: latarka, wyciszenie, jasność, głośność',
              'Czytelny interfejs',
            ]}
            cta="Pobierz za darmo" href="./platnosc.html?plan=start"
          />
          <Plan
            name="Dla rodziny" featured badge="30 dni za darmo"
            price={yearly ? '149 zł' : '19,99 zł'}
            period={yearly ? 'rocznie, czyli 12,42 zł mies.' : 'mies.'}
            tagline="Pełna pomoc na co dzień."
            features={[
              'Prowadzenie głosowe krok po kroku',
              'Wszystkie instrukcje bez limitów',
              'Podpowiedzi wprost na ekranie: ramka podświetla przycisk, a strzałka pokazuje, gdzie dotknąć',
              'Pomoc w codziennych sprawach online',
            ]}
            cta="Zacznij 30 dni za darmo" href={`./platnosc.html?plan=rodzina&billing=${billing}`}
          />
          <Plan
            name="Teresa Plus"
            price={yearly ? '259 zł' : '34,99 zł'}
            period={yearly ? 'rocznie, czyli 21,58 zł mies.' : 'mies.'}
            tagline="Nie tylko pomoc techniczna. Osobista asystentka seniora."
            features={[
              'Wszystko z planu Dla rodziny',
              'Przypomnienia o lekach i wizytach',
              'Asystent w codziennych czynnościach',
            ]}
            cta="Wybierz Plus" href={`./platnosc.html?plan=plus&billing=${billing}`}
          />
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    q: 'Czy Teresa robi coś za seniora?',
    a: 'Nie. Teresa pokazuje kolejne kroki i tłumaczy, co zrobić, ale każde kliknięcie senior wykonuje samodzielnie. Dzięki temu uczy się obsługi telefonu, zamiast uzależniać się od pomocy.',
  },
  {
    q: 'Czy Teresa widzi hasła albo kody z SMS-ów?',
    a: 'Nie. Przy logowaniu prowadzi przez proces, ale nie odczytuje, nie zapisuje i nie przechowuje haseł, PIN-ów ani kodów SMS. Nie wykonuje też żadnych operacji finansowych.',
  },
  {
    q: 'Jak działa 30 dni za darmo?',
    a: 'Plan Dla rodziny przez pierwsze 30 dni nie kosztuje nic. Jeśli zrezygnujesz przed końcem, nie zapłacisz ani złotówki. Anulowanie to jedno kliknięcie, bez okresu wypowiedzenia.',
  },
  {
    q: 'Czy mogę zainstalować Teresę seniorowi na odległość?',
    a: 'Tak. Wysyłasz seniorowi link, a pierwszą konfigurację przechodzicie razem przez telefon. Zajmuje to kilka minut.',
  },
  {
    q: 'Co się stanie, gdy przestanę płacić?',
    a: 'Aplikacja przechodzi na plan darmowy: senior na zawsze zachowuje pomoc przy funkcjach systemowych, takich jak latarka czy wyciszenie. Nic nie znika z telefonu.',
  },
];

function FaqItem({ item, open, onToggle }) {
  const reduce = useReducedMotion();
  return (
    <li className="border-b border-black/[0.08]">
      <button type="button" onClick={onToggle} aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-4 py-6 text-left transition-colors duration-200 hover:bg-black/[0.03]">
        <span className="text-lg font-bold tracking-[-0.01em]">{item.q}</span>
        <Icon name="chevronDown" className={`size-5 shrink-0 text-teal-deep transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden">
            <p className="max-w-3xl px-4 pb-7 leading-relaxed text-ink/65">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-cream py-20">
      <div className="mx-auto max-w-4xl px-5">
        <h2 className="text-[32px] font-extrabold tracking-[-0.02em] md:text-[44px]">Częste pytania</h2>
        <ul className="mt-10 border-t border-black/[0.08]">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  const compliance = [
    { icon: 'shieldCheck', label: 'Zgodność z WCAG 2.1' },
    { icon: 'lock', label: 'Zgodność z RODO' },
    { icon: 'key', label: 'Szyfrowanie AES-256' },
  ];
  return (
    <footer className="noise relative bg-carbon py-10 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-b border-white/10 pb-7">
          <p className="flex items-center gap-2.5 text-lg font-extrabold tracking-[-0.02em]">
            <img src="./logo-teresa.png" alt="" className="size-7 object-contain" /> Teresa
          </p>
          {compliance.map(c => (
            <div key={c.label} className="flex items-center gap-2.5 text-sm font-bold text-white/85">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/15 text-teal">
                <Icon name={c.icon} className="size-4" />
              </span>
              {c.label}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 pt-6 text-sm text-white/55">
          <p>Przewodnik po telefonie dla osób starszych. © 2026 Teresa App</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <a className="transition-colors duration-200 hover:text-teal" href="mailto:hello@teresa.app">hello@teresa.app</a>
            <a className="transition-colors duration-200 hover:text-teal" href="#">Prywatność</a>
            <a className="transition-colors duration-200 hover:text-teal" href="#">Warunki</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a href="#jak-dziala" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Przejdź do treści
      </a>
      <Nav />
      <main>
        <Hero />
        <TrustBand />
        <HowItWorks />
        <Problem />
        <Stats />
        <Bridge />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
