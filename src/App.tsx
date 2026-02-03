import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Instagram, Facebook, ChevronUp, Star, Cake, Heart, Award, ShoppingBag, MapPin, X, Send, Info, Play, Sparkles } from 'lucide-react';
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaAX1ekJ6U614IGXr4VMipeh8WXNzFklJ2hg&s", 
    desc: "A breathtaking three-tiered vanilla bean sponge with delicate handcrafted edible silk roses.", 
    price: "Starts from ₹4500" 
  },
  { 
    id: 2, 
    code: "DH-02", 
    name: "Double Belgian Brownies", 
    category: "Best Seller", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUU4ZVQBDUDXkPmwQgWkeincS5GZfw8sqKjA&s", 
    desc: "Our award-winning 70% Belgian chocolate brownies with a perfectly crackly top and gooey center.", 
    price: "₹650 per box (6 pcs)" 
  },
  { 
    id: 3, 
    code: "DH-03", 
    name: "Royal Celebration Birthday", 
    category: "Character", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5deIk-DYB9OpCFSGUdUVc9LzLwj178-g2kH2x-TFTyA&s", 
    desc: "Vibrant custom character modeling for a perfect themed birthday celebration.", 
    price: "Starts from ₹2200" 
  },
  { 
    id: 4, 
    code: "DH-04", 
    name: "Artisanal Strawberry Swirls", 
    category: "Cupcakes", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrIew1MexFtAITRNzPGQ2qfQLlpQs-vrgi-roQ5Ba1Ag&s", 
    desc: "Fluffy vanilla sponge with a swirl of fresh organic strawberry-infused buttercream.", 
    price: "₹1200 per dozen" 
  },
  { 
    id: 5, 
    code: "DH-05", 
    name: "Lavender Honey Macarons", 
    category: "Treats", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMhQvR6UsagFq32k4jFlKb-dlKd0a86P4yK4KOFVZWzQ&s", 
    desc: "Delicate french shells filled with aromatic lavender honey ganache and floral notes.", 
    price: "₹950 per box (10 pcs)" 
  },
  { 
    id: 6, 
    code: "DH-06", 
    name: "Tuxedo Velvet Cake", 
    category: "Groom-to-be", 
    image: "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800", 
    desc: "Sophisticated red velvet with silky cream cheese frosting for the modern groom.", 
    price: "Starts from ₹1800" 
  },
  { 
    id: 7, 
    code: "DH-07", 
    name: "Wild Safari Adventure", 
    category: "Themed", 
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800", 
    desc: "Hand-sculpted safari animals on a premium Belgian chocolate-hazelnut tier.", 
    price: "Starts from ₹2800" 
  },
  { 
    id: 8, 
    code: "DH-08", 
    name: "Red Velvet Jar Cakes", 
    category: "Jar Cakes", 
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=800", 
    desc: "Convenient layers of joy in a travel-friendly glass jar. Perfect for gifting.", 
    price: "₹350 per jar" 
  },
  { 
    id: 9, 
    code: "DH-09", 
    name: "Gold Leaf Truffles", 
    category: "Gourmet", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi3SVMh8By8zA3YrG8KmHGnLFFwO2eI5qAOA&s", 
    desc: "Hand-rolled dark chocolate truffles finished with 24K edible gold leaf.", 
    price: "₹1200 per box" 
  },
  { 
    id: 10, 
    code: "DH-10", 
    name: "Midnight Chocolate Gateau", 
    category: "Signature", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmKrCKnF9Cyfe9aSyTVYa0zcdKafv5zvfLlA&s", 
    desc: "A rich, moist dark chocolate cake layered with espresso-infused ganache.", 
    price: "Starts from ₹1500" 
  },
];

