import { useEffect, useState } from 'react';
import './Recipe.css';
import { useParams } from 'react-router-dom';
import { API_KEY } from '../assets/API_KEY';
import { Button, Skeleton } from '@mui/material';

const Recipe = () => {

    const [details, setDetails] = useState();
    const [active, setActive] = useState('summary')
    const params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${API_KEY}`);
        const detailsData = await data.json();
        console.log(detailsData);
        setDetails(detailsData);
    }

    useEffect(() => {
        fetchDetails();
    },[params.name])

    const handleClick = (status) => {
        setActive(status)
    }

    if(details === undefined) {
        return (
            <div className="recipe-shimmer-container">
                <div className="recipe-shimmer-left">
                    <Skeleton variant='text' sx={{fontSize: '3rem'}} animation='wave' />
                    <Skeleton variant='rectangular' animation='wave' height={300} width={500} />
                </div>
                <div className="recipe-shimmer-right">
                    <div className="btn-shimmer-right">
                        <Skeleton variant='rounded' animation='wave' height={35} width={120} />
                        <Skeleton variant='rounded' animation='wave' height={35} width={120} />
                        <Skeleton variant='rounded' animation='wave' height={35} width={120} />
                    </div>
                    <div className="shimmer-content-right">
                        <Skeleton variant='text' sx={{fontSize:'2.5rem'}} animation='wave' />
                        <div className="text-container-shimmer">
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        <Skeleton variant='text' sx={{fontSize:'1.5rem'}} animation='wave' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="recipe-container-main">
            <h1>{details?.title}</h1>
            <div className="recipe-container">
                <div className="recipe-container-left">
                    <img src={details?.image} className='recipe-imgs' />
                </div>
                <div className="recipe-container-right">
                    <div className="btn-container">
                        <Button 
                            variant='contained' 
                            onClick={() => handleClick('summary')}
                            disabled={active === 'summary' ? true : false}>
                            Summary
                        </Button>
                        <Button 
                            variant='contained'
                            onClick={() => handleClick('ingredients')}
                            disabled={active === 'ingredients' ? true : false}>
                            ingredients
                        </Button>
                        <Button 
                            variant='contained'
                            onClick={() => handleClick('steps')}
                            disabled={active === 'steps' ? true : false}>
                                Steps
                        </Button>
                    </div>
                    {active === 'summary' && 
                        <div className="recipe-right-main">
                            <div className="summary">
                               <h2>Summary</h2>
                               <p dangerouslySetInnerHTML={{__html: details?.summary}}></p>
                             </div>
                            <div className="instructions">
                               <h2>Instructions</h2>
                               <p dangerouslySetInnerHTML={{__html: details?.instructions}}></p>
                            </div>
                        </div>
                    }
                    {active === 'ingredients' && (
                            details?.extendedIngredients.map((data) => (
                                <div className="ingredient-bar" key={data?.id}>
                                    <h3 className='ingredients-h3'>
                                        <p>{data?.name}</p>
                                        <p> {data?.amount} grams</p>
                                    </h3>
                                </div>
                            ))
                    )}
                    {
                        active === 'steps' && (
                            <div className="steps">
                                <h1>Steps</h1>
                                {details?.analyzedInstructions[0]?.steps.map((data) => (
                                    <div className="step" key={data?.step}>
                                        <h2>Step - {data?.number}</h2>
                                        <p>{data?.step}</p>
                                        <h4>Ingredients - {data?.ingredients[0]?.name}</h4>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>     
            </div>
        </div>
    )
}

export default Recipe;