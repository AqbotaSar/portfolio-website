import { getTranslations } from 'next-intl/server';

interface TechStackProps {
  locale: string;
}

const TECHNOLOGIES = [
  'Python',
  'Next.js',
  'TypeScript',
  'OpenAI API',
  'n8n',
  'Telegram Bot API',
  'WhatsApp API',
  'FastAPI',
  'Tailwind CSS',
  'PostgreSQL',
  'Redis',
  'Docker',
];

export default async function TechStack({ locale }: TechStackProps) {
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold tracking-tight text-center mb-2">
          {t('tech_title')}
        </h2>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          &nbsp;
        </p>

        <div className="flex flex-wrap gap-2 justify-center">
          {TECHNOLOGIES.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm rounded-full border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:border-blue-500/40 hover:bg-blue-500/5 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
