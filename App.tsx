
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Instagram, Facebook, ChevronUp, Star, Cake, Heart, Award, ShoppingBag, MapPin, X, Send, Info, Play } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

// --- Types & Data ---

interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  image: string;
  desc: string;
  price: string;
}

const PRODUCTS: Product[] = [
  { 
    id: 1, 
    code: "DH-01", 
    name: "Signature Floral Tier", 
    category: "Wedding", 
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb8c2?q=80&w=800&auto=format&fit=crop", 
    desc: "A breathtaking three-tiered vanilla bean sponge with delicate handcrafted edible silk roses.", 
    price: "Starts from ₹4500" 
  },
  { 
    id: 2, 
    code: "DH-02", 
    name: "Double Belgian Brownies", 
    category: "Best Seller", 
    image: "https://images.unsplash.com/photo-1461008312844-e80697a81bd8?q=80&w=800&auto=format&fit=crop", 
    desc: "Our award-winning 70% Belgian chocolate brownies with a perfectly crackly top and gooey center.", 
    price: "₹650 per box (6 pcs)" 
  },
  { 
    id: 3, 
    code: "DH-03", 
    name: "Royal Celebration Birthday", 
    category: "Character", 
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop", 
    desc: "Vibrant custom character modeling for a perfect themed birthday celebration.", 
    price: "Starts from ₹2200" 
  },
  { 
    id: 4, 
    code: "DH-04", 
    name: "Artisanal Strawberry Swirls", 
    category: "Cupcakes", 
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop", 
    desc: "Fluffy vanilla sponge with a swirl of fresh organic strawberry-infused buttercream.", 
    price: "₹1200 per dozen" 
  },
  { 
    id: 5, 
    code: "DH-05", 
    name: "Lavender Honey Macarons", 
    category: "Treats", 
    image: "https://images.unsplash.com/photo-1569864358642-9d1619702661?q=80&w=800&auto=format&fit=crop", 
    desc: "Delicate french shells filled with aromatic lavender honey ganache and floral notes.", 
    price: "₹950 per box (10 pcs)" 
  },
  { 
    id: 6, 
    code: "DH-06", 
    name: "Tuxedo Velvet Cake", 
    category: "Groom-to-be", 
    image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800&auto=format&fit=crop", 
    desc: "Sophisticated red velvet with silky cream cheese frosting for the modern groom.", 
    price: "Starts from ₹1800" 
  },
  { 
    id: 7, 
    code: "DH-07", 
    name: "Wild Safari Adventure", 
    category: "Themed", 
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop", 
    desc: "Hand-sculpted safari animals on a premium Belgian chocolate-hazelnut tier.", 
    price: "Starts from ₹2800" 
  },
  { 
    id: 8, 
    code: "DH-08", 
    name: "Red Velvet Jar Cakes", 
    category: "Jar Cakes", 
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800&auto=format&fit=crop", 
    desc: "Convenient layers of joy in a travel-friendly glass jar. Perfect for gifting.", 
    price: "₹350 per jar" 
  },
  { 
    id: 9, 
    code: "DH-09", 
    name: "Gold Leaf Truffles", 
    category: "Gourmet", 
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=800&auto=format&fit=crop", 
    desc: "Hand-rolled dark chocolate truffles finished with 24K edible gold leaf.", 
    price: "₹1200 per box" 
  },
  { 
    id: 10, 
    code: "DH-10", 
    name: "Midnight Chocolate Gateau", 
    category: "Signature", 
    image: "https://images.unsplash.com/photo-1606313564052-440262b9248b?q=80&w=800&auto=format&fit=crop", 
    desc: "A rich, moist dark chocolate cake layered with espresso-infused ganache.", 
    price: "Starts from ₹1500" 
  },
];

