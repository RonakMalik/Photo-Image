import React from 'react';

const LightBox = ({ image, onClose, onPrevious, onNext }) => {

    const imageSlider = (e) => {
        e.target.name === 'onNext' ? onNext(e) : onPrevious(e);
    };


    return (
        <div>
            <div className="lightbox" onClick={onClose}>
                <span className='close cursor' onClick={onClose}>&times;</span>
                <div className='lightboxContent'>
                    <img
                        className="lightbox-img"
                        src={image.urls.regular}
                        alt={image.user.username}
                    />
                    <button className='prevButton' name='onPrevious' onClick={imageSlider}>&#10094;</button>
                    <button className='nextButton' name='onNext' onClick={imageSlider}>&#10095;</button>
                    <div class="caption-container">
                        <span>{image.alt_description}</span>
                    </div>
                </div>


            </div>

        </div>
    )
};

export default LightBox;