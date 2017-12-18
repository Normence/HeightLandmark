$(() => {
    $(window)
        .on("mouseup.lightbox", onTouchEnd)
        .on("mousedown.lightbox", onTouchBegin)

    const TOTAL = 10
    var beginX, translateX
    var beginTime, endTime
    var idx = 1
    var ratio   // ratio of the current img and the next one
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

    function init() {
        const $wps = $(".container").find(".lightbox-item")
        const $prev = $wps.filter(".prev")
        const $curr = $wps.filter(".current")
        const $next = $wps.filter(".next")
        $prev.find('.lightbox-item-text').text('placeholder')
        $prev.find('.lightbox-item-text').fadeTo(1, 0)
        $curr.find('img').attr('src', './res/png/1.png')
        $curr.find('.title').text(INFO[0].name)
        $curr.find('.height').text(INFO[0].height + ' m')
        $next.find('.lightbox-item-text').text('placeholder')
        $next.find('.lightbox-item-text').fadeTo(1, 0)
        if(TOTAL > 1) {
            $next.find('img').attr('src', './res/png/2.png')
        }
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
            $next.fadeOut('slow')
            break
        case '.next':
            endX = - $(".container").width()
            $prev.fadeOut('slow')
            break
        default:
            endX = 0
        }
        $(".container").animate({
            textIndent: endX
        }, {
            step(now) {
                $(this).css("transform", "translate3d(" + now + "px, 0px, 0px)")
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
            $prev.fadeIn(1000)
        } else if (target === '.next') {
            imgURL = (index > TOTAL) ? '' : './res/png/' + index + '.png'
            $next.find('img').attr('src', imgURL)
            $next.fadeIn(1000)
        }
    }
})
