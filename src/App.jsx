import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  Copy,
  Globe2,
  Heart,
  House,
  MessageCircle,
  Signal,
  Sparkles,
  Wifi,
} from "lucide-react";

const categories = [
  { id: "kids", label: "Kids", emoji: "🧒", color: "#28a745", wash: "#eaf9ed" },
  { id: "teenage", label: "Teenage", emoji: "🎒", color: "#ff6a26", wash: "#fff0e8" },
  { id: "adults", label: "Adults", emoji: "💼", color: "#1471c9", wash: "#eaf4ff" },
  { id: "oldAge", label: "Old Age", emoji: "👴", color: "#753bc2", wash: "#f3ebff" },
];

const jokes = {
  hindi: {
    kids: [
      "टीचर: बच्चों, बताओ सूरज कहाँ से निकलता है?\n\nबच्चा: सर, मोबाइल की बैटरी खत्म हो जाए तो कहीं से भी नहीं निकलता! 😂",
      "मम्मी: होमवर्क कर लिया?\n\nबच्चा: हाँ मम्मी, बस लिखना बाकी है! 😄",
      "टीचर: सबसे तेज़ क्या चलता है?\n\nबच्चा: छुट्टी की घंटी सुनकर मेरे पैर! 😂",
    ],
    teenage: [
      "पापा: रिज़ल्ट कैसा आया?\n\nबेटा: प्रिंसिपल का बेटा फेल हो गया।\nपापा: तुम्हारा?\nबेटा: डॉक्टर का बेटा भी फेल हो गया! 😂",
      "दोस्त: पढ़ाई कैसी चल रही है?\n\nमैं: बस चल रही है… मंज़िल का कोई पता नहीं! 😅",
      "अलार्म और मेरा रिश्ता भी कमाल है—वो रोज़ बोलता है, मैं रोज़ अनसुना करता हूँ! 😂",
    ],
    adults: [
      "बॉस: ऑफिस में सो क्यों रहे हो?\n\nकर्मचारी: सर, आपके सपनों को पूरा करने की प्रैक्टिस कर रहा हूँ! 😂",
      "पत्नी: मेरी कोई बात ध्यान से सुनते भी हो?\n\nपति: यह सवाल कल भी पूछा था क्या? 😅",
      "मीटिंग का सबसे बड़ा सच—जो सबसे कम जानता है, वही सबसे लंबा बोलता है! 😂",
    ],
    oldAge: [
      "दादाजी: हमारे ज़माने में मोबाइल नहीं थे।\n\nपोता: फिर आप टाइम कैसे पास करते थे?\nदादाजी: बेटा, तभी तो तुम्हारे पापा के पाँच भाई हैं! 😂",
      "डॉक्टर: रोज़ टहलने जाया कीजिए।\n\nदादाजी: जाता हूँ—चाय की दुकान तक, फिर चाय मुझे वापस ले आती है! 😄",
      "उम्र सिर्फ़ एक नंबर है… लेकिन चश्मा ढूँढते समय वही नंबर याद नहीं आता! 😂",
    ],
  },
  english: {
    kids: [
      "Teacher: Why did you bring a ladder to school?\n\nKid: Because I wanted to go to high school! 😂",
      "Mom: Did you finish your homework?\n\nKid: Almost. I finished thinking about it! 😄",
      "Why was the math book sad?\n\nBecause it had too many problems! 😂",
    ],
    teenage: [
      "My alarm and I have a healthy relationship—\nit speaks every morning, and I ignore it completely. 😂",
      "Friend: How is studying going?\n\nMe: It is going. I have no idea where, but it is going! 😅",
      "I finally cleaned my room.\nNow I cannot find anything. 😂",
    ],
    adults: [
      "Boss: Why are you sleeping at work?\n\nEmployee: I am practicing to make your dreams come true! 😂",
      "I love deadlines.\nEspecially the whooshing sound they make as they fly by. 😄",
      "My wallet is like an onion—opening it makes me cry. 😂",
    ],
    oldAge: [
      "Grandpa: In my day, we had no smartphones.\n\nGrandson: What did you scroll?\nGrandpa: Newspapers—and we liked every page! 😂",
      "Age is just a number…\na number I can’t remember without my glasses. 😄",
      "Doctor: You should walk every day.\n\nGrandpa: I do—to the tea shop and back! 😂",
    ],
  },
};

