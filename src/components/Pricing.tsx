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
      document.body.removeChild(paystackScript);
    };
  }, []);

  // --- PAYSTACK CHECKOUT HANDLER (For Monthly) ---
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
      key: 'pk_live_cfefbefad18f3c6235cad6abcbaad29d3d59cb7d', // <-- REPLACE THIS with your actual Paystack Public Key
      email: email,
      plan: 'PLN_vdcec0ugufb4lpk',     // <-- REPLACE THIS with your Paystack Monthly Plan Code
      // amount: 100000, // Optional: You usually don't need amount if a plan is specified, but if required, it's in kobo/cents
      ref: 'CLP_' + Math.floor((Math.random() * 1000000000) + 1).toString(),
      callback: function(response: any) {
        console.log("Paystack payment successful!", response);
        // Redirect to your custom domain backend with the Paystack reference
        window.location.href = `https://api.caption.stackbuildco.com/thank-you?reference=${response.reference}`;
      },
      onClose: function() {
        console.log("Paystack window closed.");
      }
    });

    handler.openIframe();
  };

  // --- PADDLE CHECKOUT HANDLER (For Lifetime) ---
  const handleOpenPaddleCheckout = (priceId: string) => {
    if (!window.Paddle) {
      alert("Paddle SDK failed to load. Please check your network connection and try again.");
      return;
    }

    window.Paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customer: { email: email }, // Pre-fill email for Paddle if the user already typed it
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        locale: 'en'
      }
    });
  };

  return (
    <div className="pricing-container" style={{ padding: '40px', backgroundColor: '#0f172a', color: '#f1f5f9', minHeight: '100vh', textAlign: 'center' }}>
      <h1 style={{ color: '#22c55e', marginBottom: '10px' }}>Upgrade to Premium</h1>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Unlock the full potential of Live Caption Player.</p>

      {/* Global Email Input required by Paystack */}
      <div style={{ marginBottom: '40px' }}>
        <input 
          type="email" 
          placeholder="Enter your email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '12px 16px',
            width: '300px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#f1f5f9',
            fontSize: '16px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Monthly Plan Card (Paystack) */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', width: '300px' }}>
          <h3>Monthly Plan</h3>
          <h2 style={{ margin: '16px 0' }}>$1.00<span style={{ fontSize: '16px', color: '#94a3b8' }}>/mo</span></h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Billed monthly via Paystack. Cancel anytime.</p>
          <button 
            onClick={handlePaystackCheckout}
            style={{ backgroundColor: '#3b82f6', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}
          >
            Subscribe Monthly
          </button>
        </div>

        {/* Lifetime Plan Card (Paddle) */}
        <div style={{ backgroundColor: '#1e293b', border: '2px solid #22c55e', borderRadius: '16px', padding: '32px', width: '300px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: '#0f172a', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
            BEST VALUE
          </div>
          <h3>Lifetime License</h3>
          <h2 style={{ margin: '16px 0' }}>$19.00<span style={{ fontSize: '16px', color: '#94a3b8' }}>/once</span></h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Pay once via Paddle, own it forever.</p>
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
