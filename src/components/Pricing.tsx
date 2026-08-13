import React, { useEffect } from 'react';

// Extend the Window interface to recognize the Paddle SDK
declare global {
  interface Window {
    Paddle?: any;
  }
}

const Pricing: React.FC = () => {
  
  // Optional: Ensure Paddle environment is configured if not already done in index.html
  useEffect(() => {
    if (window.Paddle) {
      // Replace with your actual Paddle environment (sandbox or production) and Vendor/Client ID
      window.Paddle.Environment.set('production'); 
      window.Paddle.Setup({ 
        vendor: Number(process.env.REACT_APP_PADDLE_VENDOR_ID) || 0 
      });
    }
  }, []);

  const handleOpenPaddleCheckout = (priceId: string) => {
    if (!window.Paddle) {
      alert("Paddle SDK failed to load. Please check your network connection and try again.");
      return;
    }

    window.Paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        locale: 'en'
      },
      // The Success Callback triggers immediately after the user completes payment
      successCallback: (data: any) => {
        console.log("Paddle payment successful!", data);
        
        // Extract the transaction ID provided by Paddle
        const transactionId = data.transactionId || data.id || "";
        
        if (transactionId) {
          // Redirect to the Render backend thank-you page to display the license key
          window.location.href = `https://caption-player-backend.onrender.com/thank-you?transaction_id=${transactionId}`;
        } else {
          // Fallback if transaction ID is missing from the payload
          alert("Payment successful! Please check your email for your activation license key.");
        }
      }
    });
  };

  return (
    <div className="pricing-container" style={{ padding: '40px', backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ color: '#22c55e', marginBottom: '10px' }}>Upgrade to Premium</h1>
      <p style={{ color: '#94a3b8', marginBottom: '40px' }}>Unlock the full potential of Live Caption Player.</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Monthly Plan Card */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', width: '300px' }}>
          <h3>Monthly Plan</h3>
          <h2 style={{ margin: '16px 0' }}>$4.99<span style={{ fontSize: '16px', color: '#94a3b8' }}>/mo</span></h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Billed monthly. Cancel anytime.</p>
          <button 
            onClick={() => handleOpenPaddleCheckout('pri_01kwfsfg8m7zf71yznd9c8t0ra')}
            style={{ backgroundColor: '#3b82f6', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
          >
            Subscribe Monthly
          </button>
        </div>

        {/* Lifetime Plan Card */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #22c55e', borderRadius: '16px', padding: '32px', width: '300px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: '#0f172a', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
            BEST VALUE
          </div>
          <h3>Lifetime License</h3>
          <h2 style={{ margin: '16px 0' }}>$49.99<span style={{ fontSize: '16px', color: '#94a3b8' }}>/once</span></h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Pay once, own it forever.</p>
          <button 
            onClick={() => handleOpenPaddleCheckout('pri_01kzk5qvnzdnt7grkjwg35vzpn')}
            style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
          >
            Buy Lifetime
          </button>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
