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
      <Hero locale={locale} />
      <FeaturedProjects locale={locale} />
      <LatestPosts locale={locale} />
      <TechStack locale={locale} />
    </>
  );
}
