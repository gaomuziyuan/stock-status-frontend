import Header from "@/components/header/Header";

export default function SeniorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between w-full">
      <Header />
      {children}
    </div>
  );
}
