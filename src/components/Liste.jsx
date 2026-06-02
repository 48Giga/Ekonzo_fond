import { ArrowUpDownIcon } from "lucide-react";
import { Link } from "react-router-dom";


function Liste({titre, children}) {
  
  return (
    <div>
      <button
        className=""
        onClick={() => document.getElementById("modal_liste").showModal()}
      >
        {titre}
      </button>

      
      <dialog id="modal_liste" className="modal">
        <div className="modal-box w-100 bg-green-50 max-h-8/12">
          
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Liste;
