import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
];

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Languages className="w-5 h-5 text-primary" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px] bg-card border-primary/30">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="bg-card">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.native}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
