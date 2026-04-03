import React from 'react';

const Container = ({className="",children}) => {
    return (
        <div className={`${className} max-w-7xl px-8 max-md:px-3 mx-auto`}>
            {children}
        </div>
    );
};

export default Container;