$.fn.xpathEvaluate = function (xpathExpression) {
    // NOTE: vars not declared local for debug purposes
    $this = this.first(); // Don't make me deal with multiples before coffee

    // Evaluate xpath and retrieve matching nodes
    xpathResult = this[0].evaluate(xpathExpression, this[0], null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    result = [];
    while (elem = xpathResult.iterateNext()) {
        result.push(elem);
    }

    $result = jQuery([]).pushStack(result);
    return $result;
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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


// content.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {

            // это Англуляр страница - ждем ее загрущку
            setTimeout(function () {
                    //

                    var texts = $("tr.presents_stud").map(function () {
                        if ($(this).find(".was-yes.ng-hide").length > 0) {
                            console.log('ОТСУСТВУЕТ');
                            return null;
                        }
                        return parseInt($(this).find("td.number").text());
                    });

                    console.log(texts);


                    for (let i = 0; i < texts.length; i++) {
                        setTimeout ( function () {


			    // ШАГ 001 проводжим ресерч - в строке студента находим ID будущего сгенерированного дропдауна DIV динамический
                            let p = $(document).xpathEvaluate(`//html/body/main/div[1]/div/div[3]/div[1]/div[2]/div[4]/div[2]/table/tbody/tr[${texts[i]}]/td[6]/div/md-input-container/md-select`);
                            //
                            let idpar = p[0].attributes["aria-owns"].value;


                            // ШАГ 002 вызываем дропдаун меню с оценками
			    // в этот момент в DOM выводится DIV дропдауна с оценками (он динамический) дропдауге по ID => idpar
                            $(document).xpathEvaluate(`//html/body/main/div[1]/div/div[3]/div[1]/div[2]/div[4]/div[2]/table/tbody/tr[${texts[i]}]/td[6]/div/md-input-container/md-select/md-select-value`).click();
				

			    // ШАГ 003 кликаем на оценке в дропдауге по ID => idpar
                            setTimeout(function () {
                                $("#" + idpar).find("md-option")[getRandomArbitrary(2, 6)].click();
                            }, i * 600); // время в мс

                        }, i * 500); // время в мс
                    }


                    texts = shuffle(texts);

                    var max = 16;
                    // снимаем кристалы у всех
                    for (let i = 1; i <= max; i++) {
                        setTimeout(function () {
                            $(document).xpathEvaluate(`//html/body/main/div[1]/div/div[3]/div[1]/div[2]/div[4]/div[2]/table/tbody/tr[${i}]/td[7]/span[4]`).click();
                            console.log("СНЯЛ ! " + i);
                        }, 1000); // время в мс
                    }


                    // радаем 5 кристалов в несколько пролходов 15 кристалов т.к. могут быть отсвующие и некоторым кристл кликается даважды
                    for (let i = 0; i <= 4; i++) {
                        setTimeout(function () {
                            $(document).xpathEvaluate(`//body/main/div[1]/div/div[3]/div[1]/div[2]/div[4]/div[2]/table/tbody/tr[${texts[i]}]/td[7]/span[1]`).click();
                            console.log("Отдал ! " + texts[i]);
                        }, 1000); // время в мс
                    }


                }, 1
            ); // время в мс


        }
    }
);


