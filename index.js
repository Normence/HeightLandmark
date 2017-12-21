$(() => {
    $('.title').transition('fade right')
    $('.page-detail').transition('fade left')
    $('.page-preview').transition('fade up')

    $('.page-detail').click(() => {
        $('.title').transition('fade right')
        $('.page-detail').transition('fade left')
        $('.page-preview').transition('fade up', () => {
            window.location.assign('./main.html?id=1')
        })
    })

    $('.page-preview').click(() => {
        $('.title').transition('fade down')
        $('.page-detail').transition('fade down')
        $('.page-preview').transition('fade down', () => {
            preview()
        })
    })

    function preview() {
        $('.container').transition('fade')
        const TOTAL = INFO.length
        for(var i = 1; i <= TOTAL; i++) {
            $('.container').append('<div class="image-wrapper"><img src="./res/png/' + i + '.png"></div>')
        }
    }
})

/**
 * constructure height information
 * TODO to be removed
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
