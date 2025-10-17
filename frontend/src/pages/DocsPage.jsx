import React, { useState } from 'react';
import { ArrowRight, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function DocsPage() {
  const [fakeResponse, setFakeResponse] = useState(null);

  const callFakeAPI = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await res.json();
      setFakeResponse(data);
    } catch (err) {
      setFakeResponse({ error: err.message });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-auto pt-20">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-10 w-full pt-20">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900/80 backdrop-blur-md p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">Introduction</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            APILab is a professional API testing tool supporting <strong>REST</strong>, <strong>GraphQL</strong>, and <strong>WebSocket</strong> requests.  
            Create, save, and manage requests with headers and bodies, and view structured responses in a modern dark interface.
          </p>
        </motion.section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-gray-900/80 backdrop-blur-md p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm md:text-base">
            <li><strong>Create a Request:</strong> Enter name, select method, and input endpoint URL.</li>
            <li><strong>Add Headers:</strong> Include key-value pairs your API requires.</li>
            <li><strong>Enter Body:</strong> Input JSON data for POST, PUT, PATCH, or GraphQL requests.</li>
            <li><strong>Send Request:</strong> Execute the request and view response details.</li>
            <li><strong>Save Requests:</strong> Save requests for later and manage them in collections.</li>
            <li><strong>WebSocket Support:</strong> Connect to WebSocket endpoints, send and receive messages live.</li>
          </ol>
        </motion.section>

        {/* Key Features */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900/80 backdrop-blur-md p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm md:text-base">
            <li>Send REST, GraphQL, and WebSocket requests</li>
            <li>Save and manage multiple requests in collections</li>
            <li>Custom headers and request bodies</li>
            <li>View response status, headers, duration, and body</li>
            <li>Copy responses to clipboard</li>
            <li>Responsive, modern dark UI</li>
          </ul>
        </motion.section>

        {/* Fake API Example */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-gray-900/80 backdrop-blur-md p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">Example: Fetch Fake API</h2>
          <p className="text-gray-300 text-sm md:text-base mb-2">
            Call a sample REST API endpoint (<code className="bg-gray-800/50 px-1 rounded">https://jsonplaceholder.typicode.com/todos/1</code>) to see a JSON response.
          </p>
          <button
            onClick={callFakeAPI}
            className="bg-blue-600 hover:bg-blue-700 px-4 md:px-6 py-2 rounded-lg font-semibold transition mb-2"
          >
            Call Fake API
          </button>

          {fakeResponse && (
            <div className="bg-gray-800/60 border border-gray-700 p-3 rounded-lg font-mono text-xs md:text-sm relative overflow-auto max-h-64 md:max-h-80">
              <button
                onClick={() => copyToClipboard(fakeResponse)}
                className="absolute top-1 right-1 text-gray-400 hover:text-white"
              >
                <Copy size={16} />
              </button>
              <pre>{JSON.stringify(fakeResponse, null, 2)}</pre>
            </div>
          )}
        </motion.section>

        {/* Quick Start */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/80 backdrop-blur-md p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-2 text-blue-400">Quick Start</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            1. Click <span className="font-bold">"New Request"</span> in the sidebar.<br/>
            2. Enter API URL and select method.<br/>
            3. Add headers if required.<br/>
            4. Enter JSON body for POST, PUT, PATCH, or GraphQL requests.<br/>
            5. Click <span className="font-bold">Send</span> to view response.<br/>
            6. For WebSocket, connect, type messages, and send to communicate live.
          </p>
        </motion.section>
      </div>

      <Footer />
    </div>
  );
}
