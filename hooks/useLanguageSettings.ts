import { useState } from 'react';

type Tone = 'neutral' | 'formal' | 'casual';

export interface Language {
  code: string;
  name: string;
}

export const INPUT_LANGUAGES: Language[] = [
  { code: 'auto', name: 'Auto Detect' },
  // Global backbone
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'zh', name: 'Mandarin Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'fr', name: 'French' },
  { code: 'ru', name: 'Russian' },
  // South Asia (mobile-first, massive scale)
  { code: 'bn', name: 'Bengali' },
  { code: 'ur', name: 'Urdu' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  // East & Southeast Asia
  { code: 'id', name: 'Indonesian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'fil', name: 'Filipino' },
  // Europe + regional connectors
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pl', name: 'Polish' },
  { code: 'tr', name: 'Turkish' },
  // Africa / L2 bridge
  { code: 'sw', name: 'Swahili' },
];

export const OUTPUT_LANGUAGES: Language[] = [
  // Global backbone
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'zh', name: 'Mandarin Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'fr', name: 'French' },
  { code: 'ru', name: 'Russian' },
  // South Asia (mobile-first, massive scale)
  { code: 'bn', name: 'Bengali' },
  { code: 'ur', name: 'Urdu' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  // East & Southeast Asia
  { code: 'id', name: 'Indonesian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'fil', name: 'Filipino' },
  // Europe + regional connectors
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pl', name: 'Polish' },
  { code: 'tr', name: 'Turkish' },
  // Africa / L2 bridge
  { code: 'sw', name: 'Swahili' },
];

export function useLanguageSettings() {
  const [inputLang, setInputLang] = useState('auto');
  const [outputLang, setOutputLang] = useState('en');
  const [detectedLang, setDetectedLang] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<Tone>('neutral');
  const [editedText, setEditedText] = useState('');

  return {
    inputLang,
    outputLang,
    detectedLang,
    selectedTone,
    editedText,
    setInputLang,
    setOutputLang,
    setDetectedLang,
    setSelectedTone,
    setEditedText,
  };
}
