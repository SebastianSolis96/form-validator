const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input'); /* Array */

const regex = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letters, numbers, hyphen and underscore
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters, space, accents.
	password: /^.{4,12}$/, // 4 to 12 digits.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,10}$/ // 7 to 14 numbers.
}

const fields = {
    user: false,
    name: false,
    password: false,
    email: false,
    phone: false
}

const formValidator = (e) => {
    switch (e.target.name) {
        case 'user':
            fieldsValidator(regex.user, e.target, 'user')
            break;

        case 'name':
            fieldsValidator(regex.name, e.target, 'name')
            break;
        case 'password':
            fieldsValidator(regex.password, e.target, 'password')
            password2Validator()
            break;

        case 'password2':
            password2Validator()
            break;

        case 'email':
            fieldsValidator(regex.email, e.target, 'email')
            break;

        case 'phone':
            fieldsValidator(regex.phone, e.target, 'phone')
            break;
    
        default:
            break;
    }
}

const fieldsValidator = (param, input, field) => {
    if (param.test(input.value)) {
        document.getElementById(`${field}__group`).classList
        .remove('form__group-wrong')

        document.getElementById(`${field}__group`).classList
        .add('form__group-success')

        document.querySelector(`#${field}__group i`).classList
        .add(`fa-check-circle`)

        document.querySelector(`#${field}__group i`).classList
        .remove(`fa-times-circle`)

        document.querySelector(`#${field}__group .form__input-error`)
        .classList.remove(`form__input-error-active`)

        fields[field] = true

    }else{
        document.getElementById(`${field}__group`).classList
        .add(`form__group-wrong`)

        document.getElementById(`${field}__group`).classList
        .remove(`form__group-success`)
        
        document.querySelector(`#${field}__group i`).classList
        .remove(`fa-check-circle`)

        document.querySelector(`#${field}__group i`).classList
        .add(`fa-times-circle`)
        
        document.querySelector(`#${field}__group .form__input-error`)
        .classList.add(`form__input-error-active`)

        fields[field] = false
    }
}

const password2Validator = () =>{
    const inputPassword1 = document.getElementById('password')
    const inputPassword2 = document.getElementById('password2')

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`password2__group`).classList
        .add(`form__group-wrong`)

        document.getElementById(`password2__group`).classList
        .remove(`form__group-success`)

        document.querySelector(`#password2__group i`).classList
        .remove(`fa-check-circle`)

        document.querySelector(`#password2__group i`).classList
        .add(`fa-times-circle`)
        
        document.querySelector(`#password2__group .form__input-error`)
        .classList.add(`form__input-error-active`)

        fields['password'] = false
    } else {
        document.getElementById(`password2__group`).classList
        .remove(`form__group-wrong`)

        document.getElementById(`password2__group`).classList
        .add(`form__group-success`)

        document.querySelector(`#password2__group i`).classList
        .add(`fa-check-circle`)

        document.querySelector(`#password2__group i`).classList
        .remove(`fa-times-circle`)
        
        document.querySelector(`#password2__group .form__input-error`)
        .classList.remove(`form__input-error-active`)

        fields['password'] = true
    }
}

/* Añadir un Event Listener a cada input */
inputs.forEach( (input) => {
    input.addEventListener('keyup', formValidator) /* Levantar tecla */
    input.addEventListener('blur', formValidator) /* Click fuera del input */
})

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const terms = document.getElementById('terms')
    if (fields.user && fields.name && fields.password 
        && fields.email && fields.phone && terms.checked) {
        form.reset()

        document.getElementById('form__message-success').classList
        .add('form__message-success-active')
        setTimeout( () => {
            document.getElementById('form__message-success').classList
            .remove('form__message-success-active')
        }, 5000)

        document.querySelectorAll('.form__group-success')
        .forEach( (icon) => {
            icon.classList.remove('form__group-success')
        })

        document.getElementById('form__message').classList
        .remove('form__message-active')
    } else {
        document.getElementById('form__message').classList
        .add('form__message-active')
    }
})