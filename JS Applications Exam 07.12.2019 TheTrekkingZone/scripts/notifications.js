export function displayError(message) {
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut(),
    });

    const errorBox = document.getElementById('errorBox');
    errorBox.textContent = message;
    errorBox.style.display = 'block';
    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 3000);
}

export function displaySuccess(message) {
    $(document).on({
        ajaxStart: () => $('#loadingBox').show(),
        ajaxStop: () => $('#loadingBox').fadeOut(),
    });

    const successBox = document.getElementById('successBox');
    successBox.textContent = message;
    successBox.style.display = 'block';
    setTimeout(() => {
        successBox.style.display = 'none';
    }, 5000);
}

export function validateRegisterForm(user, pass, rePass) {
    if (user.trim() === '' || pass.trim() === '' || rePass.trim() === '') {
        displayError('All fields must be filled!');
        return false;
    }

    if (pass !== rePass) {
        displayError('Your password and confirmation password do not match.');
        return false;
    }

    if (user.length < 3) {
        displayError('The username should be at least 3 characters long');
        return false;
    }

    if (pass.length < 6) {
        displayError('The password should be at least 6 characters long');
        return false;
    }
    return true;
}

export function validateTrekForm(name, desc) {
    if (name.trim() === '' || desc.trim() === '') {
        displayError('All fields must be filled!');
        return false;
    }

    if (name.length < 6) {
        displayError('Trek name should be at least 6 characters long');
        return false;
    }

    if (desc.length < 10) {
        displayError('Trek description should be at least 10 characters long');
        return false;
    }
    return true;
}