$(() => {
    $('.title').transition('fade right')
    $('.page-detail').transition('fade left')
    $('.page-preview').transition('fade up')
    $('.scroll').transition('fade left')

    $('.page-detail').click(() => {
        $('.title').transition('fade right')
        $('.page-detail').transition('fade left')
        $('.page-preview').transition('fade up')
        $('.scroll').transition('fade left', () => {
            window.location.assign('./main.html?id=1')
        })
    })

    $('.page-preview').click(() => {
        $('.title').transition('fade down')
        $('.page-detail').transition('fade down')
        $('.page-preview').transition('fade down')
        $('.scroll').transition('fade down', () => {
            window.location.assign('./main.html?id=1')
        })
    })
})
