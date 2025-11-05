import React, { useState } from 'react';

const ProfileForm = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            name,
            bio,
            contact,
        };
        console.log('Profile Data Submitted:', profileData);
        // Here you can add functionality to save the profile data
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="bio">Bio:</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="contact">Contact:</label>
                <input
                    type="text"
                    id="contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;