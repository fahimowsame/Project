import React from "react";

import { AiFillHome, AiOutlineFlag } from "react-icons/ai";
import { MdLocalFireDepartment, MdLiveTv } from "react-icons/md";
import { CgMusicNote } from "react-icons/cg";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy, GiEclipse } from "react-icons/gi";
import { RiLightbulbLine, RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";

export const categories = [
    { name: "New", icon: React.createElement(AiFillHome), type: "home" },
    { name: "Trending", icon: React.createElement(MdLocalFireDepartment), type: "category" },
    { name: "Music", icon: React.createElement(CgMusicNote), type: "category" },
    { name: "Films", icon: React.createElement(FiFilm), type: "category" },
    { name: "Live", icon: React.createElement(MdLiveTv), type: "category" },
    { name: "Gaming", icon: React.createElement(IoGameControllerSharp), type: "category" },
    { name: "News", icon: React.createElement(ImNewspaper), type: "category" },
    { name: "Sports", icon: React.createElement(GiDiamondTrophy), type: "category" },
    { name: "Learning", icon: React.createElement(RiLightbulbLine), type: "category" },
    {
        name: "Fashion & beauty",
        icon: React.createElement(GiEclipse),
        type: "category",
        divider: true,
    },
    { name: "Settings", icon: React.createElement(FiSettings), type: "menu" },
    { name: "Report History", icon: React.createElement(AiOutlineFlag), type: "menu" },
    { name: "Help", icon: React.createElement(FiHelpCircle), type: "menu" },
    { name: "Send feedback", icon: React.createElement(RiFeedbackLine), type: "menu" },
];
