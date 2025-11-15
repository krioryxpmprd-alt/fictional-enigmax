import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "Дали на гостите им треба апликација за да прикачат фотографии?",
    answer:
      "Не! MemoryBox работи целосно преку интернет прелистувач. Гостите само го скенираат вашиот QR код со нивниот телефон, и веднаш можат да прикачуваат фотографии или видеа — без апликација, регистрација или лозинки. Сè е едноставно и интуитивно, дури и за оние што не се технички вешти."
  },
  {
    question: "Како функционира MemoryBox?",
    answer:
      "Создадете ваш настан, персонализирајте ја страницата со ваши детали и споделете го уникатниот QR код со вашите гости. Тие можат да прикачуваат фотографии, видеа и пораки кои автоматски се собираат во вашиот дигитален албум. По завршувањето на настанот, можете да ги симнете сите спомени со еден клик."
  },
  {
    question: "Дали прикачувањето на фотографии е безбедно?",
    answer:
      "Да, безбедноста е наш врвен приоритет. Сите фотографии и видеа се шифрирани и се чуваат на сигурни сервери со ограничен пристап. Само вие како домаќин имате пристап до вашиот албум. MemoryBox не може да ги гледа, користи или споделува вашите фотографии и видеа. Податоците не се користат за рекламирање, анализа или обука — вашите спомени остануваат само ваши."
  },
  {
    question: "Како да добијам QR код за мојат настан?",
    answer:
      "Штом го создадете настанот во MemoryBox, вашиот уникатен QR код автоматски се генерира. Можете да го преземете и вметнете на покани, декорации, екрани или да го споделите преку порака или е-маил. Гостите ќе го скенираат и веднаш ќе можат да прикачуваат фотографии и видеа."
  },
  {
    question: "Колку фотографии и видеа можам да соберам?",
    answer:
      "Нема ограничувања! Со Стандард и Премиум пакетите можете да соберете неограничен број фотографии, видеа и пораки од вашите гости. Целта е да ги зачувате сите моменти без компромис."
  },
  {
    question: "Може ли MemoryBox да се користи и за други настани?",
    answer:
      "Да! MemoryBox е совршен и за родендени, крштевки, матурски прослави, годишнини и корпоративни настани. Секој настан може да добие свој уникатен QR код и прилагодена страница."
  },
  {
    question: "Дали гостите мора да имаат интернет за да прикачат фотографии?",
    answer:
      "Да, потребна е интернет конекција, но не мора да биде брза. MemoryBox е оптимизиран за мобилни уреди и побавни мрежи, така што гостите лесно ќе можат да прикачуваат дури и со ограничен интернет."
  },
  {
    question: "Може ли да го прилагодам изгледот на QR кодот и страницата?",
    answer:
      "Да! Можете да ги додадете вашите бои, имиња, датуми и дури и слика од парот. QR кодот може да изгледа совршено на вашите покани или декорации, а страницата на гостите ќе биде персонализирана според вашиот стил."
  },
  {
    question: "Може ли да ги симнам сите фотографии и видеа?",
    answer:
      "Секако! По завршувањето на настанот, можете со еден клик да ги симнете сите фотографии и видеа во ZIP датотека. Така сите спомени ви остануваат безбедно зачувани и подготвени за споделување."
  },
  {
    question: "Што ако имам технички проблем или прашање?",
    answer:
      "Нашиот тим за поддршка е секогаш тука за вас. Можете да не контактирате преку телефонски број, е-пошта или формуларот за контакт и ќе добиете брз и љубезен одговор. Помагаме во секој чекор – од активирање на настанот до преземање на вашите фотографии."
  }
];

export default function FAQSection({ showCTA = true }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section
      id="najcesto-postavuvani-prasanja"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#fff8f9] to-[#fff3f4] overflow-hidden scroll-mt-4"
    >
      {/* ✅ JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative elements (lighter now) */}
      <div className="hidden lg:block absolute top-10 -left-10 w-20 h-20 bg-gradient-to-r from-[#e24b2c]/10 to-[#f4c2c2]/20 rounded-full blur-lg opacity-50" />
      <div className="hidden lg:block absolute bottom-10 -right-16 w-24 h-24 bg-gradient-to-r from-[#f4c2c2]/10 to-[#e24b2c]/20 rounded-full blur-lg opacity-40" />

      <div className="relative max-w-4xl mx-auto text-[#e24b2c]">
        <div className="text-center mb-16">
          <h2 className="mb-2 text-3xl font-bold">Најчесто поставувани прашања</h2>
          <p className="text-lg text-gray-600">
            Одговори на сè што треба да знаете за <strong>MemoryBox</strong> — најлесниот начин да ги соберете сите спомени.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-gray-200 rounded-2xl hover:border-[#e24b2c] bg-white shadow-sm transition-colors duration-300 text-[#343f52]"
            >
              <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between text-lg font-semibold hover:bg-[#fff8f9] rounded-2xl select-none">
                <span>{faq.question}</span>
                <ChevronDown
                  className="h-5 w-5 text-[#343f52] transition-transform duration-200 group-open:rotate-180 will-change-transform"
                />
              </summary>
              <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
       
        {/* CTA Section */}
        {showCTA && (
        <div className="text-center mt-20">
          <div className="bg-[#e24b2c]/10 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-3">Имате уште прашања?</h3>
            <p className="text-stone-950 mb-6 max-w-2xl mx-auto">
              Нашиот тим за поддршка на корисници со задоволство ќе ви помогне да го создадете совршениот фото-албум за вашиот настан.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="items-center gap-2 transition-all duration-300 group-hover:gap-3"
                id="custom-button-id-contact"
                aria-label="Контактирајте нè"
              >
                Контактирајте нè
              </Link>
            </div>
          </div> 
           </div>
      )} 
      </div>
    </section>
  );
}
