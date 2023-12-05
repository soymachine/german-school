

class ContentTravelToManaus {
    
    constructor(){
        console.log("Travel To Manaus")

        var path = anime.path('#plane-path path');

        anime({
            targets: '#travel-manaus-plane',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            easing: 'linear',
            duration: 20000,
            loop: true,
            delay:20000
        });
    }
}

export default ContentTravelToManaus
