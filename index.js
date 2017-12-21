$(() => {
    $('.title').transition('fade right')
    $('.page-detail').transition('fade left')
    $('.page-preview').transition('fade up')

    $('.page-detail').click(() => {
        $('.title').transition('fade right')
        $('.page-detail').transition('fade left', () => {
            window.location.assign('./main.html?id=1')
        })
    })
})
