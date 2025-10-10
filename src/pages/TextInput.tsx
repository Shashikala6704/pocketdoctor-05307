import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const translations = {
  en: {
    title: "Describe your symptoms",
    placeholder: "For example: I have fever and headache...",
    analyze: "Get Health Advice",
    back: "Back",
  },
  hi: {
    title: "अपने लक्षण बताएं",
    placeholder: "उदाहरण: मुझे बुखार और सिरदर्द है...",
    analyze: "स्वास्थ्य सलाह प्राप्त करें",
    back: "वापस",
  },
  te: {
    title: "మీ లక్షణాలను వివరించండి",
    placeholder: "ఉదాహరణ: నాకు జ్వరం మరియు తలనొప్పి ఉంది...",
    analyze: "ఆరోగ్య సలహా పొందండి",
    back: "వెనక్కి",
  },
  kn: {
    title: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ",
    placeholder: "ಉದಾಹರಣೆ: ನನಗೆ ಜ್ವರ ಮತ್ತು ತಲೆನೋವು ಇದೆ...",
    analyze: "ಆರೋಗ್ಯ ಸಲಹೆ ಪಡೆಯಿರಿ",
    back: "ಹಿಂದಕ್ಕೆ",
  },
  ta: {
    title: "உங்கள் அறிகுறிகளை விவரிக்கவும்",
    placeholder: "உதாரணம்: எனக்கு காய்ச்சல் மற்றும் தலைவலி உள்ளது...",
    analyze: "சுகாதார ஆலோசனை பெறுங்கள்",
    back: "பின்செல்",
  },
};

const TextInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || "en";
  const [symptoms, setSymptoms] = useState("");
  const t = translations[language as keyof typeof translations];

  const handleAnalyze = () => {
    if (symptoms.trim()) {
      navigate("/result", { state: { language, inputType: "text", symptoms } });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="self-start mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        {t.back}
      </Button>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center text-foreground">
          {t.title}
        </h2>

        <Textarea
          placeholder={t.placeholder}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="min-h-[200px] text-lg resize-none bg-card border-primary/30"
        />

        <Button
          size="lg"
          onClick={handleAnalyze}
          disabled={!symptoms.trim()}
          className="w-full text-lg py-6"
        >
          <Send className="w-5 h-5 mr-2" />
          {t.analyze}
        </Button>
      </div>
    </div>
  );
};

export default TextInput;
