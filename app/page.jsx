'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const features = [
  {
    icon: '🎙️',
    image: '/images/features/feature1.png',
    title: 'Multi-format Audio Input',
    description: 'Supports MP3/WAV uploads via an easy-to-use interface (Google Colab or frontend UI).',
  },
  {
    icon: '📝',
    image: '/images/features/feature2.png',
    title: 'Multilingual Transcription',
    description: 'Powered by OpenAI Whisper (base) supporting Hindi, Tamil, and English natively.',
  },
  {
    icon: '🧠',
    image: '/images/features/feature3.png',
    title: 'Smart Meeting Summarizer',
    description: 'Summarizes meetings using Mistral-medium LLM. Extracts decisions, sentiments, and key action items.',
  },
  {
    icon: '🛡️',
    image: '/images/features/feature4.png',
    title: 'Privacy-Preserving Security',
    description: 'Implements AES-256 encryption. Deletes original files. Shows encryption key only once.',
  },
  {
    icon: '📤',
    image: '/images/features/feature5.png',
    title: 'Multi-format Export',
    description: 'Exports summaries to TXT, tasks to CSV, and full reports to PDF for easy sharing.',
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      
      <div className="relative min-h-screen w-full overflow-hidden">

        {/* 🔵 Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/images/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 🔴 Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

        {/* 🔻 Bottom Fade Overlay */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent to-black z-20 pointer-events-none" />

        {/* 🟢 Hero Section */}
        <div className="relative z-30 flex items-center justify-center min-h-screen text-center px-4">
          <div>
            <h1
              style={{ fontFamily: 'var(--font-manrope)' }}
              className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
            >
              Summarize Faster.
              <br />
              Work Smarter.
            </h1>
          </div>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 px-6 text-center">
            <button
              onClick={() => router.push('/login')}
              style={{ fontFamily: 'var(--font-manrope)' }}
              className="group inline-flex items-center gap-2 px-6 md:px-8 py-2 
                bg-white/10 hover:bg-white/20 text-white 
                text-sm md:text-base font-semibold 
                rounded-full shadow-lg 
                transition-all duration-300 
                ring-1 ring-white/10 hover:ring-white/20 backdrop-blur-md"
            >
              Try Now
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p
              style={{ fontFamily: 'var(--font-eurostile)' }}
              className="text-sm md:text-lg mt-2 text-white/80 max-w-2xl"
            >
              Experience the future of summarization with our AI-powered tool.
              Save time and enhance your productivity effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* 🟦 Features Section */}
      <section id="features" className="relative z-20 py-24 px-6 bg-gradient-to-br from-[#05050f] via-[#0b0b1f] to-[#161636]">
        
        <h2
          style={{ fontFamily: 'var(--font-manrope)' }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-14"
        >
          Why Choose Our AI Summarizer?
        </h2>

        <Swiper
            slidesPerView={1.2}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{ clickable: true }}
            slideToClickedSlide={true}
            autoplay={{
              delay: 1000, 
              disableOnInteraction: false, 
            }}
            modules={[Pagination, Autoplay]}
            className="w-full max-w-6xl"
            breakpoints={{
              768: { slidesPerView: 1.6 },
              1024: { slidesPerView: 2.2 },
            }}
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                  className="bg-black rounded-3xl shadow-2xl p-8 h-full flex flex-col justify-between mx-auto max-w-md cursor-pointer"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 object-contain mb-6"
                  />
                  <h3 style={{ fontFamily: 'var(--font-manrope)' }} className="text-2xl font-semibold text-[#59599c] mb-3">
                    {feature.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-eurostile)' }} className="text-lg text-white leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
        </Swiper>

      
      {/* Company Info Section */}
      <div className="max-w-6xl mx-auto mt-32 flex flex-col-reverse md:flex-row items-center md:items-center justify-between gap-12 px-4 text-white">


        {/* ✅ Text Column (Right on desktop) */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3
            style={{ fontFamily: 'var(--font-manrope)' }}
            className="text-2xl md:text-4xl font-semibold mb-4 text-white"
          >
            Sentienta QualityAI Project
          </h3>
          <p
            style={{ fontFamily: 'var(--font-eurostile)' }}
            className="text-base md:text-lg text-white/70 leading-relaxed max-w-md mx-auto md:mx-0"
          >
            Developed by Sentienta, this AI-powered meeting assistant helps Indian teams transcribe, summarize, and take action — across languages, formats, and workflows. All in one secure solution.
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
  <img
    src="/images/Company.gif"
    alt="Sentienta Demo Animation"
    className="w-[320px] md:w-[520px] object-contain rounded-xl drop-shadow-xl"
  />
</div>

      </div>
      </section>

      </>
  );
}
