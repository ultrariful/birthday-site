/**
 * Blush Paper Moon design system: romantic editorial paper-craft, asymmetric storybook layout,
 * porcelain pink + cherry-ribbon red, glass stationery surfaces, DM Serif + Manrope + Caveat.
 */
import { useMemo, useRef, useState, type PointerEvent } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  CakeSlice,
  Camera,
  ChevronRight,
  Gift,
  Heart,
  ImagePlus,
  MailOpen,
  Music2,
  Pencil,
  RotateCcw,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";

type Memory = {
  title: string;
  caption: string;
  note: string;
  image: string;
};

type SiteConfig = {
  personName: string;
  birthdayDate: string;
  eyebrow: string;
  openingLine: string;
  envelopeTitle: string;
  envelopeBody: string;
  signOff: string;
  diaryTitle: string;
  diaryBody: string;
  memories: Memory[];
};

const media = {
  hero: "/manus-storage/blush-paper-moon-hero_4005c37e.jpg",
  garden: "/manus-storage/memory-garden_264bb2d1.jpg",
  cafe: "/manus-storage/memory-cafe_d5e45cb4.jpg",
  night: "/manus-storage/memory-night_d844d0ed.jpg",
  logo: "/manus-storage/ribbon-heart-logo_93b6209c.png",
};

function hostedAsset(source: string) {
  if (typeof window !== "undefined" && window.location.hostname.endsWith("github.io")) {
    return `${import.meta.env.BASE_URL}assets/${source.split("/").pop()}`;
  }
  return source;
}

const defaultConfig: SiteConfig = {
  personName: "My Favorite Person",
  birthdayDate: "2026-09-18",
  eyebrow: "a birthday love letter",
  openingLine: "Today, the whole sky is a little more yours.",
  envelopeTitle: "Open when you’re ready for something sweet.",
  envelopeBody:
    "I hope this new year of your life opens softly—full of the tiny joys, bright surprises, and quiet dreams you deserve. I’m so lucky the world has you in it.",
  signOff: "With all my love",
  diaryTitle: "A small entry for your big day",
  diaryBody:
    "Dear you,\n\nMay today hold you gently. May the cake be sweet, the laughter be loud, and the next chapter feel like a door opening toward everything you have been hoping for. Keep this little page as proof: you are so deeply loved.\n\nHappy birthday, always.",
  memories: [
    {
      title: "A golden afternoon",
      caption: "The kind we wished would last longer.",
      note: "For all the ordinary afternoons you made feel like a celebration.",
      image: hostedAsset(media.garden),
    },
    {
      title: "Strawberry days",
      caption: "Sweet, soft, and very us.",
      note: "Here’s to more tiny tables, shared treats, and stories that take their time.",
      image: hostedAsset(media.cafe),
    },
    {
      title: "The night we kept",
      caption: "Where the lights felt like little stars.",
      note: "May there always be a warm light waiting for you at the end of the day.",
      image: hostedAsset(media.night),
    },
  ],
};

const initialNotes = [
  { id: 1, title: "for your smile", text: "It changes the whole room.", x: 12, y: 18, rotate: -5 },
  { id: 2, title: "one wish", text: "More moments that feel like this.", x: 58, y: 9, rotate: 4 },
  { id: 3, title: "little reminder", text: "You make ordinary days softer.", x: 32, y: 58, rotate: -2 },
];

function formatDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return "your special day";
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric" }).format(parsed);
}

function playCelebrationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, context.currentTime + index * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.09, context.currentTime + index * 0.11 + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + index * 0.11 + 0.65);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(context.currentTime + index * 0.11);
      oscillator.stop(context.currentTime + index * 0.11 + 0.7);
    });
    window.setTimeout(() => context.close(), 1300);
  } catch {
    // Sound is a non-essential enhancement and may be blocked by a browser.
  }
}