function StatusBar({ light = false }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () =>
      setTime(new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={`status-bar ${light ? "is-light" : ""}`} aria-hidden="true">
      <span>{time}</span>
      <span className="status-icons">
        <Signal size={14} strokeWidth={3} />
        <Wifi size={15} strokeWidth={3} />
        <span className="battery"><span /></span>
      </span>
    </div>
  );
}

function BackButton({ onClick, label }) {
  return (
    <button className="icon-button" type="button" onClick={onClick} aria-label={label}>
      <ChevronLeft size={30} strokeWidth={2.6} />
    </button>
  );
}

function LanguageScreen({ onChoose }) {
  return (
    <section className="screen language-screen" aria-labelledby="app-title">
      <StatusBar />
      <div className="floating-doodles" aria-hidden="true">
        <span>☆</span><span>✦</span><span>☺</span><span>✧</span><span>⌁</span>
      </div>

      <main className="language-content">
        <header className="brand-block">
          <div className="brand-pill"><Sparkles size={13} /> Mood freshener</div>
          <h1 id="app-title"><span>Haso</span> <span>Hasao</span> <b>😂</b></h1>
          <p>Har Mood Ke Liye Ek Joke</p>
        </header>

        <div className="hero-laugh" aria-hidden="true">
          <span>😄</span>
          <i className="laugh-ray ray-one" />
          <i className="laugh-ray ray-two" />
          <i className="laugh-ray ray-three" />
        </div>

        <div className="language-picker">
          <div className="section-kicker"><span /> Choose Your Language <span /></div>
          <button className="language-button hindi-button" type="button" onClick={() => onChoose("hindi")}>
            <span className="flag" role="img" aria-label="India flag">
              <span className="flag-saffron" />
              <span className="flag-white"><i>✺</i></span>
              <span className="flag-green" />
            </span>
            <span>हिंदी</span>
            <ArrowRight size={24} />
          </button>
          <button className="language-button english-button" type="button" onClick={() => onChoose("english")}>
            <Globe2 size={37} />
            <span>English</span>
            <ArrowRight size={24} />
          </button>
        </div>

        <div className="people-scene" aria-hidden="true">
          <span className="person child">👦</span>
          <span className="person teen">🧑</span>
          <span className="person adult">👩</span>
          <span className="person elder">👴</span>
        </div>
      </main>
    </section>
  );
}

function CategoryScreen({ language, onBack, onChoose }) {
  return (
    <section className="screen category-screen" aria-labelledby="category-title">
      <header className="screen-header purple-header">
        <StatusBar light />
        <div className="nav-row">
          <BackButton onClick={onBack} label="Back to language selection" />
          <h1 id="category-title">Choose Category</h1>
          <span className="header-orb" aria-hidden="true">✨</span>
        </div>
      </header>

      <main className="category-content">
        <div className="eyebrow"><Sparkles size={15} /> {language === "hindi" ? "आपका मूड, आपकी हँसी" : "Your mood, your laugh"}</div>
        <h2>Select Your Joke Category</h2>
        <div className="purple-underline" aria-hidden="true" />
        <p>What are we laughing about today?</p>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              className="category-card"
              key={category.id}
              type="button"
              onClick={() => onChoose(category.id)}
              style={{ "--category": category.color, "--wash": category.wash }}
            >
              <span className="emoji-tile" aria-hidden="true">{category.emoji}</span>
              <strong>{category.label}</strong>
              <span className="card-arrow"><ArrowRight size={15} /></span>
            </button>
          ))}
        </div>
      </main>

      <footer className="category-footer">
        <House size={20} fill="currentColor" />
        <span>Home</span>
        <span className="footer-dot" />
      </footer>
    </section>
  );
}

