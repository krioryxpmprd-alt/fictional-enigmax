import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info, Check, X, MessageCircle } from 'lucide-react';
import './style.css';

const InfoPopover = ({ content }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        className="inline-flex items-center justify-center cursor-pointer ml-1 align-middle"
        aria-label="Што значи ова?"
      >
        <Info className="w-[18px] h-[18px] text-grape" />
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-80" side="top">
      <div className="text-sm" dangerouslySetInnerHTML={{ __html: content }} />
    </PopoverContent>
  </Popover>
);

const PricingSection = () => {
  return (
    <section className="wrapper bg-light">
      <div className="container py-14 md:py-16 mx-auto px-4 max-w-7xl">
        {/* Heading at Top - Full Width */}
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            Колку чини QR код албумот?
          </h3>
          <p className="text-lg max-w-3xl mx-auto">
            Совршено решение{' '}
            <span className="underline-grape">за секоја прослава</span> во Македонија. Изберете го најдобриот план за вашиот настан и уживајте во албумите од вашите гости.
          </p>
        </div>

        {/* Pricing Cards - 1 column on mobile/tablet, 3 columns on large screens */}
        <div className="pricing-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-[2]">
              {/* Decorative shapes */}
              <div className="shape bg-dot-primary rellax absolute w-16 h-18 -bottom-2 -right-6 hidden lg:block z-[-1]"></div>
              <div className="shape bg-dot-primary rellax absolute absolute w-18 h-18 -top-4 -left-8 hidden lg:block z-[-1]"></div>

              {/* Free Trial Card */}
              <div className="col-span-1">
                <Card className="pricing-card h-full border-gray-200">
                  <CardContent className="p-5 sm:p-10">
                    {/* Price */}
                    <div className="prices text-dark">
                      <div className="price mb-3 flex items-start justify-start text-neutral">
                        <span className="price-currency text-base">ден</span>
                        <span className="price-value text-4xl font-bold">0</span>
                        {/* <span className="price-duration font-bold text-dark ml-2 self-end mb-1">бесплатно</span> */}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-2xl font-bold mt-5 mb-2">Бесплатен Пробен Период</h4>
                    <p className="text-gray-600 mb-4">Испробајте пред да изберете план</p>

                    {/* Features List */}
                    <ul className="icon-list space-y-3 mt-7 mb-8">
                      <li className="flex items-start">
                        <span className="bullet-bg-neutral mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>До <strong>50 прикачувања</strong> за тестирање</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-neutral mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span><strong>Поставување по свој вкус</strong> (насловна фотографија, име на настанот, датум, боја)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-neutral mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" /> 
                        </span>
                        <span>Автоматско зачувување на фотографии до <strong>7 дена</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-neutral mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span><strong>Без кредитна картичка</strong></span>
                      </li>
                     <li className="flex items-start">
                        <span className="bullet-bg-neutral mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span><strong>Преземање на сите фотографии</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-gray mr-3 mt-0.5">
                          <X className="w-4 h-4 text-white" />
                        </span>
                        <span className="text-gray-400">Гласовни пораки и видеа</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-gray mr-3 mt-0.5">
                          <X className="w-4 h-4 text-white" />
                        </span>
                        <span className="text-gray-400">50+ QR дизајни спремни за штампање</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-gray mr-3 mt-0.5">
                          <X className="w-4 h-4 text-white" />
                        </span>
                        <span className="text-gray-400">Пораки и посвети од гости</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-gray mr-3 mt-0.5">
                          <X className="w-4 h-4 text-white" />
                        </span>
                        <span className="text-gray-400">Прашање за името на гостите</span>
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <a
                      href="https://app.picbook.uk/new-event"
                      className="btn-neutral inline-block px-6 py-3 text-center rounded-full font-semibold transition-all hover:shadow-lg w-full"
                    >
                      Пробајте Бесплатно &gt;
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* Picbook Plus Card - Most Popular */}
              <div className="col-span-1">
                <Card className="pricing-card h-full border-grape-500 border-2 shadow-lg relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-grape text-white px-4 py-1 rounded-full text-sm font-semibold">Најпопуларно</span>
                  </div>
                  <CardContent className="p-5 sm:p-10">
                    {/* Price */}
                    <div className="prices text-dark">
                      {/* Original Price - Crossed Out */}
                      {/* <div className="text-gray-400text-xl mb-1">
                        <span className='line-through'>890</span><span className="text-sm"> ден.</span>
                      </div> */}
                      {/* Discounted Price */}
                      <div className="price mb-3 flex items-start justify-start text-grape">
                        <span className="price-currency text-base">ден</span>
                        <span className="price-value text-4xl font-bold">599</span> 
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-2xl font-bold mt-5 mb-2">Про План</h4>
                    <p className="text-gray-600 mb-4">Идеално за свадби, родендени и прослави</p>

                    {/* Features List */}
                    <ul className="icon-list space-y-3 mt-7 mb-8">
                      <li className="flex items-start">
                        <span className="bullet-bg-grape mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span><strong>Неограничен</strong> број прикачувања на фотографии и видеа</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-grape mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>
                          Фотографии и видеа зачувани <strong>2 месеци</strong> (со можност за продолжување)
                          <InfoPopover content="По завршувањето на настанот, албумот ќе биде зачуван <strong>2 месеци</strong> пред да биде избришан од нашите системи." />
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-grape mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>Фотографии и видеа во<b> HD квалитет</b></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-grape mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>
                          Активност на настанот е <strong>7 дена</strong> од почетокот.
                          <InfoPopover content="Гостите ќе можат да прикачуваат фотографии, видеа, гласовни пораки и пораки <strong>7 дена</strong> по настанот" />
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-grape mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>Преземање на сите фотографии и видеа одеднаш</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-grape mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>Можност на отварање<b> повеќе албуми</b> за подобра организација
                         <InfoPopover content="Вие имате можност за создавање повеќе албуми, а гостите имаат можност да го изберат соодветниот албум за прикачување на своите фотографии/видеа." />
                         </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-grape mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>
                          50+ QR дизајни спремни за штампање
                          <InfoPopover content="Преку 50 прилагодливи графички шаблони подготвени за печатење." />
                        </span>
                      </li>
                       <li className="flex items-start">
                        <span className="bullet-bg-grape mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>Корисничка подршка<strong> 24/7</strong></span>
                      </li>
                    </ul>

                    {/* CTA Button */}
                    <a
                      href="https://app.picbook.uk/new-event"
                      className="btn-grape inline-block px-6 py-3 text-center rounded-full font-semibold transition-all hover:shadow-lg w-full"
                    >
                      Изберете Про &gt;
                    </a>
                  </CardContent>
                </Card>
              </div>

              {/* Picbook Pro Card */}
              <div className="col-span-1">
                <Card className="pricing-card h-full border-gray-200">
                  <CardContent className="p-5 sm:p-10">
                    {/* Price */}
                    <div className="prices text-dark">
                      <div className="price mb-3 flex items-start justify-start text-teal">
                        <span className="price-currency text-base">ден</span>
                        <span className="price-value text-4xl font-bold">1,790</span> 
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-2xl font-bold mt-5 mb-2">Премиум План</h4>
                    <p className="text-gray-600 mb-4">Совршено за повеќе настани</p>

                    {/* Features List */}
                    <ul className="icon-list space-y-3 mt-7 mb-8">
                      <li className="flex items-start">
                        <span className="bullet-bg-teal mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>Вклучено <strong>се</strong> од <strong>'Про План'</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-teal mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>
                          Фотографии и видеа зачувани <strong>1 година</strong>
                          <InfoPopover content="По завршувањето на настанот, албумот ќе биде зачуван <strong>1 година</strong> пред да биде избришан." />
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-teal mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>Напредно приспособување <b>по ваша желба</b></span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-teal mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>
                          Активност на настанот е <strong>3 месеци</strong> од почетокот.
                          <InfoPopover content="Гостите ќе можат да прикачуваат фотографии, видеа, гласовни пораки и пораки <strong>3 месеци</strong> по настанот." />
                        </span>
                      </li>
                      
                      <li className="flex items-start">
                        <span className="bullet-bg-teal mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>
                          Ние ги принтаме и дизајнираме поканите за вашиот QR код.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="bullet-bg-teal mr-3 mt-0.5">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                        <span>
                          Можност за достава на поканите до <strong>вашата адреса.</strong> 
                        </span>
                      </li>
                       
                    </ul>

                    {/* CTA Button */}
                    <a
                      href="https://app.picbook.uk/new-event"
                      className="btn-teal inline-block px-6 py-3 text-center rounded-full font-semibold transition-all hover:shadow-lg w-full"
                    >
                      Изберете Премиум &gt;
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>

          {/* Alert Message */}
          <Alert className="mt-8 bg-blue-50 border-blue-200 max-w-4xl mx-auto">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <AlertDescription className="ml-7">
              <b>Не грижете се:</b> дури и да го купите албумот денес, тој ќе биде активен веднаш, но периодот на валидност ќе започне од датумот на настанот.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;