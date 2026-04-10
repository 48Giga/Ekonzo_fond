import React from "react";

const Navigation = ({titre, winget, children}) => {


    return (
        <div className="">
            <header className="fixed block z-10 bg-primary w-full max-lg:py-0 max-2xl:py-2 print:hidden">
                <nav className="p-2 max-sm:p-0">
                    <div className="px-8 flex items-center justify-between max-sm:px-1">
                        {titre}
                        <div className="">
                            {winget}

                        </div>
                    </div>
                </nav>
            </header>
            <div className="separateur h-15 max-md:h-14 max-xl:h-2 print:h-0"></div>
            <main className="max-h-full">{children}</main>
        </div>
    );
};

export default Navigation;
