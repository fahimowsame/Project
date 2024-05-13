import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItems";
import { categories } from "../utils/constant";
import { Context } from "../context/ContextApi";

const LeftNav = () => {
    const { selectedCategory, setSelectedCategory, mobileMenu } =
        useContext(Context);

    const navigate = useNavigate();

    const handleClick = (type, name) => {
        switch (type) {
            case 'category':
            case 'home':
                setSelectedCategory(name);
                navigate("/");
                break;
            case 'menu':
                return false;
            default:
                break;
        }
    };

    return (
        <div
        className={`w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 ${
            mobileMenu ? "translate-x-0" : ""
        }`}
        >
            <div className="flex px-5 flex-col">
                {categories.map((item) => (
                    <React.Fragment key={item.name}>
                        <LeftNavMenuItem
                            text={item.type === "home" ? "Home" : item.name}
                            icon={item.icon}
                            action={() =>
                                handleClick(item.type, item.name)
                            }
                            className={`${
                                selectedCategory === item.name
                                    ? "bg-white/[0.15]"
                                    : ""
                            }`}
                        />
                        {item.divider && (
                            <hr className="my-5 border-white/[0.2]" />
                        )}
                    </React.Fragment>
                ))}
                <hr className="my-5 border-white/[0.2]" />
                <div className="text-white/[0.5] text-[12px]">
                    Clone by: Fahim Hasan
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
