import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api } from "../services/api";
import { Footer } from "../components/Footer";
import { WhatsappContact } from "../components/WhatsappContact";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function CarRental() {
  const { t } = useTranslation();
  const [carCategories, setCarCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [lightbox, setLightbox] = useState(null); // { images, index }
  const navigate = useNavigate();

  const openLightbox = (images, index) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const lightboxNext = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  const lightboxPrev = () =>
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxNext();
      if (e.key === "ArrowLeft") lightboxPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const getActiveIndex = (carId) => activeImageIndex[carId] ?? 0;

  const goNext = (carId, total) =>
    setActiveImageIndex((prev) => ({
      ...prev,
      [carId]: ((prev[carId] ?? 0) + 1) % total,
    }));

  const goPrev = (carId, total) =>
    setActiveImageIndex((prev) => ({
      ...prev,
      [carId]: ((prev[carId] ?? 0) - 1 + total) % total,
    }));

  useEffect(() => {
    document.title = "Services - Vehicle Rental";
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const data = await api.getRentalCars();
      // Transform data to match component structure
      const transformedData = data.map((car) => ({
        ...car,
        specs: {
          transmission: car.transmission,
          fuel: car.fuel,
          doors: car.doors,
          luggage: car.luggage,
        },
        dailyPrice: car.daily_price,
        weeklyPrice: car.weekly_price,
      }));
      setCarCategories(transformedData);
    } catch (error) {
      console.error("Error loading rental cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use API data
  const displayCars = carCategories;

  const getColorClasses = (color) => {
    const colors = {
      blue: "border-blue-500 hover:shadow-blue-100",
      indigo: "border-indigo-500 hover:shadow-indigo-100",
      purple: "border-purple-500 hover:shadow-purple-100",
      green: "border-green-500 hover:shadow-green-100",
      amber: "border-amber-500 hover:shadow-amber-100",
      red: "border-red-500 hover:shadow-red-100",
    };
    return colors[color] || colors.blue;
  };

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
      <Header />

      {/* Hero Section */}

      <div className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
        <img
          src="/fleet.jpg"
          alt="Tours"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 w-full pb-10">
            <h1 className="text-4xl md:text-6xl font-onest font-semibold text-white mb-3 justify-self-start">
              {t("services.carRentalTitle")}
            </h1>
            <p className=" text-sm md:text-xl text-white/80 text-left font-onest">
              {t("services.subtitle")}
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

        <span className="text-gray-800 font-medium">
          {t("services.carRentalTitle")}
        </span>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className=" text-2xl md:text-4xl font-onest font-bold text-gray-800 mb-6 justify-self-start">
            {t("services.chooseVehicle")}
          </h2>
          <p className="text-l md:text-lg font-onest text-gray-600 text-left max-w-5xl">
            {t("services.chooseDescription")}
          </p>
        </div>

        {/* Car Categories Grid */}
        <div className="space-y-12 mb-20">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">{t("services.loading")}</p>
            </div>
          ) : displayCars.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">
                {t("services.noAvailable")}
              </p>
            </div>
          ) : (
            displayCars.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 "
              >
                <div className="grid md:grid-cols-2">
                  {/* Image Gallery Section */}
                  <div className="p-4 flex flex-col gap-2">
                    {/* Main large image with nav buttons */}
                    {category.images.length > 0 && (
                      <div className="relative h-80 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                        <img
                          src={category.images[getActiveIndex(category.id)]}
                          alt={`${category.model} main`}
                          className="w-full h-full object-cover transition-transform duration-300 cursor-pointer"
                          onClick={() =>
                            openLightbox(
                              category.images,
                              getActiveIndex(category.id),
                            )
                          }
                        />
                        {category.images.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                goPrev(category.id, category.images.length)
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transition-all duration-300 cursor-pointer"
                            >
                              <span className="text-4xl mb-2 mr-1">
                                {" "}
                                &#8249;
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                goNext(category.id, category.images.length)
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transition-all duration-300 cursor-pointer"
                            >
                              <span className="text-4xl mb-2 ml-1">
                                {" "}
                                &#8250;
                              </span>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                    {/* Thumbnails */}
                    {category.images.length > 1 && (
                      <div className="flex gap-3">
                        {category.images.map((image, idx) => (
                          <div
                            key={idx}
                            onClick={() =>
                              setActiveImageIndex((prev) => ({
                                ...prev,
                                [category.id]: idx,
                              }))
                            }
                            className={`relative flex-1 h-14 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer ${
                              idx === getActiveIndex(category.id)
                                ? "ring-2 ring-blue-500"
                                : ""
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${category.model} ${idx + 1}`}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Information Section */}
                  <div className="p-8 flex flex-col">
                    <div className="mb-6">
                      <p className="text-xl text-gray-900 font-onest font-bold mb-1">
                        {category.model}
                      </p>
                      <p className="text-gray-600">{category.description}</p>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 font-inter ">
                        {t("services.features")}
                      </h4>
                      <div className="grid grid-cols-1 gap-2 ">
                        {category.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-gray-700"
                          >
                            <span className="text-green-500 mr-2 text-sm">
                              ✓
                            </span>
                            <span className="text-m">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="border-t border-gray-400 pt-6 mt-auto">
                      <div className="flex items-center justify-center mb-4">
                        <div className="flex flex-col items-center text-center">
                          <p className="text-gray-800 font-onest ">
                            Pricing varies by group size
                          </p>
                          <div className="flex gap-3">
                            <p className="font-onest text-gray-800">
                              Please contact us to get a quote
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/contact#contact"
                        className="block w-2/4 mx-auto bg-[rgb(52,63,69)] text-white py-4 rounded-3xl hover:bg-white cursor-pointer hover:text-[rgb(52,63,69)] transition duration-300 border-1 font-bold text-center transition-all shadow-lg hover:shadow-xl"
                      >
                        <p>Request Quote</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInRight}
          className="bg-gradient-to-r from-[rgb(31,37,40)] to-[rgb(57,69,75)] text-white rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("services.readyToRide")}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t("services.readyDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact#contact"
              className="bg-white/0  px-8 py-4 rounded-4xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg border-1 border-white text-white hover:text-[rgb(31,37,40)]"
            >
              {t("services.contactUs")}
            </Link>
          </div>
        </motion.div>
      </div>
      <WhatsappContact />
      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white text-3xl leading-none bg-white/10 hover:bg-white/25 w-10 h-10 flex items-center justify-center rounded-full transition cursor-pointer"
          >
            <span className="">✕</span>
          </button>

          {/* Prev */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-white/10 hover:bg-white/25 w-12 h-12 flex items-center justify-center rounded-full transition cursor-pointer"
            >
              <span className="text-4xl mb-2 mr-1"> &#8249;</span>
            </button>
          )}

          {/* Image */}
          <img
            src={lightbox.images[lightbox.index]}
            alt="fullscreen"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {lightbox.images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                lightboxNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl bg-white/10 hover:bg-white/25 w-12 h-12 flex items-center justify-center rounded-full transition cursor-pointer"
            >
              <span className="text-4xl mb-2 "> &#8250;</span>
            </button>
          )}

          {/* Dot indicators */}
          {lightbox.images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {lightbox.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((prev) => ({ ...prev, index: i }));
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === lightbox.index ? "bg-white w-5" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
