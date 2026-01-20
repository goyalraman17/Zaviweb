import { useState } from 'react';

type Tone = 'neutral' | 'formal' | 'casual';

export interface Language {
  code: string;
  name: string;
}

export const INPUT_LANGUAGES: Language[] = [
  { code: 'auto', name: 'Auto Detect' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
];

export const OUTPUT_LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
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
