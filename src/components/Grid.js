import React, { useEffect, useState } from 'react';
import { unspashKey } from '../config';
import 'unsplash-js';
import axios from 'axios';
import LightBox from './LightBox';
//import './Grid.css';

const GridComponent = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [pageNo, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const url = `https://api.unsplash.com/photos/?page=${pageNo}&&client_id=${unspashKey}`;
                const response = await axios.get(url);
                if (response.data.length === 0) {
                    setHasMore(false);
                    return;
                }
                console.log(response);
                setPhotos([...photos, ...response.data]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPhotos();
    }, [pageNo]);

    const handleScroll = () => {
        const el = document.scrollingElement;
        console.log(el.scrollHeight - el.scrollTop, 'scrollHeight');
        console.log(el.clientHeight, 'clientHeight');
        if (el.scrollHeight - el.scrollTop === el.clientHeight +.5) {
            setPage(pageNo + 1);
        }
        else if (el.scrollHeight - el.scrollTop === el.clientHeight) {
            setPage(pageNo + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pageNo]);

    const showImage = (value) => {
        setSelectedPhoto(value);
        //setSelectedImageIndex(value)
    }

    //show next image in lightbox
    const showNext = (e) => {
        // if (selectedImageIndex < photos.length - 1) {
        //     let nextIndex = selectedImageIndex+1;
        //     console.log(nextIndex, 'NI')
        //     setSelectedImageIndex(nextIndex);
        // }
        e.stopPropagation();
        let currentIndex = photos.indexOf(selectedPhoto);
        if (currentIndex >= photos.length - 1) {
            setSelectedPhoto(null);
        } else {
            let nextImage = photos[currentIndex + 1];
            setSelectedPhoto(nextImage);
        }
    };

    //show previous image in lightbox
    const showPrev = (e) => {
        e.stopPropagation();
        let currentIndex = photos.indexOf(selectedPhoto);
        if (currentIndex <= 0) {
            setSelectedPhoto(null);
        } else {
            let nextImage = photos[currentIndex - 1];
            setSelectedPhoto(nextImage);
        }
        // if (selectedImageIndex > 0) {
        //     setSelectedImageIndex(selectedImageIndex - 1);
        // }
    };



    return (
        <div className="app">
            <h1 className="heading">
                Recommended For You
            </h1>
            {!photos ? (
                <div>
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div className="result">
                    {photos.map((image) => (
                        <div className="card" onClick={() => showImage(image)}>
                            <img
                                src={image.urls.regular}
                                alt={image.user.username}
                                className="hover-shadow cursor"
                            />
                        </div>
                    ))}
                </div>
            )}
            {hasMore && <div className="heading">Loading...</div>}
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