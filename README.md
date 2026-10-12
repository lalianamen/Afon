# AFON — сайт электрика в Лос-Анджелесе

Многостраничный SEO-сайт AFON (Advanced Field Operations Network — Electrical Systems & Power Solutions) на TanStack Start + React + Tailwind. Все страницы пререндерятся в статический HTML и публикуются на GitHub Pages: **https://lalianamen.github.io/Afon/**.

## Запуск

```sh
bun install --frozen-lockfile   # npm install не использовать — падает
bun run dev                     # локальная разработка
bun run test                    # тесты (vitest)
bun run build                   # статическая сборка → dist/client
```

`bun run build` = `vite build` (пререндер всех страниц, sitemap.xml, robots.txt, llms.txt) + `scripts/postbuild-pages.mjs` (статичный `404.html`, `.nojekyll`). Сайт собирается под подпуть `/Afon/` (`base` в `vite.config.ts`). Чтобы посмотреть сборку локально, раздайте папку `dist/client` так, чтобы она открывалась по адресу `/Afon/`.

Деплой: `.github/workflows/deploy-pages.yml` — при пуше в `main` (или вручную) ставит зависимости, гоняет тесты, собирает и публикует `dist/client`. В настройках репозитория: **Settings → Pages → Source: GitHub Actions**.

## Где менять данные о бизнесе

Всё в одном файле — **`src/lib/business.ts`**:

- `SITE_URL` — адрес сайта (canonical, Open Graph, sitemap, JSON-LD). При смене адреса/подпути поменяйте также `BASE` в `vite.config.ts`.
- `business` — телефон, SMS, email, часы работы, способы оплаты, ссылка на Google Business Profile, основатель (имя, фото, история).
- `services` — 6 услуг (тексты страниц `/services/<slug>`), `areas` — 8 районов (страницы `/electrician-<район>`), `promises` — обещания (флаг `enabled`), `generalFaqs` — FAQ.

Сейчас стоят **заглушки**: телефон `(000) 000-0000`, `info@afon.example`, `[Founder Name]`, `[Founder story…]`, `[Business Hours]`, `[Payment Methods]`, `[Google Business Profile URL]`, фото основателя. Заглушки автоматически не попадают в JSON-LD; после замены на реальные значения телефон/email/профиль Google добавятся в разметку сами. Фото основателя — заменить блок `FounderBlock` в `src/components/site/blocks.tsx`.

Форма заявки — **превью**: ничего не отправляет и прямо пишет об этом. Реальную отправку (например, письмо владельцу) добавлять только в `submitQuoteRequest()` в `src/lib/quote.ts`.

## Юридические правила (Калифорния) — обязательны

- Не заявлять, что компания лицензирована. Слово «licensed» допустимо только в дисклеймере в футере и в ответе FAQ «Are you licensed?». Нет номера лицензии, «certified», «insured», «guarantee».
- Дисклеймер в футере каждой страницы, дословно: «AFON is not licensed under the California Contractors State License Law (Bus. & Prof. Code §7027.1). We perform only work under $1,000 in combined labor and materials that does not require a building permit.»
- Только мелкий ремонт/замена без разрешения (permit) и дешевле $1,000 (работа + материалы): диагностика, розетки и выключатели, замена существующих светильников и вентиляторов, замена GFCI, мелкий ремонт. Не рекламировать замену щитков, перепроводку, новые линии, зарядки EV, солнечные панели.
- Никаких выдуманных отзывов, рейтингов, «лет опыта», статистики, обещаний «в тот же день»/аварийных выездов.
- Правила проверяет тест `src/test/legal-content.test.tsx` — он должен проходить.

## Что поменять после получения лицензии CSLB C-10

1. Обновить `LEGAL_DISCLOSURE` и `LICENSE_FAQ_ANSWER` в `src/lib/business.ts` (указать номер лицензии; уточнить у юриста, какие формулировки обязательны для рекламы лицензированного подрядчика).
2. Пересмотреть ограничение `JOB_COST_LIMIT` и правило «без permit» (`src/lib/service-scope.ts` и тесты), тексты `outOfScope`, `ScopeNote`, FAQ «Which jobs don't you take?», страницу `/services`.
3. При желании добавить новые услуги (панели, новые линии и т. п.) в `services` — страницы и sitemap появятся автоматически.
4. Обновить тест `legal-content.test.tsx` под новые формулировки.

## SEO

- `sitemap.xml`, `robots.txt`, `llms.txt` генерируются из `src/lib/seo.ts`.
- Сайт проекта живёт в подпапке, поэтому `https://lalianamen.github.io/Afon/robots.txt` поисковики не читают (они смотрят только корень домена) — это нормально. В **Google Search Console** добавьте ресурс `https://lalianamen.github.io/Afon/` и отправьте карту сайта **`https://lalianamen.github.io/Afon/sitemap.xml`** (то же — в Bing Webmaster Tools).
- OG-картинка: `public/og-image.jpg` (1200×630).
