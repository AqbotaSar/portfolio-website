import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title') };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {locale === 'kk' ? 'Байланыс' : locale === 'ru' ? 'Контакты' : 'Get in Touch'}
          </h2>

          <a
            href="https://t.me/akbota_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-4 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
            <span>@akbota_dev</span>
          </a>

          <a
            href="https://wa.me/77001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 mb-4 hover:text-green-500 transition-colors"
          >
            <Phone className="w-5 h-5 flex-shrink-0" />
            <span>+7 700 123 45 67</span>
          </a>

          <a
            href="mailto:aqaqbotaq@gmail.com"
            className="flex items-center gap-3 mb-4 hover:text-blue-500 transition-colors"
          >
            <Mail className="w-5 h-5 flex-shrink-0" />
            <span>aqaqbotaq@gmail.com</span>
          </a>

          <p className="text-sm text-muted-foreground mt-6">
            ⚡{' '}
            {locale === 'kk'
              ? 'Жауап беру уақыты: 1-2 сағат ішінде'
              : locale === 'ru'
                ? 'Время ответа: в течение 1-2 часов'
                : 'Response time: within 1-2 hours'}
          </p>
        </div>

        {/* Contact form */}
        <div>
          <ContactForm
            labels={{
              name: t('name_label'),
              email: t('email_label'),
              message: t('message_label'),
              send: t('send_button'),
              success: t('success'),
              error: t('error'),
            }}
          />
        </div>
      </div>
    </div>
  );
}
