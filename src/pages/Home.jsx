// import peta from '../assets/Peta.svg'
import { useNavigate } from "react-router-dom";
import peta2 from "../assets/PetaNigga.svg";
import logo from "../assets/YukirNgab.svg";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/lihat_parkir");
  };

  return (
    <div className="bg-gray-500 h-screen w-screen flex p-16">
      <div className="flex flex-col items-center justify-start w-full gap-8">
        <img src={logo} alt="YukirNgab" />
        <img src={peta2} alt="peta" />
        <button onClick={handleClick} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Lihat Parkir
        </button>
      </div>
    </div>
  );
};

export default Home;
