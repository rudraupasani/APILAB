import React, { useState, useEffect } from 'react';
import { Code2, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/10 backdrop-blur-lg border-b border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.3)] animate-glow'
                : 'bg-transparent border-transparent'
                }`}
        >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-white/10 blur-[120px] rounded-full animate-pulse-slow"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10 transition-all duration-500">
                {/* Logo */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shadow-inner shadow-white/30 backdrop-blur-sm">
                        <Code2 size={22} className="text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-wide text-white">APILab</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <a href="#features" className="text-neutral-200 hover:text-white transition font-medium">Features</a>
                    <Link
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}

                        to="/APIS" className="text-neutral-200 hover:text-white transition font-medium">Free APIs</Link>
                    <button
                        onClick={() => navigate('/tester')}
                        className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-6 py-2 rounded-lg font-semibold text-white shadow-md hover:shadow-blue-500/30 transition"
                    >
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white transition hover:scale-110"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/10 p-6 space-y-4 animate-fade-down">
                    <a href="#features" className="block text-neutral-200 hover:text-white font-medium transition">Features</a>
                    <Link
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}

                        to="/APIS" className="block text-neutral-200 hover:text-white font-medium transition">Free APIs</Link>
                    <button
                        onClick={() => navigate('/tester')}
                        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold text-white transition"
                    >
                        Get Started
                    </button>
                </div>
            )}
        </nav>
    );
}
