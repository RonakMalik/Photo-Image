import React, { useEffect, useState, useRef } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import 'unsplash-js';

import LightBox from '../LightBox';
import classes from './Grid.module.css';
import { getPhotos } from '../../apiRequests/unsplash';

export const GridComponent = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [pageNo, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await getPhotos(pageNo);

                if (response.data.length === 0) {
                    setHasMore(false);
                    return;
                }

                setPhotos((prev) => [...prev, ...response.data]);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPhotos();
    }, [pageNo]);


    useEffect(() => {
        // Use Intersection observer to detect last image intersection to fetch new images
        const observer = new IntersectionObserver((entries) => {
            entries[0].isIntersecting && setPage(prev => prev + 1);
        })

        // Observe last image element
        photos.length && observer.observe(observerRef.current);

        return () => { observer.disconnect() }
    }, [photos]);


    //show next image in lightbox
    const showNext = (e) => {
        e.stopPropagation();

        let currentIndex = photos.indexOf(selectedPhoto);
        if (currentIndex >= photos.length - 1) {
            setSelectedPhoto(null);
            return;
        }

        let nextImage = photos[currentIndex + 1];
        setSelectedPhoto(nextImage);

    };

    //show previous image in lightbox
    const showPrev = (e) => {
        e.stopPropagation();
        let currentIndex = photos.indexOf(selectedPhoto);

        if (currentIndex <= 0) {
            setSelectedPhoto(null);
            return;
        }

        let nextImage = photos[currentIndex - 1];
        setSelectedPhoto(nextImage);
    };

    return (
        <div className={classes.container}>
            <div className={classes.heading}>
                <h3>Photo Gallery</h3>
            </div>
            <div className={classes.result} >
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry columnsCount={3} gutter="10px">
                        {photos.map((image, index) => (
                            <img
                                // Set ref only on the last image for intersection observer
                                {...(index === photos.length - 1) ? { ref: observerRef } : {}}
                                src={image.urls.regular}
                                alt={image.user.username}
                                className={`${classes.hoverShadow} ${classes.cursor}`}
                                onClick={() => setSelectedPhoto(image)}
                            />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>x
            </div>

            {hasMore && <div className={classes.heading}>Loading...</div>}

            {
                selectedPhoto !== null &&
                <LightBox
                    image={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                    onPrevious={showPrev}
                    onNext={showNext}
                />
            }
        </div>
    )
};

export default GridComponent;