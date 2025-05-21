import React from "react";

function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="glass-card p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Kontaktujte mě</h1>
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
        <div className="text-center mt-6">
          <a href="/" className="text-white/70 hover:text-white transition-colors fancy-link">Zpět na hlavní stránku</a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