export default function Home() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [introOpen, setIntroOpen] = useState(true);
  const [letterOpen, setLetterOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [flippedMemory, setFlippedMemory] = useState<number | null>(null);
  const [notes, setNotes] = useState(initialNotes);
  const dragRef = useRef<{ id: number; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const noteStageRef = useRef<HTMLDivElement>(null);

  const birthdayText = useMemo(() => formatDate(config.birthdayDate), [config.birthdayDate]);

  const updateConfig = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  const updateMemory = (index: number, key: keyof Memory, value: string) => {
    setConfig((current) => ({
      ...current,
      memories: current.memories.map((memory, memoryIndex) =>
        memoryIndex === index ? { ...memory, [key]: value } : memory,
      ),
    }));
  };

  const uploadMemory = (index: number, file?: File) => {
    if (!file) return;
    const image = URL.createObjectURL(file);
    updateMemory(index, "image", image);
  };

  const handleNotePointerDown = (event: PointerEvent<HTMLButtonElement>, id: number) => {
    const targetNote = notes.find((note) => note.id === id);
    if (!targetNote) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { id, startX: event.clientX, startY: event.clientY, originX: targetNote.x, originY: targetNote.y };
  };

  const handleNotePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current || !noteStageRef.current) return;
    const stage = noteStageRef.current.getBoundingClientRect();
    const { id, startX, startY, originX, originY } = dragRef.current;
    const x = Math.min(72, Math.max(1, originX + ((event.clientX - startX) / stage.width) * 100));
    const y = Math.min(72, Math.max(1, originY + ((event.clientY - startY) / stage.height) * 100));
    setNotes((current) => current.map((note) => (note.id === id ? { ...note, x, y } : note)));
  };

  const handleNotePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  };

  const beginSurprise = () => {
    playCelebrationChime();
    setIntroOpen(false);
  };

  return (
    <div className="birthday-page">
      <div className="grain" aria-hidden="true" />
      <div className="floating-hearts" aria-hidden="true">
        <i className="heart heart-a">♥</i><i className="heart heart-b">♥</i><i className="heart heart-c">♥</i><i className="heart heart-d">♥</i><i className="heart heart-e">♥</i>
      </div>

      {introOpen && (
        <section className="intro-overlay" aria-label="Birthday opening">
          <div className="intro-confetti" aria-hidden="true">
            {Array.from({ length: 28 }, (_, index) => <span key={index} style={{ "--i": index } as React.CSSProperties} />)}
          </div>
          <div className="intro-moon" aria-hidden="true" />
          <div className="cake-scene">
            <div className="cake-spark sparkle-one">✦</div>
            <div className="cake-spark sparkle-two">✦</div>
            <div className="cake-flame" />
            <div className="candle-wick" />
            <div className="candle" />
            <div className="cake-top"><span /><span /><span /></div>
            <div className="cake-bottom"><span /><span /><span /><span /></div>
            <div className="cake-plate" />
          </div>
          <div className="intro-copy">
            <p className="eyebrow-light">made with a little extra love</p>
            <h1>Happy birthday,<br /><em>{config.personName}</em></h1>
            <p className="intro-subtitle">A small celebration, waiting just for you.</p>
            <button className="intro-cta" onClick={beginSurprise}>
              Begin the surprise <ChevronRight aria-hidden="true" />
            </button>
            <p className="sound-hint"><Music2 aria-hidden="true" /> Includes a tiny celebration chime</p>
          </div>
        </section>
      )}

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to the start of this birthday letter">
          <img src={hostedAsset(media.logo)} alt="Ribbon heart with a candle spark" />
          <span>Birthday <em>for you</em></span>
        </a>
        <div className="header-actions">
          <a href="#memories" className="quiet-link">memory pages <ArrowDown aria-hidden="true" /></a>
          <button className="edit-trigger" onClick={() => setCustomizerOpen(true)}><Settings2 aria-hidden="true" /> add your touch</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles aria-hidden="true" /> {config.eyebrow}</p>
            <div className="hero-name-row"><span>For</span><div className="hero-doodle" /></div>
            <h2>{config.personName}</h2>
            <p className="hero-date">{birthdayText} <span>•</span> a day worth keeping</p>
            <p className="hero-message">{config.openingLine}</p>
            <a href="#letter" className="ribbon-button">Find your letter <MailOpen aria-hidden="true" /></a>
          </div>
          <div className="hero-art-wrap">
            <span className="paper-moon moon-hero" aria-hidden="true"><i>✦</i></span>
            <div className="hero-paper-backdrop" />
            <div className="hero-star star-one">✦</div><div className="hero-star star-two">✦</div>
            <img className="hero-art" src={hostedAsset(media.hero)} alt="A pink birthday cake with a glowing candle and floating paper hearts" />
            <span className="art-annotation">save a wish for later <i>↘</i></span>
          </div>
        </section>

        <section id="letter" className="letter-section">
          <span className="paper-moon moon-letter" aria-hidden="true"><i>✦</i></span>
          <div className="section-side-label"><span>01</span><p>the first surprise</p></div>
          <div className="letter-layout">
            <div className="letter-copy">
              <p className="eyebrow"><Heart aria-hidden="true" /> sealed with care</p>
              <h2>There’s a note<br />inside for you.</h2>
              <p>Not every celebration needs a crowd. This one is a quiet little corner that belongs to you.</p>
              <div className="letter-tip"><span>Tip</span> Tap the envelope and let the page unfold.</div>
            </div>
            <button className={`envelope ${letterOpen ? "is-open" : ""}`} onClick={() => setLetterOpen((open) => !open)} aria-expanded={letterOpen}>
              <span className="envelope-shadow" />
              <span className="envelope-back" />
              <span className="envelope-letter">
                <small>to {config.personName}</small>
                <strong>{config.envelopeTitle}</strong>
                <em>{config.envelopeBody}</em>
                <b>{config.signOff}</b>
              </span>
              <span className="envelope-flap" />
              <span className="envelope-front"><i>♥</i><small>{letterOpen ? "fold this moment close" : "open me"}</small></span>
            </button>
          </div>
        </section>

        <section className="notes-section">
          <div className="notes-heading">
            <p className="eyebrow"><Pencil aria-hidden="true" /> a few things to keep</p>
            <h2>Move these little notes<br />where you need them.</h2>
          </div>
          <div className="note-stage" ref={noteStageRef}>
            <div className="note-stage-grid" aria-hidden="true" />
            <p className="move-me">drag me around <span>↘</span></p>
            {notes.map((note) => (
              <button
                key={note.id}
                className="love-note"
                style={{ left: `${note.x}%`, top: `${note.y}%`, "--rotation": `${note.rotate}deg` } as React.CSSProperties}
                onPointerDown={(event) => handleNotePointerDown(event, note.id)}
                onPointerMove={handleNotePointerMove}
                onPointerUp={handleNotePointerUp}
                onPointerCancel={handleNotePointerUp}
              >
                <span className="pin">♥</span>
                <strong>{note.title}</strong>
                <em>{note.text}</em>
              </button>
            ))}
            <div className="notes-decoration decoration-flower">✽</div><div className="notes-decoration decoration-heart">♡</div>
          </div>
        </section>

        <section id="memories" className="memory-section">
          <div className="memory-intro">
            <div>
              <p className="eyebrow"><Camera aria-hidden="true" /> three pages for the archive</p>
              <h2>Little chapters,<br />turned into keepsakes.</h2>
            </div>
            <p>Each card flips open like a page from a book. Tap one to find the note that is waiting behind it.</p>
          </div>
          <div className="memory-ribbon"><span>some days become everything</span><i>✦</i><span>some days become everything</span></div>
          <div className="memory-row">
            {config.memories.map((memory, index) => (
              <button
                className={`memory-card memory-card-${index + 1} ${flippedMemory === index ? "is-flipped" : ""}`}
                key={memory.title}
                onClick={() => setFlippedMemory((current) => current === index ? null : index)}
                aria-pressed={flippedMemory === index}
              >
                <span className="memory-card-inner">
                  <span className="memory-face memory-front">
                    <span className="photo-frame"><img src={memory.image} alt={memory.title} /></span>
                    <span className="memory-front-copy"><small>memory {String(index + 1).padStart(2, "0")}</small><strong>{memory.title}</strong><em>{memory.caption}</em></span>
                    <span className="flip-label">turn over <RotateCcw aria-hidden="true" /></span>
                  </span>
                  <span className="memory-face memory-back">
                    <span className="back-stamp">for you</span>
                    <Heart className="back-heart" aria-hidden="true" />
                    <em>{memory.note}</em>
                    <span className="back-name">{config.personName}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="diary-section">
          <div className="diary-decoration diary-star">✦</div><div className="diary-decoration diary-heart">♥</div>
          <div className="diary-notebook">
            <div className="notebook-binding" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
            <div className="diary-page">
              <p className="diary-date">{birthdayText} <span>—</span> a page for you</p>
              <h2>{config.diaryTitle}</h2>
              <p className="diary-body">{config.diaryBody}</p>
              <div className="diary-signoff"><span>always,</span><strong>{config.signOff}</strong></div>
              <div className="diary-corner">♥</div>
            </div>
          </div>
          <div className="closing-copy">
            <Gift aria-hidden="true" />
            <p>Keep this close.</p>
            <span>Not just today. Any day you need a little reminder.</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <img src={hostedAsset(media.logo)} alt="" />
        <p>Made for <strong>{config.personName}</strong>, on a day that deserves a little more sparkle.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>back to the wish <ArrowUpRight aria-hidden="true" /></button>
      </footer>

      {customizerOpen && (
        <aside className="customizer" aria-label="Customize this birthday surprise">
          <div className="customizer-head">
            <div><p className="eyebrow"><Settings2 aria-hidden="true" /> leave your mark</p><h2>Write your touch</h2></div>
            <button className="icon-button" onClick={() => setCustomizerOpen(false)} aria-label="Close customizer"><X /></button>
          </div>
          <p className="customizer-intro">Your edits stay right in this browser while you create the surprise. Add your own photo links or upload pictures from this device.</p>
          <div className="customizer-scroll">
            <label className="field-label">Their name<input value={config.personName} onChange={(event) => updateConfig("personName", event.target.value)} /></label>
            <label className="field-label">Birthday date<input type="date" value={config.birthdayDate} onChange={(event) => updateConfig("birthdayDate", event.target.value)} /></label>
            <label className="field-label">Hero message<textarea rows={3} value={config.openingLine} onChange={(event) => updateConfig("openingLine", event.target.value)} /></label>
            <label className="field-label">Envelope title<textarea rows={2} value={config.envelopeTitle} onChange={(event) => updateConfig("envelopeTitle", event.target.value)} /></label>
            <label className="field-label">Envelope message<textarea rows={5} value={config.envelopeBody} onChange={(event) => updateConfig("envelopeBody", event.target.value)} /></label>
            <label className="field-label">Your sign-off<input value={config.signOff} onChange={(event) => updateConfig("signOff", event.target.value)} /></label>
            <label className="field-label">Diary heading<input value={config.diaryTitle} onChange={(event) => updateConfig("diaryTitle", event.target.value)} /></label>
            <label className="field-label">Diary message<textarea rows={7} value={config.diaryBody} onChange={(event) => updateConfig("diaryBody", event.target.value)} /></label>
            <div className="photo-editor">
              <p className="field-heading">Memory photos</p>
              {config.memories.map((memory, index) => (
                <div className="photo-field" key={`editor-${index}`}>
                  <div className="photo-number">0{index + 1}</div>
                  <div className="photo-fields">
                    <label className="field-label">Memory title<input value={memory.title} onChange={(event) => updateMemory(index, "title", event.target.value)} /></label>
                    <label className="field-label">Image URL<input value={memory.image} onChange={(event) => updateMemory(index, "image", event.target.value)} placeholder="https://..." /></label>
                    <label className="upload-button"><ImagePlus aria-hidden="true" /> upload from device<input type="file" accept="image/*" onChange={(event) => uploadMemory(index, event.target.files?.[0])} /></label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="customizer-foot"><button className="reset-button" onClick={() => setConfig(defaultConfig)}><RotateCcw aria-hidden="true" /> return to original</button><button className="done-button" onClick={() => setCustomizerOpen(false)}>Seal it close <Heart aria-hidden="true" /></button></div>
        </aside>
      )}
    </div>
  );
}
