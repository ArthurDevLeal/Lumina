export default function UserHeader() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold uppercase text-accent">Welcome</p>
      <h1 className="font-semibold text-4xl">
        Let's get your finances <br /> in order.
      </h1>
      <p className="text-muted-foreground text-lg">
        Start your journey towards financial freedom <br /> with a silent, simple tool.
      </p>
    </div>
  );
}
