let Sorting = false;
let ListDisplayElement;
let ListDisplayCanvas;
let DisplayCanvasctx;

let AdvOpts = {
    Delay: 10,
    CanvasDisplay: true
};

function ms2time(ms) {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let miliseconds = 0;
    for (let i = 1; i <= ms; i++) {
        miliseconds += 1;
        if (miliseconds >= 1000) {
            miliseconds = 0;
            seconds += 1;
            if (seconds >= 60) {
                seconds = 0;
                minutes += 1;
                if (minutes >= 60) {
                    minutes = 0;
                    hours += 1;
                }
            }
        }
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    miliseconds = miliseconds.toString();
    while (miliseconds.length < 3) {
        miliseconds = `0${miliseconds}`;
    }
    return `${hours}:${minutes}:${seconds}.${miliseconds}`;
}

function shuffle(array) {
    //knuth shuffle
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function CreateList(size, starting) {
    if (starting === undefined) {
        starting = 0;
    }
    let newArray = [];
    for (let i = starting; newArray.length < size; i++) {
        newArray.push(i);
    }
    return newArray;
}

function showMainList(MainList, initialTime, iters) {
    let currentDate = new Date();
    let finalTime = currentDate.getTime();
    let runtime = finalTime - initialTime;
    $("#IterationsCount").text(iters);
    if (isNaN(runtime)) {
        runtime = 0;
    }
    $("#Runtime").text(ms2time(runtime));
    if (MainList.length > 1000 || !AdvOpts.CanvasDisplay) {
        ListDisplayCanvas.hide();
        ListDisplayElement.show();
        let newtext = "";

        for (num of MainList) {
            newtext += num;
            newtext += ", ";
        }
        newtext = newtext.substring(0, newtext.length - 2);
        ListDisplayElement.text(newtext);
    } else {
        DisplayCanvasctx.clearRect(
            0,
            0,
            ListDisplayCanvas.get(0).width,
            ListDisplayCanvas.get(0).height
        );
        ListDisplayCanvas.show();
        ListDisplayElement.hide();
        for (let i = 0; i < MainList.length; i++) {
            lineheight = MainList[i] / MainList.length;
            DisplayCanvasctx.beginPath();
            DisplayCanvasctx.rect(
                (i * ListDisplayCanvas.get(0).width) / MainList.length,
                0,
                ListDisplayCanvas.get(0).width / MainList.length,
                lineheight * ListDisplayCanvas.get(0).height
            );
            DisplayCanvasctx.fillStyle = "rgb(40, 40, 40)";
            DisplayCanvasctx.fill();
        }
    }
}

let MainList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let SortedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //This is to test equality on

$(document).ready(function() {
    ListDisplayElement = $("#NumSortingShow");
    ListDisplayCanvas = $("#SortingShow");
    DisplayCanvasctx = ListDisplayCanvas.get(0).getContext("2d");
    let ShuffleButtonElement = $("#ShuffleButton");
    let SizeInputElement = $("#SizeInput");
    let SortButton = $("#SortButton");
    let SortingSelect = $("#AlgorithmSelect");
    let ShowStepsCheck = $("#ShowSteps");
    let AdvancedOptsBtn = $("#AdvancedOptsBtn");
    let AdvancedOptionsElement = $("#AdvancedOptions");
    let CanvasShowEle = $("#CanvasShowEle");
    let DelayCounter = $("#DelayCounter");
    let BogoLightBox = $("#BogoLightBox");
    let DontRunBogoSortBtn = $("#DontRunBogoSort");
    let RunBogoSortBtn = $("#RunBogoSort");

    DelayCounter.val(10);

    for (let algorithm of algorithms) {
        let option = $("<option></option>");
        option.text(algorithm.name);
        SortingSelect.append(option);
    }
    MainList = shuffle(MainList);
    showMainList(MainList);

    console.log(ShowStepsCheck.val());
    SizeInputElement.val(10);
    ShuffleButtonElement.click(function() {
        if (Sorting) {
            return;
        }
        MainList = shuffle(MainList);
        showMainList(MainList);
    });
    SizeInputElement.change(function() {
        if (Sorting) {
            return;
        }
        MainList = shuffle(CreateList(SizeInputElement.val(), 1));
        SortedList = CreateList(SizeInputElement.val(), 1);
        showMainList(MainList);
    });
    CanvasShowEle.change(function() {
        if (CanvasShowEle.is(":checked")) {
            AdvOpts.CanvasDisplay = true;
        } else {
            AdvOpts.CanvasDisplay = false;
        }
        showMainList(MainList);
    });
    DelayCounter.change(function() {
        if (DelayCounter.val() >= 0 && DelayCounter.val() <= 1000) {
            AdvOpts.Delay = DelayCounter.val();
        }
    });
    DontRunBogoSortBtn.click(function() {
        BogoLightBox.attr("style", "display: none;");
    });
    RunBogoSortBtn.click(function() {
        let beforeRun = new Date();
        let initialTime = beforeRun.getTime();
        BogoLightBox.attr("style", "display: none;");
        if (ShowStepsCheck.is(":checked")) {
            algorithms[1].ShowSort(MainList, AdvOpts.Delay, initialTime, 0, []);
        } else {
            let SortInfo = alg.Sort(MainList);
            MainList = SortInfo[0];
            let LoopNum = SortInfo[1];
            showMainList(MainList, initialTime, LoopNum);
            Sorting = false;
        }
    });
    SortButton.click(function() {
        if (Sorting) {
            return;
        }
        Sorting = true;
        let beforeRun = new Date();
        let initialTime = beforeRun.getTime();
        let CurrentSort = SortingSelect.val();
        for (let alg of algorithms) {
            if (alg.name === CurrentSort) {
                if (alg.name === "Bogo Sort") {
                    BogoLightBox.attr("style", "display: block;");
                    Sorting = false;
                } else if (ShowStepsCheck.is(":checked")) {
                    alg.ShowSort(MainList, AdvOpts.Delay, initialTime, 0, []);
                } else {
                    let SortInfo = alg.Sort(MainList);
                    MainList = SortInfo[0];
                    let LoopNum = SortInfo[1];
                    showMainList(MainList, initialTime, LoopNum);
                    Sorting = false;
                }
            }
        }
    });
    AdvancedOptsBtn.click(function() {
        AdvancedOptionsElement.slideToggle();
    });
});
