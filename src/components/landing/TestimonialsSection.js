'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Марија и Филип', 
    location: "Скопје",
  event: "Свадбена прослава",
  rating: 5,
    content: "Ова беше најдоброто вложување за нашата свадба! Додека ние уживавме, гостите скенираа QR кодот и ги прикачуваа фотографиите. Добивме над 500 фотографии што никогаш немаше да ги видиме иначе. Баба ми и дедо ми, кои не се експерти со мобилни телефони, успеаја да ги споделат своите слики без проблем. Вистинско чудо!", 
  },
  {
    name: "Ана",
    location: "Битола", 
    event: "30-ти роденден",
    rating: 5,
    content: "За мојот 30-ти роденден сакав нешто посебно. Креирав албум и го ставив QR кодот на поканите. Најмногу ми се допаднаа видеа-честитките што ги добив - нешто што обичните фотографии не можат да го пренесат. Од сега Wedibox ќе го користам за секоја прослава!", 
  },
  {
     name: "Петар",
  location: "Струмица",
  event: "Годишнина на компанијата",
  rating: 5, 
    content: "Како менаџер на компанија од 20 вработени, секогаш барам начин да го подобрам team building-от. QR код системот беше перфектен за тој настан. Вработените можеа да ги споделат неформалните моменти, а ние добивме прекрасен албум. Професионално и многу лесно за употреба!", 
  },
  {
    name: "Елена и Марко",
  location: "Прилеп",
  event: "Свадбена веселба",
  rating: 5,
  content: "За нашата свадба бев многу загрижена дека ќе пропуштам моменти додека се обидувам да бидам насекаде. Со QR код албумот, гостите сами ги прикачуваа фотографиите и видеата! Добивме неверојатни снимки од подготовките, деталите за украсување и моменти кои ние ги пропуштивме. - емоционални спомени што ќе ги чуваме засекогаш!" ,
  }
];

const TestimonialsSection = () => {
  return (
    <section id="iskustva" className="py-8 px-4 sm:px-6 lg:px-8 bg-[#f5f5f5]  scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2b2d2f] mb-4">Искуства на нашите корисници</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-4 rounded-lg border-0 bg-white hover:shadow-xl transition-all duration-300 relative">
              <div className="flex flex-col h-full">
                <div className="flex-grow mb-4">
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
                </div>
                
                <div className="relative">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                  <h3 className="text-sm italic text-[#2b2d2f]">-{' '}{testimonial.name}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;