function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        duration: 2,
        opacity: 0,
        y: '-10',
        ease: Expo.easeInOut,
    })
}