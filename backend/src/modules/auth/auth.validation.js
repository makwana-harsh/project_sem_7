
const validateRegisterFields = (data) =>{
    const {firstName, lastName, userName, email, password} = data;

    const err = new Error();
    err.status = 400;

    if(typeof firstName !== "string" || typeof lastName !== "string" || typeof userName !== "string" || typeof email !== "string" || typeof password !== "string"){
        err.message = "Invalid data"
        throw err;
    }
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedUserName = userName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if(!trimmedFirstName || !trimmedLastName || !trimmedUserName || !trimmedEmail || !trimmedPassword){
        err.message = "Some fields are missing";
        throw err;
    }

    const userNameRegex = /^[A-Za-z0-9_@]+$/;
    const fullNameRegex = /^[A-Za-z ]+$/;

    if(trimmedFirstName.length < 3 || trimmedFirstName.length > 40){
        err.message = "First name length must be between 3 to 40"
        throw err;
    }
    if(!fullNameRegex.test(trimmedFirstName)){
        err.message = "First name must contain only letters and spaces"
        throw err;
    }
    if(trimmedLastName.length < 3 || trimmedLastName.length > 40){
        err.message = "Last name length must be between 3 to 40"
        throw err;
    }
    if(!fullNameRegex.test(trimmedLastName)){
        err.message = "Last name must contain only letters and spaces"
        throw err;
    }
    if(trimmedUserName.length < 4 || trimmedUserName.length > 30){
        err.message = "Username length must be between 4 to 30"
        throw err;
    }
    if(!userNameRegex.test(trimmedUserName)){
        err.message = "Username must be unique and can contain letters, numbers, underscore, and @"
        throw err;
    }
    if(trimmedEmail.length < 3 || trimmedEmail.length > 30){
        err.message = "Email length must be between 3 to 30";
        throw err;
    }
    if(trimmedPassword.length < 3 || trimmedPassword.length > 30){
        err.message = "Password length must be between 3 to 30";
        throw err;
    }
    return {
        firstName : trimmedFirstName,
        lastName : trimmedLastName,
        userName : trimmedUserName,
        userEmailId : trimmedEmail,
        userPassword : trimmedPassword
    };
}

const validateLoginFields = (data)=>{
    const {userName, password} = data;

    const err = new Error();
    err.status = 400;

    if(typeof userName !== "string" || typeof password !== "string"){
        err.message = "Invalid data"
        throw err;
    }
   
    const trimmedUserName = userName.trim();
    const trimmedPassword = password.trim();

    if(!userName || !password){
        err.message = "Some fields are missing";
        throw err;
    }

    const userNameRegex = /^[A-Za-z0-9_@]+$/;
    if(trimmedUserName.length < 4 || trimmedUserName.length > 30){
        err.message = "Invalid username or password";
        throw err;
    }
    if(!userNameRegex.test(trimmedUserName)){
        err.message = "Invalid username or password";
        throw err;
    }
    if(trimmedPassword.length < 3 || trimmedPassword.length > 30){
        err.message = "Invalid username or password";
        throw err;
    }

    return {
        userName: trimmedUserName,
        userPassword: trimmedPassword
    };
}

export { validateRegisterFields, validateLoginFields};