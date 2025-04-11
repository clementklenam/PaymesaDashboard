
import { Rocket } from "lucide-react";

export const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg border border-primary/10 p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Streamline Your Payments
          </h2>
          <p className="text-gray-600 max-w-xl">
            Transform your business with our modern payment platform. Accept payments, manage subscriptions, and track revenue all in one place.
          </p>
        </div>
        
        <div className="flex-shrink-0 relative">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <Rocket className="h-16 w-16 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/30 animate-bounce" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-primary/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
