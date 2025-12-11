export default function LoginHeader() {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold uppercase text-green-700">Welcome back</p>
      <h1 className="font-semibold text-4xl">Sign in to Lumina.</h1>
      <p className="text-muted-foreground text-lg">
        Enter your credentials to access your personal
        <br /> finance dashboard.
      </p>
    </div>
  );
}
