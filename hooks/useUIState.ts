import { useState } from 'react';

export function useUIState() {
  const [showLangPill, setShowLangPill] = useState(false);
  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
  const [showAdvancedMenu, setShowAdvancedMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleLangPill = () => setShowLangPill(prev => !prev);
  const hideLangPill = () => setShowLangPill(false);

  const togglePrivacyPopup = () => setShowPrivacyPopup(prev => !prev);
  const showPrivacy = () => setShowPrivacyPopup(true);
  const hidePrivacy = () => setShowPrivacyPopup(false);

  const showAdvanced = () => setShowAdvancedMenu(true);
  const hideAdvanced = () => setShowAdvancedMenu(false);

  const markCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);

  return {
    showLangPill,
    showPrivacyPopup,
    showAdvancedMenu,
    copied,
    isEditing,
    setShowLangPill,
    setShowPrivacyPopup,
    toggleLangPill,
    hideLangPill,
    togglePrivacyPopup,
    showPrivacy,
    hidePrivacy,
    showAdvanced,
    hideAdvanced,
    markCopied,
    startEditing,
    stopEditing,
  };
}
