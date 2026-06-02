import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Bouttons from "../components/Bouttons";
import Navigation from "../components/Navigation";
import Utilisateur from "../components/Utilisateur";
import { useEffect, useState } from "react";
import { getNbrDepot, getNbrRetrait } from "../service";
import ClientForm from "../components/ClientForm";
import { X, Grip, Eye  } from "lucide-react";
import ClientRecent from "../components/ClientRecent";


function Home() {

  const [nombreRetrait, setNombreRetrait] = useState([])
  const [nombreDepot, setNombreDepot] = useState([])

  const nbr_transaction = Number(nombreDepot || 0) + Number(nombreRetrait || 0)

  useEffect(() => {
    getNbrDepot().then(setNombreDepot);
    getNbrRetrait().then(setNombreRetrait);
  }, [])

  return (
    <Navigation
      titre={
        <Link to={"/"} className="flex gap-2 text-neutral-content items-center px-2">
          <span className="w-10">
            <img src="favicons.png" />
          </span>
          <span className="text-2xl text-primary-content font-bold max-sm:text-xl">Ekonzo finance</span>
        </Link>
      }
      winget={
        <div className="flex gap-4 items-center px-2 max-sm:px-6">
          <div className="flex gap-4">
            <span className="text-white">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="synthwave"
                />

                {/* sun icon */}
                <svg
                  className="swap-off size-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on size-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" />
                </svg>
              </label>
            </span>
            <span className="text-white">
              <label className="swap">
                <div className=" indicator">
                  <span className="badge bg-primary-content badge-sm indicator-item font-semibold">
                    {nbr_transaction}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </label>
            </span>


          </div>
          <Utilisateur />
        </div>
      }
    >
      <Hero />
      <Bouttons />
      

      <div className="fab fab-flower fixed right-2 lg:right-[30%] bottom-40 print:hidden">
        
        <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-primary">
          <Grip />
        </div>
        <button className="fab-main-action btn btn-circle btn-lg">
          <X /> 
        </button>

        <ClientForm />
      </div>

    </Navigation>

  );
}

export default Home;
