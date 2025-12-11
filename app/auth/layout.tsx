export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[100px] " />
      {children}
    </div>
  );
}
