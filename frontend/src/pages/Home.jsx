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
            <section className="py-24 px-6 bg-[#0b0b0b] border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-bold text-white">Live Demo Preview</h2>
                        <p className="text-neutral-400 mt-4 text-lg">
                            See APILab in action with real-time API testing examples
                        </p>
                    </motion.div>

                    <motion.div
                        className="relative bg-neutral-900/50 border border-white/10 rounded-2xl p-8 shadow-lg"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="font-mono text-sm text-neutral-300 space-y-3">
                            <p className="text-green-400">POST /api/demo/test</p>
                            <p>
                                Status: <span className="text-blue-400">201 Created</span> • 120ms
                            </p>
                            <pre className="bg-black/40 p-3 rounded-lg overflow-auto text-slate-300">{`{
  "demo": "success",
  "message": "Live API demo executed successfully"
}`}</pre>
                        </div>
                    </motion.div>
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
            <section id="how-it-works" className="py-24 px-6 bg-[#0b0b0b] border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl font-bold text-white">How It Works</h2>
                        <p className="text-neutral-400 mt-4 text-lg">
                            Test, debug, and share your APIs in just a few clicks
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: '1', title: 'Write or Import Endpoint', desc: 'Paste your API URL or import from Postman. Quickly configure headers, parameters, and body.', icon: <Code2 className="w-12 h-12 text-blue-400" /> },
                            { step: '2', title: 'Send Request & Inspect', desc: 'Send instantly and view real-time response data, headers, and status with lightning speed.', icon: <Zap className="w-12 h-12 text-yellow-400" /> },
                            { step: '3', title: 'Save & Share Results', desc: 'Store test collections, share with teammates, and access analytics for every API run.', icon: <Shield className="w-12 h-12 text-green-400" /> },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                className="relative bg-neutral-900/50 border border-white/10 rounded-2xl p-8 text-center hover:border-blue-500 transition group"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex justify-center mb-6">{step.icon}</div>
                                <h3 className="text-2xl font-semibold mb-3 text-white">{step.title}</h3>
                                <p className="text-neutral-400">{step.desc}</p>
                                <span className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">{step.step}</span>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-10 rounded-2xl transition"></div>
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
