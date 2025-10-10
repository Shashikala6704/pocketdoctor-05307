import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mic, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const translations = {
  en: {
    title: "Speak your symptoms",
    instruction: "Tap the microphone and speak clearly",
    listening: "Listening...",
    recorded: "Tap again to stop",
    analyze: "Get Health Advice",
    back: "Back",
  },
  hi: {
    title: "अपने लक्षण बोलें",
    instruction: "माइक्रोफ़ोन पर टैप करें और स्पष्ट रूप से बोलें",
    listening: "सुन रहा हूँ...",
    recorded: "रोकने के लिए फिर टैप करें",
    analyze: "स्वास्थ्य सलाह प्राप्त करें",
    back: "वापस",
  },
  te: {
    title: "మీ లక్షణాలు చెప్పండి",
    instruction: "మైక్రోఫోన్‌ను నొక్కి స్పష్టంగా మాట్లాడండి",
    listening: "వింటున్నాను...",
    recorded: "ఆపడానికి మళ్ళీ నొక్కండి",
    analyze: "ఆరోగ్య సలహా పొందండి",
    back: "వెనక్కి",
  },
  kn: {
    title: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಹೇಳಿ",
    instruction: "ಮೈಕ್ರೋಫೋನ್ ಟ್ಯಾಪ್ ಮಾಡಿ ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ",
    listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ...",
    recorded: "ನಿಲ್ಲಿಸಲು ಮತ್ತೆ ಟ್ಯಾಪ್ ಮಾಡಿ",
    analyze: "ಆರೋಗ್ಯ ಸಲಹೆ ಪಡೆಯಿರಿ",
    back: "ಹಿಂದಕ್ಕೆ",
  },
  ta: {
    title: "உங்கள் அறிகுறிகளைச் சொல்லுங்கள்",
    instruction: "மைக்ரோஃபோனை தட்டி தெளிவாகப் பேசுங்கள்",
    listening: "கேட்கிறேன்...",
    recorded: "நிறுத்த மீண்டும் தட்டவும்",
    analyze: "சுகாதார ஆலோசனை பெறுங்கள்",
    back: "பின்செல்",
  },
};

const VoiceInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || "en";
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const t = translations[language as keyof typeof translations];

  const handleMicClick = () => {
    if (!isRecording && !hasRecorded) {
      setIsRecording(true);
      // Simulate recording for 2 seconds
      setTimeout(() => {
        setIsRecording(false);
        setHasRecorded(true);
      }, 2000);
    } else if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
    }
  };

  const handleAnalyze = () => {
    navigate("/result", { state: { language, inputType: "voice" } });
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

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <h2 className="text-2xl font-semibold text-center text-foreground">
          {t.title}
        </h2>

        <p className="text-center text-muted-foreground text-lg">
          {isRecording ? t.listening : hasRecorded ? t.recorded : t.instruction}
        </p>

        <button
          onClick={handleMicClick}
          className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording
              ? "bg-secondary animate-pulse shadow-2xl scale-110"
              : hasRecorded
              ? "bg-primary shadow-lg"
              : "bg-card shadow-lg hover:shadow-xl hover:scale-105 border-4 border-primary"
          }`}
        >
          {hasRecorded ? (
            <Check className="w-20 h-20 text-primary-foreground" />
          ) : (
            <Mic
              className={`w-20 h-20 ${
                isRecording ? "text-secondary-foreground" : "text-primary"
              }`}
            />
          )}
        </button>

        {hasRecorded && (
          <Button
            size="lg"
            onClick={handleAnalyze}
            className="mt-8 text-lg px-8 py-6"
          >
            {t.analyze}
          </Button>
        )}
      </div>
    </div>
  );
};

export default VoiceInput;
