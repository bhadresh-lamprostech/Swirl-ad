const sample = (options) => {
    if(document){
        const stages = document.querySelectorAll(".stage");
        stages.forEach((text,index) => {
            text.style.color = "red";
            text.style.opacity= (index+1)/10;
        })
    }
    // if(options.width){
    //     console.log(options.width)
    // } else if(options.height) {
    //     console.log(options.height)
    // }
}

module.exports.sample = sample;