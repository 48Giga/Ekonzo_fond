import React from "react";

const Navigation = ({titre, menu, winget, children}) => {


    return (
        <div className="">
            <header className="fixed block z-10 bg-primary w-full max-lg:py-0 max-2xl:py-2 print:hidden">
                <nav className="p-2 max-sm:p-0">
                    <div className="lg:px-8 flex items-center justify-between max-sm:px-1">
                        <div>{titre}</div>
                        <div>{menu}</div>
                        <div>{winget}</div>
                    </div>
                </nav>
            </header>
            <div className="separateur h-10 max-md:h-14 max-xl:h-12 print:h-0"></div>
            <main className="xl:hero ">
                <div className=" xl:hero-content ">{children}</div>
            </main>
        </div>
    );
};

export default Navigation;
