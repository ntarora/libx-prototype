/**
 * Created by ntarora on 3/28/2017.
 */
require("./tooltipster.bundle.min.css");
require("./tooltipster-sideTip-light.min.css");
var tooltipster = require("./tooltipster.bundle.min")($);


/**
 * adds tool tip inside of the node
 * @param nodeName - id of the node adding the tool tip
 */
export default function addToolTip(nodeName) {

    // var $lookup = $("&lt;p&gt;Searching for " + "ISBN" + " in OCLC xISBN's database...&lt;/p&gt;");
    // var $xisbnResult = $("&lt;p style='padding-top:5px;'&gt;");

    $(`#${nodeName}`).tooltipster({
        content: [`${$lookup.html()}`, `${$xisbnResult.html()}`],
        theme: 'tooltipster-light',
        trigger: 'hover',
        interactive: true

    })


}
// function getToolTipConent(isbn) {
//     var cat = libx.edition.catalogs.primary;
//     var url;
//     var lookupString;
//     var xisbnResultString =
//     if (cat.supportsSearchType('i')) {
//         // this method handles xISBN if configured
//         url = cat.linkByISBN(isbn);
//     } else if (cat.supportsSearchType('Y')) {
//         url = cat.makeKeywordSearch(isbn);
//     } else {
//         return;
//     }
//     libx.services.xisbn.getISBNMetadata({
//         isbn: isbn,
//         ifFound: function (text, metadata) {
//             $lookup.text(tuple.isbn + " refers to: " + text);
//             askForILL.note({metadata: metadata});
//         },
//         notFound: function () {
//             $lookup.html("This ISBN is not known to OCLC. No metadata is available.");
//         }
//     });
//
//     if (('summonproxyurl' in cat) || (cat.url.indexOf('summon.serialssolutions.com') &gt; 0)) {
//         libx.services.xisbn.getISBNEditions({
//             isbn: tuple.isbn,
//             ifFound: function (editions) {
//
//                 var nEditions = editions.split(",").length;
//                 $xisbnResult.html(nEditions + " editions of this item have been published.");
//
//                 var $summon = $("&lt;p&gt;").text("Checking holdings of all editions in " + cat.name + "...");
//                 $xisbnResult.after($summon);
//
//                 var searchInputs = [];
//                 var searchInput = {};
//                 searchInput.searchTerms = editions.replace(/,/g, " ");
//                 searchInput.searchType = 'i';
//
//                 searchInputs.push(searchInput);
//                 var output = {
//                     searchparams: searchInputs,
//                     placeholder: $summon
//                 };
//
//                 libx.space.write(output);
//                 libx.space.write({issearchlibapp: false});
//
//             }
//         });
//     }
// }


