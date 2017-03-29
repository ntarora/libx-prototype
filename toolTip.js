/**
 * Created by ntarora on 3/28/2017.
 */
require("./tooltipster.bundle.min.css");
var tooltipster = require("./tooltipster.bundle.min")($);


export default function addToolTip(nodeName){
    var $node = $(`#${nodeName}`)
    $node.tooltipster({
        content: 'tooltip Test',
        theme: 'tooltipster-light',
        trigger: 'hover'
    })
    console.log($node)
}