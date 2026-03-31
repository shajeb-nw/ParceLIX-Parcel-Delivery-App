import React from 'react';
import Hero from './Hero';
import HowWork from './HowWork';
import Services from './Services';
import Review from './Review/Review';
import AskQuestion from './AskQuestion';

const Home = () => {
 
    return (
        <div>
            <Hero></Hero>
            <HowWork></HowWork>
            <Services></Services>
            <Review></Review>
            <AskQuestion></AskQuestion>
        </div>
    );
};

export default Home;