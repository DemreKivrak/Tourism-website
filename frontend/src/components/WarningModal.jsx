import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { languageNames } from "../utils/languageNames";

export function WarningModal({ isOpen, onClose, tourLang, siteLang }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  if (!isOpen) return null;

  const tourName = languageNames[tourLang] || tourLang;
  const siteName = languageNames[siteLang] || siteLang;

  return (
    <div
      className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-100  shadow-2xl rounded-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold w-full text-center">
            {t("warning.title")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-600 text-2xl cursor-pointer"
          >
            ×
          </button>
        </div>
        <p className="text-gray-600 mb-4 text-center">
          {t("warning.message", { tourLang: tourName, siteLang: siteName })}
        </p>
        <button
          onClick={() => {
            onClose();
            navigate(`/tours?language=${siteLang}`);
          }}
          className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-3xl border-1 text-white font-onest w-3/4 md:w-2/4 py-2 mt-4 cursor-pointer hover:bg-none hover:from-transparent hover:to-transparent hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
        >
          {t("warning.browseButton", { siteLang: siteName })}
        </button>
        <div className="flex justify-end"></div>
      </div>
    </div>
  );
}
