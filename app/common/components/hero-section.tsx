interface HeroSectionProps {
  title: string;
  subtitle?: string;
  className?: string;
  backgroundClassName?: string;
}

export function HeroSection({ 
  title, 
  subtitle, 
  className = "", 
  backgroundClassName = "bg-gradient-to-t from-background to-primary/10" 
}: HeroSectionProps) {
  return (
    <div className={`flex flex-col justify-center items-center py-20 rounded-md ${backgroundClassName} ${className}`}>
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-2xl font-light text-foreground">
        {subtitle}
      </p>
    </div>
  );
}
