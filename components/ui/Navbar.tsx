import { useFitContext } from "@/context/FitContext";

const Navbar = () => {
  const { setActualTab } = useFitContext();

  return (
    <div className="h-20 border flex w-full justify-between items-center px-5 fixed bg-white">
      <p>Logo</p>
      <button
        className="hover:bg-gray-400 h-10 w-32 rounded transition-colors duration-500 ease-in-out border"
        onClick={() => setActualTab("login")}
      >
        Zaloguj się
      </button>
    </div>
  );
};

export default Navbar;
