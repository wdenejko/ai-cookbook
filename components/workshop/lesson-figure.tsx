import Image from 'next/image';

interface LessonFigureProps {
  src: string;
  alt: string;
  caption: string;
}

export function LessonFigure({ src, alt, caption }: LessonFigureProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-md border border-divider bg-surface">
      <Image
        src={src}
        alt={alt}
        width={1536}
        height={1024}
        sizes="(max-width: 768px) 100vw, 768px"
        className="h-auto w-full"
      />
      <figcaption className="border-t border-divider px-4 py-3 text-sm text-fd-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}
