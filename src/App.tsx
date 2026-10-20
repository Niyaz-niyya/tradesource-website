import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Routes, Route, Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';
import { categories, company, services } from './data/content';
import type { Locale, LocalizedText } from './types';

const locales: {code:Locale; label:string; short:string}[] = [
  {code:'en',label:'English',short:'EN'}, {code:'zh',label:'简体中文',short:'中'}, {code:'ar',label:'العربية',short:'عر'}
];
const localeSet = new Set(locales.map(x=>x.code));
const local = (value: LocalizedText, locale: Locale) => value[locale];
const whatsapp = (message:string) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;

function Logo({inverse=false}:{inverse?:boolean}) {
  return <Link to="/en/" className={`logo ${inverse?'inverse':''}`} aria-label="UJR TradeSource home">
    <span className="logo-mark"><Icons.Globe2/><Icons.MoveUpRight/></span><span className="logo-type"><b>UJR</b><small>TradeSource</small></span>
  </Link>;
}

function LanguagePicker({locale,onPrimary}:{locale:Locale;onPrimary:(l:Locale)=>void}) {
  const {t}=useTranslation(); const [open,setOpen]=useState(false); const wrap=useRef<HTMLDivElement>(null);
  const [selected,setSelected]=useState<Locale[]>(()=>{ try { const s=JSON.parse(localStorage.getItem('ujr-languages')||'["en"]'); return Array.isArray(s)&&s.length?s:['en']; } catch{return ['en'];}});
  useEffect(()=>{const close=(e:MouseEvent)=>{if(!wrap.current?.contains(e.target as Node))setOpen(false)};document.addEventListener('mousedown',close);return()=>document.removeEventListener('mousedown',close)},[]);
  useEffect(()=>{if(!selected.includes(locale)){const next=[...selected,locale];setSelected(next);localStorage.setItem('ujr-languages',JSON.stringify(next))}},[locale,selected]);
  const toggle=(code:Locale)=>{let next=selected.includes(code)?selected.filter(x=>x!==code):[...selected,code];if(!next.length)next=['en'];setSelected(next);localStorage.setItem('ujr-languages',JSON.stringify(next));if(next.includes(code))onPrimary(code);else if(code===locale)onPrimary(next[next.length-1]);};
  return <div className="language" ref={wrap}>
    <button className="icon-button language-trigger" onClick={()=>setOpen(!open)} aria-expanded={open}><Icons.Languages size={17}/><span>{selected.map(x=>locales.find(l=>l.code===x)?.short).join(' + ')}</span><Icons.ChevronDown size={14}/></button>
    {open&&<div className="language-popover"><strong>{t('language.title')}</strong><p>{t('language.hint')}</p>{locales.map(item=><label key={item.code}><input type="checkbox" checked={selected.includes(item.code)} onChange={()=>toggle(item.code)}/><span>{item.label}</span>{locale===item.code&&<em>Primary</em>}</label>)}</div>}
  </div>;
}

function Header({locale}:{locale:Locale}) {
  const {t}=useTranslation(); const navigate=useNavigate(); const location=useLocation(); const [menu,setMenu]=useState(false); const [dark,setDark]=useState(()=>localStorage.getItem('ujr-theme')==='dark'||(!localStorage.getItem('ujr-theme')&&matchMedia('(prefers-color-scheme: dark)').matches));
  useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('ujr-theme',dark?'dark':'light')},[dark]);
  const switchLocale=(next:Locale)=>{const rest=location.pathname.replace(/^\/(en|zh|ar)/,'');navigate(`/${next}${rest||'/'}`)};
  const nav=[['home',''],['about','about'],['products','products'],['services','services'],['why','why'],['contact','contact']];
  const handleNavigation=(hash:string)=>{setMenu(false);if(location.pathname===`/${locale}/`){requestAnimationFrame(()=>{if(hash)document.getElementById(hash)?.scrollIntoView({behavior:'smooth',block:'start'});else window.scrollTo({top:0,behavior:'smooth'})})}};
  return <header className="site-header"><div className="header-inner"><div className="brand-wrap"><Logo/><span className="brand-tagline">{t('common.tagline')}</span></div>
    <nav className={menu?'open':''} aria-label="Primary navigation">{nav.map(([key,hash])=><Link className={(location.hash.slice(1)||'home')===key?'active':''} key={key} onClick={()=>handleNavigation(hash)} to={`/${locale}/${hash?'#'+hash:''}`}>{t(`nav.${key}`)}</Link>)}</nav>
    <div className="header-actions"><LanguagePicker locale={locale} onPrimary={switchLocale}/><button className="icon-button theme" onClick={()=>setDark(!dark)} aria-label="Toggle color theme">{dark?<Icons.Sun size={17}/>:<Icons.Moon size={17}/>}</button><a className="button button-blue header-cta" href={whatsapp('Hello UJR TradeSource, I would like to discuss a sourcing enquiry.')} target="_blank" rel="noreferrer"><Icons.MessageCircle size={17}/>{t('common.getInTouch')}</a><button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="Open menu">{menu?<Icons.X/>:<Icons.Menu/>}</button></div>
  </div></header>;
}

