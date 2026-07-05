interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: SectionHeadingProps) {
  return (
    <h2 className={`animate-fade-in font-heading text-4xl font-bold text-text-primary md:text-5xl ${className}`}>
      {children}
      <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-l from-accent to-accent-light" />
    </h2>
  );
}
