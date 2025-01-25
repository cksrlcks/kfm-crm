export function SubHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <header className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">{desc}</p>
    </header>
  );
}
