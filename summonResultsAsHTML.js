/**
 * Created by ntarora on 4/3/2017.
 *
 * Adjusted for new framework
 *  <entry xmlns:libx="http://libx.org/xml/libx2">
 <id>http://libx.org/libx2/libapps/336</id>
 <title>Display Summon Proxy Results</title>
 <updated>2013-04-22T14:36:06-04:00</updated>
 <author>
 <name>LibX Team</name>
 <uri>http://libx.org/</uri>
 <email>libx.editions@gmail.com</email>
 </author>
 <content type="html">This module is used to fetch and render the search results from the summon proxy service. The data is first fetched from summon proxy, then it is looped over and HTML is constructed with the help of ‘Format a Summon Result Record’ and is added to the placeholder.</content>
 <libx:module>
 */
export default function addSummonHTML($placeholder, queryS) {
    let issummonprxyavail = 'summonproxyurl' in libx.edition.catalogs.primary;
    if (!(libx.prefs.browser.showsummonwidget && (libx.prefs.browser.showsummonwidget._value || !issummonprxyavail))) {

        let summonprxyurl = libx.edition.catalogs.primary.summonproxyurl;
        let query = queryS.split(" ")[0]
        libx.cache.defaultMemoryCache.get({
            url: summonprxyurl + "?s.q=" + query,
            dataType: "json",
            success: function (data) {
                var title = '';
                var length = data.documents.length;

                if (length == 0) {
                    return;
                }
                var displayResult = [];

                for (var i = 0; i < length; i++) {
                    displayResult.push(data.documents[i]);
                }
                var $mesg = $placeholder;
                var $cHead = $("<div style='font-size: 16px;'><b>Search Results</b></div>");
                var $cBody = $("<div style='width:400px;height:250px;overflow-y:auto;overflow-x:hidden;'></div>");
                var $cViewAll = $("<div></div>");

                $mesg.append($cHead);
                $mesg.append($cBody);

                $cBody.html('');
                for (var i = 0; i < displayResult.length; i++) {
                    formatRecord({
                        summonRecord: displayResult[i],
                        location: $cBody
                    });
                }
                $mesg.append($cViewAll);

                var summonUrl = libx.edition.catalogs.primary.makeKeywordSearch(query);

                $cViewAll.append("<div style='font-size: 13px;'><b><a href=" + summonUrl + " style='color:#693232;'>View Complete Results through Summon</a></b></div>");
            }
        });
    }
    else {
                //libx.space.write(tuple);
    }
}

/**
 *
 * @param record : summonRecord, location
 */
function formatRecord(record) {
    var doc = record.summonRecord;
    var $dst = record.location;
    var availPlaceholders = record.availabilityPlaceholders;

    function c(s) {
        return s.replace(/<h>/, "").replace(/<\/h>/, "");
    }

    var $l = $("<div style='clear: both'>");
    if (doc.thumbnail_m) {
        $l.append("<img style='float:left; padding: 5px' src='" + doc.thumbnail_m + "'>");
    }

    doc.ContentType && $l.append($("<b>").text(doc.ContentType[0]));
    if (doc.Title) {
        $l.append(" ");
        $l.append($("<a>").text(c(doc.Title[0])).attr('href', doc.link));
        // TBD count clicks
        // TBD: in some cases, this leads to an abstract only.
    }

    if (doc.PublicationTitle) {
        $l.append(", ").append($("<i>").text(c(doc.PublicationTitle[0])));
    }

    /* PublicationDate may be 2012-00-00 if month/day is not known */
    doc.PublicationDate && $l.append("; published " + doc.PublicationDate[0].replace("-00-00", ""));
    if (doc.availabilityId && availPlaceholders) {
        $l.append("<br />");
        $l.append(availPlaceholders[doc.availabilityId] = $("<span>"));
    }
    if (doc.inHoldings && doc.hasFullText && doc.link) {
        $l.append('&nbsp;<a href="' + doc.link + '">Full Text Available Online</a>');
    }
    $l.append("<hr width='80%'>");
    $dst.append($l);
}