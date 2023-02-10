import React, { useState } from 'react'
import Navbar from './Navbar'
import './Hindex.css';
import { GEO_API_URL, Apioptions } from './search/ApiSearch';
import { AsyncPaginate } from "react-select-async-paginate";

export default function Hindex({ searchChange }) {

    const [search, setSearch] = useState(null);
    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, Apioptions
        )
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

    function handleSearch(searchData) {
        setSearch(searchData);
        // searchChange(searchData);
    }   
    return (
        <div>
            <Navbar></Navbar>
            <p id="nameSearch">Enter City Name</p>
            <div id="find">
                <AsyncPaginate 
                    id="search"
                    placeholder="Search for city"
                    debounceTimeout={1000}
                    value={search}
                    onChange={handleSearch}
                    loadOptions={loadOptions}
                />
                <input id="btn" type="button" value="  Show  " onClick={()=>{
                    try{
                        searchChange(search);
                    }
                    catch(error)
                    {
                        console.log(error);
                    }
                }}></input>
            </div>
        </div>
    )
}
