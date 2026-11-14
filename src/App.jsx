import React, { useId, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeft, ArrowUpLeft, Check, CheckCircle2, ChevronDown, ChevronLeft, CirclePlay, ClipboardList, Dumbbell, ImagePlus, Menu, Play, ShieldCheck, Sparkles, Target, UserRound, X } from 'lucide-react'

const asset = file => `${import.meta.env.BASE_URL}assets/${file}`
const weeks = [
  { name: 'هفتهٔ اول', focus: 'شروع مطمئن', note: 'قبل از شروع، ۵ دقیقه بدن را گرم کن. کیفیت اجرای حرکت از سنگین‌تر زدن مهم‌تر است.' },
  { name: 'هفتهٔ دوم', focus: 'ساختن ریتم', note: 'حرکت‌ها را با کنترل کامل انجام بده و استراحت بین ست‌ها را رعایت کن.' },
  { name: 'هفتهٔ سوم', focus: 'پیشرفت تدریجی', note: 'اگر فرم اجرا درست است، شدت را کمی بیشتر کن و طبق توان خودت پیش برو.' },
  { name: 'هفتهٔ چهارم', focus: 'تثبیت نتیجه', note: 'این هفته کیفیت اجرا و ریکاوری را در اولویت بگذار.' },
]
const days = [
  { name: 'روز اول', title: 'بالاتنه و میان‌تنه', minutes: 45, exercises: [
    ['پرس سینه دمبل', '۳ ست · ۱۲ / ۱۰ / ۸', '۹۰ ثانیه'], ['قایقی سیم‌کش', '۳ ست · ۱۲ تکرار', '۷۵ ثانیه'], ['پرس سرشانه دمبل', '۳ ست · ۱۰ تکرار', '۷۵ ثانیه'], ['جلو بازو دمبل شیب‌دار', '۳ ست · ۱۲ تکرار', '۶۰ ثانیه', true], ['پلانک', '۳ ست · ۴۵ ثانیه', '۴۵ ثانیه'],
  ] },
  { name: 'روز دوم', title: 'پایین‌تنه و هوازی', minutes: 50, exercises: [
    ['اسکوات جام', '۳ ست · ۱۲ تکرار', '۹۰ ثانیه'], ['ددلیفت رومانیایی', '۳ ست · ۱۰ تکرار', '۹۰ ثانیه'], ['لانج راه‌رفتنی', '۳ ست · ۱۲ قدم', '۷۵ ثانیه'], ['ساق پا ایستاده', '۳ ست · ۱۵ تکرار', '۴۵ ثانیه'], ['هوازی آرام', '۱۵ دقیقه', 'شدت متوسط'],
  ] },
  { name: 'روز سوم', title: 'تمرین ترکیبی', minutes: 45, exercises: [
    ['پرس پا', '۳ ست · ۱۲ تکرار', '۹۰ ثانیه'], ['لت سیم‌کش', '۳ ست · ۱۲ تکرار', '۷۵ ثانیه'], ['شنا سوئدی', '۳ ست · ۸ تا ۱۲ تکرار', '۶۰ ثانیه'], ['جلو بازو دمبل شیب‌دار', '۲ ست · ۱۲ تکرار', '۶۰ ثانیه', true], ['کرانچ معکوس', '۳ ست · ۱۵ تکرار', '۴۵ ثانیه'],
  ] },
]
const features = [
  { no: '۰۱', label: 'شناخت', title: 'پروفایل دقیق', text: 'هدف، سابقه و شرایط تمرین', Icon: UserRound },
  { no: '۰۲', label: 'برنامه', title: 'برنامهٔ یک‌ماهه', text: 'تمام هفته‌ها و روزها، یکجا', Icon: ClipboardList },
  { no: '۰۳', label: 'اجرا', title: 'نمایش حرکت', text: 'راهنمای تصویری کنار هر تمرین', Icon: CirclePlay },
]
const goals = [
  { name: 'تناسب اندام', caption: 'متعادل و آماده', Icon: Target, tone: 'peach' },
  { name: 'عضله‌سازی', caption: 'قوی‌تر و حجیم‌تر', Icon: Dumbbell, tone: 'mint' },
  { name: 'فرم ورزشی', caption: 'چابک و عملکردی', Icon: Sparkles, tone: 'blue' },
]

