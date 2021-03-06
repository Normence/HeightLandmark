$(() => {
    var INFO, TOTAL
    var previewIsInitialized = false
    $('.loader').hide()
    $('.container').hide()
    $('.title').transition('fade down', 500, () => {
        $('.page-preview-button').transition('fade up', 500)

        pageInit()
    })

    function pageInit() {
        $('.page-preview-button').click(() => {
            $('.title').transition('fade down', 500)
            $('.page-preview-button').transition('fade up', 500, () => {
                previewIsInitialized ? preview() : previewInit()
            })
        })
    }

    function previewInit() {
        $('.loader').show()
        previewIsInitialized = true
        $.getJSON('https://raw.githubusercontent.com/Normence/HeightLandmark/master/res/HeightInfo.json', (data) => {
            //        $.getJSON('localhost:8080/res/HeightInfo.json', (data) => {
            INFO = data.data
            TOTAL = INFO.length

            $('.preview-back').on('click', () => {
                $('.container').transition('fade', () => {
                    $('.title').transition('fade down', 500)
                    $('.page-preview-button').transition('fade up', 500)
                })
            })
            for (var i = 1; i <= TOTAL; i++) {
                $('<a class="image-wrapper" data-inverted="" data-tooltip="' + INFO[i - 1].name + '" data-position="top center" data-variation="tiny" href="./main.html?id=' + i + '"><img src="./res/preview/' + i + '.png"></a>').appendTo('.photo-container')
                if (i % 4 === 3) {
                    $('.photo-container a:last-child').addClass('img-lg')
                }
            }
            preview()
        })
    }

    function preview() {
        $('.loader').hide()
        $('.container').transition('fade')
    }
})
