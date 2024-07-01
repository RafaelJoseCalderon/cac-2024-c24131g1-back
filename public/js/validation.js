const form = document.querySelector("#contact");
const mapValid = [];

// auxiliary functions
const multipleEventListeners = (name, events, fn) => {
    let input = form.elements[name]
    events.forEach(e => input.addEventListener(e, fn, false));
}

const updateMapValid = (errortextContent, name) => {
    if (errortextContent === "") {
        mapValid.pop(name);
    } else {
        mapValid.push(name);
    }
}
// end auxiliary functions

const inputGroup = (name, regex) => {
    let input = form.elements[name]
    let error = input.parentNode.querySelector(".form-error");

    return {
        value: input.value,
        regex: regex || "",
        error: error
    };
}

const fullNameValidation = () => {
    let input = inputGroup("fullName", /^[a-zA-Z\s]+$/);
    
    if (input.value === "") {
        input.error.textContent = "El nombre y apellido son requeridos";
    } else if (input.value?.length > 15) {
        input.error.textContent = "El maximo de caracteres es de 15";
    } else if (!input.regex.test(input.value)) {
        input.error.textContent = "Debe contener solo letras mayusculas y/o minusculas";
    } else {
        input.error.textContent = "";
    }

    updateMapValid(input.error.textContent, "fullName");
};

const emailValidation = () => {
    let input = inputGroup("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (input.value === "") {
        input.error.textContent = "El correo electronico es requerido";
    } else if (input.value?.length > 64) {
        input.error.textContent = "El maximo de caracteres es de 64";
    } else if (!input.regex.test(input.value)) {
        input.error.textContent = "Debe ser un correo electronico valido";
    } else {
        input.error.textContent = "";
    }

    updateMapValid(input.error.textContent, "email");
};

const phoneValidation = () => {
    let input = inputGroup("phone", /^\+[1-9]\d{1,14}$/);

    if (input.value === "") {
        input.error.textContent = "El numero de telefono es requerido";
    } else if (input.value?.length > 16) {
        input.error.textContent = "El maximo de numeros es de 16";
    } else if (!input.regex.test(input.value)) {
        input.error.textContent = "Debe ser un numero de telefono valido. Ej. +123456789";
    } else {
        input.error.textContent = "";
    }

    updateMapValid(input.error.textContent, "phone");
};

const messageValidation = () => {
    let input = inputGroup("message");

    if (input.value === "") {
        input.error.textContent = "El mensaje es requerido";
    } else if (input.value?.length > 1024) {
        input.error.textContent = "El maximo de caracteres debe ser 1024";
    } else {
        input.error.textContent = "";
    }

    updateMapValid(input.error.textContent, "message");
};

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        fullNameValidation();
        emailValidation();
        phoneValidation();
        messageValidation();

        if (mapValid.length === 0) form.submit();
    })

    multipleEventListeners("fullName", ["input", "blur"], fullNameValidation);
    multipleEventListeners("email",    ["input", "blur"], emailValidation   );
    multipleEventListeners("phone",    ["input", "blur"], phoneValidation   );
    multipleEventListeners("message",  ["input", "blur"], messageValidation );
}
