import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cuisine from "./Cuisine";
import Category from "../components/Category";
import Search from "../components/Search";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Header from "../components/Header";

const Pages = () => {

    return (
        <Router>
            <Header />
            <div className="pages-container">
                <Routes>
                    <Route path="/" element={[<Search />, <Category />, <Home />]}></Route>
                    <Route path="/cuisine/:type" element={[<Search />, <Category />, <Cuisine />]}></Route>
                    <Route path="/searched/:search" element={[<Search />, <Category />, <Searched />]}></Route>
                    <Route path="/searched/:search/recipe/:name" element={<Recipe />}></Route>
                    <Route path="/cuisine/:type/recipe/:name" element={<Recipe />}></Route>
                    <Route path="recipe/:name" element={<Recipe />}></Route>
                </Routes>
            </div>
        </Router>
    )
}

export default Pages;