const REVIEWS = [
  { name: "Sania Malik", text: "The detail on the floral cake was mind-blowing! Everyone at the wedding was asking who baked it.", color: "bg-pink-100" },
  { name: "Rahul Kapoor", text: "Roblox cake was a hit! Not just a design masterpiece, it was genuinely delicious.", color: "bg-blue-100" },
  { name: "Ananya Rao", text: "The brownies are a staple in our house now. Perfectly fudgy and rich.", color: "bg-purple-100" },
  { name: "Zoya Sheikh", text: "Exceptional service. They truly bring your vision to life. Best in Hyderabad!", color: "bg-green-100" },
];

// --- Components ---

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode; title: string }> = ({ isOpen, onClose, children, title }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#4E342E]/40 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 sm:p-12 torn-edge"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-script text-5xl text-[#FF4D6D]">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-rose-50 rounded-full transition-colors text-[#4E342E]">
              <X size={32} />
            </button>
          </div>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const Navbar: React.FC<{ onOrder: () => void }> = ({ onOrder }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-6">
      <motion.div 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="max-w-6xl mx-auto glass-pink rounded-full px-6 py-4 flex items-center justify-between shadow-lg"
      >
        <a href="#home" className="flex items-center gap-4 transition-transform hover:scale-105">
          <motion.div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-rose-100 p-2 pulse-logo">
            <Cake className="text-[#FF4D6D] w-full h-full" />
          </motion.div>
          <h2 className="font-script text-2xl text-[#FF4D6D] hidden sm:block">Delights</h2>
        </a>
        
        <div className="hidden lg:flex items-center gap-10">
          {/* Nav links intentionally left empty as per user instructions */}
        </div>

        <button 
          onClick={onOrder}
          className="bg-[#FF4D6D] text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg jiggle-hover transition-all active:scale-95"
        >
          Order Now
        </button>
      </motion.div>
    </nav>
  );
};

