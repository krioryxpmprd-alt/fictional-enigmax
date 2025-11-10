import Image from 'next/image';
import phoneMockup6 from "@/components/landing/assets/phone-mockup-6.png";
import styles from './styles.module.scss';
import './style.css';
import phoneMockup2 from "@/components/landing/assets/phone-mockup-7.jpg";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Objasnuvanje = () => {
  return (
    <section aria-labelledby="main-heading" className='relative' itemScope itemType="https://schema.org/Service"> 
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "QR Код Систем за Собирање Фотографии",
            "description": "Дигитален албум за собирање фотографии и видеа од гости преку QR код за свадби и прослави во Македонија.",
            "provider": {
              "@type": "Organization",
              "name": "Wedibox",
              "url": "https://wedibox.mk"
            },
            "areaServed": "Македонија",
            "serviceType": "Дигитални албуми за настани",
            "inLanguage": "mk-MK"
          })
        }}
      />

      {/* First Section - Benefits */}
    <div className="hidden lg:block absolute -top-4 -left-0 w-32 h-32 bg-gradient-to-r from-[#e24b2c]/10 to-[#e53714]/20 rounded-full opacity-60"></div>

  <div className="hidden lg:block absolute top-6 right-32 w-28 h-28 bg-gradient-to-r from-[#e24b2c]/15 to-[#872511]/25 rounded-full opacity-60"></div>

  <div className="hidden lg:block absolute top-86 right-92 w-20 h-20 bg-gradient-to-r from-[#e24b2c]/15 to-[#8e3f30]/25 rounded-full opacity-60"></div>

  <div className="hidden lg:block absolute bottom-[-90px] left-16 w-18 h-18 bg-gradient-to-r from-[#925a4f]/20 to-[#e24b2c]/10 rounded-full opacity-60"></div>

  <div className="hidden lg:block absolute bottom-[-20px] right-40 w-36 h-36 bg-gradient-to-r from-[#e24b2c]/15 to-[#925a4f]/25 rounded-full opacity-60"></div>
  

            
  <article className="features-grid">
        <header className="feature-card">
          <div className="card-content">
            <div className="inner-container">
              <h3 className="display-3" >Споделување фотографии е сега едноставно!</h3>
              <p className="no-margin-bottom">Нашиот QR код систем за споделување фотографии е наменет за сите видови прослави. Свадби, корпоративни настани, фестивали, родендени, итн... Повеќе нема потреба да ги пребарувате вашите омилени фотографии и видеа низ пораки или социјални мрежи - секој спомен е зачуван во вашиот приватен дигитален албум.</p>
            </div>
          </div>
          <div className="image-container">
            <div className="w-full lg:320 mx-auto mb-8 lg:mb-0 order-2 lg:order-2">
              <figure className="relative rounded-2xl overflow-hidden " id="video-figure"> 
                  <video 
                    className="telefon large"
                    poster={phoneMockup6.src}
                    autoPlay   
                    loop 
                    playsInline 
                    muted  
                    preload="metadata"
                    aria-label="Демонстрација на како функционира QR код системот за собирање фотографии"
                  >
                    <source src="/objasnuvanje.mp4" type="video/mp4" />  
                    Вашиот прелистувач не подржува видео формат.
                  </video>
                  <figcaption className="sr-only">
                    Демонстрација на QR код систем за собирање фотографии од гости за свадби и прослави
                  </figcaption>
                </figure>
            </div>
          </div>
        </header>
        
        <div className="features-content">
          <div className="features-list">
            <div className="feature-item">
              <div className="icon-circle">
                <div className="icon-wrapper">
                 
                </div>
              </div>
              <div className="feature-text">
                <div className='feature-block'> <div className="bg-[#e24b2c]/10 rounded-2xl inline-flex items-center justify-center mb-4" id={styles.iconpadding}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255.98 234.67" className="w-8 h-8 text-[#e24b2c]" fill="currentColor">
                        <path d="M66.66 186.66a40 40 0 01-37.8-27.22l-.36-1.23a39.09 39.09 0 01-1.86-11.57V73.92L.78 160.32a24.24 24.24 0 0017 29.39l164.92 44.18a24.08 24.08 0 006.13.78 23.73 23.73 0 0023-17.44l9.6-30.56H66.66zM96 74.66a21.33 21.33 0 10-21.34-21.33A21.36 21.36 0 0096 74.66z" className="text-[#e24b2c]/30" />
                        <path d="M229.31 0h-160a26.71 26.71 0 00-26.67 26.67V144a26.71 26.71 0 0026.67 26.67h160A26.7 26.7 0 00256 144V26.67A26.69 26.69 0 00229.31 0zm-160 21.33h160a5.32 5.32 0 015.33 5.33v75.72l-33.7-39.31a19.1 19.1 0 00-14.3-6.56 18.63 18.63 0 00-14.26 6.74l-39.6 47.55-12.89-12.9a18.75 18.75 0 00-26.47 0L64 127.34V26.66a5.33 5.33 0 015.33-5.33z" />
                      </svg>
                    </div>
                      <h2 className="font-bold text-gray-900 mb-3" id={styles.textxl}>Сите фотографии & видеа на едно место.</h2>
                      </div>
              
                <p className="text-gray-700 leading-relaxed" id="subheading-text">Wedibox ви овозможува да ги соберете сите фотографии и видеа од вашите гости на едно место. Отстранете го стресот од барање слики по настанот и уживајте во секој момент, додека вашите пријатели и семејството ги споделуваат нивните перспективи.</p> 
              </div>
            </div>
            
            <div className="feature-item">
              <div className="icon-circle">
                <div className="icon-wrapper">
                 
                </div>
              </div>
              <div className="feature-text">
                <div className='feature-block'>
 <div className="bg-[#e24b2c]/10 rounded-2xl inline-flex items-center justify-center mb-4" id={styles.iconpadding}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.69 256" className="w-8 h-8 text-[#e24b2c]" fill="currentColor">
                        <path d="M26.69 83.54V58.66a32 32 0 0164 0V80a31.67 31.67 0 013.25.37A47.94 47.94 0 1010.69 48a47.71 47.71 0 0016 35.54z" className="text-[#e24b2c]/30" />
                        <path d="M170.69 117.33a16 16 0 00-16 16V136a2.68 2.68 0 01-5.35 0v-13.33a16 16 0 10-32 0V136a2.67 2.67 0 11-5.34 0v-24a16 16 0 00-32 0v24a2.67 2.67 0 11-5.34 0V58.67a16 16 0 00-32 0v96a5.32 5.32 0 01-5.33-5.33V128h-5.27C14.51 128 0 142.16 0 159.71.08 216.05 41.09 256 66.3 256h67.06a53.32 53.32 0 0053.33-53.33v-69.33a16 16 0 00-16-16z" />
                      </svg>
                    </div>
                    <h2 className="font-bold text-gray-900 mb-3" id={styles.textxl}>Без апликација или регистрација</h2>
                </div>
                
                <p className="text-gray-700 leading-relaxed" id="subheading-text">Wedibox е дизајниран да работи директно преку веб линкот. Гостите не мора да преземаат апликации или да креираат профили, што го прави процесот брз и лесен за сите.</p> 
              </div>
            </div>
            
            <div className="feature-item">
              <div className="icon-circle">
                <div className="icon-wrapper">
                
                </div>
              </div>
              <div className="feature-text">
                <div className='feature-block'>
 <div className="bg-[#e24b2c]/10 rounded-2xl inline-flex items-center justify-center mb-4" id={styles.iconpadding}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 text-[#e24b2c]" fill="currentColor">
                        <path d="M226.67 0H80a29.35 29.35 0 00-29.33 29.33v13.33H72v-8a13.34 13.34 0 0113.33-13.33h136a13.34 13.34 0 0113.33 13.33v186.67a13.35 13.35 0 01-13.33 13.33h-82.74A44.07 44.07 0 01132.7 256h94a29.33 29.33 0 0029.3-29.33V29.33A29.35 29.35 0 00226.67 0z" />
                        <path d="M97.17 64h-77C9 64 0 73.87 0 86v148c0 12.13 9 22 20.16 22h77c11.12 0 20.16-9.87 20.16-22V86c.01-12.13-9.03-22-20.15-22zm5.5 168c0 4.42-3.28 8-7.33 8H22c-4.05 0-7.33-3.58-7.33-8V85.33c0-4.42 3.28-8 7.33-8h3.66c4.05 0 7.33 3.58 7.33 8s3.28 8 7.33 8H77c4.05 0 7.33-3.59 7.33-8s3.28-8 7.33-8h3.66c4 0 7.33 3.58 7.33 8V232z" className="text-[#e24b2c]/30" />
                        <path d="M154.67 186.67A13.33 13.33 0 10168 200a13.35 13.35 0 00-13.33-13.33z" />
                      </svg>
                    </div>
               <h2 className="font-bold text-gray-900 mb-3" id={styles.textxl}>Едноставно споделување преку QR код</h2>
               </div>
                    <p className="text-gray-700 leading-relaxed" id="subheading-text">
                      Гостите можат да прикачат фотографии, видеа и пораки преку мобилен уред со скенирање на вашиот уникатен QR код. Без разлика дали користат iOS или Android, процесот е беспрекорен и интуитивен..
                    </p> 
              </div>
            </div>
            <div className="feature-item">
              <div className="icon-circle">
                <div className="icon-wrapper">
                  
                </div>
              </div>
              <div className="feature-text">
                <div className='feature-block'>
<div className="bg-[#e24b2c]/10 rounded-2xl inline-flex items-center justify-center mb-4" id={styles.iconpadding}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 213.34" className="w-8 h-8 text-[#e24b2c]" fill="currentColor">
                        <path d="M177.81 73.28c.11-1.28.21-2.56.21-4s-.12-2.67-.21-4l8.85-6.52a13.19 13.19 0 003.63-17.07l-7.89-13.98a12.76 12.76 0 00-16.64-5.44L156 26.86a51.33 51.33 0 00-6.08-3.63l-1.12-11.39A13 13 0 00135.89 0H120.1a13 13 0 00-12.92 11.84l-1.07 11.41a51.33 51.33 0 00-6.11 3.63l-9.81-4.59a12.86 12.86 0 00-16.64 5.44L65.7 41.81a13.12 13.12 0 003.63 17.07l8.85 6.51c-.12 1.28-.21 2.56-.21 4s.11 2.68.21 4l-8.85 6.51a13.12 13.12 0 00-3.62 17l7.89 14.08a12.84 12.84 0 0016.64 5.44l9.81-4.59a51.33 51.33 0 006.08 3.63l1.07 11.41a13 13 0 0012.91 11.84h15.79a13 13 0 0012.92-11.84l1.07-11.41a51.33 51.33 0 006.08-3.63l9.81 4.59a12.76 12.76 0 0016.64-5.44l7.88-14.08a13.12 13.12 0 00-3.63-17.07zm-23.14-3.94A26.67 26.67 0 11128 42.67a26.69 26.69 0 0126.67 26.67z" className="text-[#e24b2c]/30" />
                        <path d="M224 149.34H32a32 32 0 000 64h192a32 32 0 000-64zM42.67 192a10.67 10.67 0 1110.67-10.66A10.67 10.67 0 0142.67 192zM96 192a10.67 10.67 0 1110.67-10.66A10.67 10.67 0 0196 192zm64 0a10.67 10.67 0 1110.67-10.66A10.67 10.67 0 01160 192zm53.33 0A10.67 10.67 0 11224 181.34 10.67 10.67 0 01213.33 192z" />
                      </svg>
                    </div>
                     <h2 className="font-bold text-gray-900 mb-3" id={styles.textxl}>Опции за поставување</h2>
                </div>
               
                    <p className="text-gray-700 leading-relaxed" id="subheading-text">
                      Потребни се само{' '}
                      <span className="text-[#e24b2c] font-bold underline decoration-2 decoration-[#e24b2c]/30">
                        2 минути
                      </span>{' '}
                      за креирање на <strong>дигитален албум</strong> за вашиот настан. Поставувањето е интуитивно и лесно за корисниците!
                    </p> 
                <Link
                    href="/login"
                    className="items-center gap-2 transition-all duration-300 group-hover:gap-3"
                    id="custom-button-id"
                    aria-label={`Пробајте ги услугите на Wedibox бесплатно`}
                  >
                    Пробајте бесплатно
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link> 
              </div>
            </div>
          </div>
        </div>
      </article> 
    </section>
  );
};

export default Objasnuvanje;