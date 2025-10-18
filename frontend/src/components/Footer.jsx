import React from 'react';
import { Code2, Github, Twitter, Linkedin, Mail, Globe, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Code2 size={20} />
              </div>
              <span className="font-bold text-white text-lg">APILab</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Modern API testing for developers
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <p className="font-bold mb-4 text-white">Quick Links</p>
            <div className="flex flex-col space-y-2 text-sm text-neutral-400">
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to="/APIS"
                className="hover:text-white transition"
              >
                Free APIs
              </Link>
              <Link
                onClick={() => window.scrollTo(0, 0)}
                to="/tester"
                className="hover:text-white transition"
              >
                API Tester
              </Link>
            </div>
          </div>

          {/* Company / Apps */}
          <div className="flex flex-col">
            <p className="font-bold mb-4 text-white">Our Apps</p>
            <div className="flex flex-col space-y-2 text-sm text-neutral-400">
              <a
                href="https://optivex.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Optivex.Tech
              </a>
              <a
                href="https://jsonbazaar.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                JSON BAZAAR - Free APIs
              </a>
              <a
                href="https://lumexa.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Lumexa AI
              </a>
            </div>
          </div>

          {/* Social / Contact */}
          <div className="flex flex-col">
            <p className="font-bold mb-4 text-white">Connect</p>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
              >
                <Twitter className="w-5 h-5" /> Twitter
              </a>
              <a
                href="https://www.instagram.com/rudraupasani.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
              >
                <Instagram className="w-5 h-5" /> Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/rudra-upasani-91355733b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
              >
                <Linkedin className="w-5 h-5" /> LinkedIn
              </a>
              <a
                href="mailto:rudraupasani7@gmail.com"
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition"
              >
                <Mail className="w-5 h-5" /> Email
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 text-center text-neutral-500 text-sm">
          © 2025 APILab. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
