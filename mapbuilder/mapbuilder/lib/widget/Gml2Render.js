/*
Author:       Cameron Shorter cameronAtshorter.net
License:      GPL as per: http://www.gnu.org/copyleft/gpl.html

$Id$
*/

// Ensure this object's dependancies are loaded.
mapbuilder.loadScript(baseDir+"/widget/WidgetBase.js");

/**
 * Widget to render a map from an OGC context document.
 * This widget extends WidgetBase.
 * If the widget has the fixedWidth property set to true, then the width of the
 * Gml2Render will be taken from the width of the HTML element.  Height will be set
 * to maintain a constant aspect ratio.
 * This widget implements listeners for all mouse event types so that tools can
 * define mouse event callbacks.
 * @constructor
 * @param widgetNode  The widget's XML object node from the configuration document.
 * @param model       The model object that this widget belongs to.
 */
function Gml2Render(widgetNode, model) {
  // Inherit the WidgetBase functions and parameters
  var base = new WidgetBase(widgetNode, model);
  for (sProperty in base) { 
    this[sProperty] = base[sProperty]; 
  } 

  /** Id of <DIV> tag which contains the Gml2Render HTML. The <DIV> tag is built
   *  by Gml2Render.xsl. */
  //this.containerId = "Gml2Render_"+model.id;
  //OR get the MapPane container ID?


  /**
   * Override the WidgetBase pint() method to use wz_graphics to draw the features
   */
  this.paint=function(){
    //paint the features and append them to this.node
    alert("render GML here");
  }


}