import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function Footer() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
    <>
      <div className="flex-col">
        <div className=" bg-gradient-to-l from-[rgb(31,37,40)] to-[rgb(12,22,27)] min-h-65 flex flex-col md:flex-row justify-between px-4 md:px-8 py-8 md:py-0 overflow-x-hidden">
          {/*Logo Section */}
          <div className="self-center text-left">
            <div>
              <img
                className="h-40 md:h-45"
                src="/oltre-white.png"
                alt="Logo"
              ></img>
            </div>
          </div>

          {/*quick links */}
          <div className="grid grid-cols-2 self-center text-left md:ml-15 gap-x-10 mt-8 md:mt-0">
            <div className="text-white mb-6 md:mb-0 md:mr-15">
              <p
                className="hover:text-green-300 cursor-pointer mb-2 font-onest"
                onClick={() => navigate("/tours")}
              >
                {t("nav.tours").toUpperCase()}
              </p>
              <p
                className="hover:text-green-300 cursor-pointer mb-2 font-onest "
                onClick={() => navigate("/destinations")}
              >
                {t("nav.destinations").toUpperCase()}
              </p>
              <p
                className="hover:text-green-300 cursor-pointer mb-2 font-onest"
                onClick={() => navigate("/car-rental")}
              >
                {t("nav.services").toUpperCase()}
              </p>
            </div>
            <div className="text-white mb-6 md:mb-0 md:mr-15">
              <p
                className="hover:text-green-300 font-onest cursor-pointer mb-2"
                onClick={() => navigate("/")}
              >
                {t("nav.home").toUpperCase()}
              </p>
              <p
                className="hover:text-green-300 font-onest  cursor-pointer mb-2"
                onClick={() => navigate("/about")}
              >
                {t("nav.about").toUpperCase()}
              </p>
              <p
                className="hover:text-green-300 font-onest cursor-pointer mb-2"
                onClick={() => navigate("/galery")}
              >
                {t("nav.gallery").toUpperCase()}
              </p>
              <p
                className="hover:text-green-300 font-onest cursor-pointer mb-2"
                onClick={() => navigate("/contact")}
              >
                {t("nav.contact").toUpperCase()}
              </p>
            </div>
          </div>

          {/*Get In touch Section */}
          <div className="self-center justify-items-start text-left w-full md:w-1/4">
            <h1 className="text-[rgb(255,255,255)] mb-5 font-onest font-semibold ">
              GET IN TOUCH
            </h1>
            <p className="text-[rgb(209,210,203)] max-w-3/4">
              Bozkurt Mah. Ergenekon Cad. Muratoğlu Çarşısı No:41 Kat:3
              Daire:116 Pangaltı-Şişli / İstanbul
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gradient-to-l from-[rgb(31,37,40)] to-[rgb(12,22,27)] px-4 md:px-8 pb-6">
          <hr className="border-gray-600 mb-4" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-400">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <p className="font-inter">
                Copyright © {new Date().getFullYear()} Oltre Turizm
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInRight}
            >
              <p
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/demre-k%C4%B1vrak-2827a4297/",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="font-inter cursor-pointer hover:text-green-400 transition duration-300 "
              >
                Designed by Demre Kıvrak
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
