type BoxHeaderProps = {
  title: string;
  description: string;
};

export const BoxHeader = ({ title, description }: BoxHeaderProps) => (
  <div className="flex flex-col items-start pt-4 px-10" data-testid="box-header-div">
    <h2 className="text-2xl font-bold tracking-tight" data-testid="box-header-title">{title}</h2>
    <p className="text-muted-foreground" data-testid="box-header-description">{description}</p>
  </div>
);
