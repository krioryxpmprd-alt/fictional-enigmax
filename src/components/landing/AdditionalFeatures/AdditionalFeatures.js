'use client';

import React from 'react';
import { Download, QrCode } from 'lucide-react';
import './style.css';
import styles from './styles.module.scss'; 
import guestupload from '../assets/additional-features-qr-code.png'

const additionalFeatures = [
  {
    icon: (
    <div className='svg-bg svg-bg-lg bg-soft-primary rounded-xl mb-4' id='fs30'>💍</div>
    ),
    title: 'QR Код за Свадби',
    subtitle: "Сите спомени од вашиот специален ден на едно место",
    description: 'Сите перспективи од вашата свадба! - од емоционалниот прв танц до смешните моменти на масата. Без да пропуштите ниту еден момент!.',
    slug: "svadben-album",
  },
  {
    icon: (
      <div className='svg-bg svg-bg-lg bg-soft-primary rounded-xl mb-4' id='fs30'> 🎉 </div>
    ),
    title: 'Роденденски Прослави',
    subtitle: "Запазете ги сите изненадувања и честитки",
    description: 'Совршено за јубилејни настани, родендени и семејни прослави. Сите спомени во еден албум.',
    slug: "rodendenski-proslavi",
  },
  {
    icon: (
        <div className='svg-bg svg-bg-lg bg-soft-primary rounded-xl mb-4' id='fs30'>  🥂 </div> 
    ),
    title: 'Корпоративни Настани',
    subtitle: "Запазете ги сите изненадувања и честитки",
    description: 'Идеално за годишни прослави, лансирања на производи, бизнис конференции, фиремни прослави и "team building"',
    slug: "korporativni-nastani",
  },
   {
    icon: (
      <div className='svg-bg svg-bg-lg bg-soft-primary rounded-xl mb-4' id='fs30'> 🎓 </div>
    ),
    title: 'Студентски и Диплoмски Прослави',
    subtitle: "Запазете ги спомените од завршувањето на училиште или факултет",
    description: 'За вашата матура или дипломска прослава. Од свечената церемонија до забавата по неа - сите спомени на едно лесно достапно место. Совршено за генерациски фотографии и групни спомени.',
    slug: "studentski-proslavi",
  }
];

const AdditionalFeatures = () => {
  return (
    <section className="bg-[#f5f5f5]" id='additional-features'>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#f2adc8] rounded-full opacity-20 blur-xl"></div>
                  <h2 className="font-bold text-[#2b2d2f] relative z-10" id="z-10">
                    Wedibox е перфектен за
                    <br />
                    <span className="relative-occasion">
                      секоја пригода!
                      
                    </span>
                  </h2>
                </div>
              </div> 
            </div>

            {/* Feature Items */}
            <div className="space-y-6">
              {additionalFeatures.map((feature, index) => (
                 <div className="feature-items">
                              <div className="icon-circles">
                                <div className="icon-wrappers">
                                 
                                </div>
                              </div>
                              <div className="feature-texts">
                                <div className='feature-blocks'>
                 <div className="bg-[#f7e1e1]/50 rounded-2xl flex items-center justify-center " id={styles.iconpadding}>
                                    {feature.icon}
                                    </div> 
                                   
                                </div>
                                <div className='feature-blocks'><h2 className="font-bold text-gray-900 mb-3" id={styles.textxl}>{feature.title}</h2>
                                <p className="text-gray-700 leading-relaxed" id="subheading-text">{feature.description}</p> </div>
                                 
                              </div>
                            </div>
              ))}
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="image-wrapper-features">
        
              {/* Top Right - QR Code Card */}
              
               
                  <img 
                    src={guestupload.src} 
                    alt="QR Code Card for guest photo uploads" 
                    className="img-wrapper-img"
                  />
              
             

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/4 -right-8 w-32 h-32 bg-[#f4c2c2] rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -z-10 bottom-1/4 -left-8 w-40 h-40 bg-[#f2adc8] rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeatures;