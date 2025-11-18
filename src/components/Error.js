import React from 'react';

/**
 * Error Component
 * -----------------------------
 * This component is used to display error messages inside the UI.
 * It accepts a single prop: `message`.
 * Whenever an API request fails or an unexpected issue occurs,
 * this component renders a red error box with the message text.
 */

export default function Error({ message }) {
    return (
        // Error box styling
        <div
            style={{
                background: '#ffe9e9', 
                color: '#8b0000',     
                padding: 12,           
                borderRadius: 6        
            }}
        >
            {/* Render the error message passed as a prop */}
            {message}
        </div>
    );
}
