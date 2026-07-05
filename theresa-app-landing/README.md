# Teresa App Landing Page

Landing page aplikacji Teresa, przewodnika po telefonie dla osób starszych, kupowanego przez ich dzieci. Wersja 2: React + Tailwind CSS 4 + Framer Motion (Vite).

## Uruchomienie

```bash
npm install
npm run dev        # serwer deweloperski
npm run build      # produkcyjny build do dist/
npm run preview    # podgląd builda
```

## Struktura

- `index.html` - wejście SPA (5 sekcji: hero, twarde dane, bento "jak działa", cennik, FAQ + stopka B2G)
- `platnosc.html` - tymczasowa podstrona płatności (placeholder; tu podłączymy operatora płatności)
- `src/App.jsx` - wszystkie sekcje i komponenty
- `src/index.css` - motyw Tailwind (kolory brandu, ziarno na ciemnych sekcjach)
- `public/` - logo i favicon

## Zasady designu

- Kolor akcentu = kolor logo (#67B3B3; #2F7E7E tam, gdzie tekst wymaga kontrastu WCAG AA)
- Zakaz: gradienty, serify, emoji, miękkie box-shadow na jasnych tłach, stockowe zdjęcia ludzi
- Separacja elementów przez border 1px rgba(0,0,0,0.08); ciemne sekcje z ziarnem ~3%
- Jedna animacja wejścia (hero, 300 ms), reszta ruchu tylko na hover/focus; szanujemy prefers-reduced-motion

## Historia wersji

- `git log` — wersja 1 (statyczny HTML/CSS/JS z podstroną cennika) jest w historii; powrót: `git checkout <hash-v1>`

## Do zrobienia przed publikacją

- Podpiąć prawdziwy system płatności pod `platnosc.html` (przyciski planów przekazują `?plan=start|rodzina|plus`)
- Strony Prywatność i Warunki
- Deklaracja WCAG 2.1 w stopce wymaga audytu dostępności przed startem B2G
