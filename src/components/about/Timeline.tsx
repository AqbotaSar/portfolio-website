interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

const timelineItems: TimelineItem[] = [
  { year: '2022', title: 'Бағдарламалауды үйрену', description: 'Python және веб-технологияларды өз бетінше меңгеру', icon: '📚' },
  { year: '2023', title: 'Алғашқы фрилансерлік жоба', description: 'Telegram ботын жасау және бірінші клиентті табу', icon: '🚀' },
  { year: '2023', title: 'AI автоматизация', description: 'ChatGPT API және n8n арқылы автоматизация жобаларын бастау', icon: '🤖' },
  { year: '2024', title: 'Full-stack даму', description: 'Next.js, TypeScript және веб-қосымшалар жасауды меңгеру', icon: '💻' },
  { year: '2024', title: '10+ жоба аяқталды', description: 'Клиенттер үшін чатботтар, сайттар және AI құралдар жасалды', icon: '✅' },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

      <ol className="space-y-8">
        {timelineItems.map((item, index) => (
          <li key={index} className="relative flex gap-6 pl-16">
            {/* Circle on the line */}
            <div
              className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border bg-background text-lg"
              aria-hidden="true"
            >
              {item.icon ?? '•'}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                  {item.year}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