const REVIEWS = [
  { name: "Sania Malik", text: "The detail on the floral cake was mind-blowing! Everyone at the wedding was asking who baked it.", color: "bg-pink-100", rating: 5, date: "2 weeks ago" },
  { name: "Rahul Kapoor", text: "Roblox cake was a hit! Not just a design masterpiece, it was genuinely delicious.", color: "bg-blue-100", rating: 5, date: "1 month ago" },
  { name: "Ananya Rao", text: "The brownies are a staple in our house now. Perfectly fudgy and rich.", color: "bg-purple-100", rating: 5, date: "3 weeks ago" },
  { name: "Zoya Sheikh", text: "Exceptional service. They truly bring your vision to life. Best in Hyderabad!", color: "bg-green-100", rating: 5, date: "1 week ago" },
  { name: "Arjun Patel", text: "Birthday cake for my daughter was perfect! The unicorn design was magical.", color: "bg-yellow-100", rating: 5, date: "2 days ago" },
  { name: "Priya Sharma", text: "Custom anniversary cake exceeded expectations. Beautiful and tasty!", color: "bg-indigo-100", rating: 5, date: "5 days ago" },
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

const Navbar: React.FC<{ onOrder: () => void }> = ({ onOrder }) => (
  <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-6">
    <motion.div 
      initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="max-w-6xl mx-auto glass-pink rounded-full px-6 py-4 flex items-center justify-between shadow-lg"
    >
      <a href="#home" className="flex items-center gap-4 transition-transform hover:scale-105">
        <motion.div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-rose-100 p-2 pulse-logo">
          <img src="./download.png" alt="Delights Logo" className="w-full h-full object-cover rounded-full" />
        </motion.div>
        <h2 className="font-script text-2xl text-[#FF4D6D] hidden sm:block">Delights</h2>
      </a>
      
      <div className="hidden lg:flex items-center gap-10">
        <motion.a 
          href="#home" 
          className="relative text-[#4E342E] font-medium transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">Home</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.1 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FFF5F7] to-[#FFE8EC] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: -1 }}
          />
        </motion.a>
        <motion.a 
          href="#about" 
          className="relative text-[#4E342E] font-medium transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">About</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.1 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FFF5F7] to-[#FFE8EC] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: -1 }}
          />
        </motion.a>
        <motion.a 
          href="#gallery" 
          className="relative text-[#4E342E] font-medium transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">Gallery</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.1 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FFF5F7] to-[#FFE8EC] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: -1 }}
          />
        </motion.a>
        <motion.a 
          href="#process" 
          className="relative text-[#4E342E] font-medium transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">Process</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.1 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FFF5F7] to-[#FFE8EC] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: -1 }}
          />
        </motion.a>
        <motion.a 
          href="#contact" 
          className="relative text-[#4E342E] font-medium transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">Contact</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.1 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FFF5F7] to-[#FFE8EC] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: -1 }}
          />
        </motion.a>
        <motion.a 
          href="#reviews" 
          className="relative text-[#4E342E] font-medium transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative z-10">Reviews</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.1 }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#FFF5F7] to-[#FFE8EC] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: -1 }}
          />
        </motion.a>
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

const Hero: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFE8EC]">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10 pl-12 lg:pl-16">
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
          {/* Big main image */}
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-2xl bg-white rounded-[4rem] p-8 shadow-[0_50px_100px_-20px_rgba(255,77,109,0.3)] border-4 border-rose-50/50 overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop" 
              alt="Signature Cake" 
              className="w-full h-[600px] object-cover rounded-[3rem] shadow-inner"
            />
            
            {/* Second image overlay */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -top-12 -right-12 w-56 h-56 hidden lg:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop&crop=center"
                alt="Fresh Pastries"
                className="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white"
              />
            </motion.div>
            
            {/* Enhanced decorative elements */}
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles className="text-[#FF4D6D]" size={28} />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart className="text-[#FF4D6D]" size={32} />
            </motion.div>
            
            {/* Additional side animations */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-8 -left-12 w-12 h-12 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <Star className="text-[#FF4D6D]" size={20} />
            </motion.div>
            
            <motion.div 
              animate={{ 
                x: [0, 10, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-12 -right-16 w-14 h-14 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <Cake className="text-[#FF4D6D]" size={24} />
            </motion.div>
            
            <motion.div 
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles className="text-[#FF4D6D]" size={16} />
            </motion.div>
            
            <motion.div 
              animate={{ 
                y: [0, 8, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute top-16 -right-10 w-8 h-8 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart className="text-[#FF4D6D]" size={14} />
            </motion.div>
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
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="relative h-[600px] overflow-hidden rounded-3xl shadow-2xl border-8 border-white rotate-6 md:mt-24 bg-rose-50">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Baking magic" />
              </motion.div>
            </div>
          </div>
          <div className="space-y-10 lg:pl-10">
             <span className="text-rose-400 font-black uppercase tracking-[0.3em] text-[10px]">Made with Heart</span>
            <h2 className="text-6xl md:text-7xl font-bold text-[#4E342E] leading-tight">Home-Baked Luxury in <span className="font-script text-[#FF4D6D]">Hyderabad.</span></h2>
            <p className="text-xl text-[#4E342E]/70 leading-relaxed">Starting from a tiny home kitchen, we've become Hyderabad's go-to destination for bespoke luxury bakes. No preservatives, just premium ingredients and artistic soul in every batch.</p>
            <div className="flex flex-wrap gap-12 pt-4">
              <div className="text-center"><Award className="text-[#FF4D6D] mx-auto mb-4" size={48} /><h4 className="font-bold text-[10px] uppercase tracking-widest">Bespoke Designs</h4></div>
              <div className="text-center"><MapPin className="text-blue-400 mx-auto mb-4" size={48} /><h4 className="font-bold text-[10px] uppercase tracking-widest">Citywide Delivery</h4></div>
              <div className="text-center"><Heart className="text-rose-400 mx-auto mb-4" size={48} /><h4 className="font-bold text-[10px] uppercase tracking-widest">Family Recipes</h4></div>
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
      </div>
      <div className="relative group">
        <motion.div 
          className="flex gap-8 whitespace-nowrap py-10"
          animate={{ x: [0, -3200] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedProducts.map((p, idx) => (
            <div key={`${p.id}-${idx}`} className="inline-block flex-shrink-0 w-80 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl glossy-card relative group/card transition-transform duration-500 hover:-translate-y-4">
              <div className="h-[420px] relative overflow-hidden bg-rose-50">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-125" loading="lazy" />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#FF4D6D] shadow-md border border-rose-50">Code: {p.code}</div>
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
  const bakingItems = [
    { 
      type: 'video', 
      url: 'https://www.youtube.com/embed/WNdmEqXMxnI', 
      tag: 'Cake Decorating Basics',
      size: 'small'
    },
    { 
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop', 
      tag: 'Fresh Ingredients',
      size: 'small'
    },
    { 
      type: 'video', 
      url: 'https://www.youtube.com/embed/_om7--IxCIY', 
      tag: 'Baking Chocolate Cake',
      size: 'medium'
    },
    { 
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400&auto=format&fit=crop', 
      tag: 'Artisan Frosting',
      size: 'small'
    },
    { 
      type: 'video', 
      url: 'https://www.youtube.com/embed/QKTeasy0QA4', 
      tag: 'Frosting Techniques',
      size: 'large'
    },
    { 
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop', 
      tag: 'Cupcake Making',
      size: 'medium'
    },
    { 
      type: 'video', 
      url: 'https://www.youtube.com/embed/FPE0BK8jkLI', 
      tag: 'Macaron Secrets',
      size: 'small'
    },
    { 
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop', 
      tag: 'Pastry Art',
      size: 'medium'
    },
    { 
      type: 'video', 
      url: 'https://www.youtube.com/embed/pjDLe7u0vlA', 
      tag: 'Bread Baking',
      size: 'small'
    },
    { 
      type: 'video', 
      url: 'https://www.youtube.com/embed/HTXB6flODww', 
      tag: 'Cookie Creations',
      size: 'large'
    },
    { 
      type: 'video', 
      url: 'https://www.youtube.com/embed/WWoCbT-ZW4c', 
      tag: 'Baking Magic',
      size: 'medium'
    },
    { 
      type: 'image', 
      url: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=400&auto=format&fit=crop', 
      tag: 'Sweet Moments',
      size: 'small'
    },
  ];

  return (
    <section id="process" className="py-32 bg-white relative overflow-hidden">
      {/* Side decorative elements */}
      <div className="absolute left-4 top-1/4 hidden lg:block">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-200 rounded-full flex items-center justify-center shadow-lg"
        >
          <Cake className="text-[#FF4D6D]" size={32} />
        </motion.div>
      </div>
      <div className="absolute right-4 top-1/3 hidden lg:block">
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center shadow-lg"
        >
          <Heart className="text-[#FF4D6D]" size={28} />
        </motion.div>
      </div>
      <div className="absolute left-8 bottom-1/4 hidden lg:block">
        <motion.div 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg"
        >
          <Star className="text-[#FF4D6D]" size={24} />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 text-center mb-20 relative z-10">
        <h2 className="font-script text-7xl md:text-8xl text-[#FF4D6D] mb-6">Watch Us Bake</h2>
        <p className="text-xl text-[#4E342E]/70 max-w-2xl mx-auto">Experience the magic of baking through our curated collection of videos and photos</p>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-[200px]">
          {bakingItems.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }}
              className={`relative overflow-hidden shadow-2xl border-4 border-white glossy-card group cursor-pointer rounded-3xl ${
                item.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                item.size === 'medium' ? 'md:col-span-1 md:row-span-2' : 
                'md:col-span-1 md:row-span-1'
              }`}
            >
              {item.type === 'video' ? (
                <iframe 
                  src={`${item.url}?autoplay=1&mute=1&loop=1&playlist=${item.url.split('/').pop()}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&disablekb=1`}
                  className="w-full h-full object-cover pointer-events-none"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={item.tag}
                />
              ) : (
                <img 
                  src={item.url} 
                  alt={item.tag} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" 
                  loading="lazy" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex flex-col justify-end p-4 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-black uppercase tracking-widest text-[10px] drop-shadow">{item.tag}</span>
              </div>
              {item.type === 'video' && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Play size={16} className="text-white ml-0.5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SeasonalSection: React.FC = () => (
  <section id="seasonal" className="py-32 bg-[#FFF5F7]">
    <div className="container mx-auto px-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="rounded-[4rem] p-12 lg:p-24 relative overflow-hidden border-8 border-white shadow-2xl bg-white/40">
        <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <h2 className="font-script text-8xl text-[#FF4D6D]">Curated Bliss <br /><span className="text-[#4E342E]">In A Basket</span></h2>
            <p className="text-xl text-[#4E342E]/70 leading-relaxed">Elevate your gifting with our Signature Dessert Hampers. Perfect for every special soul.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800" alt="Hamper" className="rounded-[4rem] shadow-2xl w-full object-cover" />
        </div>
      </motion.div>
    </div>
  </section>
);

const ContactSection: React.FC = () => (
  <section id="contact" className="py-32 bg-[#FFF5F7]">
    <div className="container mx-auto px-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-script text-7xl text-[#FF4D6D] mb-6">Get In Touch</h2>
          <p className="text-xl text-[#4E342E]/70">Let's create something sweet together. Reach out for custom orders, collaborations, or just to say hello!</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF4D6D] rounded-full flex items-center justify-center">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#4E342E]">Visit Our Bakery</h4>
                <p className="text-[#4E342E]/70">456 Cake Avenue, Hyderabad, Sindh, Pakistan 71000</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF4D6D] rounded-full flex items-center justify-center">
                <Instagram className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#4E342E]">Follow Us</h4>
                <p className="text-[#4E342E]/70">@delights.hyderabad</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF4D6D] rounded-full flex items-center justify-center">
                <Facebook className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#4E342E]">Like Us</h4>
                <p className="text-[#4E342E]/70">Delights Hyderabad</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF4D6D] rounded-full flex items-center justify-center">
                <Info className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#4E342E]">Business Hours</h4>
                <p className="text-[#4E342E]/70">Mon-Sat: 9AM-8PM | Sun: 10AM-6PM</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-[3rem] p-8 shadow-2xl">
            <h3 className="font-script text-4xl text-[#FF4D6D] mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-2xl px-4 py-3" />
                <input type="email" placeholder="Your Email" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-2xl px-4 py-3" />
              </div>
              <input type="tel" placeholder="Phone Number" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-2xl px-4 py-3" />
              <textarea rows={4} placeholder="Your Message" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-2xl px-4 py-3"></textarea>
              <button type="submit" className="w-full bg-[#FF4D6D] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-rose-600 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProductMenu: React.FC<{ onSelectProduct: (code: string) => void }> = ({ onSelectProduct }) => (
  <div className="space-y-8">
    <div className="grid gap-6">
      {PRODUCTS.map((p) => (
        <motion.div key={p.id} whileHover={{ x: 10 }} className="flex items-center gap-6 p-4 rounded-3xl bg-rose-50/30 border border-rose-100 hover:bg-rose-100/50 transition-all group">
          <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden rounded-2xl bg-rose-100">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover shadow-md transition-transform group-hover:scale-110" loading="lazy" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4D6D]">{p.code}</span>
                <h4 className="text-lg font-bold text-[#4E342E] truncate">{p.name}</h4>
              </div>
              <span className="font-black text-[#FF4D6D] text-sm whitespace-nowrap">{p.price}</span>
            </div>
          </div>
          <button onClick={() => onSelectProduct(p.code)} className="p-3 bg-white text-[#FF4D6D] rounded-full shadow-md hover:bg-[#FF4D6D] hover:text-white transition-all"><ShoppingBag size={18} /></button>
        </motion.div>
      ))}
    </div>
  </div>
);

const OrderForm: React.FC<{ initialCode: string; onSubmit: () => void }> = ({ initialCode, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [selectedCode, setSelectedCode] = useState(initialCode);

  useEffect(() => { setSelectedCode(initialCode); }, [initialCode]);

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onSubmit(); }, 1500);
  };

  return (
    <form onSubmit={handleForm} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <input required type="text" placeholder="Full Name" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4" />
        <input required type="tel" placeholder="WhatsApp Number" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4" />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <select value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)} className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4">
          <option value="">Fully Custom Design</option>
          {PRODUCTS.map(p => <option key={p.code} value={p.code}>{p.code} - {p.name}</option>)}
        </select>
        <input required type="date" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4" />
      </div>
      <textarea required rows={4} placeholder="Special Requirements" className="w-full bg-rose-50/50 border-2 border-rose-100 rounded-3xl px-6 py-4"></textarea>
      <button disabled={loading} className="w-full bg-[#FF4D6D] text-white py-5 rounded-full font-bold shadow-xl flex items-center justify-center gap-3">
        {loading ? 'Sending Request...' : 'Send Inquiry Request'} <Send size={20} />
      </button>
    </form>
  );
};

const TestimonialsSection: React.FC = () => (
  <section id="reviews" className="py-32 bg-white">
    <div className="container mx-auto px-6 text-center mb-24">
      <h2 className="font-script text-7xl text-[#FF4D6D] mb-4">Sweet Words</h2>
      <p className="text-xl text-[#4E342E]/70 max-w-2xl mx-auto">What our happy customers are saying about their delightful experiences</p>
      <div className="flex justify-center items-center gap-2 mt-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} size={20} className="text-yellow-400 fill-current" />)}
        </div>
        <span className="text-[#4E342E]/60 font-medium">4.9/5 from 500+ reviews</span>
      </div>
    </div>
    <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto px-6">
      {REVIEWS.map((review, i) => (
        <motion.div key={i} animate={{ y: [0, -15, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }} className={`w-full md:w-[calc(50%-1rem)] lg:w-[calc(33%-1.5rem)] macaron-bubble ${review.color} shadow-lg p-6`}>
          <div className="flex gap-1 mb-4 justify-center">
            {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} className="text-yellow-400 fill-current" />)}
          </div>
          <p className="text-[#4E342E] text-center font-medium italic mb-4">"{review.text}"</p>
          <div className="text-center">
            <h4 className="font-bold text-[#4E342E] uppercase text-[10px] tracking-widest">— {review.name}</h4>
            <p className="text-[#4E342E]/50 text-[9px] mt-1">{review.date}</p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="text-center mt-16">
      <p className="text-[#4E342E]/60 mb-6">Join thousands of satisfied customers</p>
      <button className="bg-[#FF4D6D] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-rose-600 transition-all">
        Read More Reviews
      </button>
    </div>
  </section>
);

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

  return (
    <div className="relative overflow-x-hidden selection:bg-[#FF4D6D] selection:text-white">
      <Navbar onOrder={() => { setInitialOrderCode(""); setIsOrderOpen(true); }} />
      <main>
        <Hero onExplore={() => setIsMenuOpen(true)} />
        <AboutSection />
        <GallerySection />
        <ProcessSection />
        <SeasonalSection />
        <ContactSection />
        <TestimonialsSection />
      </main>
      <Footer />

      <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} title="Explore Our Menu">
        <ProductMenu onSelectProduct={handleSelectFromMenu} />
      </Modal>

      <Modal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)} title="Start Your Order">
        <OrderForm initialCode={initialOrderCode} onSubmit={() => { setIsOrderOpen(false); setIsSuccessOpen(true); canvasConfetti(); }} />
      </Modal>

      <Modal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} title="Sweet Success!">
        <div className="text-center space-y-6 py-10">
          <Heart size={48} className="text-green-500 mx-auto" fill="currentColor" />
          <p className="text-xl text-[#4E342E]/80">We've received your inquiry and will reach out on WhatsApp soon.</p>
          <button onClick={() => setIsSuccessOpen(false)} className="bg-[#FF4D6D] text-white px-10 py-4 rounded-full font-bold">Close</button>
        </div>
      </Modal>
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gradient-to-br from-white/80 via-rose-50/60 to-pink-50/80 backdrop-blur-xl pt-32 pb-16 relative overflow-hidden border-t border-rose-100/50">
    <div className="absolute inset-0 opacity-20" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3e%3ccircle cx='50' cy='50' r='2' fill='rgba(255,255,255,0.05)'/%3e%3c/svg%3e")`}}></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-4 gap-16 mb-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-rose-100 p-1">
              <img src="./download.png" alt="Delights Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <h2 className="font-script text-3xl text-[#4E342E]">Delights</h2>
          </div>
          <p className="text-[#4E342E]/70 max-w-xs leading-relaxed">Luxury bespoke cakes for every celebration in Hyderabad, Pakistan.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/delights.hyderabad/" className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#FF4D6D] hover:text-white transition-all shadow-sm border border-rose-100/30">
              <Instagram className="text-[#4E342E]" size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#FF4D6D] hover:text-white transition-all shadow-sm border border-rose-100/30">
              <Facebook className="text-[#4E342E]" size={20} />
            </a>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-black text-[#4E342E] uppercase tracking-widest text-[10px]">Quick Links</h4>
          <div className="space-y-2">
            <a href="#home" className="block text-[#4E342E]/70 hover:text-[#FF4D6D] transition-colors text-sm">Home</a>
            <a href="#about" className="block text-[#4E342E]/70 hover:text-[#FF4D6D] transition-colors text-sm">About Us</a>
            <a href="#gallery" className="block text-[#4E342E]/70 hover:text-[#FF4D6D] transition-colors text-sm">Our Gallery</a>
            <a href="#process" className="block text-[#4E342E]/70 hover:text-[#FF4D6D] transition-colors text-sm">Watch Us Bake</a>
            <a href="#contact" className="block text-[#4E342E]/70 hover:text-[#FF4D6D] transition-colors text-sm">Contact</a>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-black text-[#4E342E] uppercase tracking-widest text-[10px]">Services</h4>
          <div className="space-y-2">
            <p className="text-[#4E342E]/70 text-sm">Custom Cake Design</p>
            <p className="text-[#4E342E]/70 text-sm">Wedding Cakes</p>
            <p className="text-[#4E342E]/70 text-sm">Birthday Cakes</p>
            <p className="text-[#4E342E]/70 text-sm">Cupcakes & Treats</p>
            <p className="text-[#4E342E]/70 text-sm">Dessert Hampers</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-black text-[#4E342E] uppercase tracking-widest text-[10px]">Contact Info</h4>
          <div className="space-y-2">
            <p className="text-[#4E342E]/70 text-sm">456 Cake Avenue</p>
            <p className="text-[#4E342E]/70 text-sm">Hyderabad, Sindh</p>
            <p className="text-[#4E342E]/70 text-sm">Pakistan 71000</p>
            <p className="text-[#4E342E]/70 text-sm">Mon-Sat: 9AM-8PM</p>
            <p className="text-[#4E342E]/70 text-sm">Sun: 10AM-6PM</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-rose-100/50 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#4E342E]/50 text-sm">© {new Date().getFullYear()} Delights Hyderabad. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[#4E342E]/50 hover:text-[#FF4D6D] transition-colors">Privacy Policy</a>
            <a href="#" className="text-[#4E342E]/50 hover:text-[#FF4D6D] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
    
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-10 right-10 w-16 h-16 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl flex items-center justify-center z-50 text-[#FF4D6D] border-4 border-rose-100/50 glossy-card group transition-all hover:scale-110 active:scale-95">
      <ChevronUp size={28} className="group-hover:animate-bounce" />
    </button>
  </footer>
);

export default App;