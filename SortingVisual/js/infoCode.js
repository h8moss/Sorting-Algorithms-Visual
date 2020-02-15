$(document).ready(function() {
    let infoButton = $("#infoButton");
    let SortingSelect = $("#AlgorithmSelect");
    let CloseLightBoxButton = $("#CloseLightBox");
    let LighBoxcaption = $("#LighBoxcaption");
    let LightBoxContent = $("#LightBoxContent");
    infoButton.click(function() {
        let CurrentSort = SortingSelect.val();
        let LearnMore;
        LighBoxcaption.text(CurrentSort);
        console.log(CurrentSort);
        LightBoxContent.text("");
        for (let alg of algorithms) {
            if (alg.name === CurrentSort) {
                LightBoxContent.text(alg.Info);
                LearnMore = $("<a> Learn more...</a>");
                LearnMore.attr("target", "_blank");
                LearnMore.attr("rel", "noopener noreferrer");
                LearnMore.attr("href", alg.WikiLink);
                LightBoxContent.append(LearnMore);
            }
        }
        $("#MainLightbox").attr("style", "display: block;");
    });
    CloseLightBoxButton.click(function() {
        $("#MainLightbox").attr("style", "display: none;");
    });
});
