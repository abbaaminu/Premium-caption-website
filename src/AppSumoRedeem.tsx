import React, { useState } from 'react';

export default function AppSumoRedeem() {
  const [licenseKey, setLicenseKey] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '', activatedKey: '' });

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '', activatedKey: '' });

    try {
      // Points to your Render backend URL
      const BACKEND_URL = "https://api.caption.stackbuildco.com"; 

      const response = await fetch(`${BACKEND_URL}/api/redeem-appsumo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          license_key: licenseKey.trim(),
          email: email.trim() 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to redeem key.');
      }

      // SUCCESS - Save the key to display it, then clear the inputs
      setMessage({ 
        text: '🎉 Success! Your lifetime license is now active.', 
        type: 'success',
        activatedKey: licenseKey.trim()
      });
      setLicenseKey('');
      setEmail('');
      
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error', activatedKey: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-900 flex justify-center py-6 px-4">
      <div className="max-w-md w-full bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Redeem AppSumo License
        </h2>
        <p className="text-slate-400 text-sm mb-6 text-center">
          Enter your AppSumo code and email to activate your lifetime license.
        </p>

        <form onSubmit={handleRedeem} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              AppSumo Code
            </label>
            <input
              type="text"
              required
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              placeholder="APPSUMO-XXXX-XXXX"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Account Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Activating...' : 'Activate License'}
          </button>
        </form>

        {/* Dynamic Success / Error Message Box */}
        {message.text && (
          <div className={`mt-6 p-5 rounded-lg text-center border ${
            message.type === 'success' 
              ? 'bg-green-900/30 border-green-700' 
              : 'bg-red-900/40 border-red-800'
          }`}>
            <p className={`font-semibold mb-2 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message.text}
            </p>
            
            {message.type === 'success' && (
              <div className="mt-4">
                <p className="text-slate-300 text-sm mb-2">Your Activated Key:</p>
                <code className="block bg-slate-950 px-3 py-2 rounded text-blue-400 font-mono text-lg border border-slate-700 mb-4 select-all">
                  {message.activatedKey}
                </code>
                <a
                  href={`captionplayer://activate?key=${message.activatedKey}`}
                  className="inline-block w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition"
                >
                  Open App to Activate
                </a>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
