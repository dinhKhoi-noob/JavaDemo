import React from 'react';

const SlidePictures = () => {
    return (
        <div class="col-md-8 banner-sec">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                </ol>
                <div class="carousel-inner" role="listbox">
                    <div class="carousel-item active">
                        <img class="d-block img-fluid" src="http://localhost:6039/files/john-wick.jpg" alt="First slide" style={{width:"760px",height:"670px"}}/>
                    </div>
                    <div class="carousel-item">
                        <img class="d-block img-fluid" src="http://localhost:6039/files/avatar-film-poster-analysis-1-638.jpg" alt="First slide" style={{width:"760px",height:"670px"}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlidePictures;