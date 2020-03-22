let algorithms = [
    {
        name: "Bubble Sort",

        Info:
            "Bubble Sort works by iterating through a list and compares two adjacent elements, " +
            "if those two elements are already sorted, it leaves them alone, if they aren't, " +
            "it sorts them, bubble sort will continue to iterate through " +
            "the list until it is completely sorted, it has a complexity of O(n^2)",

        WikiLink: "https://en.wikipedia.org/wiki/Bubble_sort",

        Sort(mainList) {
            let loopsNum = 0;
            let SortedList = CreateList(mainList.length, 1);
            console.log(mainList + "\n" + SortedList);

            while (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
                loopsNum += 1;
                for (let i = 0; i < mainList.length; i++) {
                    let r = i + 1;
                    let temp;
                    if (mainList[r] === undefined) {
                        continue;
                    }
                    if (mainList[i] > mainList[r]) {
                        temp = mainList[i];
                        mainList[i] = mainList[r];
                        mainList[r] = temp;
                        continue;
                    }
                }
            }
            return [mainList, loopsNum];
        },

        ShowSort(mainList, delay, initialTime, LoopNum, extraArgs) {
            let SortedList = CreateList(mainList.length, 1);
            LoopNum += 1;
            for (let i = 0; i < mainList.length; i++) {
                let r = i + 1;
                let temp;
                if (mainList[r] === undefined) {
                    continue;
                }
                if (mainList[i] > mainList[r]) {
                    temp = mainList[i];
                    mainList[i] = mainList[r];
                    mainList[r] = temp;
                    continue;
                }
            }
            //MainList, ListDisplayElement, canvas, Ctx, initialTime, iters
            showMainList(mainList, initialTime, LoopNum);
            if (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
                setTimeout(function() {
                    algorithms[0].ShowSort(
                        mainList,
                        delay,
                        initialTime,
                        LoopNum
                    );
                }, delay);
            } else {
                Sorting = false;
            }
        }
    },
    {
        name: "Bogo Sort",

        Info:
            "Bogo Sort (a.k.a Stupid Sort, Monkey Sort or Shotgun Sort) works by randomizing " +
            "the list until it is completely sorted, Bogo sort was originally made as a joke " +
            "it is not meant to be used as a real sorting algorithm however it was still included " +
            "as a way to showcase how a badly designed algorithm can greatly affect the speed of " +
            "a webpage. It has a complexity of O((n+1)!)",

        WikiLink: "https://en.wikipedia.org/wiki/Bogosort",

        Sort(mainList) {
            let SortedList = CreateList(mainList.length, 1);
            let LoopNum = 0;
            while (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
                LoopNum += 1;
                mainList = shuffle(mainList);
            }
            return [mainList, LoopNum];
        },

        ShowSort(mainList, delay, initialTime, LoopNum, extraArgs) {
            let SortedList = CreateList(mainList.length, 1);
            LoopNum += 1;
            mainList = shuffle(mainList);
            showMainList(mainList, initialTime, LoopNum);
            if (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
                setTimeout(function() {
                    algorithms[1].ShowSort(
                        mainList,
                        delay,
                        initialTime,
                        LoopNum
                    );
                }, delay);
            } else {
                Sorting = false;
            }
        }
    },
    {
        name: "Selection Sort",
        Info:
            "The selection sort works by dividing the list in two sections; a sorted one and a non " +
            "sorted one, to archieve this, it will iterate through the whole list and it will find " +
            "the smallest item on it, and it will move that item to the beggining of the list, moving " +
            "everything else forward until the list is completely sorted. It has a complexity of " +
            "O(n^2)",
        WikiLink: "https://en.wikipedia.org/wiki/Selection_sort",
        Sort(mainList) {
            let SortedList = CreateList(mainList.length, 1);
            let LoopNum = 0;
            let threshold = -1;
            while (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
                let min = mainList.length + 1;
                let minIndx = mainList.length - 1;
                LoopNum += 1;
                for (let i = 0; i < mainList.length; i++) {
                    if (i <= threshold) {
                        continue;
                    }
                    if (mainList[i] <= min) {
                        min = mainList[i];
                        minIndx = i;
                    }
                }
                threshold++;
                mainList = this.index1to2(mainList, minIndx, threshold);
            }
            return [mainList, LoopNum];
        },
        ShowSort(mainList, delay, initialTime, LoopNum, extraArgs) {
            let SortedList = extraArgs[0];
            let threshold = extraArgs[1];
            if (typeof SortedList == undefined) {
                SortedList = CreateList(mainList.length, 1);
            }
            if (typeof threshold == undefined) {
                threshold = -1;
            }
            if (SortedList == undefined) {
                SortedList = CreateList(mainList.length, 1);
            }
            if (threshold == undefined) {
                threshold = -1;
            }
            let min = mainList.length + 1;
            let minIndx = mainList.length - 1;
            LoopNum += 1;
            for (let i = 0; i < mainList.length; i++) {
                if (i <= threshold) {
                    continue;
                }
                if (mainList[i] <= min) {
                    min = mainList[i];
                    minIndx = i;
                }
            }
            threshold++;
            mainList = this.index1to2(mainList, minIndx, threshold);
            showMainList(mainList, initialTime, LoopNum);
            if (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
                setTimeout(function() {
                    algorithms[2].ShowSort(
                        mainList,
                        delay,
                        initialTime,
                        LoopNum,
                        [SortedList, threshold]
                    );
                }, delay);
            } else {
                Sorting = false;
            }
        },

        index1to2(array, index1, index2) {
            if (
                index1 < index2 ||
                index1 > array.length - 1 ||
                index2 > array.length - 1
            ) {
                return null;
            }
            let AsignIndex = array[index1];
            array[index1] = "##Waiting##";
            let padding = 0;
            let SavedIndex = array[index2 + padding];
            while (SavedIndex !== "##Waiting##") {
                array[index2 + padding] = AsignIndex;
                AsignIndex = SavedIndex;
                padding++;
                SavedIndex = array[index2 + padding];
            }
            array[index2 + padding] = AsignIndex;
            return array;
        }
    },
    {
        name: "Insertion Sort",
        Info:
            "Insertion Sort, much like selection sort, divides the list into a sorted and a not " +
            "area, however, unlike selection, it does not wait to find the smallest item to insert " +
            "it, it inserts the next item into its aproximate position, that is, into a position " +
            "where the next item is bigger and the last item is smaller. It has a complexity of " +
            "O(n^2)",
        WikiLink: "https://en.wikipedia.org/wiki/Insertion_sort",
        Sort(MainList) {
            let SortedList = CreateList(MainList.length, 1);
            let LoopNum = 0;
            for (let i = 1; i < MainList.length; i++) {
                if (JSON.stringify(MainList) == JSON.stringify(SortedList)) {
                    break;
                }
                for (let j = i - 1; j >= -1; j--) {
                    LoopNum++;
                    if (j === -1) {
                        MainList = this.index1to2(MainList, i, 0);
                        break;
                    }
                    if (MainList[i] > MainList[j]) {
                        MainList = this.index1to2(MainList, i, j + 1);
                        break;
                    }
                }
            }
            return [MainList, LoopNum];
        },
        ShowSort(mainList, delay, initialTime, LoopNum, extraArgs) {
            showMainList(mainList, initialTime, LoopNum);
            if (JSON.stringify(mainList) == JSON.stringify(SortedList)) {
                Sorting = false;
                return;
            }
            let i = extraArgs;
            console.log(typeof i);
            console.log(typeof []);
            if (typeof i === typeof []) {
                i = 1;
            }
            for (let j = i - 1; j >= -1; j--) {
                LoopNum++;
                if (j === -1) {
                    MainList = this.index1to2(MainList, i, 0);
                    break;
                }
                if (MainList[i] > MainList[j]) {
                    MainList = this.index1to2(MainList, i, j + 1);
                    break;
                }
            }
            i++;
            showMainList(mainList, initialTime, LoopNum);
            if (
                i < MainList.length ||
                JSON.stringify(mainList) !== JSON.stringify(SortedList)
            ) {
                setTimeout(function() {
                    algorithms[3].ShowSort(
                        mainList,

                        delay,
                        initialTime,
                        LoopNum,
                        i
                    );
                }, delay);
            } else {
                Sorting = false;
            }
        },
        index1to2(array, index1, index2) {
            if (
                index1 < index2 ||
                index1 > array.length - 1 ||
                index2 > array.length - 1
            ) {
                return null;
            }
            let AsignIndex = array[index1];
            array[index1] = "##Waiting##";
            let padding = 0;
            let SavedIndex = array[index2 + padding];
            while (SavedIndex !== "##Waiting##") {
                array[index2 + padding] = AsignIndex;
                AsignIndex = SavedIndex;
                padding++;
                SavedIndex = array[index2 + padding];
            }
            array[index2 + padding] = AsignIndex;
            return array;
        }
    },
    {
        name: "Quick Sort",
        Info:
            "Quick sort is one of, if not, the fastest sorting algorithms out there, it works by " +
            'recursively setting a "Pivot point" and separating the list into two groups; less ' +
            "than the pivot, and more than the pivot, then it gives the same treatment to both " +
            "of the sublists, and it will continue to do this recursevely until every sublist " +
            "is of size 1, at which point the sum of every sublist will be the sorted list. " +
            "It has a complexity of O(n log n)",
        WikiLink: "https://en.wikipedia.org/wiki/Quicksort",
        Sort(MainList) {
            let loopNum = 0;
            function quicksort(low, high) {
                if (low < high) {
                    loopNum++;
                    let p = partition(low, high);
                    quicksort(low, p - 1);
                    quicksort(p + 1, high);
                }
            }
            function partition(low, high) {
                let pivot = MainList[high];
                let i = low;
                for (j = low; j < high; j++) {
                    if (MainList[j] < pivot) {
                        let temp = MainList[i];
                        MainList[i] = MainList[j];
                        MainList[j] = temp;
                        i++;
                    }
                }
                let temp = MainList[i];
                MainList[i] = MainList[high];
                MainList[high] = temp;
                return i;
            }

            quicksort(0, MainList.length - 1);
            return [MainList, loopNum];
        },
        ShowSort(mainList, delay, initialTime, LoopNum, extraArgs) {
            function quicksort(low, high) {
                if (low < high) {
                    LoopNum++;
                    let p = partition(low, high);
                    if (
                        JSON.stringify(mainList) !== JSON.stringify(SortedList)
                    ) {
                        setTimeout(function() {
                            quicksort(low, p - 1);
                            quicksort(p + 1, high);
                        }, delay);
                    } else {
                        Sorting = false;
                    }
                }
            }
            function partition(low, high) {
                let pivot = MainList[high];
                let i = low;
                for (j = low; j < high; j++) {
                    if (MainList[j] < pivot) {
                        let temp = MainList[i];
                        MainList[i] = MainList[j];
                        MainList[j] = temp;
                        i++;
                    }
                }
                let temp = MainList[i];
                MainList[i] = MainList[high];
                MainList[high] = temp;
                showMainList(mainList, initialTime, LoopNum);
                return i;
            }
            quicksort(0, MainList.length - 1);
        }
    },
    {
        name: "Gnome sort",
        Info:
            "Gnome sort (dubbed stupid sort) is a sorting algorithm originally proposed by " +
            "an Iranian computer scientist Hamid Sarbazi-Azad (professor of Computer " +
            "Engineering at Sharif University of Technology) in 2000. The sort was " +
            "first called stupid sort (not to be confused with bogosort), and then " +
            "later described by Dick Grune and named gnome sort." +
            "The gnome sort is a sorting algorithm which is similar to insertion sort" +
            "in that it works with one item at a time but gets the item to the proper " +
            "place by a series of swaps, similar to a bubble sort. It is conceptually " +
            "simple, requiring no nested loops. The average running time is O(n2) but " +
            "tends towards O(n) if the list is initially almost sorted.",
        WikiLink: "https://en.wikipedia.org/wiki/[Algorithm_name]",
        Sort(MainList) {
            let pos = 0;
            let LoopNum = 0;
            while (pos < MainList.length) {
                LoopNum++;
                if (pos == 0 || MainList[pos] >= MainList[pos - 1]) {
                    pos++;
                } else {
                    let temp = MainList[pos];
                    MainList[pos] = MainList[pos - 1];
                    MainList[pos - 1] = temp;
                    pos--;
                }
            }
            return [MainList, LoopNum];
        },
        ShowSort(mainList, delay, initialTime, LoopNum, extraArgs) {
            let SortedList = CreateList(mainList.length, 1);
            LoopNum += 1;
            let pos = extraArgs;
            if (typeof pos === typeof []) {
                pos = 0;
            }
            if (pos == 0 || MainList[pos] >= MainList[pos - 1]) {
                pos++;
            } else {
                let temp = MainList[pos];
                MainList[pos] = MainList[pos - 1];
                MainList[pos - 1] = temp;
                pos--;
            }
            showMainList(mainList, initialTime, LoopNum);
            if (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
                setTimeout(function() {
                    algorithms[5].ShowSort(
                        mainList,
                        delay,
                        initialTime,
                        LoopNum,
                        pos
                    );
                }, delay);
            } else {
                Sorting = false;
            }
        }
    }
];
//?.............................................................................
let Base = {
    name: "",
    Info: "WIP",
    WikiLink: "https://en.wikipedia.org/wiki/[Algorithm_name]", //!<------------
    Sort(MainList) {
        let LoopNum = 0;
        while (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
            LoopNum += 1;
            //TODO: Add logic here
        }
        return [MainList, LoopNum];
    },
    ShowSort(mainList, delay, initialTime, LoopNum, extraArgs) {
        let SortedList = CreateList(mainList.length, 1);
        LoopNum += 1;
        //TODO: Logic...
        showMainList(mainList, initialTime, LoopNum);
        if (JSON.stringify(mainList) !== JSON.stringify(SortedList)) {
            setTimeout(function() {
                algorithms[NUMBER].ShowSort(
                    //!<------------------------------------
                    mainList,
                    delay,
                    initialTime,
                    LoopNum,
                    [] //!<---------------------------------
                );
            }, delay);
        } else {
            Sorting = false;
        }
    }
};
