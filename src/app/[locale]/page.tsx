import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('hero');
  return (
    <main>
      <h1>{t('greeting')} {t('name')}</h1>
      <p>{t('title')}</p>
    </main>
  );
}
