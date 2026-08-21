import { Suspense } from 'react';
import AppSumoActivation from './AppSumoActivation';

export const metadata = {
  title: 'Activate your AppSumo license',
  robots: { index: false, follow: false },
};

export default function AppSumoActivationPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-50" />}>
      <AppSumoActivation />
    </Suspense>
  );
}
