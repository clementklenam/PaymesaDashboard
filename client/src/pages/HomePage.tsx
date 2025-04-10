import { Dashboard } from "@/components/dashboard/Dashboard";
import Head from '@/components/Head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Paymesa - Dashboard</title>
        <meta name="description" content="Paymesa payment service provider dashboard" />
      </Head>
      <Dashboard />
    </>
  );
}

// Head component for adding meta tags
function Head({ children }: { children: React.ReactNode }) {
  if (typeof document !== 'undefined') {
    // Get the head element
    const head = document.head;
    
    // Find all title and meta tags
    const existingTitles = head.querySelectorAll('title');
    const existingMetas = head.querySelectorAll('meta[name], meta[property]');
    
    // Remove existing title and meta tags
    existingTitles.forEach(title => title.remove());
    existingMetas.forEach(meta => meta.remove());
  }
  
  return <>{children}</>;
}
