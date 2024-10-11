import React from 'react';
import { useNavigate } from 'react-router-dom';

function ReadMoreButton ({ announcement }){

    const navigate = useNavigate();

    const handleReadMoreClick = (e) => {
        e.preventDefault();
        navigate(`/announcements/${announcement.id}`, { state: { announcement } });
    };

    return (
        <button
            type="button"
            className="inline-block rounded bg-[#2e6b34] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(46,107,52,0.5)] transition duration-150 ease-in-out hover:bg-[#255428] hover:shadow-[0_8px_9px_-4px_rgba(46,107,52,0.3),0_4px_18px_0_rgba(46,107,52,0.2)] focus:bg-[#255428] focus:shadow-[0_8px_9px_-4px_rgba(46,107,52,0.3),0_4px_18px_0_rgba(46,107,52,0.2)] focus:outline-none focus:ring-0 active:bg-[#1e4620] active:shadow-[0_8px_9px_-4px_rgba(46,107,52,0.3),0_4px_18px_0_rgba(46,107,52,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(46,107,52,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(46,107,52,0.2),0_4px_18px_0_rgba(46,107,52,0.1)]"
            onClick={handleReadMoreClick}>
            Read more about this
        </button>
    );
};

export default ReadMoreButton;
