function saveGame(){var e={};e.sudoku=sudoku,e.myTimer=myTimer,e.settings={medium:medium,difficulty:difficulty,showPossibleValues:showPossibleValues,showClashes:showClashes},localStorage.setItem("savedGame",JSON.stringify(e))}function resumeSavedGame(){var e=JSON.parse(localStorage.getItem("savedGame"));return e?(sudoku=e.sudoku,sudoku.__proto__=SudokuGame.prototype,myTimer.stop(),myTimer=e.myTimer,myTimer.__proto__=Timer.prototype,medium=e.settings.medium,difficulty=e.settings.difficulty,showPossibleValues=e.settings.showPossibleValues,showClashes=e.settings.showClashes,console.log("resuming saved game..."),restoreUI(),!0):!1}function restoreUI(){console.log("restoring UI..."),drawPuzzleDom(sudoku.playersGrid),disableCells(),styleGuessCells(medium),markConflicts(),myTimer.refreshTimeDom(),myTimer.isStopped?myTimer.stop():myTimer.start(),$("#game-settings-options .possible-values").prop("checked",showPossibleValues),$("#game-settings-options .highlight-clashes").prop("checked",showClashes),$("#pallete input[value='"+medium+"']").prop("checked",!0),$("#game-details .difficulty").html(difficulty)}function newPuzzle(e){sudoku=new SudokuGame(e),drawPuzzleDom(sudoku.puzzle),disableCells(),clearConflictHighlights(),$("#game-details .difficulty").html(difficulty),myTimer.reset()}function toggleTimer(){timer_paused?(myTimer.start(),$("#timer-stop").val("Pause"),$(".time-passed").css("color","#000"),$("#pause-hider").css("display","none"),timer_paused=0):(myTimer.stop(),$("#timer-stop").val("Continue"),$(".time-passed").css("color","#FF4848"),$("#pause-hider").css("display","block"),timer_paused=1)}function formatCellValue(e,s){var t=sudoku.playersGrid[e][s];return t=0===t?" ":t}function inputCellDom(e,s,t,a){$("td input").each(function(){var l=$(this).attr("data-cell").split(",");l[0]==e&&l[1]==s&&($(this).val(t),a&&$(this).removeClass().addClass(a))})}function drawPuzzleDom(e){$("td input").each(function(){var s=$(this).attr("data-cell").split(","),t=s[0],a=s[1],l=e[t][a],i=showPossibleValues?sudoku.getPossibleValuesForCell(e,t,a):{};if($(this).parent().removeClass().addClass("cell"),$(this).parent().css({"background-color":""}),$(this).siblings("h1").remove(),$(this).next().empty(),0===l){l=" ";for(var o in i.values)i.values[o]&&$(this).next().append(o)}$(this).val(l)})}function styleGuessCells(e){var s,t,a,l;$("td input").each(function(){s=$(this).attr("data-cell").split(","),t=s[0],a=s[1],l=sudoku.getPlayersGuesses(),0!==l[t][a]&&(e?$(this).removeClass().addClass(e):$(this).removeClass())})}function disableCells(){var e,s,t,a;$("td input").each(function(){e=$(this).attr("data-cell").split(","),s=e[0],t=e[1],a=!0,0===sudoku.puzzle[s][t]&&(a=!1),$(this).attr("disabled",a),$(this).removeClass()})}function markConflicts(){var e,s,t,a,l,i=sudoku.getPlayersGuesses();$("td input").each(function(){e=$(this).attr("data-cell").split(","),s=e[0],t=e[1],l=i[s][t],0!==l?(a=sudoku.getPossibleValuesForCell(sudoku.playersGrid,s,t,l).clash,$(this).next().removeClass().addClass(a.row||a.column||a.subgrid?"hint-overlay conflict":"hint-overlay")):$(this).next().removeClass().addClass("hint-overlay")})}function highlightClash(e,s,t){var a,l,i,o,r=sudoku.whichSubGrid(s,t);$("td input").each(function(){a=$(this).attr("data-cell").split(","),l=a[0],i=a[1],o=$(this).parent().parent(),o.removeClass(),e.row&&s===l&&o.addClass("clash"),e.column&&t===i&&o.addClass("clash"),e.subgrid&&l>=r.startRowIndex&&l<=r.endRowIndex&&i>=r.startColumnIndex&&i<=r.endColumnIndex&&o.addClass("clash")})}function clearConflictHighlights(){$("td input").each(function(){$(this).parent().parent().removeClass(),$(this).next().removeClass().addClass("hint-overlay")})}function weHaveAWinner(){for(var e,s,t,a="GOOD JOB!",l=["rgba(194,22,23,","rgba(212,40,25,","rgba(235,64,29,","rgba(253,82,31,","rgba(254,117,22,","rgba(254,163,9,","rgba(255,198,0,","rgba(181,179,26,","rgba(84,155,60,","rgba(10,136,86,","rgba(6,126,106,","rgba(2,116,127,","rgba(0,111,137,","rgba(48,95,131,","rgba(112,75,123,","rgba(160,59,117,","rgba(154,54,89,"],i=!1,o=1e3,r={};!i&&o>0;){e=0,s=Math.round(81*Math.random()),r[s]=!0,t=$("td input").eq(s);var u=l[Math.floor(l.length*Math.random())];u+="0.8)",t.attr("disabled",!0).val(""),setTimeout(function(e,s,t){return function(){e.parent().removeClass("win").addClass("win"),e.parent().append("<h1>"+a[s%9]+"</h1>"),e.parent().css({"background-color":t})}}(t,s,u),500);for(var n=0;81>n;n++)r[n]&&(e+=1);81===e&&(i=!0),o-=1}}var $sudokuBoard=$("#soduku-board"),sudoku=new SudokuGame("facile"),myTimer=new GameTimer("#timer-1"),medium="pen",difficulty="facile",showPossibleValues=!1,showClashes=!1,maintainAspectRatio=function(e){e.css("",e.width())};$(document).on("load",function(){maintainAspectRatio($sudokuBoard),drawPuzzleDom(sudoku.puzzle),disableCells(),myTimer.start()}()),$(window).resize(function(){maintainAspectRatio($sudokuBoard)}),$("#game-menu input").on("click",function(e){var s=e.target?e.target:e.srcElement;switch(s.className){case"select-new-puzzle":$("#game-settings-options").hide(),$("#select-puzzle-options").toggle();break;case"game-settings":$("#select-puzzle-options").hide(),$("#game-settings-options").toggle()}}),$("#game-settings-options").on("click",function(e){var s=e.target?e.target:e.srcElement;switch(s.className){case"possible-values":showPossibleValues=s.checked,drawPuzzleDom(sudoku.playersGrid);break;case"highlight-clashes":showClashes=s.checked,showClashes?markConflicts():clearConflictHighlights()}}),$("#select-puzzle-options input").on("click",function(e){var s=e.target?e.target:e.srcElement;difficulty=s.value,newPuzzle(difficulty),$("#select-puzzle-options").hide()}),$("#hint").on("click",function(){var e=sudoku.giveHint();e.hint&&(inputCellDom(e.row,e.column,e.hint,"show-hint"),sudoku.playerInput(e.row,e.column,e.hint)),drawPuzzleDom(sudoku.playersGrid)});var timer_paused=0;$("#pallete .toggle-select").on("click",function(e){var s=e.target?e.target:e.srcElement;medium=s.value}),$sudokuBoard.on("focusin",function(e){var s=e.target?e.target:e.srcElement;$(s).removeClass().addClass(medium)}),$sudokuBoard.on("change",function(e){var s,t,a=$(e.target?e.target:e.srcElement),l=a.val(),i=a.attr("data-cell").split(","),o=i[0],r=i[1];a.removeClass().addClass(medium);try{showClashes&&(s=sudoku.getPossibleValuesForCell(sudoku.playersGrid,o,r,l),highlightClash(s.clash,o,r),markConflicts()),sudoku.playerInput(o,r,l),drawPuzzleDom(sudoku.playersGrid),sudoku.isComplete()&&sudoku.isSolved()&&(console.log("puzzle solved"),weHaveAWinner())}catch(u){t=formatCellValue(i[0],i[1]),a.val(t),console.log(u)}}),$sudokuBoard.on("focusout",function(e){var s,t,a=e.target?e.target:e.srcElement;if(!a.checkValidity())throw s=a.dataset.cell.split(","),t=formatCellValue(s[0],s[1]),$(a).val(t),{name:"invalidGuess",message:"a number between 1 and 9 is required"};$target=$(a),""===$target.val()&&$target.removeClass()});
