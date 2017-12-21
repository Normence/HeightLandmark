/**
 * constructure height information
 */
const INFO = [
    {
        "id": 1,
        "ming": "农业展览馆",
        "name": "Agricultural Exhibition Hall",
        "height": 16
    }, {
        "id": 2,
        "ming": "天坛-祈年殿",
        "name": "qiniandian",
        "height": 19.2
    }, {
        "id": 3,
        "ming": "中央美术学院美术馆",
        "name": "CAFAM",
        "height": 24
    }, {
        "id": 4,
        "ming": "雍和宫-万福阁",
        "name": "The Lama Temple",
        "height": 25
    }, {
        "id": 5,
        "ming": "水立方",
        "name": "The National Aquatics Centre",
        "height": 30
    }, {
        "id": 6,
        "ming": "世贸天阶-天幕",
        "name": "World Trade Plaza",
        "height": 30
    }, {
        "id": 7,
        "ming": "今日美术馆主馆",
        "name": "Today Art Museum",
        "height": 30
    }, {
        "id": 8,
        "ming": "毛主席纪念堂",
        "name": "Chairman Mao Zedong Memorial Hall",
        "height": 33.6
    }, {
        "id": 9,
        "ming": "天安门",
        "name": "Tian'an'men square",
        "height": 34.7
    }, {
        "id": 10,
        "ming": "午门",
        "name": "Meridian Gate",
        "height": 35.6
    }
]

