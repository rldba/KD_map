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