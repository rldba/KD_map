function jsonLoad(objectManager, locate) {
    let adress = '54.435152, 56.959736'
    if (locate == '56.838011,60.597474') {
        adress = "full_65.json"
    }
    else if (locate == '55.441004, 65.341118') {
        adress = "full_37.json"
    }
    else if (locate == '57.152985, 65.541227') {
        adress = "full_71.json"
    }
    else if (locate == '55.159902, 61.402554') {
        adress = "full_75.json"
    }
    else if (locate == '58.010455, 56.229443') {
        adress = "full_57.json"
    }
    else if (locate == '51.768205, 55.096964') {
        adress = "full_53.json"
    }
    else {
        adress = "full_80.json"
    }
    $.ajax({
        url: adress
    }).done(function(data) {
        objectManager.removeAll()
        objectManager.add(data);
    }); // сгенерированный из xls посредством Пайтона в json в objectManager
}

export default jsonLoad