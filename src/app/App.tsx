import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { modules, type ModuleDefinition } from './routes';
import { actionCards, personas } from '../data/demo';
import { useLanguage } from '../i18n/LanguageContext';
import type { ActionCard } from '../domain/schemas';

type DemoState = 'ready' | 'loading' | 'empty' | 'stale' | 'error' | 'denied';

const stateOptions: Array<{ value: DemoState; labelKey: 'stateReady' | 'stateLoading' | 'stateEmpty' | 'stateStale' | 'stateError' | 'stateDenied' }> = [
  { value: 'ready', labelKey: 'stateReady' },
  { value: 'loading', labelKey: 'stateLoading' },
  { value: 'empty', labelKey: 'stateEmpty' },
  { value: 'stale', labelKey: 'stateStale' },
  { value: 'error', labelKey: 'stateError' },
  { value: 'denied', labelKey: 'stateDenied' },
];

export function App() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [persona, setPersona] = useState<(typeof personas)[number]>(personas[1]);
  const [query, setQuery] = useState('');
  const location = useLocation();

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(language);
    if (!normalized) return [];
    return modules.filter((module) =>
      `${module.code} ${module.title[language]} ${module.description[language]}`
        .toLocaleLowerCase(language)
        .includes(normalized),
    ).slice(0, 5);
  }, [language, query]);

  return (
    <>
      <a className="skip-link" href="#main-content">{t('skip')}</a>
      <div className="demo-banner" role="note">
        <strong>{t('demoBanner')}</strong>
        <span>{t('demoDetail')}</span>
      </div>
      <div className="app-shell">
        <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`} aria-label={language === 'zh-TW' ? '主要導覽' : 'Primary navigation'}>
          <div className="brand-block">
            <div className="brand-mark" aria-hidden="true"><span>G</span></div>
            <div><strong>{t('brand')}</strong><small>SECURE DEMO / M01</small></div>
          </div>
          <nav>
            <NavLink className="nav-item nav-item--home" to="/" onClick={() => setMenuOpen(false)}>
              <span className="nav-code">00</span><span>{t('home')}</span>
            </NavLink>
            {modules.map((module) => (
              <NavLink className="nav-item" key={module.path} to={module.path} onClick={() => setMenuOpen(false)}>
                <span className="nav-code">{module.code}</span><span>{module.title[language]}</span>
              </NavLink>
            ))}
          </nav>
          <div className="boundary-note">
            <span className="status-dot" />DEMO_STATIC
            <small>Public / Supplier origins are separate production boundaries.</small>
          </div>
        </aside>

        {menuOpen && <button className="scrim" aria-label={t('closeMenu')} onClick={() => setMenuOpen(false)} />}

        <div className="workspace">
          <header className="topbar">
            <button className="menu-button" aria-label={t('menu')} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>☰</button>
            <div className="search-wrap">
              <label className="sr-only" htmlFor="global-search">{t('search')}</label>
              <span aria-hidden="true">⌕</span>
              <input id="global-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} />
              {searchResults.length > 0 && (
                <div className="search-results" role="listbox" aria-label={t('search')}>
                  {searchResults.map((result) => (
                    <Link role="option" key={result.path} to={result.path} onClick={() => setQuery('')}>
                      <span>{result.code}</span>{result.title[language]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="topbar-actions">
              <label className="persona-control">
                <span>{t('simulation')}</span>
                <select value={persona} onChange={(event) => setPersona(event.target.value as (typeof personas)[number])} title={t('simulationHint')}>
                  {personas.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <button className="language-toggle" onClick={() => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')} aria-label={language === 'zh-TW' ? 'Switch to English' : '切換至正體中文'}>
                {language === 'zh-TW' ? 'EN' : '繁中'}
              </button>
              <Link className="report-button" to="/report-request">+ {t('report')}</Link>
            </div>
          </header>

          <main id="main-content" tabIndex={-1}>
            <div className="context-strip">
              <span>{t('source')}</span><span>{t('freshness')}</span><span>{persona} · {t('simulationHint')}</span>
            </div>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              {modules.map((module) => <Route key={module.path} path={module.path} element={<ModulePage module={module} />} />)}
              <Route path="/admin/*" element={<AdminBoundary />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}

function HomePage() {
  const { language, t } = useLanguage();
  const zones: Array<{ key: ActionCard['zone']; title: string; eyebrow: string }> = [
    { key: 'NEED_ATTENTION', title: t('needAttention'), eyebrow: '01 / SIGNAL' },
    { key: 'MY_ACTIONS', title: t('myActions'), eyebrow: '02 / EXECUTE' },
    { key: 'DECISION_REQUIRED', title: t('decisionRequired'), eyebrow: '03 / DECIDE' },
  ];

  return (
    <div className="page page--home">
      <section className="page-heading">
        <div><p className="eyebrow">GLOBAL SECURITY / ACTION CENTER</p><h1>{t('home')}</h1></div>
        <div className="posture-summary" aria-label={language === 'zh-TW' ? '示範態勢摘要' : 'Demo posture summary'}>
          <div><strong>03</strong><span>{t('needAttention')}</span></div>
          <div><strong>01</strong><span>{t('stateStale')}</span></div>
          <div><strong>01</strong><span>{t('notConnected')}</span></div>
        </div>
      </section>

      <div className="demo-boundary-callout">
        <strong>{language === 'zh-TW' ? '安全邊界已鎖定' : 'Security boundary locked'}</strong>
        <span>{t('moduleBoundary')}</span>
      </div>

      <section className="action-grid" aria-label={language === 'zh-TW' ? '角色化行動中心' : 'Persona action center'}>
        {zones.map((zone) => (
          <div className="action-zone" key={zone.key}>
            <header><div><p className="eyebrow">{zone.eyebrow}</p><h2>{zone.title}</h2></div><span className="zone-count">1</span></header>
            {actionCards.filter((card) => card.zone === zone.key).map((card) => <ActionCardView key={card.id} card={card} />)}
          </div>
        ))}
      </section>

      <section className="module-overview">
        <div className="section-heading"><div><p className="eyebrow">12 L1 ROUTES · HOME + 11 DOMAINS</p><h2>{language === 'zh-TW' ? '任務導覽' : 'Task navigation'}</h2></div><span>{(modules.length + 1).toString().padStart(2, '0')} ROUTES</span></div>
        <div className="module-grid">
          {modules.map((module) => (
            <Link className="module-tile" key={module.path} to={module.path}>
              <span>{module.code}</span><h3>{module.title[language]}</h3><p>{module.description[language]}</p><b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function ActionCardView({ card }: { card: ActionCard }) {
  const { language, t } = useLanguage();
  const freshness = card.freshness.toLowerCase().replace('_', '-');
  return (
    <article className={`action-card action-card--${freshness}`}>
      <div className="card-topline"><span className={`severity severity--${card.severity.toLowerCase()}`}>{card.severity}</span><code>{card.id}</code></div>
      <h3>{card.title[language]}</h3><p>{card.scope}</p>
      <dl>
        <div><dt>{t('owner')}</dt><dd>{card.owner}</dd></div>
        <div><dt>{t('due')}</dt><dd><time dateTime={card.dueAt}>{new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Taipei' }).format(new Date(card.dueAt))}</time></dd></div>
        <div><dt>{t('evidence')}</dt><dd><span className="evidence-badge">{card.evidenceStatus}</span></dd></div>
        <div><dt>{t('classification')}</dt><dd>{card.classification} · {card.jurisdiction}</dd></div>
      </dl>
      <button type="button" onClick={() => window.alert(`${t('demoBanner')}\n${card.nextAction[language]}`)}>{card.nextAction[language]} <span aria-hidden="true">→</span></button>
    </article>
  );
}

function ModulePage({ module }: { module: ModuleDefinition }) {
  const { language, t } = useLanguage();
  const [state, setState] = useState<DemoState>('ready');
  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">{t('home')}</Link><span>/</span><span aria-current="page">{module.title[language]}</span></nav>
      <section className="module-hero">
        <div className="module-number">{module.code}</div>
        <div><p className="eyebrow">SECURITY DOMAIN / MILESTONE 01</p><h1>{module.title[language]}</h1><p>{module.description[language]}</p></div>
        <span className="connection-badge"><i />{t('notConnected')}</span>
      </section>
      <div className="demo-boundary-callout"><strong>DEMO_STATIC</strong><span>{t('moduleBoundary')}</span></div>
      <section className="state-lab">
        <div className="state-toolbar">
          <label htmlFor={`state-${module.code}`}>{t('pageState')}</label>
          <select id={`state-${module.code}`} value={state} onChange={(event) => setState(event.target.value as DemoState)}>
            {stateOptions.map((option) => <option key={option.value} value={option.value}>{t(option.labelKey)}</option>)}
          </select>
        </div>
        <StatePanel state={state} module={module} />
      </section>
    </div>
  );
}

function StatePanel({ state, module }: { state: DemoState; module: ModuleDefinition }) {
  const { language, t } = useLanguage();
  if (state === 'loading') return <div className="skeleton-panel" role="status" aria-live="polite"><span /><span /><span /><p>{t('stateLoading')}…</p></div>;
  if (state === 'empty') return <StateMessage code="00" title={t('stateEmpty')} body={language === 'zh-TW' ? '目前沒有符合此檢視條件的合成資料。' : 'No synthetic data matches this view.'} />;
  if (state === 'error') return <StateMessage code="503" title={t('stateError')} body={language === 'zh-TW' ? '來源故障；畫面不會以舊資料冒充最新狀態。' : 'The source is unavailable; stale data is not presented as current.'} />;
  if (state === 'denied') return <StateMessage code="403" title={t('stateDenied')} body={language === 'zh-TW' ? 'Production 必須由服務端驗證角色與資源屬性。' : 'Production must verify role and resource attributes on the server.'} />;

  return (
    <div className={`ready-panel ${state === 'stale' ? 'ready-panel--stale' : ''}`}>
      {state === 'stale' && <div className="stale-warning" role="status">{t('stateStale')} · Last successful sync 46h ago · Synthetic connector</div>}
      <div className="panel-head"><div><p className="eyebrow">SYNTHETIC WORKSPACE</p><h2>{module.title[language]}</h2></div><button disabled>{language === 'zh-TW' ? '建立示範紀錄' : 'Create demo record'}</button></div>
      <div className="feature-list">
        {module.highlights[language].map((highlight, index) => (
          <article key={highlight}><span>0{index + 1}</span><div><h3>{highlight}</h3><p>{language === 'zh-TW' ? '介面契約與狀態已建立；資料整合留待後續 milestone。' : 'Interface and states are defined; data integration is deferred.'}</p></div><b>{t('notConnected')}</b></article>
        ))}
      </div>
    </div>
  );
}

function StateMessage({ code, title, body }: { code: string; title: string; body: string }) {
  return <div className="state-message" role="status"><strong>{code}</strong><div><h2>{title}</h2><p>{body}</p></div></div>;
}

function AdminBoundary() {
  const { language, t } = useLanguage();
  return <div className="page"><StateMessage code="403" title={t('stateDenied')} body={language === 'zh-TW' ? '管理頁只保留 Production Reference route guard。角色檢視模擬不會授予存取。' : 'Admin routes keep a Production Reference guard. View simulation never grants access.'} /></div>;
}

function NotFound() {
  const { language } = useLanguage();
  return <div className="page"><StateMessage code="404" title="Not found" body={language === 'zh-TW' ? '找不到此路徑。' : 'This route does not exist.'} /></div>;
}
