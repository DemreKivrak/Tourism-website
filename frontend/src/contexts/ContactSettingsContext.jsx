import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../services/api";

const ContactSettingsContext = createContext(null);

export function ContactSettingsProvider({ children }) {
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState({});

  const loadSettings = async () => {
    try {
      const data = await api.getContactSettings();
      const map = {};
      data.forEach((row) => {
        map[row.language] = row;
      });
      setSettings(map);
    } catch (error) {
      console.error("Error loading contact settings:", error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const currentLang = i18n.language?.slice(0, 2) || "en";
  const current = settings[currentLang] || settings["en"] || {};

  const currentPhone = current.phone_display || "+90 536 223 83 40";
  const currentWhatsapp = current.whatsapp_number || "905362238340";

  return (
    <ContactSettingsContext.Provider
      value={{ settings, currentPhone, currentWhatsapp, loadSettings }}
    >
      {children}
    </ContactSettingsContext.Provider>
  );
}

export function useContactSettings() {
  return useContext(ContactSettingsContext);
}
