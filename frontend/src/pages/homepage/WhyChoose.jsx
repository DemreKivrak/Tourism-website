import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function WhyChoose() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-5xl mx-auto">
        {/* Başlık */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-onest font-bold text-center text-gray-800 mb-6"
        >
          {t("contact.whyChoose")}
        </motion.h2>

        <hr
          className=" w-2/8 mb-6 mx-auto
        
        text-gray-800 border-t-2 border-gray-800"
        ></hr>

        {/* Kartlar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ y: -6 }}
            className=" rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col gap-3 bg-gradient-to-r from-white to-gray-75"
          >
            <h3 className="font-onest font-semibold text-gray-800 text-lg leading-snug">
              {t("contact.expertGuides")}
            </h3>
            <p className="text-gray-500 text-m leading-relaxed">
              {t("contact.expertGuidesDesc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className=" rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col gap-3 bg-gradient-to-r from-white to-gray-75"
          >
            <h3 className="font-onest font-semibold text-gray-800 text-lg leading-snug">
              {t("contact.support")}
            </h3>
            <p className="text-gray-500 text-m leading-relaxed">
              {t("contact.supportDesc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className=" rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col gap-3 bg-gradient-to-r from-white to-gray-75"
          >
            <h3 className="font-onest font-semibold text-gray-800 text-lg leading-snug">
              {t("contact.quality")}
            </h3>
            <p className="text-gray-500 text-m leading-relaxed">
              {t("contact.qualityDesc")}
            </p>
          </motion.div>
        </div>
      </div>
      <Link
        to="/contact"
        className="inline-block bg-[rgb(31,37,40)]  px-8 py-4 rounded-4xl font-bold text-2xl hover:bg-white transition-all transform hover:scale-105 shadow-lg border-1  text-white hover:text-[rgb(31,37,40)] mt-10 border-[rgb(31,37,40)] "
      >
        {t("services.contactUs")}
      </Link>
    </section>
  );
}
