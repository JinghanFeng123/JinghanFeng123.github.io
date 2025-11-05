import React from 'react';

const PostCard = ({ title, excerpt, date }) => {
    return (
        <div className="post-card">
            <h2 className="post-title">{title}</h2>
            <p className="post-excerpt">{excerpt}</p>
            <span className="post-date">{date}</span>
        </div>
    );
};

export default PostCard;