const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFE8EC]">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10">
        <motion.div 
          initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="flex flex-col justify-center text-center lg:text-left"
        >
          <div className="inline-block bg-white/60 backdrop-blur-md border border-rose-100 text-[#FF4D6D] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 mx-auto lg:mx-0 shadow-sm">
            Handcrafted with precision & love
          </div>
          <h1 className="font-script text-7xl md:text-9xl text-[#FF4D6D] mb-6 leading-tight drop-shadow-md">
            A Little Bliss <br />
            <span className="text-[#4E342E]">in Every Bite.</span>
          </h1>
          <p className="text-xl text-[#4E342E]/70 mb-10 max-w-lg leading-relaxed mx-auto lg:mx-0">
            Bespoke home-baked creations designed to be the centerpiece of your celebrations. Freshly baked in Hyderabad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={onExplore} className="bg-[#FF4D6D] text-white px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-rose-600 transition-all flex items-center justify-center gap-3 jiggle-hover">
              Explore Our Menu <ShoppingBag size={20} />
            </button>
            <a href="#about" className="bg-white text-[#FF4D6D] border-2 border-[#FF4D6D]/10 px-10 py-5 rounded-full font-bold shadow-xl hover:bg-rose-50 transition-all flex items-center justify-center">
              Our Story
            </a>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: yTranslate, rotateX }}
          className="relative flex justify-center items-center perspective-1000"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-md bg-white rounded-[4rem] p-4 shadow-[0_50px_100px_-20px_rgba(255,77,109,0.3)] border-4 border-rose-50/50 overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-200/30 rounded-full blur-[80px] -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop" 
              alt="Signature Cake" 
              className="w-full h-full object-cover rounded-[3.5rem] shadow-inner"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-xl glossy-card flex items-center gap-3 animate-bounce">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-[#FF4D6D] fill-current" />
              </div>
              <span className="font-bold text-[#4E342E] text-sm">Always Fresh</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection: React.FC = () => (
  <section id="about" className="py-32 bg-white relative">
    <div className="container mx-auto px-6">
      <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="bg-[#FFF5F7] torn-edge p-12 md:p-24 shadow-2xl relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <motion.div whileHover={{ scale: 1.05 }} className="relative h-[600px] overflow-hidden rounded-3xl shadow-2xl border-8 border-white -rotate-3 bg-rose-50">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Bakery life" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FF4D6D]">Handcrafted</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="relative h-[600px] overflow-hidden rounded-3xl shadow-2xl border-8 border-white rotate-6 md:mt-24 bg-rose-50">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Baking magic" />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FF4D6D]">Baking Magic</div>
              </motion.div>
            </div>
          </div>
          <div className="space-y-10 lg:pl-10">
             <span className="text-rose-400 font-black uppercase tracking-[0.3em] text-[10px]">Made with Heart</span>
            <h2 className="text-6xl md:text-7xl font-bold text-[#4E342E] leading-tight">Home-Baked Luxury in <span className="font-script text-[#FF4D6D]">Hyderabad.</span></h2>
            <p className="text-xl text-[#4E342E]/70 leading-relaxed">Starting from a tiny home kitchen, we've become Hyderabad's go-to destination for bespoke luxury bakes. No preservatives, just premium ingredients and artistic soul in every batch.</p>
            <div className="flex flex-wrap gap-12 pt-4">
              <div className="text-center group"><Award className="text-[#FF4D6D] mx-auto mb-4 group-hover:scale-125 transition-transform" size={48} /><h4 className="font-bold text-[10px] uppercase tracking-widest">Bespoke Designs</h4></div>
              <div className="text-center group"><MapPin className="text-blue-400 mx-auto mb-4 group-hover:scale-125 transition-transform" size={48} /><h4 className="font-bold text-[10px] uppercase tracking-widest">Citywide Delivery</h4></div>
              <div className="text-center group"><Heart className="text-rose-400 mx-auto mb-4 group-hover:scale-125 transition-transform" size={48} /><h4 className="font-bold text-[10px] uppercase tracking-widest">Family Recipes</h4></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const GallerySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      canvasConfetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors: ['#FF4D6D', '#FFFFFF', '#4E342E'] });
    }
  }, [isInView]);

  const duplicatedProducts = [...PRODUCTS, ...PRODUCTS]; 

  return (
    <section id="gallery" ref={containerRef} className="py-32 bg-[#FFF5F7] overflow-hidden">
      <div className="container mx-auto px-6 mb-20 text-center">
        <h2 className="font-script text-7xl text-[#FF4D6D] mb-4">The Carousel of Wonders</h2>
        <p className="text-[#4E342E]/60 max-w-2xl mx-auto text-lg leading-relaxed">
          Scroll through our latest masterpieces. Use the product code to inquiry about your next celebration.
        </p>
      </div>

      <div className="relative group">
        <motion.div 
          className="flex gap-8 whitespace-nowrap py-10"
          animate={{ x: [0, -3200] }}
          transition={{ 
            duration: 50, 
            repeat: Infinity, 
            ease: "linear"
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedProducts.map((p, idx) => (
            <div key={`${p.id}-${idx}`} className="inline-block flex-shrink-0 w-80 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl glossy-card relative group/card transition-transform duration-500 hover:-translate-y-4">
              <div className="h-[420px] relative overflow-hidden bg-rose-50">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-125"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex items-end p-8">
                  <p className="text-white text-sm italic whitespace-normal leading-relaxed">{p.desc}</p>
                </div>
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#FF4D6D] shadow-md border border-rose-50">
                  Code: {p.code}
                </div>
              </div>
              <div className="p-8 text-center bg-white">
                <h3 className="text-xl font-bold text-[#4E342E] group-hover/card:text-[#FF4D6D] transition-colors whitespace-normal">{p.name}</h3>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-current" />)}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProcessSection: React.FC = () => {
  const bakingImages = [
    { url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop", tag: "Mixing Love" },
    { url: "https://images.unsplash.com/photo-1590127879192-4c672efad6ed?q=80&w=600&auto=format&fit=crop", tag: "Silky Frosting" },
    { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop", tag: "Decorating Magic" },
    { url: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=600&auto=format&fit=crop", tag: "Bespoke Details" },
    { url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop", tag: "Handboxed" },
    { url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop", tag: "Glazed Perfection" },
    { url: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=600&auto=format&fit=crop", tag: "Fresh Treats" },
    { url: "https://images.unsplash.com/photo-1516054966891-3ad1558bc73f?q=80&w=600&auto=format&fit=crop", tag: "Quality Finish" },
  ];

  return (
    <section id="process" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 text-center mb-20 relative z-10">
        <h2 className="font-script text-7xl md:text-8xl text-[#FF4D6D] mb-6">Watch Us Bake</h2>
        <p className="text-[#4E342E]/60 text-lg max-w-2xl mx-auto italic">Step into our sensory kitchen where ingredients transform into art.</p>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {bakingImages.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, zIndex: 10, rotate: i % 2 === 0 ? 1 : -1 }}
              className="relative aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white glossy-card group cursor-pointer"
            >
              <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Baking process" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-full bg-[#FF4D6D] flex items-center justify-center shadow-lg">
                      <Play size={14} className="text-white fill-current" />
                   </div>
                   <span className="text-white font-black uppercase tracking-widest text-[10px] drop-shadow">{img.tag}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 bg-[#FF4D6D] text-white text-[8px] font-black uppercase px-2 py-1 rounded-full shadow-lg">Live Bakes</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SeasonalSection: React.FC = () => {
  return (
    <section id="seasonal" className="py-32 bg-[#FFF5F7]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-[4rem] p-12 lg:p-24 relative overflow-hidden border-8 border-white shadow-[0_40px_100px_rgba(255,77,109,0.15)] bg-white/40"
        >
          <div className="absolute -inset-[10px] bg-gradient-to-tr from-rose-300 via-rose-100 to-blue-200 animate-pulse blur-[100px] opacity-20 -z-10" />
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#FF4D6D] text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest animate-bounce">
                Seasonal Specials & Hampers
              </div>
              <h2 className="font-script text-8xl text-[#FF4D6D]">Curated Bliss <br /><span className="text-[#4E342E]">In A Basket</span></h2>
              <p className="text-xl text-[#4E342E]/70 leading-relaxed">
                Elevate your gifting with our <span className="text-[#FF4D6D] font-bold">Signature Dessert Hampers</span>. Featuring artisanal macarons, Belgian chocolate brownies, and custom floral bakes—perfect for every special soul.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button onClick={() => {
                  const el = document.getElementById('gallery');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} className="bg-[#4E342E] text-white px-10 py-5 rounded-full font-bold shadow-xl hover:bg-black transition-all">Explore Hampers</button>
              </div>
            </div>
            <motion.div animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.05, 1] }} transition={{ duration: 15, repeat: Infinity }} className="relative">
              <img 
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop" 
                alt="Gourmet Gift Hamper" className="rounded-[4rem] shadow-2xl glossy-card w-full border-4 border-white bg-rose-50 object-cover aspect-[4/5]" 
              />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-rose-50 text-center p-4 -rotate-12">
                 <span className="font-script text-[#FF4D6D] text-xl">Best Gift!</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductMenu: React.FC<{ onSelectProduct: (code: string) => void }> = ({ onSelectProduct }) => (
  <div className="space-y-8">
    <div className="grid gap-6">
      {PRODUCTS.map((p) => (
        <motion.div 
          key={p.id}
          whileHover={{ x: 10 }}
          className="flex items-center gap-6 p-4 rounded-3xl bg-rose-50/30 border border-rose-100 hover:bg-rose-100/50 transition-all group"
        >
          <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden rounded-2xl bg-rose-100">
            <img 
              src={p.image} 
              alt={p.name} 
              className="w-full h-full object-cover shadow-md transition-transform group-hover:scale-110" 
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4D6D]">{p.code}</span>
                <h4 className="text-lg font-bold text-[#4E342E] group-hover:text-[#FF4D6D] transition-colors truncate">{p.name}</h4>
              </div>
              <span className="font-black text-[#FF4D6D] text-sm whitespace-nowrap">{p.price}</span>
            </div>
            <p className="text-xs text-[#4E342E]/60 mt-1 line-clamp-1">{p.desc}</p>
          </div>
          <button 
            onClick={() => onSelectProduct(p.code)}
            className="p-3 bg-white text-[#FF4D6D] rounded-full shadow-md hover:bg-[#FF4D6D] hover:text-white transition-all flex-shrink-0"
          >
            <ShoppingBag size={18} />
          </button>
        </motion.div>
      ))}
    </div>
    <div className="p-6 bg-[#4E342E] rounded-[2rem] text-white flex items-center gap-4">
      <Info size={40} className="text-rose-300 flex-shrink-0" />
      <p className="text-xs opacity-80 leading-relaxed font-medium">
        Don't see your vision? We specialize in fully custom designs. Book a consultation via the order form.
      </p>
    </div>
  </div>
);

const OrderForm: React.FC<{ initialCode: string; onSubmit: () => void }> = ({ initialCode, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCode, setSelectedCode] = useState(initialCode);

  useEffect(() => {
    setSelectedCode(initialCode);
  }, [initialCode]);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit();
    }, 1500);
  };

  return (
    <form onSubmit={handleForm} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#4E342E]">Full Name</label>
          <input required type="text" placeholder="Your name" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4 focus:outline-none focus:border-[#FF4D6D] transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#4E342E]">WhatsApp Number</label>
          <input required type="tel" placeholder="+91" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4 focus:outline-none focus:border-[#FF4D6D] transition-all" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#4E342E]">Cake/Product Code</label>
          <select 
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4 focus:outline-none focus:border-[#FF4D6D] transition-all appearance-none cursor-pointer"
          >
            <option value="">Fully Custom Design</option>
            {PRODUCTS.map(p => <option key={p.code} value={p.code}>{p.code} - {p.name}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-[#4E342E]">Preferred Delivery Date</label>
          <input required type="date" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4 focus:outline-none focus:border-[#FF4D6D] transition-all" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-[#4E342E]">Special Requirements</label>
        <textarea required rows={4} placeholder="E.g. Flavor preferences, allergies, theme details..." className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4 focus:outline-none focus:border-[#FF4D6D] transition-all resize-none"></textarea>
      </div>
      <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100 text-center">
        <p className="text-[10px] text-[#4E342E]/70 leading-relaxed uppercase tracking-widest font-black">
           ✨ Custom orders require minimum 7 days notice. <br />
           📍 Delivery across Hyderabad (Charges based on distance).
        </p>
      </div>
      <button 
        disabled={loading}
        className="w-full bg-[#FF4D6D] text-white py-5 rounded-full font-bold text-lg shadow-xl hover:bg-rose-600 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
      >
        {loading ? 'Sending Request...' : 'Send Inquiry Request'} <Send size={20} />
      </button>
    </form>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [initialOrderCode, setInitialOrderCode] = useState("");

  const handleSelectFromMenu = (code: string) => {
    setInitialOrderCode(code);
    setIsMenuOpen(false);
    setIsOrderOpen(true);
  };

  const handleOrderSuccess = () => {
    setIsOrderOpen(false);
    setIsSuccessOpen(true);
    canvasConfetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="relative overflow-x-hidden selection:bg-[#FF4D6D] selection:text-white">
      <Navbar onOrder={() => { setInitialOrderCode(""); setIsOrderOpen(true); }} />
      <main>
        <Hero onExplore={() => setIsMenuOpen(true)} />
        <AboutSection />
        <GallerySection />
        <ProcessSection />
        <SeasonalSection />
        <TestimonialsSection />
      </main>
      <Footer />

      {/* Modals */}
      <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} title="Explore Our Menu">
        <ProductMenu onSelectProduct={handleSelectFromMenu} />
      </Modal>

      <Modal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} title="Start Your Order">
        <OrderForm initialCode={initialOrderCode} onSubmit={handleOrderSuccess} />
      </Modal>

      <Modal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} title="Sweet Success!">
        <div className="text-center space-y-6 py-10">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse">
            <Heart size={48} fill="currentColor" />
          </div>
          <p className="text-xl text-[#4E342E]/80">
            Thank you for your inquiry! We've received your details and will reach out to you on WhatsApp within 24 hours.
          </p>
          <button onClick={() => setIsSuccessOpen(false)} className="bg-[#FF4D6D] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all">
            Back to Home
          </button>
        </div>
      </Modal>
    </div>
  );
};

const TestimonialsSection: React.FC = () => (
  <section id="reviews" className="py-32 bg-white">
    <div className="container mx-auto px-6 text-center mb-24">
      <h2 className="font-script text-7xl text-[#FF4D6D] mb-4">Sweet Words</h2>
      <p className="text-[#4E342E]/50">Reviews from our delightful customers.</p>
    </div>
    <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto px-6">
      {REVIEWS.map((review, i) => (
        <motion.div 
          key={i} animate={{ y: [0, -15, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
          className={`w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(25%-2.25rem)] macaron-bubble ${review.color} shadow-lg`}
        >
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex gap-1 mb-4 text-yellow-400"><Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /></div>
            <p className="text-[#4E342E] text-center font-medium italic mb-6 leading-relaxed">"{review.text}"</p>
            <h4 className="font-bold text-[#4E342E] uppercase text-[10px] tracking-widest">— {review.name}</h4>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-white pt-32 pb-16 relative overflow-hidden border-t border-rose-50">
    <div className="container mx-auto px-6 grid lg:grid-cols-4 gap-16 mb-24">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-rose-100 p-1">
             <Cake className="text-[#FF4D6D]" size={32} />
          </div>
          <h2 className="font-script text-3xl text-[#4E342E]">Delights</h2>
        </div>
        <p className="text-[#4E342E]/70 max-w-xs leading-relaxed">Luxury bespoke cakes for every celebration. A little bliss in every bite.</p>
        <div className="flex gap-6">
          <a href="https://instagram.com/delights.hyderabad" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white transition-all shadow-md"><Instagram size={24} /></a>
          <a href="#" className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-white transition-all shadow-md"><Facebook size={24} /></a>
        </div>
      </div>
      <div className="space-y-8">
        <h4 className="font-black text-[#4E342E] uppercase tracking-[0.2em] text-[10px]">Quick Links</h4>
        <ul className="space-y-4 text-[#4E342E]/70 font-bold text-sm">
           <li><a href="#home" className="hover:text-[#FF4D6D] transition-colors">Home</a></li>
           <li><a href="#about" className="hover:text-[#FF4D6D] transition-colors">About Us</a></li>
           <li><a href="#gallery" className="hover:text-[#FF4D6D] transition-colors">Cake Gallery</a></li>
           <li><a href="#process" className="hover:text-[#FF4D6D] transition-colors">The Process</a></li>
        </ul>
      </div>
      <div className="space-y-8">
        <h4 className="font-black text-[#4E342E] uppercase tracking-[0.2em] text-[10px]">Specialties</h4>
        <ul className="space-y-4 text-[#4E342E]/70 font-bold text-sm">
           <li>Wedding Showstoppers</li>
           <li>Custom Birthday Tiers</li>
           <li>Fudgy Sea Salt Brownies</li>
           <li>Macaron Hampers</li>
        </ul>
      </div>
      <div className="space-y-8">
        <h4 className="font-black text-[#4E342E] uppercase tracking-[0.2em] text-[10px]">Ordering</h4>
        <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
           <p className="font-script text-3xl text-[#FF4D6D] mb-4">Pre-orders only!</p>
           <p className="text-[10px] text-[#4E342E]/70 uppercase font-black tracking-widest leading-loose"> 📍 Delivery Across Hyderabad <br /> 📅 Minimum 7 Days Notice</p>
        </div>
      </div>
    </div>
    <div className="text-center pt-10 border-t border-rose-50">
      <p className="text-[10px] text-[#4E342E]/40 uppercase tracking-[0.3em] font-black">© {new Date().getFullYear()} Delights Hyderabad. Built with love.</p>
    </div>
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
      className="fixed bottom-10 right-10 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center z-50 text-[#FF4D6D] border-4 border-rose-50 glossy-card group transition-transform hover:scale-110 active:scale-95"
    >
      <ChevronUp size={28} className="group-hover:animate-bounce" />
    </button>
  </footer>
);

export default App;
