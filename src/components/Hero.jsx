import React from "react";
import SuperMontant from "./SuperMontant";
import MeilleurDepot from "./MeilleurDepot";
import CardDepot from "./CardDepot";
import ScoreEkonzo from "./ScoreEkonzo";
import CardRetrait from "./CardRetrait";
import CardCommission from "./CardCommission";

export const Card = ({children}) => {
    return (
        <div className="relative w-full bg-base-100 rounded-lg shadow-md overflow-hidden max-2xl:py-2">
            {children}
        </div>
    );
};

export const CorpsCard = ({title, number, icon}) => {
    return (
        <div>
            <div className="px-4 max-2xl:space-y-4">
                <h2 className="stat-title text-primary/60 font-bold"> {title} </h2>
                <div className="flex justify-between">
                    <h4 className="text-2xl text-secondary font-[consolas] py-2 font-semibold max-sm:text-xl">
                       
                        {number}
                    </h4>
                    <span className="text-primary">{icon}</span>
                </div>
            </div>
        </div>
    );
};


const Hero = () => {
    return (
        <>
            <div className="mx-4 py-8 px-2 relative max-sm:mx-1">
                <div className="relative grid w-full grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                    <ScoreEkonzo/>
                    <CardDepot/>
                    <CardRetrait/>
                    <CardCommission/>
                </div>

                <div className="mt-4">
                    <div className="relative w-full grid grid-cols-2 gap-4 overflow-hidden max-md:grid-cols-1">
                        <Card>
                            <div className="px-4 py-2">
                                <SuperMontant/>
                            </div>
                        </Card>
                        <Card>
                            <div className="px-4 py-2">
                                <MeilleurDepot/>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
