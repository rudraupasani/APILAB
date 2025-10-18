import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function APIsPage() {
  const [activeTab, setActiveTab] = useState("REST");

  const apiData = {
    REST: [
      {
        name: "JSONPlaceholder",
        description: "Fake online REST API for testing",
        url: "https://jsonplaceholder.typicode.com/posts/1",
        sample: { userId: 1, id: 1, title: "Test Post", body: "This is a test post" }
      },
      { name: "Dog CEO", description: "Random dog images", url: "https://dog.ceo/api/breeds/image/random", sample: { message: "https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg", status: "success" } },
      { name: "Advice Slip", description: "Random advice generator", url: "https://api.adviceslip.com/advice", sample: { slip: { id: 1, advice: "Always wear sunscreen." } } },
      { name: "OpenWeatherMap", description: "Weather info (requires free API key)", url: "https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY", sample: { coord: { lon: -0.13, lat: 51.51 }, weather: [{ main: "Drizzle" }], main: { temp: 280.32 } } },
      { name: "Bored API", description: "Get a random activity", url: "https://www.boredapi.com/api/activity", sample: { activity: "Go for a walk", type: "recreational" } },
      { name: "Cat Facts", description: "Random cat facts", url: "https://catfact.ninja/fact", sample: { fact: "Cats have five toes on their front paws" } },
      { name: "Public APIs List", description: "Fetch free public APIs", url: "https://api.publicapis.org/entries", sample: { count: 1425, entries: [] } },
      { name: "Joke API", description: "Random programming jokes", url: "https://v2.jokeapi.dev/joke/Programming?type=single", sample: { joke: "Why do Java developers wear glasses? Because they don't see sharp." } },
      { name: "CoinGecko", description: "Crypto prices", url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", sample: { bitcoin: { usd: 64321 } } },
      { name: "Numbers API", description: "Facts about numbers", url: "http://numbersapi.com/42", sample: "42 is the answer to life, the universe and everything." }
    ],

    GraphQL: [
      { name: "Countries", url: "https://countries.trevorblades.com/", query: `{ countries { code name capital } }`, sample: { data: { countries: [{ code: "IN", name: "India" }, { code: "US", name: "United States" }] } } },
      { name: "SpaceX", url: "https://api.spacex.land/graphql/", query: `{ launchesPast(limit: 2) { mission_name rocket { rocket_name } } }`, sample: { data: { launchesPast: [{ mission_name: "Starlink-15", rocket: { rocket_name: "Falcon 9" } }] } } },
      { name: "Rick and Morty", url: "https://rickandmortyapi.com/graphql", query: `{ characters(page:1){ results { name status species } } }`, sample: { data: { characters: { results: [{ name: "Rick Sanchez" }] } } } },
      { name: "Pokemon GraphQL", url: "https://graphql-pokemon2.vercel.app/", query: `{ pokemon(name:"Pikachu"){ id name attacks { special { name damage } } } }`, sample: { data: { pokemon: { name: "Pikachu", attacks: { special: [{ name: "Thunderbolt", damage: 90 }] } } } } },
      { name: "Countries Info", url: "https://countries.trevorblades.com/", query: `{ continent(code:"AS"){ countries{ name code } } }`, sample: { data: { continent: { countries: [{ name: "India", code: "IN" }, { name: "China", code: "CN" }] } } } },
      { name: "GitHub GraphQL", url: "https://api.github.com/graphql", query: `{ viewer { login name } }`, sample: { data: { viewer: { login: "octocat", name: "The Octocat" } } } },
      { name: "Star Wars GraphQL", url: "https://swapi-graphql.netlify.app/.netlify/functions/index", query: `{ allFilms { films { title releaseDate } } }`, sample: { data: { allFilms: { films: [{ title: "A New Hope" }] } } } },
      { name: "Countries Languages", url: "https://countries.trevorblades.com/", query: `{ languages { code name } }`, sample: { data: { languages: [{ code: "EN", name: "English" }] } } },
      { name: "Rick & Morty Episodes", url: "https://rickandmortyapi.com/graphql", query: `{ episodes { results { name air_date } } }`, sample: { data: { episodes: { results: [{ name: "Pilot" }] } } } },
      { name: "PokeAPI GraphQL", url: "https://graphql-pokemon2.vercel.app/", query: `{ pokemons(first:5){ id name } }`, sample: { data: { pokemons: [{ name: "Bulbasaur" }] } } }
    ],

    WebSocket: [
      { name: "Echo WS", url: "wss://echo.websocket.events", description: "Echo your messages", sample: "Send 'Hi' → Receive 'Hi'" },
      { name: "CoinCap Prices", url: "wss://ws.coincap.io/prices?assets=bitcoin,ethereum", description: "Live crypto prices", sample: '{"bitcoin":"64321"}' },
      { name: "Bitstamp Ticker", url: "wss://ws.bitstamp.net", description: "BTC/USD trades", sample: '{"event":"trade","data":{"amount":0.5,"price":"50000"}}' },
      { name: "Binance Trades", url: "wss://stream.binance.com:9443/ws/btcusdt@trade", description: "BTC/USDT trades", sample: '{"p":"50000","q":"0.1"}' },
      { name: "Fake Chat WS", url: "wss://fake-chat-api.websocket.test", description: "Test chat WS", sample: "Send 'Hello' → Receive 'Hello'" },
      { name: "Stock WS", url: "wss://ws.finnhub.io?token=YOUR_API_KEY", description: "Real-time stock quotes", sample: '{"data":[{"s":"AAPL","p":175.5}]}' },
      { name: "Weather WS", url: "wss://weather.websocket.test", description: "Real-time weather updates", sample: '{"city":"London","temp":15}' },
      { name: "Crypto WS", url: "wss://crypto.websocket.test", description: "Demo crypto updates", sample: '{"BTC":64321}' },
      { name: "Chatroom WS", url: "wss://chatroom.websocket.test", description: "Demo chat room", sample: "Send 'Hey' → Receive 'Hey'" },
      { name: "Sports WS", url: "wss://sports.websocket.test", description: "Live sports scores", sample: '{"team":"TeamA","score":2}' }
    ]
  };

  return (
    <div className=" min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      <Navbar />
      <div className="mb-8 pt-20 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Free Public APIs</h1>
        <p className="text-gray-400 text-sm sm:text-base mt-2">Explore and test popular APIs across different protocols</p>
      </div>

      <div className="flex gap-2 sm:gap-3 mb-8 flex-wrap">
        {["REST", "GraphQL", "WebSocket"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {apiData[activeTab].map((api, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-gray-900 border border-gray-700 rounded-lg p-4 md:p-5 hover:border-blue-600 transition-colors h-full flex flex-col"
              >
                <h2 className="text-lg md:text-xl font-bold mb-2 text-white">{api.name}</h2>
                {api.description && <p className="text-gray-400 text-sm mb-3">{api.description}</p>}
                <p className="text-blue-400 text-xs sm:text-sm mb-3 break-all font-mono bg-gray-800 p-2 rounded">{api.url}</p>
                {api.query && (
                  <div className="mb-3">
                    <p className="text-gray-400 text-xs font-semibold mb-1">Query:</p>
                    <pre className="bg-gray-800 p-2 rounded text-xs overflow-auto max-h-20">{api.query}</pre>
                  </div>
                )}
                <div className="mt-auto">
                  <p className="text-gray-400 text-xs font-semibold mb-2">Sample Output:</p>
                  <pre className="bg-gray-800 p-2 rounded text-xs overflow-auto max-h-32 text-gray-300">
                    {typeof api.sample === "string" ? api.sample : JSON.stringify(api.sample, null, 2)}
                  </pre>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
