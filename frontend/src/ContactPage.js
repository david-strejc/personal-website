import React from "react";
import { Link } from "react-router-dom";

function ContactPage() {
  return (
    <div className="App bg-dark min-h-screen flex flex-col">
      <header className="py-4 px-6 bg-darker">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white">David Strejc</Link>
          <nav className="space-x-6 hidden md:block">
            <Link to="/" className="text-white hover:text-primary">Domů</Link>
            <Link to="/contact" className="text-white hover:text-primary">Kontakt</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6">
        <div className="glass-card p-8 max-w-lg w-full mt-16 mb-16">
          <h1 className="text-3xl font-bold mb-6 text-center">Kontaktujte mě</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-white/80">Váš e-mail</label>
              <input type="email" id="email" className="input-field" placeholder="vase@email.cz" required />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-white/80">Vaše zpráva</label>
              <textarea id="message" rows="5" className="input-field" placeholder="Popište váš projekt nebo dotaz..." required></textarea>
            </div>
            <button type="submit" className="btn-primary w-full btn-hover-effect">Odeslat zprávu</button>
          </form>
          <div className="text-center mt-6">
            <Link to="/" className="text-white/70 hover:text-white transition-colors fancy-link">Zpět na hlavní stránku</Link>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6 bg-darker border-t border-white/10 text-center text-white/70">
        <p>© {new Date().getFullYear()} David Strejc. Všechna práva vyhrazena.</p>
      </footer>
    </div>
  );
}

export default ContactPage;