function Seo({locale,title}:{locale:Locale;title?:string}) { useEffect(()=>{document.documentElement.lang=locale;document.documentElement.dir=locale==='ar'?'rtl':'ltr';document.title=title?`${title} | UJR TradeSource`:'UJR TradeSource International | Global Sourcing & Manufacturing';let canonical=document.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical)}canonical.href=`https://ujr.ae${location.pathname}`;document.querySelectorAll('link[rel="alternate"]').forEach(n=>n.remove());locales.forEach(l=>{const a=document.createElement('link');a.rel='alternate';a.hreflang=l.code;a.href=`https://ujr.ae/${l.code}/`;document.head.appendChild(a)})},[locale,title]); return null; }

function ScrollToHash() {
  const {hash,pathname}=useLocation();
  useEffect(()=>{
    if(!hash)return;
    const id=decodeURIComponent(hash.slice(1)); let cancelled=false; let attempts=0; let timer=0;
    const scroll=()=>{if(cancelled)return;const target=document.getElementById(id);if(target){target.scrollIntoView({behavior:'smooth',block:'start'});return}if(attempts++<10)timer=window.setTimeout(scroll,40)};
    timer=window.setTimeout(scroll,0);
    return()=>{cancelled=true;window.clearTimeout(timer)};
  },[hash,pathname]);
  return null;
}

function ProductImage({position}:{position:string}) { return <div className="product-image" style={{backgroundPosition:position}}/>; }

const revealDelay = (delay:number) => ({'--reveal-delay':`${delay}ms`} as CSSProperties);

function useScrollReveal(key:string) {
  useEffect(()=>{
    const elements=[...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){elements.forEach(element=>element.classList.add('in-view'));return;}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
    const frame=requestAnimationFrame(()=>elements.forEach(element=>{element.classList.add('reveal-pending');observer.observe(element)}));
    return()=>{cancelAnimationFrame(frame);observer.disconnect()};
  },[key]);
}

