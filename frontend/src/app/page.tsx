'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateNames = async () => {
    setLoading(true);
    setResults([]);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/brand/generate`,
        { industry, tone }
      );
      setResults(res.data.ideas);
    } catch (error) {
      console.error(error);
      alert('Failed to generate names. Check backend connection.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Brandomatic AI 🚀</h1>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Enter industry (e.g. coffee, tech)"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="p-3 border rounded"
        />

        <input
          type="text"
          placeholder="Enter tone (e.g. playful, luxury)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="p-3 border rounded"
        />

        <button
          onClick={generateNames}
          disabled={loading || !industry || !tone}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Brand Names'}
        </button>

        {results.length > 0 && (
          <ul className="mt-6 space-y-2 bg-white p-4 rounded shadow">
            {results.map((name, idx) => (
              <li key={idx} className="border-b last:border-none pb-2">
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}