import React from 'react';
import './LightBox.css'

export const LightBox = ({ image, onClose, onPrevious, onNext }) => (
    <div className="lightbox" onClick={onClose}>
        <span className='close cursor' onClick={onClose}>&times;</span>
        <div className='lightboxContent'>
            <img
                className="lightbox-img"
                src={image.urls.regular}
                alt={image.user.username}
            />
            <button className='prevButton' onClick={onPrevious}>&#10094;</button>
            <button className='nextButton' onClick={onNext}>&#10095;</button>
            <div class="caption-container">
                <span>{image.alt_description}</span>
            </div>
        </div>


    </div>
);

export default LightBox;