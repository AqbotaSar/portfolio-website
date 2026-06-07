import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import LatestPosts from '@/components/home/LatestPosts';
import TechStack from '@/components/home/TechStack';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Akbota",
            "url": "https://akbota.dev",
            "email": "aqaqbotaq@gmail.com",
            "jobTitle": "AI Automator & Web Developer",
            "description": "Freelancer specializing in AI chatbots, automation, and web development",
            "sameAs": ["https://t.me/akbota_dev", "https://github.com/akbota-dev"],
          }),
        }}
      />
      <Hero locale={locale} />
      <FeaturedProjects locale={locale} />
      <LatestPosts locale={locale} />
      <TechStack locale={locale} />
    </>
  );
}
