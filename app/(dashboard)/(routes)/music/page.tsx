"use client";
import { useState } from 'react';
import axios from 'axios';

export default function MusicGenerator() {
  const [prompt, setPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMusic = async () => {
    setLoading(true);
    try {
      
      const response = await axios.post('/api/music', { prompt });
      //console.log(response);
      setAudioUrl(response.data.output);
    } catch (error) {
      console.error('Error generating music:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the music you want to generate"
        className="w-full px-3 py-2 border rounded-md"
      />
      <button
        onClick={generateMusic}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {loading ? 'Generating...' : 'Generate Music'}
      </button>
      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl} className="w-full" />
        </div>
      )}
    </div>
  );
}