import React, { useState, useRef,useCallback } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const [count, forceRender] = useState(0);

    const number  = useRef(0)
    inputRef.current.focus();
    const handleReRender = () => {
        // Update state to force re-render
        forceRender(count+1);
    };

    number.current = number.current + 1;

    return (
        <div>
            <p>This component has rendered {number.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};