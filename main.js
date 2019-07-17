// setTimeout(function(){
//     $('.images>img:nth-child(1)').css({
//         transform:'translateX(-100%)'
//     })
//     $('.images>img:nth-child(2)').css({
//         transform:'translateX(-100%)'
//     })
//     $('.images>img:nth-child(1)').one('transitionend',function(e){
//         $(e.currentTarget).addClass('right').css({transform:'none'})
//     })
// },3000)

// setTimeout(function(){
//     $('.images>img:nth-child(2)').css({
//         transform:'translateX(-200%)'
//     })
//     $('.images>img:nth-child(3)').css({
//         transform:'translateX(-100%)'
//     })
//     $('.images>img:nth-child(2)').one('transitionend',function(e){
//         $(e.currentTarget).addClass('right').css({transform:'none'})
//     })
// },6000)

// setTimeout(function(){
//     $('.images>img:nth-child(3)').css({
//         transform:'translateX(-200%)'
//     })
//     $('.images>img:nth-child(1)').css({
//         transform:'translateX(-100%)'
//     })
//     $('.images>img:nth-child(3)').one('transitionend',function(e){
//         $(e.currentTarget).addClass('right').css({transform:'none'})
//     })
// },9000)

// setTimeout(function(){
//     $('.images>img:nth-child(1)').css({
//         transform:'translateX(-200%)'
//     })
//     $('.images>img:nth-child(2)').css({
//         transform:'translateX(-100%)'
//     })
//     $('.images>img:nth-child(1)').one('transitionend',function(e){
//         $(e.currentTarget).addClass('right').css({transform:'none'})
//     })
// },12000)


//下面全部作废，有bug
// let n
// initialise()
// let timer = setInterval(() => {
//     makeLeave(getImage(n))
//         .one('transitionend', (e) => {
//             makeEnter($(e.currentTarget))
//         })
//     makeCurrent(getImage(n+1))
//     n += 1
// }, 3000)

// //修复bug
// document.addEventListener('visibilitychange',function(e){
//     if(document.hidden){
//         window.clearInterval(timer)
//     }else{
//         timer = setInterval(() => {
//             makeLeave(getImage(n))
//                 .one('transitionend', (e) => {
//                     makeEnter($(e.currentTarget))
//                 })
//             makeCurrent(getImage(n+1))
//             n += 1
//         }, 3000)
//     }
// })

// function getImage(n){
//     return $(`.images > img:nth-child(${x(n)})`)
// }

// function x(n) {
//     if (n > 5) {
//         n = n % 5
//         if (n === 0) {
//             n = 5
//         }
//     }
//     return n;
// }

// function initialise() {
//     n = 1
//     $(`.images > img:nth-child(${n})`).addClass('current')
//         .siblings().addClass('enter')
// }

// function makeCurrent($node){
//     return $node.removeClass('enter leave').addClass('current')
// }

// function makeLeave($node){
//     return $node.removeClass('enter current').addClass('leave')
// }

// function makeEnter($node){
//     return $node.removeClass('leave current').addClass('enter')
// }


let $buttons = $('#buttonWrapper>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
$slides.css({ transform: 'translateX(-328px)' })
bindEvents()
$(next).on('click', function () {
    goToSlide(current + 1)
})
$(previous).on('click', function () {
    goToSlide(current - 1)
})

let timer = setInterval(function () {
    goToSlide(current + 1)
}, 2000)
$('.container').on('mouseenter', function () {
    window.clearInterval(timer)
}).on('mouseleave', function () {
    timer = setInterval(function () {
        goToSlide(current + 1)
    }, 2000)
})

function bindEvents() {

    $('#buttonWrapper').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}
// $buttons.eq(0).on('click', function () {
//     if (current == 2) {
//         console.log('说明你是从最后一张到第一张')
//         $slides.css({ transform: 'translateX(-1312px)' })
//             .one('transitionend', function () {
//                 $slides.hide()
//                     .offset()
//                 $slides.css({ transform: 'translateX(-328px)' })
//                     .show()
//             })
//     } else {
//         $slides.css({ transform: 'translateX(-328px)' })

//     }
//     current = 0
// })
// $buttons.eq(1).on('click', function () {
//     console.log(current)
//     $slides.css({ transform: 'translateX(-656px)' })
//     current = 1
// })
// $buttons.eq(2).on('click', function () {
//     if (current == 0) {
//         console.log('说明你是从第一张到最后一张')
//         $slides.css({ transform: 'translateX(0px)' })
//             .one('transitionend', function () {
//                 $slides.hide()
//                     .offset()
//                 $slides.css({ transform: 'translateX(-984px)' })
//                     .show()
//             })
//     } else {
//         $slides.css({ transform: 'translateX(-984px)' })
//         current = 2
//     }
// })

//重要!
function goToSlide(index) {
    if (index > $buttons.length - 1) {
        index = 0
    } else if (index < 0) {
        index = $buttons.length - 1
    }
    if (current === $buttons.length - 1 && index === 0) {
        //最后一张到第一张
        $slides.css({ transform: `translateX(${- ($buttons.length + 1) * 328}px)` })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${-(index + 1) * 328}px)` }).show()
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        //第一张到最后一张
        $slides.css({ transform: `translateX(0px)` })
            .one('transitionend', function () {
                $slides.hide().offset()
                $slides.css({ transform: `translateX(${- (index + 1) * 328}px)` }).show()
            })
    } else {
        $slides.css({ transform: `translateX(${- (index + 1) * 328}px)` })
    }
    current = index
}

function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)

    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}