function HomePage({locale}:{locale:Locale}) {
  const {t}=useTranslation(); const featureIcons=[Icons.ShieldCheck,Icons.BadgeDollarSign,Icons.UsersRound,Icons.Globe2];
  const serviceIcons=[Icons.Search,Icons.Settings,Icons.Tags,Icons.ShieldCheck,Icons.Ship];
  useScrollReveal(locale);
  return <><Seo locale={locale}/><Header locale={locale}/><main>
    <section id="home" className="hero"><div className="hero-bg"/><div className="container hero-content"><div className="hero-copy"><p className="eyebrow">{t('common.eyebrow')}</p><h1>{t('hero.titleA')} <span>{t('hero.titleB')}</span></h1><p className="hero-lead">{t('hero.body')}</p><div className="hero-features">{['quality','prices','suppliers','shipping'].map((key,i)=>{const Icon=featureIcons[i];return <div key={key}><i><Icon/></i><span>{t(`hero.${key}`)}</span></div>})}</div><div className="hero-buttons"><a className="button button-whatsapp" href={whatsapp('Hello UJR TradeSource, I would like to make a general enquiry.')} target="_blank" rel="noreferrer"><Icons.MessageCircle size={19}/>{t('common.enquire')}</a><a className="button button-outline" href="#services">{t('hero.services')}<Icons.ArrowRight size={17}/></a></div></div></div>
    </section>
    <section id="products" className="section products-section"><div className="container"><div className="section-head" data-reveal><div><p className="eyebrow">{t('products.kicker')}</p><h2>{t('products.titleA')} <span>{t('products.titleB')}</span></h2></div><div><p>{t('products.body')}</p></div></div><div className="product-grid" id="product-grid">{categories.map((cat,i)=><Link to={`/${locale}/category/${cat.slug}`} className="product-card" data-reveal style={revealDelay((i%6)*55)} key={cat.slug}><ProductImage position={cat.imagePosition}/><span>{local(cat.title,locale)}</span><Icons.ArrowUpRight size={17}/></Link>)}</div></div></section>
    <section id="services" className="section services-section"><div className="container"><div className="section-head" data-reveal><div><p className="eyebrow">{t('services.kicker')}</p><h2>{t('services.title')}</h2></div><p>{t('services.body')}</p></div><div className="services-grid">{services.map((service,i)=>{const Icon=serviceIcons[i];return <article className="service-card" data-reveal style={revealDelay(i*70)} key={service.slug}><i><Icon/></i><h3>{local(service.title,locale)}</h3><p>{local(service.description,locale)}</p><a href={whatsapp(`Hello UJR TradeSource, I would like to enquire about ${service.title.en}.`)} target="_blank" rel="noreferrer">{t('common.learn')} <Icons.ArrowRight size={15}/></a></article>})}</div></div></section>
    <section id="about" className="section about-section"><div className="container about-grid"><article className="about-card" data-reveal><div><p className="eyebrow light">{t('about.kicker')}</p><h2>{t('about.title')}</h2><p>{t('about.body')}</p><div className="about-points"><span><Icons.ShieldCheck/>Quality</span><span><Icons.Handshake/>Trust</span><span><Icons.Globe2/>Global Reach</span></div></div></article><article id="why" className="why-card" data-reveal style={revealDelay(100)}><h2>{t('why.title')}</h2><ul>{(t('why.items',{returnObjects:true}) as string[]).map((item,i)=><li key={item} style={revealDelay(i*55)}><Icons.CircleCheckBig/>{item}</li>)}</ul></article></div></section>
    <section className="section portfolio"><div className="container"><div className="mini-head" data-reveal><div><p className="eyebrow">{t('portfolio.kicker')}</p><h2>{t('portfolio.title')}</h2></div><a href="#products">{t('common.viewAll')} <Icons.ArrowRight size={15}/></a></div><div className="portfolio-rail">{categories.slice(0,8).map((c,i)=><Link data-reveal style={revealDelay(i*45)} key={c.slug} to={`/${locale}/category/${c.slug}`}><ProductImage position={c.imagePosition}/><b>{local(c.title,locale)}</b></Link>)}</div></div></section>
    <section id="contact" className="contact-band"><div className="container contact-grid"><div data-reveal><h3>{t('social.title')}</h3><p>{t('social.body')}</p><div className="socials"><a href={company.instagram} target="_blank" rel="noreferrer"><Icons.Camera/>Instagram</a><a href={company.youtube} target="_blank" rel="noreferrer"><Icons.Play/>YouTube</a></div></div><div className="enquiry-box" data-reveal style={revealDelay(90)}><i><Icons.Mail/></i><div><h3>{t('social.enquiry')}</h3><p>{t('social.enquiryBody')}</p><a className="button button-blue" href={`mailto:${company.email}?subject=UJR%20TradeSource%20Enquiry`}>{t('social.button')} <Icons.ArrowRight size={16}/></a></div></div><div className="connection-art" data-reveal style={revealDelay(180)}><em>Building Global Connections</em><Icons.Plane/><span className="skyline">▁▃▅▂▆▇▃▅</span></div></div></section>
  </main><Footer locale={locale}/></>;
}

