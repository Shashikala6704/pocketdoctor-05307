import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Play, Pause, AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const translations = {
  en: {
    title: "Health Advice",
    advice:
      "Based on your symptoms, it appears you may have a mild cold. Here's what you can do:",
    tips: [
      "Get plenty of rest",
      "Drink warm water and fluids",
      "Eat light, nutritious food",
      "Keep yourself warm",
    ],
    safetyTitle: "Important Notice",
    safety:
      "If your symptoms worsen or persist, please visit the nearest ArogyaBox in your village for proper medical consultation.",
    playAudio: "Listen to advice",
    stopAudio: "Stop audio",
    back: "Back",
    home: "Home",
  },
  hi: {
    title: "स्वास्थ्य सलाह",
    advice:
      "आपके लक्षणों के आधार पर, आपको हल्की सर्दी हो सकती है। यहां बताया गया है कि आप क्या कर सकते हैं:",
    tips: [
      "पर्याप्त आराम करें",
      "गर्म पानी और तरल पदार्थ पिएं",
      "हल्का, पौष्टिक भोजन करें",
      "खुद को गर्म रखें",
    ],
    safetyTitle: "महत्वपूर्ण सूचना",
    safety:
      "यदि आपके लक्षण बिगड़ते हैं या बने रहते हैं, तो कृपया उचित चिकित्सा परामर्श के लिए अपने गांव में निकटतम आरोग्य बॉक्स पर जाएं।",
    playAudio: "सलाह सुनें",
    stopAudio: "ऑडियो बंद करें",
    back: "वापस",
    home: "होम",
  },
  te: {
    title: "ఆరోగ్య సలహా",
    advice:
      "మీ లక్షణాల ఆధారంగా, మీకు తేలికపాటి జలుబు ఉండవచ్చు. మీరు ఏమి చేయవచ్చో ఇక్కడ ఉంది:",
    tips: [
      "తగినంత విశ్రాంతి తీసుకోండి",
      "వెచ్చని నీరు మరియు ద్రవాలు తాగండి",
      "తేలికపాటి, పోషకమైన ఆహారం తినండి",
      "మిమ్మల్ని మీరు వెచ్చగా ఉంచుకోండి",
    ],
    safetyTitle: "ముఖ్యమైన గమనిక",
    safety:
      "మీ లక్షణాలు తీవ్రమైతే లేదా కొనసాగితే, దయచేసి సరైన వైద్య సంప్రదింపుల కోసం మీ గ్రామంలోని సమీప ఆరోగ్యబాక్స్‌ను సందర్శించండి।",
    playAudio: "సలహా వినండి",
    stopAudio: "ఆడియో ఆపండి",
    back: "వెనక్కి",
    home: "హోమ్",
  },
  kn: {
    title: "ಆರೋಗ್ಯ ಸಲಹೆ",
    advice:
      "ನಿಮ್ಮ ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ, ನಿಮಗೆ ಸೌಮ್ಯ ಶೀತ ಇರಬಹುದು. ನೀವು ಏನು ಮಾಡಬಹುದು ಎಂಬುದು ಇಲ್ಲಿದೆ:",
    tips: [
      "ಸಾಕಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ",
      "ಬೆಚ್ಚಗಿನ ನೀರು ಮತ್ತು ದ್ರವಗಳನ್ನು ಕುಡಿಯಿರಿ",
      "ಹಗುರವಾದ, ಪೌಷ್ಟಿಕ ಆಹಾರವನ್ನು ಸೇವಿಸಿ",
      "ನಿಮ್ಮನ್ನು ಬೆಚ್ಚಗಿರಿಸಿಕೊಳ್ಳಿ",
    ],
    safetyTitle: "ಪ್ರಮುಖ ಸೂಚನೆ",
    safety:
      "ನಿಮ್ಮ ಲಕ್ಷಣಗಳು ಹದಗೆಡುತ್ತಿದ್ದರೆ ಅಥವಾ ಮುಂದುವರಿದರೆ, ದಯವಿಟ್ಟು ಸರಿಯಾದ ವೈದ್ಯಕೀಯ ಸಮಾಲೋಚನೆಗಾಗಿ ನಿಮ್ಮ ಗ್ರಾಮದಲ್ಲಿರುವ ಹತ್ತಿರದ ಆರೋಗ್ಯಬಾಕ್ಸ್‌ಗೆ ಭೇಟಿ ನೀಡಿ।",
    playAudio: "ಸಲಹೆ ಕೇಳಿ",
    stopAudio: "ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ",
    back: "ಹಿಂದಕ್ಕೆ",
    home: "ಮುಖಪುಟ",
  },
  ta: {
    title: "சுகாதார ஆலோசனை",
    advice:
      "உங்கள் அறிகுறிகளின் அடிப்படையில், உங்களுக்கு லேசான சளி இருக்கலாம். நீங்கள் என்ன செய்யலாம் என்பது இங்கே:",
    tips: [
      "போதுமான ஓய்வு எடுத்துக்கொள்ளுங்கள்",
      "சூடான நீர் மற்றும் திரவங்களை குடியுங்கள்",
      "இலகுவான, சத்தான உணவை உண்ணுங்கள்",
      "உங்களை சூடாக வைத்துக்கொள்ளுங்கள்",
    ],
    safetyTitle: "முக்கிய அறிவிப்பு",
    safety:
      "உங்கள் அறிகுறிகள் மோசமடைந்தால் அல்லது தொடர்ந்தால், சரியான மருத்துவ ஆலோசனைக்கு உங்கள் கிராமத்தில் உள்ள அருகிலுள்ள ஆரோக்யபாக்ஸை பார்வையிடவும்।",
    playAudio: "ஆலோசனையை கேளுங்கள்",
    stopAudio: "ஆடியோவை நிறுத்து",
    back: "பின்செல்",
    home: "முகப்பு",
  },
};

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const language = location.state?.language || "en";
  const [isPlaying, setIsPlaying] = useState(false);
  const t = translations[language as keyof typeof translations];

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t.back}
        </Button>
        <Button variant="ghost" onClick={() => navigate("/")}>
          <Home className="w-5 h-5 mr-2" />
          {t.home}
        </Button>
      </div>

      <div className="flex-1 flex flex-col space-y-6 max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center text-foreground">
          {t.title}
        </h2>

        {/* Advice Card */}
        <Card className="p-6 space-y-4 bg-card shadow-lg">
          <p className="text-lg text-foreground">{t.advice}</p>
          <ul className="space-y-2">
            {t.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Audio Player */}
        <Button
          variant={isPlaying ? "secondary" : "default"}
          size="lg"
          onClick={handleAudioToggle}
          className="w-full text-lg py-6"
        >
          {isPlaying ? (
            <>
              <Pause className="w-6 h-6 mr-2" />
              {t.stopAudio}
            </>
          ) : (
            <>
              <Play className="w-6 h-6 mr-2" />
              {t.playAudio}
            </>
          )}
        </Button>

        {/* Safety Warning */}
        <Card className="p-6 bg-accent/10 border-accent shadow-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-foreground">
                {t.safetyTitle}
              </h3>
              <p className="text-foreground">{t.safety}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Result;
