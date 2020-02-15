# Sorting-Algorithms-Visual
 A visualization of different sorting algorithms, using html, js, css, bootstrap and jquery

# How to use: 
To use the visualizer simply pick an algorithm from the drop-down list and press sort, you can also change the size of the array with the number input.
 
# Advanced options:
 ## Delay:
  This option controls the delay between each step in the visualizer, it has no effect if the "show steps" option is not checked
 ## Show Canvas:
  This option allows the user to hide the canvas for faster execution during the sorting, it's recommended for slower computers.
  The canvas will automatically turn off if the array is bigger than 1000, currently there's no way to turn the array back on.
  
 # Algorithms
  The "algorithms.js" file contains every sorting algorithm with different parameters. in case you want to try and add a sorting algorithm yourself; here's what each parameter is:
  
  ### Sort(MainList)
  The Sort(MainList) function is the pure sorting algorithm implemented, it must return an array of [(SortedList), (number of loops)]
  
  ### ShowSort(mainList, delay, initialTime, LoopNum, extraArgs)
  The ShowSort function is the function that gets called when the "showsteps" option is selected, it's job is not only to sort the list,   but to display the progress until it's done.
  To do this, it has the delay argument, which should be put in a SetTimeout function to simulate a loop with a delay.
  The initialTime argument, to send to the ShowMainList function.
  The LoopNum Argument which should increase each called and should also be passed on to the ShowMainList function.
  And the extraArgs which can be used as a list of extraArguments required within different calls.
  
  ### name
  The name that will appear in the dropdown list
  
  ### Info:
  The informantion that will display when the "i" button is pressed
  
  ### WikiLink:
  A link to the sorting algorithm's wikipedia page, it'll be added as a "learn more" link in the description when the "i" button is     pressed.
