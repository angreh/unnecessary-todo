type BoxHeaderProps = {
  title: string;
  description: string;
};

export const BoxHeader = ({ title, description }: BoxHeaderProps) => (
  <div className="flex flex-col items-start pt-4 px-10">
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    <p className="text-muted-foreground">{description}</p>
  </div>
);
