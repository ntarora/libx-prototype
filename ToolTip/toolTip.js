/**
 * Created by ntarora on 3/28/2017.
 */
require("./tooltipster.bundle.min.css");
require("./tooltipster-sideTip-light.min.css");
import addSummonHTML from './summonResultsAsHTML';
var tooltipster = require("./tooltipster.bundle.min")($);




/**
 * adds tool tip inside of the node
 * @param nodeName - id of the node adding the tool tip
 */
export default function addToolTip(nodeName) {


    // var $xisbnResult = $("&lt;p style='padding-top:5px;'&gt;");
    let isbn = $(`#${nodeName}`).text()
    var $lookup = $(`<p>Searching for ${isbn} in OCLC xISBN's database...</p>`)
    var $xisbnResult = $("<p style='padding-top:5px'>");

    $(`#${nodeName}`).tooltipster({
        content: [$lookup, $xisbnResult],
        theme: 'tooltipster-light',
        trigger: 'hover',
        interactive: true,
        contentAsHTML: true
    })
    getToolTipContent(isbn, $lookup, $xisbnResult)
}

function getToolTipContent(isbn, $lookup, $xisbnResult) {
    var cat = libx.edition.catalogs.primary;
    var url;
    if (cat.supportsSearchType('i')) {
        // this method handles xISBN if configured
        url = cat.linkByISBN(isbn);
    } else if (cat.supportsSearchType('Y')) {
        url = cat.makeKeywordSearch(isbn);
    } else {
        return;
    }
    libx.services.xisbn.getISBNMetadata({
        isbn: isbn,
        ifFound: function (text, metadata) {
            //write to the tool to tip when found
            $lookup.text(isbn + " refers to: " + text);
            //askForILL.note({metadata: metadata});
        },
        notFound: function () {
               // write to the tooltip not found
            $lookup.html("This ISBN is not known to OCLC. No metadata is available.");
        }
    });

    if (('summonproxyurl' in cat) || (cat.url.indexOf('summon.serialssolutions.com'))) {
        libx.services.xisbn.getISBNEditions({
            isbn: isbn,
            ifFound: function (editions) {

                var nEditions = editions.split(",").length;
                //write after editions have been found in summon write to the tool tip
                $xisbnResult.html(nEditions + " editions of this item have been published.");

                var $summon = $("<p>").text("Checking holdings of all editions in " + cat.name + "...");
                $xisbnResult.append($summon);


                var searchInputs = [];
                var searchInput = {};
                searchInput.searchTerms = editions.replace(/,/g, " ");
                searchInput.searchType = 'i';

                searchInputs.push(searchInput)
                for(var i = 0; i < searchInputs.length; i++)
                {
                    addSummonHTML($summon, searchInputs[i].searchTerms)
                }
            }
        });
    }
}


