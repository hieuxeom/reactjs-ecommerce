import React from 'react';

import TopHeader from "./TopHeader.jsx";
import BottomHeader from "./BottomHeader.jsx";

function Header(props) {

    return (
        <header className={"w-full flex flex-col items-center justify-center"}>
            <TopHeader/>
            <BottomHeader/>
        </header>
    );
}

export default Header;