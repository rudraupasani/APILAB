import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Cpu, Shield, ArrowRight, Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
    const navigate = useNavigate();

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    return (
        <div className="bg-[#0a0a0a] text-white overflow-hidden pt-10">

            <Navbar />
            {/* Hero Section */}
            <section className="min-h-screen flex items-center px-6 relative">
                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="space-y-8"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div className="space-y-4">
                                <div className="inline-block">
                                    <span className="bg-white/10 text-blue-400 px-4 py-1 rounded-full text-sm font-medium border border-white/20">
                                        ✨ The Future of API Testing
                                    </span>
                                </div>
                                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                                    Test APIs Like Never <span className="text-blue-500">Before</span>
                                </h1>
                                <p className="text-xl text-neutral-400 leading-relaxed">
                                    Experience next-gen API testing. Built for developers, by developers. Fast, powerful, and simple.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => navigate('/tester')}
                                    className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                                >
                                    Start Testing Now
                                    <ArrowRight size={20} />
                                </motion.button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative h-96 lg:h-full hidden lg:block"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
                            viewport={{ once: true }}
                        >
                            <div className="absolute inset-0 bg-neutral-900 rounded-3xl border border-white/10 p-8 shadow-lg shadow-blue-900/20">
                                <div className="font-mono text-sm space-y-3 text-neutral-300">
                                    <p className="text-green-400">GET /api/users/123</p>
                                    <p>
                                        Status: <span className="text-blue-400">200 OK</span> • 145ms
                                    </p>
                                    <pre className="bg-black/40 p-3 rounded-lg overflow-auto text-slate-300">{`{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com"
}`}</pre>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Live Demo Preview Section */}
           <section className="py-28 px-6 bg-[#000000] relative overflow-hidden">

    {/* SOFT CYAN BACKLIGHT (very low glow) */}
    <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.15),transparent_65%)]" />

    <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-5xl font-bold text-white tracking-wide">
                Live Demo Preview
            </h2>
            <p className="text-neutral-400 mt-4 text-lg">
                See APILab in action with real-time API testing examples
            </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
            
            {/* CARD 1 */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative bg-[#0f0f0f]/60 border border-white/5 
                rounded-2xl p-8 backdrop-blur-md
                shadow-[0_0_10px_rgba(0,0,0,0.5)]
                hover:shadow-[0_0_18px_rgba(0,180,255,0.20)]
                transition-all duration-300"
            >
                <h3 className="text-xl font-bold text-white mb-4">
                    POST Request Demo
                </h3>

                <div className="font-mono text-sm text-neutral-300 space-y-3">
                    <p className="text-green-400">POST /api/demo/test</p>

                    <p>
                        Status: <span className="text-blue-400">201 Created</span> • 120ms
                    </p>

                    <pre className="bg-black/40 p-4 rounded-lg text-slate-300 border border-white/5">{`{
  "demo": "success",
  "message": "Live API demo executed successfully"
}`}</pre>
                </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
                className="relative bg-[#0f0f0f]/60 border border-white/5 
                rounded-2xl p-8 backdrop-blur-md
                shadow-[0_0_10px_rgba(0,0,0,0.5)]
                hover:shadow-[0_0_18px_rgba(0,180,255,0.20)]
                transition-all duration-300"
            >
                <h3 className="text-xl font-bold text-white mb-4">
                    GET Request Demo
                </h3>

                <div className="font-mono text-sm text-neutral-300 space-y-3">
                    <p className="text-emerald-400">GET /api/demo/users</p>

                    <p>
                        Status: <span className="text-cyan-400">200 OK</span> • 98ms
                    </p>

                    <pre className="bg-black/40 p-4 rounded-lg text-cyan-200 border border-white/5">{`{
  "users": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Alice" }
  ]
}`}</pre>
                </div>
            </motion.div>
        </div>

        {/* Soft underline */}
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-20 h-[2px] w-full bg-gradient-to-r from-transparent 
            via-[#00B4FF]/40 to-transparent"
        />
    </div>
</section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                    >
                        <h2 className="text-5xl font-bold">Powerful Features</h2>
                        <p className="text-lg text-neutral-400 mt-4">
                            Everything you need for next-level API testing
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { icon: <Zap />, title: 'Lightning Fast', desc: 'Execute requests in milliseconds with optimized performance' },
                            { icon: <Shield />, title: 'Secure', desc: 'Top-grade encryption and compliance standards' },
                            { icon: <Cpu />, title: 'Smart Automation', desc: 'Automate workflows with intelligent scripting' },
                            { icon: <Code2 />, title: 'Developer Focused', desc: 'Built with simplicity and power in mind' },
                            { icon: <ArrowRight />, title: 'Collaboration', desc: 'Work with your team in real-time' },
                            { icon: <Check />, title: 'Analytics', desc: 'Track and optimize API performance' },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                className="bg-neutral-900 p-8 rounded-2xl border border-white/10 hover:border-blue-500 transition"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/10 mb-6">{f.icon}</div>
                                <h3 className="text-2xl font-bold mb-2">{f.title}</h3>
                                <p className="text-neutral-400">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
           <section
    id="how-it-works"
    className="py-28 px-6 bg-[#000000] border-t border-white/10 relative overflow-hidden"
>
    {/* Soft cyan spotlight */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.10),transparent_70%)] opacity-20" />

    <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
        >
            <h2 className="text-5xl font-bold text-white tracking-wide">How It Works</h2>
            <p className="text-neutral-400 mt-4 text-lg">
                Test, debug, and share your APIs in just a few clicks
            </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
                {
                    step: "1",
                    title: "Write or Import Endpoint",
                    desc: "Paste your API URL or import from Postman. Configure headers, parameters, and body instantly.",
                    icon: <Code2 className="w-12 h-12 text-blue-400" />,
                },
                {
                    step: "2",
                    title: "Send Request & Inspect",
                    desc: "Send requests in real-time and inspect JSON, headers, and status details instantly.",
                    icon: <Zap className="w-12 h-12 text-yellow-400" />,
                },
                {
                    step: "3",
                    title: "Save & Share Results",
                    desc: "Organize collections, share results, and track analytics for every request.",
                    icon: <Shield className="w-12 h-12 text-green-400" />,
                },
            ].map((step, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative bg-[#0d0d0d]/60 backdrop-blur-md border border-white/5 
                    rounded-2xl p-10 text-center shadow-[0_0_12px_rgba(0,0,0,0.45)]
                    hover:shadow-[0_0_22px_rgba(0,170,255,0.25)] transition-all duration-300 group"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        className="flex justify-center mb-6"
                    >
                        {step.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold mb-3 text-white">
                        {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-400 leading-relaxed">
                        {step.desc}
                    </p>

                    {/* Step Number Badge */}
                    <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full 
                        w-12 h-12 flex items-center justify-center text-xl font-bold 
                        shadow-[0_0_12px_rgba(0,150,255,0.35)] border border-white/10"
                    >
                        {step.step}
                    </motion.span>

                    {/* Soft hover glow */}
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent 
                        opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-300"
                    ></div>
                </motion.div>
            ))}
        </div>
    </div>
</section>


            {/* FAQ Section */}
            <section id="faq" className="py-24 px-6 bg-black border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-bold text-white">Frequently Asked Questions</h2>
                        <p className="text-neutral-400 mt-4 text-lg">Everything you need to know before getting started</p>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            { q: 'Is APILab free to use?', a: 'Yes! You can start testing APIs for free with no credit card required. Premium plans unlock advanced tools like analytics and collaboration.' },
                            { q: 'Do I need to sign up to test an API?', a: 'No sign-up is required for basic testing. However, creating an account lets you save requests, create collections, and sync across devices.' },
                            { q: 'Can I test private APIs?', a: 'Absolutely. APILab supports token-based and OAuth authentication so you can securely test private or production endpoints.' },
                            { q: 'Does APILab support WebSocket or GraphQL?', a: 'Yes, APILab supports REST, GraphQL, and WebSocket APIs for real-time and modern app development workflows.' },
                            { q: 'Can I collaborate with my team?', a: 'Team collaboration is available in the Pro plan — share collections, comments, and analytics securely with your teammates.' },
                        ].map((item, i) => (
                            <motion.details
                                key={i}
                                className="group bg-neutral-900/50 border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-blue-500 transition"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <summary className="flex justify-between items-center text-white text-lg font-medium">
                                    {item.q}
                                    <span className="text-blue-400 group-open:rotate-45 transition-transform duration-300">
                                        <Plus className="w-5 h-5" />
                                    </span>
                                </summary>
                                <p className="text-neutral-400 mt-4">{item.a}</p>
                            </motion.details>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
