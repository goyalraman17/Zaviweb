import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Zavi on AppSumo',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function AppSumoDealPage() {
  const dealURL = process.env.APPSUMO_DEAL_URL;
  redirect(dealURL || '/pricing');
}
