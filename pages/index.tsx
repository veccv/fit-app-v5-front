import Navbar from "@/components/ui/Navbar";
import MainContent from "@/components/ui/MainContent";
import { useFitContext } from "@/context/FitContext";
import LoginPanel from "@/components/LoginPanel";

export default function Home() {
  const { actualTab } = useFitContext();

  if (actualTab === "login") return <LoginPanel />;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-full w-full pt-32 items-center px-10 lg:px-56 xl:px-96">
        <MainContent />
      </div>
    </div>
  );
}
