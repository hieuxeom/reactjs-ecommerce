import React from 'react';
import HeroSection from "./HeroSection.jsx";
import NewArrivalsSection from "./NewArrivalsSection.jsx";

function HomePage(props) {
    return (
        <div className={"w-full flex flex-col items-center"}>
            <HeroSection/>
            <NewArrivalsSection/>
        </div>
    );
}

export default HomePage;