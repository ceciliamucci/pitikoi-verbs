import { useState, useEffect, useCallback } from "react";
import { CheckCircle, XCircle, RotateCcw, Zap, Trophy, BookOpen, ChevronRight, Star } from "lucide-react";
import pitikoLogo from "../assets/pitiko-logo.png";

const VERBS = [
  { base: "be", past: "was/were", participle: "been", meaning: "ser/estar" },
  { base: "beat", past: "beat", participle: "beaten", meaning: "golpear/vencer" },
  { base: "become", past: "became", participle: "become", meaning: "convertirse" },
  { base: "begin", past: "began", participle: "begun", meaning: "comenzar" },
  { base: "bite", past: "bit", participle: "bitten", meaning: "morder" },
  { base: "blow", past: "blew", participle: "blown", meaning: "soplar" },
  { base: "break", past: "broke", participle: "broken", meaning: "romper" },
  { base: "bring", past: "brought", participle: "brought", meaning: "traer" },
  { base: "build", past: "built", participle: "built", meaning: "construir" },
  { base: "buy", past: "bought", participle: "bought", meaning: "comprar" },
  { base: "catch", past: "caught", participle: "caught", meaning: "atrapar" },
  { base: "choose", past: "chose", participle: "chosen", meaning: "elegir" },
  { base: "come", past: "came", participle: "come", meaning: "venir" },
  { base: "cost", past: "cost", participle: "cost", meaning: "costar" },
  { base: "cut", past: "cut", participle: "cut", meaning: "cortar" },
  { base: "do", past: "did", participle: "done", meaning: "hacer" },
  { base: "draw", past: "drew", participle: "drawn", meaning: "dibujar" },
  { base: "dream", past: "dreamt", participle: "dreamt", meaning: "soñar" },
  { base: "drink", past: "drank", participle: "drunk", meaning: "beber" },
  { base: "drive", past: "drove", participle: "driven", meaning: "conducir" },
  { base: "eat", past: "ate", participle: "eaten", meaning: "comer" },
  { base: "fall", past: "fell", participle: "fallen", meaning: "caer" },
  { base: "feel", past: "felt", participle: "felt", meaning: "sentir" },
  { base: "fight", past: "fought", participle: "fought", meaning: "pelear" },
  { base: "find", past: "found", participle: "found", meaning: "encontrar" },
  { base: "fly", past: "flew", participle: "flown", meaning: "volar" },
  { base: "forget", past: "forgot", participle: "forgotten", meaning: "olvidar" },
  { base: "get", past: "got", participle: "gotten", meaning: "obtener" },
  { base: "give", past: "gave", participle: "given", meaning: "dar" },
  { base: "go", past: "went", participle: "gone", meaning: "ir" },
  { base: "grow", past: "grew", participle: "grown", meaning: "crecer" },
  { base: "have", past: "had", participle: "had", meaning: "tener" },
  { base: "hear", past: "heard", participle: "heard", meaning: "escuchar" },
  { base: "hide", past: "hid", participle: "hidden", meaning: "esconder" },
  { base: "hit", past: "hit", participle: "hit", meaning: "golpear" },
  { base: "hold", past: "held", participle: "held", meaning: "sostener" },
  { base: "keep", past: "kept", participle: "kept", meaning: "mantener" },
  { base: "know", past: "knew", participle: "known", meaning: "saber/conocer" },
  { base: "leave", past: "left", participle: "left", meaning: "dejar/salir" },
  { base: "lose", past: "lost", participle: "lost", meaning: "perder" },
  { base: "make", past: "made", participle: "made", meaning: "hacer/fabricar" },
  { base: "meet", past: "met", participle: "met", meaning: "conocer/reunirse" },
  { base: "pay", past: "paid", participle: "paid", meaning: "pagar" },
  { base: "put", past: "put", participle: "put", meaning: "poner" },
  { base: "read", past: "read", participle: "read", meaning: "leer" },
  { base: "ride", past: "rode", participle: "ridden", meaning: "montar" },
  { base: "ring", past: "rang", participle: "rung", meaning: "sonar/llamar" },
  { base: "rise", past: "rose", participle: "risen", meaning: "levantarse" },
  { base: "run", past: "ran", participle: "run", meaning: "correr" },
  { base: "say", past: "said", participle: "said", meaning: "decir" },
  { base: "see", past: "saw", participle: "seen", meaning: "ver" },
  { base: "sell", past: "sold", participle: "sold", meaning: "vender" },
  { base: "send", past: "sent", participle: "sent", meaning: "enviar" },
  { base: "sing", past: "sang", participle: "sung", meaning: "cantar" },
  { base: "sit", past: "sat", participle: "sat", meaning: "sentarse" },
  { base: "sleep", past: "slept", participle: "slept", meaning: "dormir" },
  { base: "speak", past: "spoke", participle: "spoken", meaning: "hablar" },
  { base: "spend", past: "spent", participle: "spent", meaning: "gastar/pasar" },
  { base: "stand", past: "stood", participle: "stood", meaning: "estar de pie" },
  { base: "steal", past: "stole", participle: "stolen", meaning: "robar" },
  { base: "swim", past: "swam", participle: "swum", meaning: "nadar" },
  { base: "take", past: "took", participle: "taken", meaning: "tomar" },
  { base: "teach", past: "taught", participle: "taught", meaning: "enseñar" },
  { base: "tell", past: "told", participle: "told", meaning: "decir/contar" },
  { base: "think", past: "thought", participle: "thought", meaning: "pensar" },
  { base: "throw", past: "threw", participle: "thrown", meaning: "lanzar" },
  { base: "understand", past: "understood", participle: "understood", meaning: "entender" },
  { base: "wake", past: "woke", participle: "woken", meaning: "despertar" },
  { base: "wear", past: "wore", participle: "worn", meaning: "llevar puesto" },
  { base: "win", past: "won", participle: "won", meaning: "ganar" },
  { base: "write", past: "wrote", participle: "written", meaning: "escribir" },
];