function ButtonLink({ href, children }) {
  return <a href={href} className="button primary">{children}<ArrowLeft size={18} /></a>
}

function SelectField({ label, value, onChange, options, placeholder = 'انتخاب کن' }) {
  const id = useId()
  return <div className="field"><label id={id}>{label}</label><Select.Root dir="rtl" value={value} onValueChange={onChange}>
    <Select.Trigger className="select-trigger" aria-labelledby={id}><Select.Value placeholder={placeholder} /><Select.Icon><ChevronDown size={18} /></Select.Icon></Select.Trigger>
    <Select.Portal><Select.Content className="select-content" position="popper" sideOffset={8} align="start"><Select.Viewport className="select-viewport">{options.map(option => <Select.Item className="select-item" value={option} key={option}><Select.ItemText>{option}</Select.ItemText><Select.ItemIndicator><Check size={16} /></Select.ItemIndicator></Select.Item>)}</Select.Viewport></Select.Content></Select.Portal>
  </Select.Root></div>
}

function Header() {
  return <><div className="top-note">پیش‌نمایش محصول برای ارائه به مربی <span>·</span> اطلاعات و برنامه‌ها نمونه هستند</div><header className="site-header container">
    <a href="#top" className="brand" aria-label="مبینا، بازگشت به بالای صفحه"><span className="brand-mark">M</span><span className="brand-type"><strong>مبینا</strong><small>COACHING STUDIO</small></span></a>
    <nav aria-label="بخش‌های صفحه"><a href="#how">چطور کار می‌کند</a><a href="#intake">مسیر شاگرد</a><a href="#plan">برنامهٔ نمونه</a><a href="#coach">پنل مربی</a></nav>
    <a className="header-action" href="#plan">دیدن دمو <ArrowLeft size={16} /></a>
  </header></>
}

function Hero() {
  return <section id="top" className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow light"><span />فضای اختصاصی مربی و شاگرد</span><h1>برنامه‌ای که<br />با <em>تو</em> پیش می‌رود.</h1><p>از شناخت هدف و فرم بدنی تا دریافت برنامهٔ کامل چهار هفته‌ای؛ همه‌چیز در یک تجربهٔ ساده، مرتب و حرفه‌ای.</p><div className="hero-actions"><ButtonLink href="#intake">مسیر شاگرد را ببین</ButtonLink><a className="button ghost" href="#plan">برنامهٔ نمونه را باز کن</a></div><div className="hero-proof"><span><CheckCircle2 size={17} /> برنامهٔ کامل چهار هفته‌ای</span><span><ShieldCheck size={17} /> مسیر اختصاصی هر شاگرد</span></div></div></div><div className="demo-chip"><span className="live-dot" /> DEMO <span>· نسخهٔ نمایشی بدون ذخیرهٔ اطلاعات</span></div></section>
}

function Features() {
  return <div className="container feature-grid" aria-label="ویژگی‌های دمو">{features.map(({ no, label, title, text, Icon }, i) => <div className={`feature-card feature-${i + 1}`} key={no}><div className="feature-icon"><Icon size={27} strokeWidth={1.8} /></div><div className="feature-content"><span className="feature-index">{no} / {label}</span><strong>{title}</strong><span>{text}</span></div><ArrowUpLeft className="feature-arrow" size={17} /></div>)}</div>
}

