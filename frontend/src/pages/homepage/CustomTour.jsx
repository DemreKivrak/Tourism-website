import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function CustomTour() {
  const nav = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div
        className="relative w-full h-screen mt-15"
        style={{
          backgroundImage: `url('homepage-comp-1.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top Section - 50/50 Split */}
        <div className="flex w-full h-6/9">
          {/* Left - Text & Button */}
          <div className="md:w-1/2 bg-black/50 flex flex-col justify-center px-12 py-12">
            <h2 className="text-white text-4xl font-bold font-inter mb-4">
              {t("customTour.cantFind")}
            </h2>
            <p className="text-white text-2xl font-bold mb-4">
              {t("customTour.cantFindDesc")}
            </p>
          </div>

          {/* Right - Image */}
          <div className="w-1/2 hidden md:block ">
            <img
              className="w-full h-full object-cover"
              src="homepage-comp-4.png"
              alt="Hot-air balloon"
            />
          </div>
        </div>

        {/* Bottom Section - Full width Text & Button with dark overlay */}
        <div className="w-full h-3/9 bg-gray-700/30 flex flex-col justify-center items-start px-12 py-12">
          <h1 className="text-white text-2xl font-bold mb-4 mx-auto">
            {t("customTour.reachUs")}
          </h1>
          <button
            onClick={() => nav("/contact")}
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition mx-auto cursor-pointer transition duration-300 hover:scale-105"
          >
            {t("customTour.contact")}
          </button>
        </div>
      </div>
    </>
  );
}
