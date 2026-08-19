import React, { useEffect, useState } from 'react';

// Extend the Window interface to recognize both Paddle and Paystack SDKs
declare global {
  interface Window {
    Paddle?: any;
    PaystackPop?: any;
  }
}

const Pricing: React.FC = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    // 1. Initialize Paddle Billing v2
    if (window.Paddle) {
      window.Paddle.Environment.set('production');
      window.Paddle.Initialize({
        token: "live_722a5747933737e59bb2a41425e", 
        eventCallback: (event: any) => {
          if (event.name === 'checkout.completed') {
            console.log("Paddle payment successful!", event);
            const transactionId = event.data?.transaction_id || event.data?.id || "";
            if (transactionId) {
              window.location.href = `https://api.caption.stackbuildco.com/thank-you?transaction_id=${transactionId}`;
            } else {
              alert("Payment successful! Please check your email for your activation license key.");
            }
          }
        }
      });
    }

    // 2. Dynamically Load Paystack Inline Script
    const paystackScript = document.createElement('script');
    paystackScript.src = "https://js.paystack.co/v1/inline.js";
    paystackScript.async = true;
    document.body.appendChild(paystackScript);

    return () => {
      if (document.body.contains(paystackScript)) {
        document.body.removeChild(paystackScript);
      }
    };
  }, []);

  // --- PAYSTACK CHECKOUT HANDLER (Monthly Alternative) ---
  const handlePaystackCheckout = () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    if (!window.PaystackPop) {
      alert("Paystack SDK failed to load. Please check your connection.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: 'pk_live_cfefbefad18f3c6235cad6abcbaad29d3d59cb7d',
      email: email,
      plan: 'PLN_vdcec0ugufb4lpk',
      ref: 'CLP_' + Math.floor((Math.random() * 1000000000) + 1).toString(),
      callback: function(response: any) {
        console.log("Paystack payment successful!", response);
        window.location.href = `https://api.caption.stackbuildco.com/thank-you?reference=${response.reference}`;
      },
      onClose: function() {
        console.log("Paystack window closed.");
      }
    });

    handler.openIframe();
  };

  // --- PADDLE CHECKOUT HANDLER (Primary Global) ---
  const handleOpenPaddleCheckout = (priceId: string) => {
    if (!window.Paddle) {
      alert("Paddle SDK failed to load. Please check your network connection and try again.");
      return;
    }

    window.Paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customer: email ? { email: email } : undefined,
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        locale: 'en'
      }
    });
  };

  return (
    <div className="pricing-container" style={{ padding: '40px 20px', backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ color: '#22c55e', marginBottom: '10px' }}>Upgrade to Premium</h1>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Unlock the full potential of Live Caption Player.</p>

      {/* Global Email Input required for Paystack & prefilled for Paddle */}
      <div style={{ marginBottom: '40px' }}>
        <input 
          type="email" 
          placeholder="Enter your email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '12px 16px',
            width: '100%',
            maxWidth: '340px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#f1f5f9',
            fontSize: '16px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>
        
        {/* Monthly Plan Card (Paddle Primary + Paystack Secondary) */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3>Monthly Plan</h3>
            <h2 style={{ margin: '16px 0' }}>$1.00<span style={{ fontSize: '16px', color: '#94a3b8' }}>/mo</span></h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Billed monthly. Cancel anytime.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Primary: Paddle Monthly */}
            <button 
              onClick={() => handleOpenPaddleCheckout('pri_YOUR_PADDLE_MONTHLY_PRICE_ID')} // Replace with your Paddle Monthly Price ID
              style={{ backgroundColor: '#ffffff', color: '#0f172a', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
            >
              Subscribe via Paddle
            </button>

            {/* Secondary: Paystack Monthly */}
            <button 
              onClick={handlePaystackCheckout}
              style={{ backgroundColor: '#0ea5e9', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
            >
              Subscribe via Paystack
            </button>
          </div>
        </div>

        {/* Lifetime Plan Card (Paddle) */}
        <div style={{ backgroundColor: '#1e293b', border: '2px solid #22c55e', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '320px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: '#0f172a', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
            BEST VALUE
          </div>

          <div>
            <h3>Lifetime License</h3>
            <h2 style={{ margin: '16px 0' }}>$19.00<span style={{ fontSize: '16px', color: '#94a3b8' }}>/once</span></h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Pay once via Paddle, own it forever.</p>
          </div>

          <button 
            onClick={() => handleOpenPaddleCheckout('pri_01kzk5qvnzdnt7grkjwg35vzpn')}
            style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
          >
            Buy Lifetime (Paddle)
          </button>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
