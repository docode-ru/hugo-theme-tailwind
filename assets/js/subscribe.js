(function(){
  document.getElementById('subscribeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const loadingIndicator = document.querySelector('.loading');
    const errorMessage = document.querySelector('.error-message');
    const sentMessage = document.querySelector('.sent-message');

    loadingIndicator.style.display = 'block';
    errorMessage.style.display = 'none';
    sentMessage.style.display = 'none';

    const email = document.getElementById('email').value;


    // check if all fields are filled
    if (!email) {
        errorMessage.textContent = 'Пожалуйста, введите email.';
        errorMessage.style.display = 'block';
        loadingIndicator.style.display = 'none';
        return;
    }

    try {
        const response = await triggerJob(email);
        if (response.ok) {
            sentMessage.style.display = 'block';
        } else {
            errorMessage.textContent = 'Error sending message.';
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Error sending message.';
        errorMessage.style.display = 'block';
    } finally {
        loadingIndicator.style.display = 'none';
    }
});

async function triggerJob(email) {
    const body = JSON.stringify({
        email: email,
    });

    const endpoint = `https://wm.droff.me/api/w/docode/jobs/run/p/u/docode/save_subscriber_email?token=paA5GIRlsK4SKptqFSBFAJMSCZjrby`;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body
        });
        return response; // Return the fetch response to handle it in the event listener
    } catch (error) {
        console.error('Failed to trigger job:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}
})();
