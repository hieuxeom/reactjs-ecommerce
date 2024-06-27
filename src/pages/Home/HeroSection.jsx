import React from 'react';
import classConfig from "../../utils/config/class.config.js";
import {Button} from "@nextui-org/react";
import classNames from "classnames";

function HeroSection(props) {
    return (
        <div className="bg-sub-background w-full flex justify-center max-h-[75vh]">
            <div className="w-full max-w-7xl flex overflow-hidden">
                <div className="w-1/2 flex flex-col justify-center items-start gap-8">
                    <h1 className={classNames(classConfig.text.h1, classConfig.textVariant.title, classConfig.textColor.navyBlue)}>
                        Find clothes that matches your style
                    </h1>
                    <p className={classNames(classConfig.text.sub, classConfig.textColor.navyBlueOff)}>
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of
                        style.
                    </p>
                    <Button
                        size={"lg"}
                        variant={"solid"}
                        color={"primary"}
                        className={"capitalize"}
                    >
                        Shop now
                    </Button>
                </div>
                <div className="w-1/2">
                    <img className="w-full" src="/hero-image.png" alt=""/>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;