import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Copy,
  Save,
  Trash2,
  Plus,
  Menu,
  X,
  AlertCircle,
  Code2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TesterPage() {
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState({
    name: 'New Request',
    method: 'GET',
    url: '',
    body: '',
    headers: {},
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [requestName, setRequestName] = useState('New Request');
  const [activeTab, setActiveTab] = useState('body');
  const [headerInput, setHeaderInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [wsMessages, setWsMessages] = useState([]);
  const [wsInput, setWsInput] = useState('');
  const [wsConnection, setWsConnection] = useState(null);
  const wsRef = useRef(null);
  const [apiMode, setApiMode] = useState('REST'); // 🔹 new top-bar mode selector

  const navigate = useNavigate();

  // 🔹 Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('apiTesterRequests');
    if (saved) setRequests(JSON.parse(saved));
  }, []);

  // 🔹 Save history when changed
  useEffect(() => {
    localStorage.setItem('apiTesterRequests', JSON.stringify(requests));
  }, [requests]);

  // 🔹 Update method based on selected API mode
  useEffect(() => {
    if (apiMode === 'REST' && currentRequest.method === 'WEBSOCKET') {
      setCurrentRequest((prev) => ({ ...prev, method: 'GET' }));
    } else if (apiMode === 'WEBSOCKET') {
      setCurrentRequest((prev) => ({ ...prev, method: 'WEBSOCKET' }));
    } else if (apiMode === 'GRAPHQL') {
      setCurrentRequest((prev) => ({ ...prev, method: 'GRAPHQL' }));
    }
  }, [apiMode]);

  const methodColors = {
    GET: 'bg-blue-500',
    POST: 'bg-green-500',
    PUT: 'bg-yellow-500',
    PATCH: 'bg-purple-500',
    DELETE: 'bg-red-500',
    HEAD: 'bg-slate-500',
    OPTIONS: 'bg-indigo-500',
    WEBSOCKET: 'bg-pink-600',
    GRAPHQL: 'bg-orange-500',
  };

  // 🔹 REST + GraphQL handler
  const sendRequest = async () => {
    if (currentRequest.method === 'WEBSOCKET') {
      handleWebSocket();
      return;
    }
    try {
      setLoading(true);
      setResponse(null);
      const headers = { 'Content-Type': 'application/json', ...currentRequest.headers };
      const start = Date.now();
      let body = currentRequest.body;
      if (currentRequest.method === 'GRAPHQL') {
        const gqlData = JSON.parse(currentRequest.body || '{}');
        body = JSON.stringify({
          query: gqlData.query || '',
          variables: gqlData.variables || {},
        });
      }
      const res = await fetch(currentRequest.url, {
        method: currentRequest.method === 'GRAPHQL' ? 'POST' : currentRequest.method,
        headers,
        body: currentRequest.method !== 'GET' && body ? body : undefined,
      });
      const data = await res.json().catch(() => res.text());
      const duration = Date.now() - start;
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
        duration,
        ok: res.ok,
      });
    } catch (err) {
      setResponse({
        status: 'Error',
        statusText: err.message,
        data: null,
        duration: 0,
        ok: false,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 WebSocket handler
  const handleWebSocket = () => {
    if (wsConnection) {
      wsConnection.close();
      setWsConnection(null);
      wsRef.current = null;
      setWsMessages((prev) => [...prev, '🔴 Disconnected']);
      return;
    }
    try {
      const ws = new WebSocket(currentRequest.url);
      wsRef.current = ws;
      ws.onopen = () => {
        setWsConnection(ws);
        setWsMessages(['🟢 Connected']);
      };
      ws.onmessage = (msg) => {
        setWsMessages((prev) => [...prev, `📩 ${msg.data}`]);
      };
      ws.onclose = () => {
        setWsConnection(null);
        wsRef.current = null;
        setWsMessages((prev) => [...prev, '🔴 Connection closed']);
      };
      ws.onerror = () => {
        setWsMessages((prev) => [...prev, '⚠️ WebSocket error']);
      };
    } catch (err) {
      setWsMessages((prev) => [...prev, `❌ Failed: ${err.message}`]);
    }
  };

  const sendWsMessage = () => {
    if (wsConnection && wsRef.current && wsInput.trim()) {
      wsRef.current.send(wsInput);
      setWsMessages((prev) => [...prev, `➡️ ${wsInput}`]);
      setWsInput('');
    }
  };

  const saveRequest = () => {
    setRequests([...requests, { ...currentRequest, name: requestName, id: Date.now() }]);
    setShowSaveModal(false);
    setRequestName('New Request');
  };

  const loadRequest = (req) => setCurrentRequest(req);
  const deleteRequest = (id) => setRequests(requests.filter((r) => r.id !== id));

  const addHeader = () => {
    if (headerInput.includes(':')) {
      const [key, value] = headerInput.split(':').map((s) => s.trim());
      setCurrentRequest({
        ...currentRequest,
        headers: { ...currentRequest.headers, [key]: value },
      });
      setHeaderInput('');
    }
  };

  const removeHeader = (key) => {
    const newHeaders = { ...currentRequest.headers };
    delete newHeaders[key];
    setCurrentRequest({ ...currentRequest, headers: newHeaders });
  };

  const copyResponse = () => {
    if (response?.data)
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Mobile Menu */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg transition"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-30 w-64 h-screen border-r border-gray-800 bg-gray-900/80 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className="p-4 border-b border-gray-800 cursor-pointer">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Code2 size={18} />
            </div>
            <h1 className="font-bold text-lg">APILab</h1>
          </div>

          <button
            onClick={() => setShowSaveModal(true)}
            className="cursor-pointer w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-2 font-medium text-sm transition"
          >
            <Save size={16} />
            Save Request
          </button>

          {requests.length > 0 && (
            <button
              onClick={() => {
                setRequests([]);
                localStorage.removeItem('apiTesterRequests');
              }}
              className="cursor-pointer mt-3 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 rounded-lg px-3 py-2 font-medium text-sm transition"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-semibold text-gray-400 mb-3">COLLECTIONS</p>
          {requests.length === 0 ? (
            <p className="text-xs text-gray-500">No saved requests</p>
          ) : (
            <div className="space-y-2">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
                  onClick={() => loadRequest(req)}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${methodColors[req.method]}`}
                  ></span>
                  <span className="text-sm flex-1 truncate">{req.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRequest(req.id);
                    }}
                    className="cursor-pointer opacity-0 group-hover:opacity-100 hover:text-red-400 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 🔹 Top Mode Selector */}
        <div className="border-b border-gray-800 bg-gray-900/60 px-4 py-3 flex items-center justify-between">
          <div className="flex gap-2">
            {['REST', 'WEBSOCKET', 'GRAPHQL'].map((mode) => (
              <button
                key={mode}
                onClick={() => setApiMode(mode)}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition ${apiMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Request Bar */}
        <div className="border-b border-gray-800 bg-gray-900/30 p-4 space-y-2">
          <input
            type="text"
            value={currentRequest.name}
            onChange={(e) =>
              setCurrentRequest({ ...currentRequest, name: e.target.value })
            }
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
            placeholder="Request Name"
          />

          <div className="flex flex-col lg:flex-row gap-2">
            {apiMode === 'REST' && (
              <select
                value={currentRequest.method}
                onChange={(e) =>
                  setCurrentRequest({ ...currentRequest, method: e.target.value })
                }
                className={`px-4 py-2 rounded-lg font-bold text-white border-0 outline-none cursor-pointer text-sm ${methodColors[currentRequest.method]}`}
              >
                {['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            )}

            <input
              type="text"
              value={currentRequest.url}
              onChange={(e) =>
                setCurrentRequest({ ...currentRequest, url: e.target.value })
              }
              placeholder={
                apiMode === 'WEBSOCKET'
                  ? 'wss://socket.server.com'
                  : apiMode === 'GRAPHQL'
                    ? 'https://api.example.com/graphql'
                    : 'https://api.example.com'
              }
              className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
            />

            <button
              onClick={sendRequest}
              disabled={loading}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition"
            >
              <Send size={16} />
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* WebSocket UI */}
          {apiMode === 'WEBSOCKET' ? (
            <div className="flex flex-col h-full p-4">
              <div className="flex-1 bg-gray-800/40 rounded-lg p-3 overflow-y-auto border border-gray-700 mb-3 text-sm font-mono">
                {wsMessages.length === 0 ? (
                  <p className="text-gray-500 text-center">No messages yet...</p>
                ) : (
                  wsMessages.map((msg, i) => (
                    <div key={i} className="mb-1">
                      {msg}
                    </div>
                  ))
                )}
              </div>
              {wsConnection && (
                <div className="flex gap-2">
                  <input
                    value={wsInput}
                    onChange={(e) => setWsInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
                  />
                  <button
                    onClick={sendWsMessage}
                    className="cursor-pointer bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* REST & GraphQL */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-800 flex gap-0 bg-gray-900/20 px-4 overflow-x-auto">
                  {['body', 'headers'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab
                          ? 'border-blue-500 text-blue-400'
                          : 'border-transparent text-gray-400'
                        }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-4 overflow-auto">
                  {activeTab === 'body' ? (
                    <textarea
                      value={currentRequest.body}
                      onChange={(e) =>
                        setCurrentRequest({
                          ...currentRequest,
                          body: e.target.value,
                        })
                      }
                      placeholder={
                        apiMode === 'GRAPHQL'
                          ? '{"query": "{ users { id name } }"}'
                          : '{"key": "value"}'
                      }
                      className="w-full h-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 font-mono text-sm resize-none focus:border-blue-500 outline-none"
                    />
                  ) : (
                    <div className="space-y-3">
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          value={headerInput}
                          onChange={(e) => setHeaderInput(e.target.value)}
                          placeholder="Key: Value"
                          className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
                        />
                        <button
                          onClick={addHeader}
                          className="cursor-pointerbg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {Object.entries(currentRequest.headers).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between bg-gray-800/30 p-3 rounded-lg border border-gray-700 gap-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-mono text-blue-400 truncate">{key}</p>
                              <p className="text-xs text-gray-400 truncate">{value}</p>
                            </div>
                            <button
                              onClick={() => removeHeader(key)}
                              className=" cursor-pointer text-red-400 hover:text-red-300 transition flex-shrink-0"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Response */}
              <div className="border-t border-gray-800 p-4 overflow-auto h-100">
                {response ? (
                  <div className="bg-gray-800/40 border border-gray-700 rounded-lg p-4 font-mono text-xs">
                    <div className="flex justify-between mb-3">
                      <div
                        className={`px-3 py-1 rounded-lg text-sm font-bold ${response.ok
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                          }`}
                      >

                        {response.status} {response.statusText}
                      </div>
                      <div className="text-gray-400 text-sm">
                        ⏱ {response.duration}ms
                      </div>
                    </div>

                    <div className="mb-2 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-300">Response</h3>
                      <button
                        onClick={copyResponse}
                        className="cursor-pointer flex items-center gap-1 text-gray-400 hover:text-blue-400 text-sm transition"
                      >
                        <Copy size={14} />
                        Copy
                      </button>
                    </div>

                    <pre className="bg-black/40 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap text-gray-300 text-xs max-h-96">
                      {typeof response.data === 'object'
                        ? JSON.stringify(response.data, null, 2)
                        : response.data}
                    </pre>

                    <div className="mt-4 border-t border-gray-700 pt-3">
                      <h3 className="font-semibold text-gray-300 mb-2">Headers</h3>
                      <pre className="bg-black/40 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap text-gray-400 text-xs">
                        {JSON.stringify(response.headers, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500 text-sm py-10">
                    <AlertCircle size={40} className="mb-2 text-gray-600" />
                    <p>No response yet. Send a request to see results.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Save Request Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl border border-gray-700 w-96 p-6">
            <h2 className="text-lg font-semibold mb-4">Save Request</h2>
            <input
              type="text"
              value={requestName}
              onChange={(e) => setRequestName(e.target.value)}
              placeholder="Request name"
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 mb-4 text-sm focus:border-blue-500 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSaveModal(false)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={saveRequest}
                className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
