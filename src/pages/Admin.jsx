import React, { useEffect, useState } from 'react';
import Navigation from "../components/Navigation";
import { Link } from 'react-router-dom';
import { ArrowBigLeft, Users, Download, Upload, User2, User } from 'lucide-react';
import Utilisateur from '../components/Utilisateur';
import { useAppContext } from '../context';
import Client from './Client'
import Dette from './Dette';
import Depot from './Depot';
import Retrait from './Retrait';
import UserManager from "../components/UserManager";
import { getNbrCarte } from '../service';


const Admin = () => {

    const { user } = useAppContext() 
    const [activeTab, setActiveTab] = useState('client');
    const [countCarte, setCountCarte] = useState([]) 

    useEffect(() => {
        getNbrCarte().then(setCountCarte)
    }, [])
    
    
    return (
        
        <Navigation
            titre={
                <Link to={"/"} className="flex lg:gap-6 text-neutral-content sm:space-x-2 items-center px-2">
                    <ArrowBigLeft /> 
                    

                    <span className="flex items-center max-sm:hidden gap-2 lg:text-2xl font-bold max-md:hidden">
                        Tableau de bord du géstionnaire
                    </span>
                    <span className="flex items-center xl:hidden gap-2 text-2xl font-bold min-md:hidden ">
                        Géstionnaire
                    </span>

                </Link>
            }
            menu={ user?.role === 'manager' &&

                <div className="flex text-neutral-content font-bold gap-6 max-sm:bottom-0 z-40 max-sm:fixed max-sm:bg-primary max-sm:max-w-full max-sm:px-6 max-sm:left-[12%] max-sm:rounded-lg max-sm:py-2">
                    <button className={`flex flex-col cursor-pointer items-center ${activeTab === 'client' ? 'text-primary-content' : ''}`} onClick={() => setActiveTab('client')}>
                        <Users /> Client
                    </button>
                    <button className={`flex flex-col cursor-pointer items-center ${activeTab === 'user' ? 'text-primary-content' : ''}`} onClick={() => setActiveTab('user')}>
                        <User/> Manager
                    </button>
                    <button className={`flex flex-col cursor-pointer items-center ${activeTab === 'depot' ? 'text-primary-content' : ''}`} onClick={() => setActiveTab('depot')}>
                        <Download /> Depot</button>
                    <button className={`flex flex-col cursor-pointer items-center ${activeTab === 'retrait' ? 'text-primary-content' : ''}`} onClick={() => setActiveTab('retrait')}>
                        <Upload /> Retrait</button>
                </div>
            }

            winget={
                <div className="flex space-x-4 lg:gap-8 items-center">
                    <span className="text-white">
                        <label className="swap">
                            <div className="indicator">
                                <span className="badge badge-sm indicator-item text-success font-semibold">
                                    {Number(countCarte || 0)}
                                </span>
                                <Users />
                            </div>
                        </label>
                    </span>
                    <Utilisateur /> 
                </div>
            }
        >
            <div>
                {user?.role === 'manager' ? 
                <div>
                    {activeTab === 'user' && (
                        <UserManager /> 
                    )}
                    {activeTab === 'depot' && (
                        <Depot/>
                    )}
                    {activeTab === 'retrait' && (
                        <Retrait/>
                    )}
                    {activeTab === 'client' && (
                        <Client/>
                    )}
                </div> :

                <div> 
                    <div className="min-h-screen flex items-center flex-col gap-6 justify-center bg-base-200">
                        <span className="loading loading-spinner loading-lg"></span>
                        <span>Cet espace est réserve pour les managers</span>
                        
                    </div>
                </div>
                }
            </div>
        </Navigation>
    );
};

export default Admin;