import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detekce scrollu pro změnu stylu navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Inicializace IntersectionObserver pro animace při scrollování
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    // Vybrat všechny elementy, které mají být animovány
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Paralax efekt
  useEffect(() => {
    const handleParallax = () => {
      document.querySelectorAll('.parallax').forEach((el) => {
        const scrollY = window.scrollY;
        const speed = el.getAttribute('data-speed') || 0.1;
        el.style.setProperty('--parallax-y', `${scrollY * speed}px`);
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  // Funkce pro čistou tabulátor navigaci
  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleTabKey);
    return () => {
      window.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  return (
    <div className="App bg-dark min-h-screen">
      {/* Header & Navigation */}
      <header className={`header fixed w-full z-50 py-4 px-6 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#home" className="text-2xl font-display font-bold gradient-text">David Strejc</a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-white hover:text-primary transition-colors duration-300 fancy-link">Úvod</a>
            <a href="#about" className="text-white hover:text-primary transition-colors duration-300 fancy-link">O mně</a>
            <a href="#services" className="text-white hover:text-primary transition-colors duration-300 fancy-link">Služby</a>
            <a href="#testimonials" className="text-white hover:text-primary transition-colors duration-300 fancy-link">Reference</a>
            <a href="#contact" className="text-white hover:text-primary transition-colors duration-300 fancy-link">Kontakt</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 w-full h-full bg-darker/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center transition-all duration-300 ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="flex flex-col space-y-6 items-center">
          <a 
            href="#home" 
            className="mobile-nav-item text-2xl text-white hover:text-primary transition-colors duration-300" 
            style={{"--item-index": 0}}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Úvod
          </a>
          <a 
            href="#about" 
            className="mobile-nav-item text-2xl text-white hover:text-primary transition-colors duration-300" 
            style={{"--item-index": 1}}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            O mně
          </a>
          <a 
            href="#services" 
            className="mobile-nav-item text-2xl text-white hover:text-primary transition-colors duration-300" 
            style={{"--item-index": 2}}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Služby
          </a>
          <a 
            href="#testimonials" 
            className="mobile-nav-item text-2xl text-white hover:text-primary transition-colors duration-300" 
            style={{"--item-index": 3}}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reference
          </a>
          <a 
            href="#contact" 
            className="mobile-nav-item text-2xl text-white hover:text-primary transition-colors duration-300" 
            style={{"--item-index": 4}}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kontakt
          </a>
        </nav>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero min-h-screen flex items-center relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark via-dark/90 to-dark"></div>
        <div className="tech-shape tech-shape-1"></div>
        <div className="tech-shape tech-shape-2"></div>
        <div className="section hero-content grid md:grid-cols-12 gap-8 items-center">
          <div className="reveal md:col-span-7 z-10 order-2 md:order-1">
            <div className="glass p-8 md:p-12 rounded-2xl">
              <span className="badge mb-4">AI Konzultant & Expert</span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="block text-white mb-2">David Strejc</span>
                <span className="gradient-text">Budoucnost AI ve vašich rukou</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Pomáhám firmám implementovat umělou inteligenci a najít optimální řešení v rychle se měnícím technologickém světě.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary btn-hover-effect">Kontaktujte mě</a>
                <a href="#services" className="btn-outline">Mé služby</a>
              </div>
              
              <div className="flex flex-wrap gap-6 mt-12">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white/80">Více než 19 let v IT</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white/80">Zkušený konzultant</span>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <span className="ml-3 text-white/80">AI Expert</span>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal md:col-span-5 z-10 order-1 md:order-2 mb-8 md:mb-0">
            <div className="relative mx-auto max-w-md">
              {/* SVG Mask/Frame - mírnější glowing efekt */}
              <div className="absolute -inset-4 bg-gradient-primary rounded-[60px_35px_60px_35px] rotate-3 opacity-30 blur-lg animate-pulse-slow"></div>
              <div className="absolute -inset-4 bg-gradient-primary rounded-[35px_60px_35px_60px] -rotate-3 opacity-30 blur-lg animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              
              {/* White Background with SVG Clip Path */}
              <div className="relative bg-white p-2 rounded-[40px_25px_40px_25px] overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-light/10 to-secondary-light/10"></div>
                
                {/* SVG Decorative Elements */}
                <svg className="absolute top-0 left-0 text-primary/5" width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="15" cy="15" r="10" />
                  <circle cx="40" cy="40" r="15" />
                  <circle cx="80" cy="20" r="8" />
                </svg>
                
                <svg className="absolute bottom-0 right-0 text-secondary/5" width="100" height="100" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="85" cy="85" r="10" />
                  <circle cx="60" cy="60" r="15" />
                  <circle cx="20" cy="80" r="8" />
                </svg>
                
                {/* Fancy SVG Wave Mask */}
                <div className="mask-container w-full h-full">
                  <div className="relative w-full" style={{ clipPath: "url(#wave-mask)" }}>
                    <img 
                      src="/david_main.png" 
                      alt="David Strejc" 
                      className="w-full rounded-[30px_15px_30px_15px]"
                    />
                    <svg width="0" height="0" className="absolute">
                      <defs>
                        <clipPath id="wave-mask" clipPathUnits="objectBoundingBox">
                          <path d="M0.0117,0.2047 C0.0039,0.0953,0.0039,0.0953,0.0117,0 L0.9883,0 C0.9961,0.0953,0.9961,0.0953,0.9883,0.2047 C0.875,0.25,0.75,0.3203,0.7109,0.3516 C0.6328,0.4141,0.5781,0.4844,0.5,0.5156 C0.4219,0.4844,0.3672,0.4141,0.2891,0.3516 C0.25,0.3203,0.125,0.25,0.0117,0.2047 L0.0117,1 L0.9883,1 L0.9883,0.2047 C0.875,0.25,0.75,0.3203,0.7109,0.3516 C0.6328,0.4141,0.5781,0.4844,0.5,0.5156 C0.4219,0.4844,0.3672,0.4141,0.2891,0.3516 C0.25,0.3203,0.125,0.25,0.0117,0.2047"></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section relative overflow-hidden bg-gradient-dark">
        <div className="tech-shape tech-shape-1" style={{top: '50%', right: '10%'}}></div>
        <div className="mb-16 text-center reveal">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Kdo jsem?</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <div className="glass-card p-8 relative">
              <h3 className="text-2xl font-bold mb-6 line-decoration">Moje cesta</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Ve firemním IT od roku 2004</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Majitel Apertia Tech s.r.o. (AutoERP.cz, Apertia.ai)</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Bývalý spolumajitel Easy Software s.r.o. (easyredmine.com)</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Unix / Linux Engineer</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Former IT Infrastructure Architect @ O2</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium">Former Senior Solution Designer @ T-Mobile</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="reveal" style={{transitionDelay: '0.2s'}}>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 line-decoration">Moje filosofie</h3>
              <p className="text-lg mb-6">
                Věřím v sílu moderních technologií a jejich potenciál transformovat podnikání. Mým posláním je pomáhat firmám implementovat umělou inteligenci způsobem, který přináší reálnou hodnotu a konkurenční výhodu.
              </p>
              <p className="text-lg mb-6">
                S více než 19 lety zkušeností v IT průmyslu mám unikátní perspektivu, která kombinuje hluboké technické znalosti s pochopením byznysových potřeb.
              </p>
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4">Specializace</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm">Umělá inteligence</span>
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm">Automatizace procesů</span>
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm">Cloudové řešení</span>
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm">Systémová architektura</span>
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm">Digitální transformace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section relative overflow-hidden bg-gradient-to-br from-dark via-dark/95 to-primary/5">
        <div className="tech-shape tech-shape-2" style={{bottom: '20%', left: '5%'}}></div>
        <div className="mb-16 text-center reveal">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Moje služby</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-xl mt-6 max-w-3xl mx-auto text-white/80">
            Nabízím komplexní řešení v oblasti umělé inteligence a implementace moderních technologií.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="glass-card p-8 service-card reveal">
            <div className="service-icon mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Strategie</h3>
            <p className="text-white/80 mb-6">
              Vytvořím komplexní strategii implementace umělé inteligence přizpůsobenou specifickým potřebám vaší firmy.
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Analýza současného stavu
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Definice cílů a KPIs
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Plán implementace AI
              </li>
            </ul>
          </div>
          
          {/* Service Card 2 */}
          <div className="glass-card p-8 service-card reveal" style={{transitionDelay: '0.1s'}}>
            <div className="service-icon mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Implementace AI</h3>
            <p className="text-white/80 mb-6">
              Komplexní implementace řešení založených na umělé inteligenci, od výběru nástrojů až po integraci do vašich systémů.
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Výběr optimálních AI nástrojů
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Integrace s existujícími systémy
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Školení týmu a podpora
              </li>
            </ul>
          </div>
          
          {/* Service Card 3 */}
          <div className="glass-card p-8 service-card reveal" style={{transitionDelay: '0.2s'}}>
            <div className="service-icon mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Automatizace procesů</h3>
            <p className="text-white/80 mb-6">
              Identifikuji a automatizuji procesy ve vaší společnosti pro zvýšení efektivity a snížení nákladů.
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Analýza pracovních postupů
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Implementace automatizačních nástrojů
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Měření a optimalizace výsledků
              </li>
            </ul>
          </div>
          
          {/* Service Card 4 */}
          <div className="glass-card p-8 service-card reveal">
            <div className="service-icon mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Konzultace</h3>
            <p className="text-white/80 mb-6">
              Poskytnu odborné konzultace v oblasti umělé inteligence a pomohu vašemu týmu se v této oblasti zorientovat.
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Workshopy a školení
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Trendy a inovace v AI
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Průběžná podpora
              </li>
            </ul>
          </div>
          
          {/* Service Card 5 */}
          <div className="glass-card p-8 service-card reveal" style={{transitionDelay: '0.1s'}}>
            <div className="service-icon mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Datová analýza</h3>
            <p className="text-white/80 mb-6">
              Analyzuji vaše data a pomáhám najít vzorce a příležitosti, které mohou vést k lepšímu rozhodování a novým obchodním příležitostem.
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Business Intelligence
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Prediktivní analýza
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Vizualizace dat
              </li>
            </ul>
          </div>
          
          {/* Service Card 6 */}
          <div className="glass-card p-8 service-card reveal" style={{transitionDelay: '0.2s'}}>
            <div className="service-icon mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Cloudové řešení</h3>
            <p className="text-white/80 mb-6">
              Navrhuji a implementuji cloudová řešení, která poskytují škálovatelnost, flexibilitu a spolehlivost pro vaše AI aplikace.
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Návrh cloudové architektury
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Migrace do cloudu
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Optimalizace nákladů
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="section relative overflow-hidden bg-gradient-dark">
        <div className="tech-shape tech-shape-1" style={{top: '10%', right: '5%'}}></div>
        <div className="mb-16 text-center reveal">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Reference</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-xl mt-6 max-w-3xl mx-auto text-white/80">
            Co o mé práci říkají klienti a partneři
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Testimonial 1 */}
          <div className="glass-card p-8 testimonial-card reveal">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold">Jan Novák</h4>
                <p className="text-white/60">CEO, TechFirma s.r.o.</p>
              </div>
            </div>
            <p className="text-lg">
              "David nám pomohl implementovat AI řešení, které zautomatizovalo naše interní procesy a ušetřilo více než 30% času našeho týmu. Jeho přístup byl profesionální a výsledky předčily naše očekávání."
            </p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="glass-card p-8 testimonial-card reveal" style={{transitionDelay: '0.1s'}}>
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold">Marie Dvořáková</h4>
                <p className="text-white/60">CTO, Inova Systems</p>
              </div>
            </div>
            <p className="text-lg">
              "Spolupráce s Davidem na implementaci AI do našeho produktu byla klíčová pro náš úspěch. Jeho odbornost a schopnost vysvětlit komplexní koncepty jednoduchým způsobem byly neocenitelné."
            </p>
          </div>
          
          {/* Testimonial 3 */}
          <div className="glass-card p-8 testimonial-card reveal">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold">Petr Svoboda</h4>
                <p className="text-white/60">Ředitel IT oddělení, Global Corp</p>
              </div>
            </div>
            <p className="text-lg">
              "David nám pomohl s kompletní cloudovou transformací a implementací AI řešení. Jeho strategický přístup a technické znalosti nám pomohly dosáhnout našich cílů efektivněji a s nižšími náklady."
            </p>
          </div>
          
          {/* Testimonial 4 */}
          <div className="glass-card p-8 testimonial-card reveal" style={{transitionDelay: '0.1s'}}>
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-xl font-bold">Lucie Němcová</h4>
                <p className="text-white/60">COO, DataTech</p>
              </div>
            </div>
            <p className="text-lg">
              "Díky Davidovým konzultacím jsme byli schopni identifikovat klíčové oblasti, kde nám AI může přinést největší hodnotu. Jeho přístup zaměřený na výsledky nám pomohl rychle dosáhnout návratnosti investice."
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section relative overflow-hidden">
        <div className="tech-shape tech-shape-1" style={{top: '10%', right: '5%'}}></div>
        <div className="tech-shape tech-shape-2" style={{bottom: '10%', left: '5%'}}></div>
        <div className="mb-16 text-center reveal">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Kontaktujte mě</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          <p className="text-xl mt-6 max-w-3xl mx-auto text-white/80">
            Pojďme společně najít optimální AI řešení pro vaši firmu
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="glass-card p-8 reveal">
            <h3 className="text-2xl font-bold mb-6 line-decoration">Napište mi</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-white/80">Váš e-mail</label>
                <input 
                  type="email" 
                  id="email" 
                  className="input-field" 
                  placeholder="vase@email.cz" 
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-white/80">Vaše zpráva</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="input-field" 
                  placeholder="Popište váš projekt nebo dotaz..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full btn-hover-effect">Odeslat zprávu</button>
            </form>
          </div>
          
          <div className="reveal" style={{transitionDelay: '0.2s'}}>
            <div className="glass-card p-8 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6 line-decoration">Kontaktní informace</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-semibold">E-mail</h4>
                      <a href="mailto:info@davidstrejc.cz" className="text-white/80 hover:text-white transition-colors">info@davidstrejc.cz</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-semibold">Telefon</h4>
                      <a href="tel:+420123456789" className="text-white/80 hover:text-white transition-colors">+420 123 456 789</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="text-lg font-semibold">Sídlo</h4>
                      <address className="text-white/80 not-italic">Praha, Česká republika</address>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Najdete mě na</h4>
                <div className="flex space-x-4">
                  <a href="#" className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/30 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  </a>
                  <a href="#" className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/30 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/30 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-6 bg-darker border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">David Strejc</h3>
            <p className="text-white/70 mb-6">
              Specialista na AI konzultace a implementaci moderních technologií.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Rychlé odkazy</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-white/70 hover:text-white transition-colors fancy-link">Úvod</a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors fancy-link">O mně</a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-white transition-colors fancy-link">Služby</a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/70 hover:text-white transition-colors fancy-link">Reference</a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-white transition-colors fancy-link">Kontakt</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@davidstrejc.cz" className="text-white/70 hover:text-white transition-colors fancy-link">info@davidstrejc.cz</a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+420123456789" className="text-white/70 hover:text-white transition-colors fancy-link">+420 123 456 789</a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/70">Praha, Česká republika</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} David Strejc. Všechna práva vyhrazena.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
