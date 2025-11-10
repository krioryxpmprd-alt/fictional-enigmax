// app/components/FeaturesSection.tsx
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import styles from "./styles.module.scss";
import howitworks1 from "../assets/howitworks1.png";
import howitworks2 from "../assets/howitworks2.png";
import howitworks3 from "../assets/howitworks3.png";

const FeaturesSection = () => {
  const categories = [
    {
      id: 1,
      title: "Креирање и персонализација",
      subtitle: "Брзо и лесно, без компликации!",
      description:
        "Регистрирајте се и создадете уникатен QR код за вашиот настан (свадба, роденден, прослава). Изберете име за настанот, датум и персонализирајте ги боите и изгледот за да создадете уникатно место за вашите спомени.",
      image: howitworks1,
      features: [
        "Регистрирајте се и создадете уникатен QR код за споделување фотографии веднаш.",
        "Изберете име и датум на настанот.",
        "Персонализирајте ги боите и изгледот според вашиот стил.",
        "Целосна подготвеност за 2-3 минути - брзо и без компликации",
      ],
      bgGradient: "from-amber-400 to-orange-500",
      slug: "qr-kod-za-svadbi",
      step: "Чекор 1",
    },
    {
      id: 2,
      title: "Отпечатете го QR кодот и споделете го со гостите",
      subtitle: "Запази ги сите моменти од перспектива на гостите!",
      description:
        "Превземете го вашиот QR код преку линкот за споделување. Отпечатете го и  ставете го на видливо место. Со скенирање на QR кодот гостите брзо и лесно споделуваат фотографии, видеа & пораки. – без преземање на апликации, без регистрација!",
      image: howitworks2,
      features: [ 
        "Отпечатете го QR кодот и ставете го на видливо место",
        "Гостите додаваат фотографии директно од нивниот телефон, без преземање на апликации или креирање на профили",
        "Фотографиите се веднаш видливи во вашиот дигитален албум",
      ],
      bgGradient: "from-orange-500 to-amber-400",
      slug: "digitalen-album-za-rodendeni",
      step: "Чекор 2",
    },
    {
      id: 3,
      title: "Прегледајте ги и преземете ги сите спомени",
      subtitle: "Спомени што остануваат засекогаш",
      description:
        "Додека гостите додаваат содржини, вие ги гледате сите фотографии и видеа во реално време во вашиот дигитален албум. По завршувањето на настанот, можете да ги преземете сите спомени со еден клик!",
      image: howitworks3,
      features: [
        "Гледајте ги сите фотографии во реално време додека гостите ги прикачуваат",
        "Сите спомени се собираат автоматски на едно место",
        "Преземете ги сите содржини со еден клик по настанот", 
      ],
      bgGradient: "from-amber-400 to-orange-500",
      slug: "sobiranje-video-od-proslavi",
      step: "Чекор 3",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "QR Свадбени Албуми Македонија",
    description:
      "Собирање фотографии и видеа од гости преку QR код за свадби и прослави во Македонија",
    url: "https://vashiot-sajt.mk",
    telephone: "+389-70-XXX-XXX",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MK",
      addressRegion: "Македонија",
    },
    serviceType: "Дигитални албуми за настани",
  };

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-16 px-4"
      id={styles.orng5}
    >
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="max-w-7xl mx-auto"> 
        {/* HERO HEADER */}
        <header className="text-center mb-16" id={styles.mb16}>
            
          <h1 className="font-bold text-gray-900 mb-6" id={styles.headingtext}>
            Што е Wedibox, и како функционира? 
            <span className="text-orange-500"> </span> 
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nашиот иновативен систем ви помага да создадете незаборавни спомени од вашата{" "}
            <strong>свадба</strong>, <strong>роденден</strong> или <strong>прослава</strong>
            . Соберете ги сите фотографии и видеа од вашите гости на едно место преку QR код – создавајќи дигитален албум полн со спомени.
          </p>
        </header>

        {/* FEATURES */}
        <div className="space-y-24">
          {categories.map((category, index) => (
            <article
              key={category.id}
              className={`lg:flex lg:items-center lg:gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
              id={styles.flye1}
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="lg:hidden relative bg-orange-500 text-white px-4 py-2 font-semibold shadow-lg text-sm fit-content" id={styles.abstp}>
                    {category.step}
                  </div>  
              {/* MOBILE layout */}
              <div className="lg:hidden space-y-6">
                <h2
                  className="text-4xl font-bold text-gray-900"
                  itemProp="name"
                  id={styles.blockh2}
                >
                  {category.title}
                </h2>
                <p
                  className="text-lg font-medium text-orange-500"
                  itemProp="description"
                >
                  {category.subtitle}
                </p>

                <figure className="relative">
                  <div 
                  >
                    <div className="bg-white rounded-3xl overflow-hidden">
                      <Image
                        src={category.image}
                        alt={`${category.title} - ${category.subtitle} | QR код услуги во Македонија`}
                        className="w-full h-auto object-contain max-h-540"
                        width={400}
                        height={320}
                        loading="lazy"
                        itemProp="image"
                      />
                    </div>
                  </div>
                  <figcaption className="sr-only">
                    {category.title} - {category.subtitle} | QR код услуги во
                    Македонија
                  </figcaption>
                </figure>

                <p
                  className="text-lg text-gray-700 leading-relaxed"
                  itemProp="description"
                >
                  {category.description}
                </p>

                <ul className="space-y-4">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-black-500 font-bold">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Link
                    href={`/uslugi/${category.slug}`}
                    className={styles.custombutton}
                    aria-label={`Дознај повеќе за ${category.title.toLowerCase()} во Македонија`}
                  >
                    Дознај повеќе
                  </Link>
                </div>
              </div>

              {/* DESKTOP layout */}
              <div className="hidden lg:block flex-1">
                <figure className="relative mb-8">
                  <div 
                  >
                    <div className="bg-white rounded-3xl overflow-hidden">
                      <Image
                        src={category.image}
                        alt={`${category.title} - ${category.subtitle} | QR код услуги во Македонија`}
                        className="w-full h-auto"
                        width={600}
                        height={400}
                        loading="lazy"
                        itemProp="image"
                      />
                    </div>
                  </div>
                  <figcaption className="sr-only">
                    {category.title} - {category.subtitle} | QR код услуги
                    Македонија
                  </figcaption> 
                </figure>
              </div>

              <div className="hidden lg:block flex-1 space-y-6"> 
                 <div className="relative text-white px-4 py-2 font-semibold shadow-lg text-sm" id={styles.abstp}>
                    {category.step}
                  </div> 
                <header> 
                  <h2
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
                    itemProp="name"
                    id={styles.blockh2}
                  >
                    {category.title}
                  </h2>
                  <p
                    className="text-lg font-medium text-orange-500 mb-4"
                    itemProp="description"
                  >
                    {category.subtitle}
                  </p>
                  <p
                    className="text-lg text-gray-700 leading-relaxed"
                    itemProp="description"
                  >
                    {category.description}
                  </p>
                </header>

                <ul className="space-y-4">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-black-500 font-bold">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <Link
                    href={`/uslugi/${category.slug}`}
                    className={styles.custombutton}
                    aria-label={`Дознај повеќе за ${category.title.toLowerCase()} услугите`}
                  >
                    Дознај повеќе
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

         
      </div>
    </section>
  );
};

export default FeaturesSection;