function HowItWorks() {
  const steps = [
    { Icon: UserRound, title: 'شناخت شاگرد', text: 'قد، وزن، سابقه، روزهای آزاد و شرایط تمرین در یک فرم ساده و مرحله‌ای.' },
    { Icon: Target, title: 'هدف و عکس‌ها', text: 'انتخاب فرم بدنی دلخواه، توضیح آزاد و راهنمای روشن عکس‌های سه زاویه.' },
    { Icon: ClipboardList, title: 'برنامهٔ کامل ماه', text: 'چهار هفتهٔ تمرین با روزها، حرکات، ست و تکرار، استراحت و راهنمای اجرا.' },
  ]
  return <section id="how" className="section how-section"><div className="container"><div className="section-intro split"><div><span className="eyebrow">مسیر روشن، از شروع تا اجرا</span><h2>همه‌چیز برای یک تجربهٔ شخصی</h2></div><p>شاگرد اطلاعاتش را در چند قدم ثبت می‌کند؛ مربی با دیدن پرونده، برنامهٔ اختصاصی را می‌نویسد و کل ماه را یکجا در اختیار او می‌گذارد.</p></div><div className="how-grid">{steps.map(({ Icon, title, text }, i) => <article className="how-card" key={title}><span className="how-number">{['۰۱','۰۲','۰۳'][i]}</span><div className="how-icon"><Icon size={25} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
}

function PhotoFigure({ angle }) {
  return <svg viewBox="0 0 80 100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx={angle === 'side' ? 43 : 40} cy="16" r="9" />
    {angle === 'side' ? <><path d="M37 35c9-4 15 1 16 6l-3 25H36l1-31Z"/><path d="m51 41 9 18-8 7m-14-25-7 17m7 8-3 28m14-28 6 28"/></> : <><path d="M20 39q20-11 40 0l-7 28H27l-7-28Z"/><path d="m21 40-10 26m48-26 10 26M30 68l-3 26m23-26 3 26"/>{angle === 'back' && <path d="M40 34v30M31 42l9 7 9-7" strokeWidth="1.5"/>}</>}
  </svg>
}

function PhotoCard({ label, hint, angle, file, onChange }) {
  return <label className={`photo-card ${file ? 'uploaded' : ''}`}><span className="photo-art"><PhotoFigure angle={angle} /></span><span className="photo-copy"><strong>{label}</strong><small>{file ? 'عکس انتخاب شد' : hint}</small></span><span className="photo-plus">{file ? <Check size={17} /> : <ImagePlus size={17} />}</span><input type="file" accept="image/*" aria-label={`انتخاب عکس ${label}`} onChange={onChange} /></label>
}

function Intake() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', experience: '', height: '', weight: '', location: 'باشگاه مجهز', days: 3, goal: 'تناسب اندام', details: '', limitation: '' })
  const [files, setFiles] = useState({ front: null, side: null, back: null })
  const set = (key, value) => setForm(current => ({ ...current, [key]: value }))
  return <section id="intake" className="section intake-section"><div className="container">
    <div className="section-intro split"><div><span className="eyebrow">دموی تعاملی · مسیر شاگرد</span><h2>شروعی آسان، اطلاعاتی کامل</h2></div><p>فرم نمونه را امتحان کنید. ورودی‌ها فقط در همین صفحه نمایش داده می‌شوند و هیچ اطلاعات یا عکسی به سرور ارسال نمی‌شود.</p></div>
    <div className="intake-shell"><aside className="intake-side"><span className="pill pill-outline">شروع مسیر</span><h3>برنامهٔ مناسب، از شناخت درست شروع می‌شود.</h3><p>سه مرحلهٔ کوتاه تا مربی تصویر روشنی از شرایط و هدف شاگرد داشته باشد.</p><div className="step-list">{['شرایط تمرین', 'فرم دلخواه', 'عکس‌های فعلی'].map((name, i) => <div className={`step-item ${step === i && !done ? 'active' : ''} ${i < step || done ? 'complete' : ''}`} key={name}><span>{i < step || done ? <Check size={17} /> : ['۰۱','۰۲','۰۳'][i]}</span>{name}</div>)}</div><div className="privacy-note"><ShieldCheck size={18} /> اطلاعات شخصی و عکس‌ها در نسخهٔ واقعی فقط برای شاگرد و مربی قابل مشاهده‌اند.</div></aside>
      <div className="intake-content">{done ? <div className="intake-success"><span><CheckCircle2 size={39} /></span><h3>پروفایل آمادهٔ بررسی است</h3><p>در نسخهٔ واقعی، مربی این اطلاعات را در پنل خود می‌بیند و برنامهٔ چهار هفته‌ای را برای شاگرد آماده می‌کند.</p><div className="success-actions"><ButtonLink href="#plan">برنامهٔ نمونه را ببین</ButtonLink><button className="button outline" onClick={() => { setDone(false); setStep(0) }}>شروع دوباره</button></div></div> : <>
        <div className="form-top"><span className="pill">مرحلهٔ {(step + 1).toLocaleString('fa-IR')} از ۳</span><span className="form-progress"><i style={{ width: `${(step + 1) * 33.333}%` }} /></span></div>
        {step === 0 && <div className="step-panel"><h3>از خودت برامون بگو</h3><p>چند مورد ساده، تا برنامه با شرایط واقعی تو هماهنگ باشد.</p><div className="field-grid">
          <label className="field">نام شاگرد<input value={form.name} onChange={e => set('name', e.target.value)} placeholder="مثلاً سارا احمدی" autoComplete="off" /></label>
          <SelectField label="سابقهٔ تمرین" value={form.experience} onChange={v => set('experience', v)} options={['تازه‌کار', 'متوسط', 'حرفه‌ای']} />
          <label className="field">قد (سانتی‌متر)<input value={form.height} onChange={e => set('height', e.target.value)} type="number" inputMode="decimal" placeholder="۱۷۰" min="100" max="230" /></label>
          <label className="field">وزن (کیلوگرم)<input value={form.weight} onChange={e => set('weight', e.target.value)} type="number" inputMode="decimal" placeholder="۶۸" min="25" max="300" /></label>
          <SelectField label="محل تمرین" value={form.location} onChange={v => set('location', v)} options={['باشگاه مجهز', 'خانه با تجهیزات', 'خانه بدون تجهیزات']} />
        </div><div className="choice-group"><span>تعداد روزهای تمرین</span><div>{[2, 3, 4, 5].map(n => <button className={`choice ${form.days === n ? 'selected' : ''}`} key={n} type="button" onClick={() => set('days', n)}>{n.toLocaleString('fa-IR')} روز در هفته</button>)}</div></div></div>}
        {step === 1 && <div className="step-panel"><h3>چه هدفی در ذهن داری؟</h3><p>این نمونه‌ها برای گفت‌وگو با مربی‌اند؛ انتخاب تو هدف را روشن‌تر می‌کند.</p><div className="goal-grid">{goals.map(({ name, caption, Icon, tone }) => <button type="button" aria-pressed={form.goal === name} className={`goal-card ${tone} ${form.goal === name ? 'selected' : ''}`} key={name} onClick={() => set('goal', name)}><span className="goal-art"><Icon size={32} strokeWidth={1.5} /></span><span><strong>{name}</strong><small>{caption}</small></span><span className="goal-check"><Check size={14} /></span></button>)}</div><div className="field-grid after-goals"><label className="field full">اگر توضیح بیشتری داری بنویس<textarea value={form.details} onChange={e => set('details', e.target.value)} placeholder="مثلاً دوست دارم روی قدرت پا و فرم بالاتنه بیشتر کار کنم..." /></label><label className="field full">محدودیت یا نکته‌ای که مربی باید بداند<input value={form.limitation} onChange={e => set('limitation', e.target.value)} placeholder="مثلاً تمرین‌های پرش را ترجیح نمی‌دهم" /></label></div></div>}
        {step === 2 && <div className="step-panel"><h3>راهنمای عکس‌های فعلی</h3><p>برای مقایسهٔ درست، تمام‌قد، با نور کافی و دوربین هم‌سطح بدن عکس بگیر.</p><div className="photo-grid"><PhotoCard label="روبه‌رو" angle="front" hint="بدن کامل در کادر" file={files.front} onChange={e => setFiles(f => ({ ...f, front: e.target.files?.[0] || null }))} /><PhotoCard label="نیم‌رخ" angle="side" hint="از کنار، ایستاده" file={files.side} onChange={e => setFiles(f => ({ ...f, side: e.target.files?.[0] || null }))} /><PhotoCard label="از پشت" angle="back" hint="بدن کامل در کادر" file={files.back} onChange={e => setFiles(f => ({ ...f, back: e.target.files?.[0] || null }))} /></div><div className="photo-tip"><ShieldCheck size={18} /> برای این دمو، انتخاب عکس اختیاری است و فایل از دستگاه شما خارج نمی‌شود.</div></div>}
        <div className="form-actions">{step > 0 ? <button className="button outline" onClick={() => setStep(s => s - 1)}>بازگشت</button> : <span />}{step < 2 ? <button className="button primary" onClick={() => setStep(s => s + 1)}>ادامه <ArrowLeft size={18} /></button> : <button className="button primary" onClick={() => setDone(true)}>نمایش نتیجه <ArrowLeft size={18} /></button>}</div>
      </>}</div>
    </div>
  </div></section>
}

function MovementDialog() {
  return <Dialog.Root><Dialog.Trigger asChild><button type="button" className="movement-link"><Play size={14} fill="currentColor" /> نمایش حرکت</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="dialog-overlay" /><Dialog.Content className="dialog-content" dir="rtl"><div className="dialog-head"><div><span className="eyebrow">راهنمای تصویری</span><Dialog.Title>جلو بازو دمبل شیب‌دار</Dialog.Title><Dialog.Description>نمونهٔ نمایش متحرک حرکت</Dialog.Description></div><Dialog.Close className="dialog-close" aria-label="بستن"><X size={20} /></Dialog.Close></div><div className="movement-stage"><img src={asset('curl-start.webp')} alt="حالت شروع جلو بازو دمبل شیب‌دار" /><img className="end-pose" src={asset('curl-end.webp')} alt="حالت پایان جلو بازو دمبل شیب‌دار" /></div><p className="dialog-note">این نمایش، نمونهٔ اختصاصی برای دمو است. آموزش نهایی با تأیید مربی انتخاب می‌شود.</p></Dialog.Content></Dialog.Portal></Dialog.Root>
}

function Plan() {
  const [week, setWeek] = useState(0)
  const [day, setDay] = useState(0)
  const selectedDay = days[day]
  return <section id="plan" className="section plan-section"><div className="container"><div className="section-intro plan-intro"><div><span className="eyebrow">دموی تعاملی · پنل شاگرد</span><h2>کل برنامهٔ ماه، همین‌جا</h2><p>شاگرد از روز اول به تمام چهار هفته دسترسی دارد. با تب‌های زیر هفته و روز را عوض کنید و جزئیات حرکت نمونه را ببینید.</p></div><a href="#coach" className="button outline">نمای مربی <ArrowLeft size={17} /></a></div><div className="plan-shell"><div className="plan-banner"><div><span className="pill pill-outline">برنامهٔ نمایشی</span><h3>قدرت و تناسب · ۴ هفته</h3><p>۳ روز تمرین در هفته · مناسب باشگاه · برنامهٔ فرضی برای نمایش محصول</p></div><span className="plan-badge"><CheckCircle2 size={17} /> تمام برنامه از ابتدا در دسترس است</span></div><div className="week-tabs" role="tablist" aria-label="هفته‌های برنامه">{weeks.map((w, i) => <button role="tab" aria-selected={week === i} className={week === i ? 'active' : ''} onClick={() => setWeek(i)} key={w.name}>{w.name}</button>)}</div><div className="plan-body"><aside className="day-list" aria-label="روزهای تمرین"><h4>روزهای این هفته</h4>{days.map((d, i) => <button className={`day-button ${day === i ? 'active' : ''}`} key={d.name} onClick={() => setDay(i)}><span><strong>{d.name}</strong><small>{d.title}</small></span><ChevronLeft size={18} /></button>)}</aside><div className="workout"><div className="workout-heading"><div><span className="workout-kicker">{weeks[week].name} <span>·</span> {weeks[week].focus}</span><h4>{selectedDay.name} · {selectedDay.title}</h4><p>۵ حرکت برای این جلسه</p></div><span className="duration">حدود {selectedDay.minutes.toLocaleString('fa-IR')} دقیقه</span></div><div className="exercise-list">{selectedDay.exercises.map(([name, prescription, rest, hasDemo], i) => <article className="exercise" key={`${day}-${i}`}><span className="exercise-icon"><Dumbbell size={23} strokeWidth={1.7} /></span><div className="exercise-name"><strong><span>{String(i + 1).padStart(2, '0')}</span> · {name}</strong><small>{rest === 'شدت متوسط' ? rest : `استراحت ${rest}`}</small></div><div className="exercise-detail"><b>{week === 2 ? prescription.replace('۳ ست', '۴ ست') : week === 3 ? prescription.replace('۳ ست', '۲ ست') : prescription}</b>{hasDemo && <MovementDialog />}</div></article>)}</div><p className="coach-note"><Sparkles size={17} /><span><b>یادداشت مربی: </b>{weeks[week].note}</span></p></div></div></div></div></section>
}

function Coach() {
  return <section id="coach" className="section coach-section"><div className="container coach-grid"><div className="coach-copy"><span className="eyebrow">پشت صحنهٔ برنامه</span><h2>مربی همه‌چیز را<br />یکجا می‌بیند.</h2><p>اطلاعات شاگرد، هدف بدنی، عکس‌های ثبت‌شده و برنامهٔ ماهانه در یک پنل جمع می‌شوند تا مربی وقتش را صرف طراحی تمرین کند.</p><div className="coach-benefits"><div><Check size={17} /> پروندهٔ اختصاصی برای هر شاگرد دعوت‌شده</div><div><Check size={17} /> چیدن حرکات از کتابخانهٔ تصویری و تعیین ست، تکرار و استراحت</div><div><Check size={17} /> نمایش مرتب کل برنامهٔ چهار هفته‌ای به شاگرد</div></div></div><div className="coach-frame"><div className="coach-screen"><div className="screen-top"><span><Menu size={16} /> پنل مربی</span><span>پیش‌نمایش</span></div><div className="screen-person"><span>س</span><div><strong>سارا احمدی</strong><small>شاگرد نمونه · هدف: تناسب اندام</small></div><b>پرونده کامل</b></div>{[['اطلاعات اولیه', 'قد، وزن، سابقه، هدف'], ['عکس‌های ثبت‌شده', '۳ زاویه'], ['برنامهٔ ماهانه', '۴ هفته · ۱۲ جلسه'], ['کتابخانهٔ حرکات', 'انتخاب و افزودن']].map(([label, value]) => <div className="screen-row" key={label}><strong>{label}</strong><span>{value} <ChevronLeft size={15} /></span></div>)}</div></div></div></section>
}

export default function App() {
  return <><Header /><main><Hero /><Features /><HowItWorks /><Intake /><Plan /><Coach /><section className="closing"><div className="container"><span className="eyebrow light">از ایده تا تجربهٔ واقعی</span><h2>یک فضای تمرینی که شاگرد دوست دارد به آن برگردد.</h2><p>این نسخه برای نمایش ظاهر و مسیر کار ساخته شده است. داده‌ها، نام مربی، برنامه‌ها و هویت بصری در نسخهٔ نهایی اختصاصی می‌شوند.</p><ButtonLink href="#intake">دمو را دوباره امتحان کن</ButtonLink></div></section></main><footer><div className="container footer-inner"><span><strong>مبینا</strong> · دموی مفهومی سامانهٔ برنامه تمرینی</span><small>نام‌ها، برنامهٔ تمرینی و تصویرهای این صفحه نمونه‌اند.</small></div></footer></>
}
