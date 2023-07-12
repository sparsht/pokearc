export function isValidName(name) {
    const pattern = /^(?!\s)[A-Z\s]{1,}$/i;
    return pattern.test(name);
}

export function isValidEmail(email) {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return pattern.test(email);
}

export function isValidPhone(phone_no) {
    const pattern = /^[0-9]{10,10}$/
    return pattern.test(phone_no);
}

export function isValidPassword(password) {
    const pattern = /^[A-Z0-9_$!]{8,12}$/i
    return pattern.test(password);
}

export function httpPost(url, postBody = {}) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody)
    });
}

export function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}