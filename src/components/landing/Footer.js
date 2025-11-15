import React from 'react';
import { QrCode } from 'lucide-react';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok  } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#2b2d2f] text-white py-16 px-4 sm:px-6 lg:px-8" itemScope > 
      
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <QrCode className="h-8 w-8 text-[#e24b2c]" />
              <span className="text-2xl font-bold" itemProp="name">MojMoment</span>
            </div>
            <p className="text-gray-400 mb-4" itemProp="description">
              Сите фотографии, видеа и пораки од твојата свадба или прослава на едно место!
            </p>
            <div className="flex space-x-4">
              {/* Social Media Links */}
              <a 
                href="https://facebook.com/mojmoment" 
                aria-label="Следете не на Facebook"
                className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#e24b2c] transition-colors"
              >
                <span className="text-sm"><FaFacebookF /></span>
              </a>
              <a 
                href="https://instagram.com/mojmoment" 
                aria-label="Следете не на Instagram"
                className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#e24b2c] transition-colors"
              >
                <span className="text-sm"><FaInstagram /></span>
              </a>
              <a 
                href="https://tiktok.com/@mojmoment" 
                aria-label="Следете не на TikTok"
                className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#e24b2c] transition-colors"
              >
                <span className="text-sm"><FaTiktok/></span>
              </a>
               <a 
                href="https://youtube.com/@mojmoment" 
                aria-label="Следете не на Youtube"
                className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#e24b2c] transition-colors"
              >
                <span className="text-sm"><FaYoutube/></span>
              </a>
            </div>
          </div>
          
          {/* Product Links - FIXED: Use actual routes instead of anchor links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/#kako-funkcionira" className="hover:text-white transition-colors">
                  Што е МојМомент?
                </Link>
              </li>
              <li>
                <Link href="/#cenovnik" className="hover:text-white transition-colors">
                  Ценовник
                </Link>
              </li>
              <li>
                <Link href="/#iskustva" className="hover:text-white transition-colors">
                  Искуства на корисници
                </Link>
              </li>
              <li>
                <Link href="/#najcesto-postavuvani-prasanja" className="hover:text-white transition-colors">
                  Често поставувани прашања
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Use Cases - Macedonian */}
          <div>
            <h3 className="text-lg font-semibold mb-4">МојМомент</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/za-nas" className="hover:text-white transition-colors">
                  За нас
                </Link>
              </li>
              <li>
                <Link href="/najavi-se" className="hover:text-white transition-colors"> {/* Fixed route */}
                  Најави се
                </Link>
              </li> 
            </ul>
          </div>
          
          {/* Support - Macedonian */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Поддршка</h3>
            <ul className="space-y-2 text-gray-400"> 
              <li>
                <a href="/kontakt" className="hover:text-white transition-colors">
                  Контакт
                </a>
              </li>
              <li>
                <Link href="/privatnost" className="hover:text-white transition-colors">
                  Политика за приватност
                </Link>
              </li>
              <li>
                <Link href="/uslovi" className="hover:text-white transition-colors">
                  Услови на користење
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
          <p itemProp="copyrightYear" itemScope itemType="https://schema.org/©">
            &copy; {currentYear} <span itemProp="copyrightHolder">MojMoment</span>. Сите права се задржани. 
            Направено со ❤️ за незаборавни настани во <span itemProp="location">Македонија</span>.
          </p>
          
          {/* Additional SEO Links */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Мапа на сајтот
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/qr-kod-uslugi-makedonija" className="hover:text-white transition-colors">
              QR код услуги Македонија
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/svadbeni-fotografii" className="hover:text-white transition-colors">
              Свадбени фотографии
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;