import React, { createContext, useState, useEffect } from "react";
import Loader from "react-top-loading-bar";
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("New");
    const [mobileMenu, setMobileMenu] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        fetchSelectedCategoryData(selectedCategory);
    }, [selectedCategory]);

    const fetchSelectedCategoryData = (query) => {
        setLoading(true);
        setProgress(30); 
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            console.log(contents);
            setSearchResults(contents);
            setLoading(false);
            setProgress(100); 
        });
    };

    return (
        <Context.Provider
            value={{
                loading,
                setLoading,
                searchResults,
                selectedCategory,
                setSelectedCategory,
                mobileMenu,
                setMobileMenu,
            }}
        >
            <Loader
                color="red" 
                height={4} 
                progress={progress} 
            />
            {props.children}
        </Context.Provider>
    );
};
