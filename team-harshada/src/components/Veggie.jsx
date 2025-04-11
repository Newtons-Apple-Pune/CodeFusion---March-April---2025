import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Skeleton } from "@mui/material";

const Veggie = () => {

    const API_KEY = '71ee729777aa439ba75c472c3bca40b4';
    
    const [veggie, setVeggie] = useState([]);

    const getVeggie = async () => { 
    
        const check = localStorage.getItem('veggie');

        if(check) {
            setVeggie(JSON.parse(check));
        }
        else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=10&tags=vegetarian`);
            const data = await api.json();
            localStorage.setItem('veggie', JSON.stringify(data.recipes));
            console.log(data);
            setVeggie(data?.recipes);
        }
    }

    useEffect(() => {
        getVeggie();
    },[]);

    if(veggie.length === 0) {
        const number = [1,2,3,4,5,6,7,8,9,10];
        return (
            <Splide options={{
                perPage: 4,
                pagination: false,
                gap: '2rem'
            }}>
                {number.map((data) => (
                <SplideSlide key={data}>
                    <Skeleton height={200} width={300} />
                </SplideSlide>
            ))}
            </Splide>
        )
    }

    return (
        <div className="veggie-container">
            <h1>Veggie Picks </h1>
            <Splide options={{
                perPage: 4,
                pagination: false,
                gap: '2rem',
            }}>
            {veggie.map((recipe) => (
                <SplideSlide key={recipe.id}>
                    <RecipeCard data={recipe} />
                </SplideSlide>
            ))}
            </Splide>
        </div>
    )
}

export default Veggie;