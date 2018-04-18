const configs = {
    "development" : {
        "api" : "http://localhost:8090"
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