function CategoryPage({locale}:{locale:Locale}) {
  const {slug}=useParams(); const {t}=useTranslation(); const cat=categories.find(c=>c.slug===slug);
  useScrollReveal(`${locale}-${slug??''}`);
  if(!cat)return <NotFound locale={locale}/>;
  const title=local(cat.title,locale);
  return <><Seo locale={locale} title={title}/><Header locale={locale}/><main className="detail-page"><div className="container"><Link className="back-link" to={`/${locale}/#products`}><Icons.ArrowLeft/>{t('detail.back')}</Link><div className="detail-hero" data-reveal><ProductImage position={cat.imagePosition}/><div><p className="eyebrow">{t('products.kicker')}</p><h1>{title}</h1><p>{local(cat.description,locale)}</p><a className="button button-whatsapp" href={whatsapp(`Hello UJR TradeSource, I would like to enquire about ${cat.title.en}.`)} target="_blank" rel="noreferrer"><Icons.MessageCircle/>{t('common.enquire')}</a></div></div><section className="subcategories"><h2 data-reveal>{t('detail.subcategories')}</h2><div>{cat.subcategories.map((s,i)=><article data-reveal style={revealDelay(i*65)} key={s.en}><Icons.PackageCheck/><h3>{local(s,locale)}</h3></article>)}</div></section><section className="detail-cta" data-reveal><div><h2>{t('detail.needHelp')}</h2><p>{local(cat.description,locale)}</p></div><a className="button button-blue" href={whatsapp(`Hello UJR TradeSource, please help me source products in ${cat.title.en}.`)} target="_blank" rel="noreferrer">{t('common.getInTouch')}</a></section></div></main><Footer locale={locale}/></>
}

function Footer({locale}:{locale:Locale}) { const {t}=useTranslation(); return <footer><div className="container footer-grid"><div><Logo inverse/><p>{t('common.tagline')}</p></div><div><h4>{t('footer.quick')}</h4>{['home','about','products','services','why','contact'].map(x=><a key={x} href={`/${locale}/#${x}`}>{t(`nav.${x}`)}</a>)}</div><div><h4>{t('footer.contact')}</h4><a href={`mailto:${company.email}`}><Icons.Mail/>{company.email}</a><a href={`tel:${company.whatsapp}`}><Icons.Phone/>{company.phoneDisplay}</a><a href={whatsapp('Hello UJR TradeSource, I would like to make an enquiry.')} target="_blank" rel="noreferrer"><Icons.MessageCircle/>WhatsApp</a></div><div><h4>{t('footer.locations')}</h4><p><Icons.MapPin/>{company.chinaAddress}</p><p><Icons.MapPin/>{company.uaeAddress}</p></div></div><div className="footer-bottom container"><span>© 2026 UJR TradeSource International. {t('footer.rights')}</span><span><a href="#">{t('footer.privacy')}</a><a href="#">{t('footer.terms')}</a></span></div></footer> }

function NotFound({locale}:{locale:Locale}) {const {t}=useTranslation();return <><Seo locale={locale} title="404"/><Header locale={locale}/><main className="not-found"><strong>404</strong><h1>{t('notFound.title')}</h1><p>{t('notFound.body')}</p><Link className="button button-blue" to={`/${locale}/`}>{t('notFound.home')}</Link></main><Footer locale={locale}/></>}

function LocaleRoutes() { const params=useParams(); const locale=(localeSet.has(params.locale as Locale)?params.locale:'en') as Locale; const {i18n}=useTranslation(); useEffect(()=>{i18n.changeLanguage(locale)},[locale,i18n]); return <Routes><Route index element={<HomePage locale={locale}/>}/><Route path="category/:slug" element={<CategoryPage locale={locale}/>}/><Route path="*" element={<NotFound locale={locale}/>}/></Routes> }

export default function App(){return <><ScrollToHash/><Routes><Route path="/" element={<Navigate to="/en/" replace/>}/><Route path="/:locale/*" element={<LocaleRoutes/>}/><Route path="*" element={<Navigate to="/en/" replace/>}/></Routes></>}
