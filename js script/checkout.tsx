import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function Checkout() {
  const handleActivateFullSystem = () => {
    // Google Analytics Event (if available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'payment_button_clicked', {
        event_category: 'Sales',
        event_label: 'Instamojo Checkout'
      });
    }
    
    // Redirect to Instamojo
    window.location.href = 'https://imjo.in/rHCt6C';
  };

  const features = [
    'Unlimited Data Registers (No caps)',
    'Persistent Local Vault (Wipe-proof)',
    'Live Cloud Gemini AI Coach (Unlocked chat)',
    'Advanced JSON/CSV Export Engine'
  ];

  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen flex items-center justify-center p-4">
      {/* Premium Conversion Overlay */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center space-y-6 shadow-2xl relative">
        {/* Logo Badge */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-xl text-slate-950 shadow-lg shadow-emerald-500/20">
          F
        </div>

        {/* Header */}
        <div className="pt-2">
          <h1 className="text-2xl font-black text-white tracking-tight">
            Unlock the Full Financial Operating System
          </h1>
          <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest mt-1">
            Premium Core Access Node
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">
          Evaluation sandbox ends here. Upgrade to full version software setup to remove all data restrictions.
        </p>

        {/* Value Proposition */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left space-y-2.5 text-xs text-slate-300">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <Check className="w-1.5 h-1.5 text-emerald-400 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-slate-950/40 border border-slate-800/80 p-4 rounded-xl">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
            Special Offer Pricing
          </p>
          <p className="text-3xl font-black text-white mt-1">
            ₹99 <span className="text-xs text-slate-400 font-medium">/ lifetime access</span>
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleActivateFullSystem}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-600/20 uppercase tracking-wider"
        >
          Activate Full System
        </Button>

        {/* Footer */}
        <p className="text-[10px] text-slate-500">
          Secured transaction engine processed by Instamojo pipelines.
        </p>
      </div>
    </div>
  );
}
