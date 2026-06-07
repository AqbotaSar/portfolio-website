import { getTranslations } from 'next-intl/server';
import SkillBar from '@/components/about/SkillBar';
import Timeline from '@/components/about/Timeline';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title') };
}

const skills = [
  { name: 'Python', level: 90 },
  { name: 'OpenAI API / GPT-4', level: 85 },
  { name: 'n8n Automation', level: 80 },
  { name: 'Next.js', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'Telegram Bot API', level: 90 },
  { name: 'FastAPI', level: 75 },
  { name: 'Docker / Railway', level: 70 },
  { name: 'PostgreSQL', level: 70 },
  { name: 'Tailwind CSS', level: 85 },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-16">
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          АБ
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold">Ақбота</h1>
          <p className="text-xl text-blue-500 mt-1">AI Автоматизатор &amp; Веб-дамытушы</p>
          <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
        </div>
      </div>

      {/* Bio + Skills (2 columns) */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Bio */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Мен туралы</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Мен Ақботамын — AI автоматизация мен веб-дамыту саласындағы фрилансермін.
            </p>
            <p>
              Бизнес процестерін автоматизациялауға маманданамын: WhatsApp, Telegram,
              Instagram чатботтары, n8n workflow-дар, AI-негізіндегі веб-сайттар.
            </p>
            <p>
              Менің мақсатым — клиенттердің уақытын үнемдеп, табысын арттыру.
              10-дан астам жоба аяқталды, 500+ автоматизацияланған сеанс жасалды.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('skills_title')}</h2>
          {skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-2xl font-semibold mb-8">{t('experience_title')}</h2>
        <Timeline />
      </div>
    </div>
  );
}
