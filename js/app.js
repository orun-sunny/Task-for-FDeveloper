// Show modal and upload attachment
(function () {
    const attachmentfileBtn = document.querySelectorAll('.attachmentup-btn');
    const modal = document.querySelector('.modal');
    const form = document.getElementById("uploadForm");
    let targetCard;

    // this will Open modal
    attachmentfileBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            targetCard = e.target.parentElement.parentElement.querySelector('.attachmentup-btn span');
            modal.classList.add('show');
        });
    })

    // Close modal 
    modal.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            modal.classList.remove('show');
        }
    })



})();