import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MessageSquare, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";

const translations = {
  en: {
    title: "PocketDoctor",
    subtitle: "Your health companion",
    speak: "Speak your symptoms",
    type: "Type your symptoms",
  },
  hi: {
    title: "पॉकेट डॉक्टर",
    subtitle: "आपका स्वास्थ्य साथी",
    speak: "अपने लक्षण बोलें",
    type: "अपने लक्षण लिखें",
  },
  te: {
    title: "పాకెట్ డాక్టర్",
    subtitle: "మీ ఆరోగ్య సహాయకుడు",
    speak: "మీ లక్షణాలు చెప్పండి",
    type: "మీ లక్షణాలు టైప్ చేయండి",
  },
  kn: {
    title: "ಪಾಕೆಟ್ ಡಾಕ್ಟರ್",
    subtitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಹಾಯಕ",
    speak: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಹೇಳಿ",
    type: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಟೈಪ್ ಮಾಡಿ",
  },
  ta: {
    title: "பாக்கெட் டாக்டர்",
    subtitle: "உங்கள் சுகாதார துணை",
    speak: "உங்கள் அறிகுறிகளைச் சொல்லுங்கள்",
    type: "உங்கள் அறிகுறிகளை தட்டச்சு செய்யுங்கள்",
  },
};

const Welcome = () => {
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();
  const t = translations[language as keyof typeof translations];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-primary fill-primary" />
          <h1 className="text-2xl font-bold text-primary">{t.title}</h1>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold text-foreground">{t.subtitle}</h2>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-4">
          <Button
            variant="hero"
            size="xl"
            className="w-full flex flex-col gap-3"
            onClick={() => navigate("/voice-input", { state: { language } })}
          >
            <Mic className="w-12 h-12" />
            <span className="text-xl font-semibold">{t.speak}</span>
          </Button>

          <Button
            variant="hero"
            size="xl"
            className="w-full flex flex-col gap-3"
            onClick={() => navigate("/text-input", { state: { language } })}
          >
            <MessageSquare className="w-12 h-12" />
            <span className="text-xl font-semibold">{t.type}</span>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-sm text-muted-foreground">
        <p>Made with ❤️ for village health</p>
      </div>
    </div>
  );
};

export default Welcome;
