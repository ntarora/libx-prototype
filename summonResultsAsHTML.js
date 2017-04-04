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
export default function addSummonHTML($placehodler, query) {
    let issummonprxyavail = 'summonproxyurl' in libx.edition.catalogs.primary;
    var issummonprxyavail = (tuple.summoncatalog.summonproxyurl != null);
if (!(libx.prefs.browser.showsummonwidget &amp;&amp; (libx.prefs.browser.showsummonwidget._value || !issummonprxyavail))) {

    var summonprxyurl = tuple.summoncatalog.summonproxyurl;

    libx.cache.defaultMemoryCache.get({
     url: summonprxyurl+"?s.q="+tuple.query,
     dataType: "json",
     success: function (data) {

        var title = '';
        var length = data.documents.length;

        if (length == 0) {
            return;
        }
        var displayResult = [];

        for (var i=0; i &lt; length;i++) {
            displayResult.push(data.documents[i]);
        }
        var $mesg = tuple.placeholder;
        var $cHead = $("&lt;div style='font-size: 16px;'&gt;&lt;b&gt;Search Results&lt;/b&gt;&lt;/div&gt;");
        var $cBody = $("&lt;div style='width:400px;height:250px;overflow-y:auto;overflow-x:hidden;'&gt;&lt;/div&gt;");
        var $cViewAll = $("&lt;div&gt;&lt;/div&gt;");

        $mesg.append($cHead);
        $mesg.append($cBody);

        $cBody.html('');
        for (var i =0;i&lt; displayResult.length; i++) {
            libx.space.write({
                 summonRecord: displayResult[i],
                 location :  $cBody
            });
        }

        $mesg.append($cViewAll);

        var summonUrl = tuple.summoncatalog.makeKeywordSearch(tuple.query);

        $cViewAll.append("&lt;div style='font-size: 13px;'&gt;&lt;b&gt;&lt;a href="+summonUrl+" style='color:#693232;'&gt;View Complete Results through Summon&lt;/a&gt;&lt;/b&gt;&lt;/div&gt;");
        libx.space.write({
            summonresult: $mesg,
            summondata: data,
            summoncatalog: tuple.summoncatalog,
            issummonwidget: false
        });
    }
});
} else {
    libx.space.write(tuple);

}
/**
 *
 * @param record : summonRecord, location
 */
function formatRecord(record)
{
    var doc = record.summonRecord;
    var $dst = record.location;
    var availPlaceholders = record.availabilityPlaceholders;

    function c(s) {
        return s.replace(/&lt;h&gt;/, "").replace(/&lt;\/h&gt;/, "");
    }

    var $l = $("&lt;div style='clear: both'&gt;");
    if (doc.thumbnail_m) {
        $l.append("&lt;img style='float:left; padding: 5px' src='" + doc.thumbnail_m + "'&gt;");
    }

    doc.ContentType &amp;&amp; $l.append($("&lt;b&gt;").text(doc.ContentType[0]));
    if (doc.Title) {
        $l.append(" ");
        $l.append($("&lt;a&gt;").text(c(doc.Title[0])).attr('href', doc.link));
        // TBD count clicks
        // TBD: in some cases, this leads to an abstract only.
    }

    if (doc.PublicationTitle) {
        $l.append(", ").append($("&lt;i&gt;").text(c(doc.PublicationTitle[0])));
    }

    /* PublicationDate may be 2012-00-00 if month/day is not known */
    doc.PublicationDate &amp;&amp; $l.append("; published " + doc.PublicationDate[0].replace("-00-00", ""));
    if (doc.availabilityId &amp;&amp; availPlaceholders) {
        $l.append("&lt;br /&gt;");
        $l.append(availPlaceholders[doc.availabilityId] = $("&lt;span&gt;"));
    }
    if (doc.inHoldings && doc.hasFullText && doc.link) {
        $l.append('&amp;nbsp;&lt;a href="' + doc.link + '"&gt;Full Text Available Online&lt;/a&gt;');
    }
    $l.append("&lt;hr width='80%'&gt;");
    $dst.append($l);
}