function ActionButton({ icon, label, active = false, onClick, className = "" }) {
  return (
    <button className={`action-button ${active ? "is-active" : ""} ${className}`} type="button" onClick={onClick}>
      <span className="action-icon">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function JokeScreen({ language, categoryId, onBack, onChangeCategory }) {
  const category = categories.find((item) => item.id === categoryId);
  const jokeList = useMemo(() => jokes[language][categoryId], [language, categoryId]);
  const [jokeIndex, setJokeIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const joke = jokeList[jokeIndex];
  const nextJoke = () => {
    setJokeIndex((current) => (current + 1) % jokeList.length);
    setCopied(false);
    setFavorite(false);
  };

  const copyJoke = async () => {
    try {
      await navigator.clipboard.writeText(joke);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = joke;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const shareJoke = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${joke}\n\n— Haso Hasao 😂`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="screen joke-screen" aria-labelledby="joke-title">
      <header className="screen-header green-header">
        <StatusBar light />
        <div className="nav-row">
          <BackButton onClick={onBack} label="Back to categories" />
          <h1 id="joke-title">Your Joke</h1>
          <span className="header-face" aria-hidden="true">😄</span>
        </div>
      </header>

      <main className="joke-content">
        <div className="joke-chips">
          <span><Globe2 size={15} /> {language === "hindi" ? "हिंदी" : "English"}</span>
          <span>{category.emoji} {category.label}</span>
        </div>

        <article className="joke-card" key={jokeIndex}>
          <div className="quote-mark" aria-hidden="true">“</div>
          <p lang={language === "hindi" ? "hi" : "en"}>{joke}</p>
          <div className="joke-card-footer">
            <span>Haso Hasao</span>
            <span>😂</span>
          </div>
        </article>

        <div className="joke-actions">
          <ActionButton
            label={copied ? "Copied" : "Copy"}
            active={copied}
            onClick={copyJoke}
            icon={copied ? <Check size={21} /> : <Copy size={21} />}
          />
          <ActionButton label="Share" onClick={shareJoke} className="share-action" icon={<MessageCircle size={22} fill="currentColor" />} />
          <ActionButton
            label={favorite ? "Saved" : "Favorite"}
            active={favorite}
            onClick={() => setFavorite((current) => !current)}
            className="favorite-action"
            icon={<Heart size={22} fill={favorite ? "currentColor" : "none"} />}
          />
        </div>

        <div className="joke-controls">
          <button className="next-button" type="button" onClick={nextJoke}>
            <span>Next Joke</span>
            <ArrowRight size={23} />
          </button>
          <button className="change-button" type="button" onClick={onChangeCategory}>
            <ArrowLeft size={20} />
            <span>Change Category</span>
          </button>
        </div>
      </main>
    </section>
  );
}

export default function App() {
  const [screen, setScreen] = useState("language");
  const [language, setLanguage] = useState("hindi");
  const [category, setCategory] = useState("kids");

  const chooseLanguage = (choice) => {
    setLanguage(choice);
    setScreen("category");
  };

  const chooseCategory = (choice) => {
    setCategory(choice);
    setScreen("joke");
  };

  return (
    <div className="page-shell">
      <div className="ambient-shape shape-one" aria-hidden="true" />
      <div className="ambient-shape shape-two" aria-hidden="true" />
      <div className="phone-frame">
        <div className="phone-speaker" aria-hidden="true" />
        <div className="screen-transition" key={screen}>
          {screen === "language" && <LanguageScreen onChoose={chooseLanguage} />}
          {screen === "category" && (
            <CategoryScreen language={language} onBack={() => setScreen("language")} onChoose={chooseCategory} />
          )}
          {screen === "joke" && (
            <JokeScreen
              language={language}
              categoryId={category}
              onBack={() => setScreen("category")}
              onChangeCategory={() => setScreen("category")}
            />
          )}
        </div>
      </div>
      <p className="desktop-caption"><Sparkles size={14} /> A little laughter, beautifully packed.</p>
    </div>
  );
}
