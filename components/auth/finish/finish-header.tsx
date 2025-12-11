interface FinishHeaderProps {
  username: string;
}
export default function finishHeader({ username }: FinishHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold uppercase text-accent">Finish</p>
      <h1 className="font-semibold text-4xl">All set, {username}.</h1>
      <p className="text-muted-foreground text-lg">
        Your dashboard is ready. We've added some <br/> sample data to help you get started.
      </p>
    </div>
  );
}