$(() => {
    $(window)
        .on("mouseup.lightbox", onTouchEnd)
        .on("mousedown.lightbox", onTouchBegin)
    $('.lightbox-back').on('click', () => {
        $('.container').transition('fade')
        $('.scroll').transition('fade left', () => {
            window.history.back()
        })
    })

    const TOTAL = INFO.length
    const BEGIN_HEIGHT = $('.lightbox-item').find('img').height()
    var beginX, translateX
    var beginTime, endTime
    var idx

    function init() {
        idx = parseInt(window.location.search.substring(1).split('=')[1])
        const $wps = $(".container").find(".lightbox-item")
        const $prev = $wps.filter(".prev")
        const $curr = $wps.filter(".current")
        const $next = $wps.filter(".next")
        $('.scroll').transition('fade left', 500, () => {
            $('.lightbox-item-text').fadeTo(1, 0)
            $prev.find('.lightbox-item-text').text('placeholder')
            $curr.find('img').attr('src', './res/png/' + idx + '.png')
            $curr.find('.title').text(INFO[idx - 1].name)
            $curr.find('.height').text(INFO[idx - 1].height + ' m')
            $curr.find('.lightbox-item-text').fadeTo(300, 1)
            $next.find('.lightbox-item-text').text('placeholder')
            if(idx !== 1) {
                $prev.find('img').attr('src', './res/png/' + (idx - 1) + '.png')
            }
            if(idx !== TOTAL) {
                $next.find('img').attr('src', './res/png/' + (idx + 1) + '.png')
            }
            $('.container').delay(800).transition('fade', 500)
        })
    }
    init()

    function onTouchBegin(e) {
        $(window).on("mousemove.lightbox", onTouchMove)
        $('.lightbox-item-text').fadeTo(300, 0)
        beginX = getCursorX(e)
        translateX = 0
    }
    function getCursorX(e) {
        if (["mousemove", "mousedown"].indexOf(e.type) > -1) {
            return e.pageX
        }
    }
    function onTouchMove(e) {
        translateX = getCursorX(e) - beginX
        $('.container').css("transform", "translate3d(" + translateX + "px, 0px, 0px)")
        const direction = translateX > 0 ? '.prev' : '.next'
        if((idx > 1 && idx < TOTAL) || (idx === 1 && translateX < 0) || (idx === TOTAL && translateX > 0)) {
            zoom(direction, Math.abs(translateX))
        }
        if(direction === '.next') {
            $('.prev').fadeTo(1, 1 + translateX / ($('.container').width() / 2))
        }
    }
    function onTouchEnd() {
        $(window).off("mousemove.lightbox", onTouchMove)
        animateTo(getTarget())
    }

    function getTarget() {
        var direction = getDirection(translateX, 0.3 * $(window).width())

        if (direction === 0) {
            const deltaT = Math.max(endTime - beginTime, 1)
            const v = translateX / deltaT
            direction = getDirection(v, 0.3)
        }
        if ((direction === -1 && idx === 1) || (direction === 1 && idx === TOTAL)) {
            direction = 0
        }

        return [".prev", ".current", ".next"][direction + 1]
    }

    function getDirection(offset, max) {
        if (offset > max) return -1
        if (offset < -max) return 1
        return 0
    }

    function animateTo(target) {
        $(window)
            .off("mouseup.lightbox", onTouchEnd)
            .off("mousedown.lightbox", onTouchBegin)
        $(".container").css('text-indent', translateX)

        var endX
        const $wps = $(".container").find(".lightbox-item")
        const $prev = $wps.filter(".prev")
        var $curr = $wps.filter(".current")
        const $next = $wps.filter(".next")
        switch(target) {
        case '.prev':
            endX = $(".container").width()
            $next.fadeTo('slow', 0)
            break
        case '.next':
            endX = - $(".container").width()
            $prev.fadeTo('slow', 0)
            break
        default:
            endX = 0
        }
        $(".container").animate({
            textIndent: endX
        }, {
            step(now) {
                $(this).css("transform", "translate3d(" + now + "px, 0px, 0px)")
                if((idx > 1 && idx < TOTAL) || (idx === 1 && now < 0) || (idx === TOTAL && now > 0)) {
                    zoom(now > 0 ? '.prev' : '.next', Math.abs(now))
                }
                if(now < 0) {
                    $('.prev').fadeTo(1, 1 + now / ($('.container').width() / 2))
                }
            },
            duration: 1000,
            complete() {
                if (target === ".prev") {
                    idx--
                    $prev.attr("class", "lightbox-item current")
                    $curr.attr("class", "lightbox-item next")
                    $next.attr("class", "lightbox-item prev")
                    preFetch(".prev", idx - 1)
                } else if (target === ".next") {
                    idx++
                    $next.attr("class", "lightbox-item current")
                    $curr.attr("class", "lightbox-item prev")
                    $prev.attr("class", "lightbox-item next")
                    preFetch(".next", idx + 1)
                }
                $(".container").css("transform", "none")
                $curr = $('.current')
                $curr.find('.title').text(INFO[idx - 1].name)
                $curr.find('.height').text(INFO[idx - 1].height + ' m')
                $curr.find('.lightbox-item-text').fadeTo(300, 1)
                $(window)
                    .on("mouseup.lightbox", onTouchEnd)
                    .on("mousedown.lightbox", onTouchBegin)
            },
        })
    }

    function preFetch(target, index) {
        const $wps = $(".container").find(".lightbox-item")
        const $prev = $wps.filter(".prev")
        const $next = $wps.filter(".next")
        var imgURL
        if (target === '.prev') {
            imgURL = (index === 0) ? '' : './res/png/' + index + '.png'
            $prev.find('img').attr('src', imgURL)
            zoom(target, $('.container').width() / 2)
            $prev.fadeTo(500, 1)
        } else if (target === '.next') {
            imgURL = (index > TOTAL) ? '' : './res/png/' + index + '.png'
            $next.find('img').attr('src', imgURL)
            $next.find('img').css('height', BEGIN_HEIGHT)
            $next.fadeTo(500, 1)
        }
    }

    function zoom(direction, x) {
        var h1, h2
        var $target
        if(direction === '.prev') {
            h1 = (INFO[idx-2] || []).height
            h2 = INFO[idx-1].height
            $target = $('.prev').find('img')
        } else {
            h1 = INFO[idx-1].height
            h2 = INFO[idx].height
            $target = $('.current').find('img')
        }
        const height = Math.round(getHeight(direction, x, h1, h2)) + 'px'
        $target.css('height', height)
    }

    /**
     * formula for shrink
     * y = 2 * bh * (ratio- 1) * x / pW + bh
     * (0 <= x <= pW/2)
     * formula for expansion
     * y = 2 * bh * (1 - ratio) * x / pW + bh * (2 * ratio - 1)
     * (pW/2 <= x <= pW)
     * @param {decides whether it is expanding or shrinking} direction
     * @param {the offset of x axis relative to the page} x
     * @param {height of the previous building} h1
     * @param {height of the latter building} h2
     */
    function getHeight(direction, x, h1, h2) {
        const ratio = h1 / h2
        const pageWidth = $('.container').width()
        var height
        if(direction === '.prev' || direction === '.current') {
            if(pageWidth / 2 <= x && x <= pageWidth) {
                height = 2 * BEGIN_HEIGHT * (1 - ratio) * x / pageWidth + BEGIN_HEIGHT * (2 * ratio - 1)
            }
        } else if(direction === '.next') {
            if(0 <= x && x <= pageWidth / 2) {
                height = 2 * BEGIN_HEIGHT * (ratio - 1) * x / pageWidth + BEGIN_HEIGHT
            }
        }
        return height
    }
})
