import { User } from 'lucide-react';
import React, {useRef, useState} from 'react';
import { singUp } from '../service';
import confetti from 'canvas-confetti';

const UserForm = () => {

    const inputs = useRef([])
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const clearInputs = () => {
        inputs.current.forEach(input => input.value = '')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('')

        if ((inputs.current[0].value.length || inputs.current[1].value.length || inputs.current[2].value.length || inputs.current[3].value.length) < 6) {
            setError('Les champs doivent contenir au moins 6 caractères')
        }else if (inputs.current[3].value !== inputs.current[4].value) {
            setError('Les mots de passe ne correspondent pas')
        };

        try {          

            const response = await singUp({
                name: inputs.current[0].value,
                role: inputs.current[1].value,
                email: inputs.current[2].value,
                password: inputs.current[3].value
            })
                if (response?.success) {
                    setSuccess(response?.message)
                }
                confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        zIndex: 9999
                    });

            clearInputs()

        } catch (error) {
            setError(`Une erreur est survenue lors de la création de l'utilisateur: ${error.message}`)
        }
    }



    return (
        <div>
            <button
        className="fixed bottom-40 right-[25%] btn btn-lg btn-circle btn-primary"
        onClick={() => document.getElementById("modal_use-form").showModal()}
      >
       <User />
      </button>

      
      <dialog id="modal_use-form" className="modal">
        <div className="modal-box w-100 bg-green-50 max-h-8/12">
          
          <form action="" onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Nom d'utilisateur</span>
              </label>
              <input ref={addInputs} type="text" placeholder="Entrez nom d'utilisateur" className="input input-bordered" required/>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Role d'utilisateur</span>
              </label>
              <input ref={addInputs} type="text" placeholder="Entrez role d'utilisateur" className="input input-bordered" required/>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email d'utilisateur</span>
              </label>
              <input ref={addInputs} type="text" placeholder="Entrez email d'utilisateur" className="input input-bordered" required/>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password d'utilisateur</span>
              </label>
              <input ref={addInputs} type="text" placeholder="Entrez password d'utilisateur" className="input input-bordered" required/>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirmation du Password d'utilisateur</span>
              </label>
              <input ref={addInputs} type="text" placeholder="Confirmez password" className="input input-bordered" required/>
            </div>

            <span className='text-red-500 font-bold text-sm'> {error} </span>

            <button className="btn btn-primary mt-4" type="submit">
              Créer
            </button>
          </form>
          
        </div>

        {success ? <div className="toast toast-bottom toast-center"><div className="alert font-bold alert-success">{success}</div></div> : null}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
        </div>
    );
};

export default UserForm;