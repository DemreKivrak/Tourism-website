import { Header } from "../components/Header";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer";
import { WhatsappContact } from "../components/WhatsappContact";
import { useContactSettings } from "../contexts/ContactSettingsContext";
import { useNavigate } from "react-router-dom";

export function Contact() {
  const { t } = useTranslation();
  const location = useLocation();
  const { currentPhone, currentWhatsapp } = useContactSettings();
  const yandexLink =
    "https://yandex.com.tr/maps/org/oltre_turizm/1254953363/?ll=28.986200%2C41.043300&z=14";
  const navigate = useNavigate();

  useEffect(() => {
    const scrollToElement = (elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        const yOffset = -100; // Bu değeri değiştirerek scroll konumunu ayarlayın
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    // Check if there's a scrollTo in location state
    if (location.state?.scrollTo) {
      setTimeout(() => scrollToElement(location.state.scrollTo), 300);
    } else {
      // Handle hash from URL (for HashRouter: #/contact#section)
      const url = window.location.href;
      const hashIndex = url.lastIndexOf("#");
      if (hashIndex > 0 && url.indexOf("#") !== hashIndex) {
        const sectionId = url.substring(hashIndex + 1);
        setTimeout(() => scrollToElement(sectionId), 300);
      }
    }
  }, [location]);

  // Animasyon varyantları
  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white min-h-screen">
      <title>Contact us</title>
      <Header />

      {/* Hero Section */}
      <div className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
        <img
          src="/homepage-pic.jpg"
          alt="Tours"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 w-full pb-10">
            <h1 className="text-2xl md:text-6xl font-onest font-semibold text-white mb-3 justify-self-start">
              {t("contact.title").toUpperCase()}
            </h1>
            <p className="text-sm md:text-xl text-white/80 font-onest text-left">
              {t("contact.heroSubtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className=" ml-5 mb-8 hidden md:flex items-center gap-2 text-sm text-gray-500 mt-5">
        <span
          className="hover:text-blue-500 cursor-pointer transition"
          onClick={() => navigate("/")}
        >
          {t("nav.home")}
        </span>
        <span>/</span>
        <span className="text-gray-800 font-medium">{t("nav.contact")}</span>
      </nav>

      <h2 className="text-2xl md:text-4xl font-sans font-light tracking-tight text-gray-800 leading-snug mt-8 md:mt-0 mb-0 md:mb-10">
        {t("contact.bookingSubtitle")}
      </h2>

      <div id="contact" className="max-w-7xl mx-auto px-4 pt-6 pb-16">
        {/* Contact Cards + Map */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Contact Cards */}
          <div className="flex flex-col gap-6 lg:w-2/5 items-center">
            {/* Phone Card */}
            <div className="flex items-center gap-4 lg:gap-5 bg-white rounded-xl shadow-md px-4 py-3 lg:p-6 border border-gray-600 hover:shadow-lg transition-shadow duration-300 w-full md:w-8/10">
              <div className="shrink-0 p-2 lg:p-4 rounded-full border border-solid">
                <img
                  className="h-7 w-7 "
                  src="icons8-phone-100.png"
                  alt="Phone"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold font-onest text-gray-400 uppercase tracking-wide mb-1">
                  {t("contact.phone")}
                </h3>
                <a
                  href={`tel:+${currentWhatsapp}`}
                  className="text-xl font-medium font-onest text-gray-600 transition whitespace-nowrap block hover:text-blue-500 transition duration-200"
                >
                  +{currentPhone}
                </a>

                <p className="text-sm text-gray-400 mt-1">
                  {t("contact.available")}
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex items-center gap-4 lg:gap-5 bg-white rounded-xl shadow-md px-4 py-3 lg:p-6 border border-gray-600 hover:shadow-lg transition-shadow duration-300 w-full md:w-8/10">
              <div className="shrink-0 p-2 lg:p-4 rounded-full border border-solid">
                <img
                  className="h-7 w-7 "
                  src="icons8-email-64.png"
                  alt="Email"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold font-onest text-gray-400 uppercase tracking-wide mb-1">
                  {t("contact.email")}
                </h3>
                <a
                  href="mailto:oltretour@hotmail.com"
                  className="text-base text-xl font-medium font-onest text-gray-600 transition block hover:text-blue-500 transition duration-200"
                >
                  oltretour@hotmail.com
                </a>
                <p className="text-sm text-gray-400 mt-1">
                  {t("contact.response")}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-4 lg:gap-5 bg-white rounded-xl shadow-md px-4 py-3 lg:p-6 border border-gray-600 hover:shadow-lg transition-shadow duration-300 w-full md:w-8/10">
              <div className="shrink-0 p-2 lg:p-4 rounded-full border border-solid mt-1">
                <img
                  className="h-7 w-7 "
                  src="icons8-location-100.png"
                  alt="Location"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold font-onest text-gray-400 uppercase tracking-wide mb-1">
                  {t("contact.location")}
                </h3>
                <p className="text-sm text-gray-700 font-medium leading-relaxed">
                  Bozkurt Mah. Ergenekon Cad. Muratoğlu Çarşısı No:41 Kat:3
                  Daire:116 Pangaltı-Şişli / İstanbul
                </p>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="lg:w-3/5 rounded-xl shadow-lg relative">
            <iframe
              src="https://maps.google.com/maps?q=41.0433,28.9862&z=16&output=embed"
              width="100%"
              height="100%"
              className="rounded-xl"
              style={{ border: 0, minHeight: "450px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Oltre Turizm Konum"
            />
            <button
              className="absolute top-5 left-3 bg-white text-blue-600  text-sm font-bold px-4 py-1.5 rounded-3xl cursor-pointer transition duration-300 shadow-md "
              onClick={() =>
                window.open(yandexLink, "_blank", "noopener,noreferrer")
              }
            >
              {t("contact.viewOnMap")}
            </button>
          </div>
        </div>
      </div>
      <WhatsappContact />
      <Footer />
    </div>
  );
}
