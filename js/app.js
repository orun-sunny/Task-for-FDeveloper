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

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const attachments = form.attachments.files;
        const formData = new FormData();
        // Append each selected file to the FormData object
        for (let i = 0; i < attachments.length; i++) {
            formData.append('attachments', attachments[i]);
        }

        // Fetch API
        fetch('/api/v1/attachment-upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    targetCard.innerText = targetCard.innerText * 1 + data.filenames.length;
                    const fileList = document.getElementById("fileList");
                    fileList.innerHTML = ''
                    data.filenames.forEach(function (filename) {
                        const listItem = document.createElement("li");
                        listItem.textContent = filename;
                        fileList.appendChild(listItem);
                    });
                } else {
                    alert("File upload failed: " + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })

})();