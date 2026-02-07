import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';

const footerLinks = [
  {
    title: 'Solutions',
    links: ['Automated Coffee Systems', 'Robotic Beverage Bars', 'AI Operations Software', 'Franchise & Enterprise']
  },
  {
    title: 'Industries',
    links: ['Airports', 'Hospitals', 'Universities', 'Malls', 'Corporate HQs', 'Hotels']
  },
  {
    title: 'Company',
    links: ['Models', 'Software', 'ROI', 'Book Demo', 'Contact']
  }
];

const legalLinks = ['Docs', 'FAQs', 'Privacy', 'Terms'];

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' }
];

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-slate-300 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">ICOFE SPECIALTY LAB</h3>
            <p className="text-slate-400 mb-6 max-w-xs text-sm">
              Automated beverage systems built for scale. Zero labor. Infinite consistency.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Download on the App Store">
                <img src="/images/app-store-badge.svg" alt="App Store" className="h-10" />
              </a>
              <a href="#" aria-label="Get it on Google Play">
                <img src="/images/google-play-badge.svg" alt="Google Play" className="h-10" />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="lg:justify-self-end">
              <h4 className="font-semibold text-white mb-4 tracking-wider uppercase text-sm">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors font-light text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-light">
            &copy; {new Date().getFullYear()} ICOFE Specialty Lab. All rights reserved.
          </p>
          <div className="flex items-center gap-x-6">
            {legalLinks.map((link) => (
                <a key={link} href="#" className="text-slate-400 hover:text-white transition-colors font-light text-xs">
                  {link}
                </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                className="text-slate-500 hover:text-amber-500 transition-colors"
                aria-label={`Follow us on ${social.name}`}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
