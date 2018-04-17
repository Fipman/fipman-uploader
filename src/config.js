const configs = {
    "development" : {
        "api" : "http://localhost:8081"
    },
    "production": {
        "api" : ""
    }
}


const init = () => {
    return configs[process.env.NODE_ENV];
}

export {
    init
}