function getRandomIndex(max) {
  if (window.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    return values[0] % max;
  }

  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = getRandomIndex(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createDeck() {
  const deck = shuffle(VERBS);

  if (deck[0]?.base === VERBS[0].base && deck.length > 1) {
    const swapIndex = getRandomIndex(deck.length - 1) + 1;
    [deck[0], deck[swapIndex]] = [deck[swapIndex], deck[0]];
  }

  return deck;
}

function getWrongOptions(correct, field, count = 3) {
  const pool = VERBS.map((v) => v[field]).filter((v) => v !== correct);
  return shuffle(pool).slice(0, count);
}

// ─── Flashcard screen ───────────────────────────────────────────────────────

function FlashcardScreen({ onBack }) {
  const [deck, setDeck] = useState(() => createDeck());
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [done, setDone] = useState(false);

  const verb = deck[index];
  const total = deck.length;
  const progress = ((index) / total) * 100;

  const advance = useCallback(
    (knew) => {
      if (knew) setCorrect((c) => c + 1);
      else setSkipped((c) => c + 1);
      if (index + 1 >= total) {
        setDone(true);
      } else {
        setIndex((i) => i + 1);
        setFlipped(false);
      }
    },
    [index, total]
  );

  if (done) {
    return (
      <ResultScreen
        correct={correct}
        total={total}
        onBack={onBack}
        onRetry={() => {
          setDeck(createDeck());
          setDone(false);
          setIndex(0);
          setCorrect(0);
          setSkipped(0);
          setFlipped(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header onBack={onBack} title="Flashcards" />

      {/* Progress bar */}
      <div className="w-full h-1 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        {/* Counter */}
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <span className="font-mono">{index + 1}</span>
          <span className="text-border">/</span>
          <span className="font-mono">{total}</span>
          <span className="mx-2 text-border">·</span>
          <CheckCircle className="w-4 h-4 text-primary" />
          <span className="font-mono text-primary">{correct}</span>
        </div>

        {/* Card */}
        <div
          className="w-full max-w-sm cursor-pointer select-none"
          style={{ perspective: "1000px" }}
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
              minHeight: "260px",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-2xl border border-border bg-card shadow-[0_20px_60px_rgba(88,18,105,0.18)] flex flex-col items-center justify-center gap-4 p-8"
              style={{ backfaceVisibility: "hidden" }}
            >
              <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">base form</span>
              <span
                className="text-5xl font-black text-foreground"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {verb.base}
              </span>
              <span className="text-sm text-muted-foreground italic">{verb.meaning}</span>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <RotateCcw className="w-3 h-3" />
                tap to reveal
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl border border-primary/70 bg-card shadow-[0_20px_60px_rgba(88,18,105,0.18)] flex flex-col items-center justify-center gap-5 p-8"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">conjugations</span>
              <div className="w-full space-y-3">
                {["base", "past", "participle"].map((field) => (
                  <div key={field} className="flex items-center justify-between gap-4 rounded-lg bg-secondary px-4 py-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider w-24">{field}</span>
                    <span
                      className="text-lg font-semibold text-foreground"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {verb[field]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        {flipped ? (
          <div className="flex gap-4 w-full max-w-sm">
            <button
              onClick={() => advance(false)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-destructive/40 bg-white/35 text-destructive py-3 font-semibold hover:bg-destructive/10 active:bg-accent active:text-accent-foreground transition-colors"
            >
              <XCircle className="w-5 h-5" />
              I missed it
            </button>
            <button
              onClick={() => advance(true)}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-primary/70 bg-primary text-primary-foreground py-3 font-semibold hover:brightness-105 active:bg-accent active:text-accent-foreground transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              I knew it
            </button>
          </div>
        ) : (
          <button
            onClick={() => setFlipped(true)}
            className="w-full max-w-sm rounded-xl bg-primary text-primary-foreground py-3 font-semibold hover:brightness-105 active:bg-accent active:text-accent-foreground transition-colors shadow-[0_14px_35px_rgba(88,18,105,0.18)]"
          >
            Reveal
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Quiz screen ─────────────────────────────────────────────────────────────

function QuizScreen({ onBack }) {
  const [deck, setDeck] = useState(() => createDeck());
  const [index, setIndex] = useState(0);
  const [field] = useState("past");
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [done, setDone] = useState(false);

  const verb = deck[index];
  const total = deck.length;
  const answer = verb[field];

  useEffect(() => {
    const wrongs = getWrongOptions(answer, field);
    setOptions(shuffle([answer, ...wrongs]));
    setSelected(null);
  }, [index, answer, field]);

  const choose = (opt) => {
    if (selected) return;
    setSelected(opt);
    const isRight = opt === answer;
    if (isRight) {
      setCorrect((c) => c + 1);
      setStreak((s) => {
        const next = s + 1;
        setMaxStreak((m) => Math.max(m, next));
        return next;
      });
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      if (index + 1 >= total) setDone(true);
      else setIndex((i) => i + 1);
    }, 900);
  };

  if (done) {
    return (
      <ResultScreen
        correct={correct}
        total={total}
        streak={maxStreak}
        onBack={onBack}
        onRetry={() => {
          setDeck(createDeck());
          setDone(false);
          setIndex(0);
          setCorrect(0);
          setStreak(0);
          setMaxStreak(0);
        }}
      />
    );
  }

  const progress = (index / total) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header onBack={onBack} title="Quiz" />

      <div className="w-full h-1 bg-secondary">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8 max-w-sm mx-auto w-full">
        {/* Streak */}
        <div className="self-end flex items-center gap-1.5 text-sm font-semibold">
          <Zap className={`w-4 h-4 ${streak > 0 ? "text-yellow-400" : "text-muted-foreground"}`} />
          <span className={streak > 0 ? "text-yellow-400" : "text-muted-foreground"}>{streak}</span>
          <span className="text-muted-foreground ml-2 font-normal">streak</span>
        </div>

        {/* Question */}
        <div className="w-full rounded-2xl border border-border bg-card p-8 flex flex-col items-center gap-4">
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            Past of...
          </span>
          <span
            className="text-5xl font-black text-foreground"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {verb.base}
          </span>
          <span className="text-sm text-muted-foreground italic">{verb.meaning}</span>
        </div>

        {/* Options */}
        <div className="w-full grid grid-cols-2 gap-3">
          {options.map((opt) => {
            const isSelected = selected === opt;
            const isCorrect = opt === answer;
            let cls = "rounded-xl border py-4 font-mono text-lg font-semibold transition-all duration-200 ";
            if (!selected) {
              cls += "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
            } else if (isCorrect) {
              cls += "border-primary bg-primary/20 text-primary";
            } else if (isSelected) {
              cls += "border-destructive bg-destructive/20 text-destructive";
            } else {
              cls += "border-border bg-card text-muted-foreground opacity-40";
            }
            return (
              <button key={opt} className={cls} onClick={() => choose(opt)}>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Counter */}
        <p className="text-sm text-muted-foreground font-mono">
          {index + 1} / {total}
        </p>
      </div>
    </div>
  );
}

// ─── Verb list screen ─────────────────────────────────────────────────────────

function VerbListScreen({ onBack }) {
  const [search, setSearch] = useState("");
  const filtered = VERBS.filter(
    (v) =>
      v.base.includes(search.toLowerCase()) ||
      v.meaning.includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Header onBack={onBack} title="Verb list" />

      <div className="px-4 pt-4 pb-2 max-w-2xl mx-auto w-full">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search verb..."
          className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8 max-w-2xl mx-auto w-full">
        {/* Header row */}
        <div className="grid grid-cols-4 gap-2 px-4 py-2 text-xs font-mono tracking-widest text-muted-foreground uppercase border-b border-border mb-1">
          <span>Base</span>
          <span>Past</span>
          <span>Participle</span>
          <span>Meaning</span>
        </div>
        {filtered.map((v) => (
          <div
            key={v.base}
            className="grid grid-cols-4 gap-2 px-4 py-3 rounded-xl hover:bg-secondary transition-colors border-b border-border/40"
          >
            <span className="font-mono font-semibold text-primary text-sm">{v.base}</span>
            <span className="font-mono text-sm text-foreground">{v.past}</span>
            <span className="font-mono text-sm text-foreground">{v.participle}</span>
            <span className="text-xs text-muted-foreground italic truncate">{v.meaning}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No results</p>
        )}
      </div>
    </div>
  );
}

// ─── Result screen ────────────────────────────────────────────────────────────

function ResultScreen({
  correct,
  total,
  streak,
  onBack,
  onRetry,
}) {
  const pct = Math.round((correct / total) * 100);
  const stars = pct >= 90 ? 3 : pct >= 65 ? 2 : pct >= 40 ? 1 : 0;

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-6 gap-8"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <Trophy className="w-14 h-14 text-primary" />
      <div className="text-center">
        <p className="text-5xl font-black text-foreground">{pct}%</p>
        <p className="text-muted-foreground mt-2">
          {correct} of {total} correct
        </p>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <Star
            key={s}
            className={`w-8 h-8 ${s <= stars ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
          />
        ))}
      </div>

      {streak !== undefined && streak > 0 && (
        <div className="flex items-center gap-2 text-sm text-yellow-400 font-semibold">
          <Zap className="w-4 h-4" />
          Best streak: {streak}
        </div>
      )}

      <div className="flex gap-4 w-full max-w-xs">
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-border py-3 text-foreground hover:bg-secondary transition-colors font-semibold"
        >
          Home
        </button>
        <button
          onClick={onRetry}
          className="flex-1 rounded-xl bg-primary text-primary-foreground py-3 font-semibold hover:brightness-105 active:bg-accent active:text-accent-foreground transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// ─── Shared header ────────────────────────────────────────────────────────────

function Header({ onBack, title }) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
      <button
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back
      </button>
      <span className="font-semibold text-foreground">{title}</span>
    </div>
  );
}

// ─── Home screen ──────────────────────────────────────────────────────────────

function HomeScreen({ onNavigate }) {
  const cards = [
    {
      mode: "flashcard",
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Flashcards",
      desc: "Review and mark what you know",
      color: "border-primary/70 hover:border-accent",
      iconBg: "bg-primary text-primary-foreground",
    },
    {
      mode: "quiz",
      icon: <Zap className="w-6 h-6" />,
      title: "Quiz",
      desc: "4 options, 1 answer. Test your memory",
      color: "border-accent/60 hover:border-accent",
      iconBg: "bg-accent text-accent-foreground",
    },
    {
      mode: "list",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Verb list",
      desc: `${VERBS.length} verbs with base, past and participle`,
      color: "border-[#581269]/35 hover:border-[#581269]",
      iconBg: "bg-[#581269] text-white",
    },
  ];

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 gap-9"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="text-center relative">
        <p className="text-xs font-mono tracking-widest text-[#581269] uppercase mb-3">irregular verbs</p>
        <h1 className="text-4xl font-black text-foreground leading-tight">
          Dive into<br />Irregular Verbs
        </h1>
        <p className="mt-3 text-muted-foreground text-base max-w-sm mx-auto">
          The essential irregular verbs to leave shallow waters. Review and practice your verbs everyday
        </p>
      </div>

      <div className="w-full max-w-sm flex flex-col gap-3 relative">
        {cards.map(({ mode, icon, title, desc, color, iconBg }) => (
          <button
            key={mode}
            onClick={() => onNavigate(mode)}
            className={`w-full rounded-2xl border bg-card p-5 flex items-center gap-4 text-left shadow-[0_12px_30px_rgba(88,18,105,0.14)] transition-all duration-200 ${color} hover:bg-secondary active:bg-accent active:text-accent-foreground group`}
          >
            <div className={`rounded-xl p-3 ${iconBg} shrink-0`}>{icon}</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#581269] shrink-0 group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-[#581269] font-mono tracking-wide">No excuses now</p>
        <p className="mt-2 text-[11px] text-muted-foreground">Made by C with love, caffeine and care</p>
      </div>
    </div>
  );
}

function SplashScreen({ fading }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <img
        src={pitikoLogo}
        alt="Pitiko Studios"
        className="w-[min(78vw,520px)] max-h-[70vh] object-contain mix-blend-multiply"
      />
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("home");
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setSplashFading(true), 2000);
    const hideTimer = window.setTimeout(() => setShowSplash(false), 2700);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="size-full overflow-y-auto bg-background" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        {mode === "home" && <HomeScreen onNavigate={setMode} />}
        {mode === "flashcard" && <FlashcardScreen onBack={() => setMode("home")} />}
        {mode === "quiz" && <QuizScreen onBack={() => setMode("home")} />}
        {mode === "list" && <VerbListScreen onBack={() => setMode("home")} />}
      </div>
      {showSplash && <SplashScreen fading={splashFading} />}
    </div>
  );
}
