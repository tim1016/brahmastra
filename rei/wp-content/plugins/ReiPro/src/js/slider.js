// Global variables
const  sliderView = document.querySelector('.ac-slider--view > ul'),
sliderViewSlides = document.querySelectorAll('.ac-slider--view__slides'),
arrowLeft = document.querySelector('.ac-slider--arrows__left'),
arrowRight = document.querySelector('.ac-slider--arrows__right'),
sliderLength = sliderViewSlides.length;


//Sliding fucntion

const slideMe = (sliderViewItems, isActiveItem) => {
    // update the classes
    isActiveItem.classList.remove('is-active');
    sliderViewItems.classList.add('is-active');

    //css transform
    // sliderView.setAttribute('style', 'transform: translateX(- '+ sliderViewItems.offsetLeft + 'px)'); 
    sliderView.setAttribute('style', 'transform:translateX(-' + Math.abs(sliderViewItems.offsetLeft) + 'px)');
}

// before sliding function
const beforeSliding = i =>{
    let isActiveItem = document.querySelector('.ac-slider--view__slides.is-active'),
    currentItem = Array.from(sliderViewSlides).indexOf(isActiveItem) + i,
    nextItem = currentItem + i,
    sliderViewItems = document.querySelector(`.ac-slider--view__slides:nth-child(${nextItem})`); 

    // is nextItem is bigger than the number of slides
    if(nextItem > sliderLength){
        sliderViewItems = document.querySelector('.ac-slider--view__slides:nth-child(1)'); 
    }

    if(nextItem == 0){
        sliderViewItems = document.querySelector(`.ac-slider--view__slides:nth-child(${sliderLength})`);    
    }

    slideMe (sliderViewItems, isActiveItem); 
}


// triggers for the arrows
arrowRight.addEventListener('click',()=> beforeSliding(1));
arrowLeft.addEventListener('click',()=> beforeSliding(0));