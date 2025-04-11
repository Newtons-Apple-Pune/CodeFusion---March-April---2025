import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import './Searched.css';
import { API_KEY } from "../assets/API_KEY";
import { Skeleton } from "@mui/material";

const Searched = () => {

    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const params = useParams();

    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${name}`);
        const recipes = await data.json();
        setSearchedRecipes(recipes.results);
        console.log(searchedRecipes);
    }

    useEffect(() => {
        getSearched(params.search);
    },[params.search])

    if(searchedRecipes.length === 0) {
        const number = [1,2,3,4,5,6,7,8,9,10];
        return (
        <div className="cuisine-skeleton">
        {
            number.map((data) => (
                <Skeleton 
                    variant="rounded"
                    width={300}
                    height={200}
                    animation='wave'
                    key={data}
                />))
        }
        </div> 
    )}

    return (
        <div className="searched-container">
            {searchedRecipes.map((data) => (
                <RecipeCard data={data} key={data.id} />
            ))}
        </div>
    )
}

export default Searched;