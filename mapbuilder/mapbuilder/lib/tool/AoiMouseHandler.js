/*
Author:       Mike Adair mike.adairATccrs.nrcan.gc.ca
License:      GPL as per: http://www.gnu.org/copyleft/gpl.html

$Id$
*/

// Ensure this object's dependancies are loaded.
mapbuilder.loadScript(baseDir+"/tool/ToolBase.js");

/**
 * Tool which implements a click and drag behaviour to set the 
 * Area Of Interest on the model from mouse events.
 * The tool must be enabled before use by calling tool.enable(true);
 * This tool registers mouse event listeners on the parent widget.
 * This tool processes screen coordinates and stores AOI in geographic
 * coordinates.
 * @constructor
 * @base ToolBase
 * @param toolNode      The node for this tool from the configuration document.
 * @param model  The widget object that contains this tool
 */

function AoiMouseHandler(toolNode, model) {
  var base = new ToolBase(this, toolNode, model);

  /**
   * Process the mouseup action by stopping the drag.
   * @param objRef      Pointer to this object.
   * @param targetNode  The node for the enclosing HTML tag for this widget.
   */
  this.mouseUpHandler = function(objRef,targetNode) {
    if (objRef.enabled) {
      if (objRef.started) objRef.started = false;
    }
  }

  /**
   * Process the mousedown action by setting the anchor point.
   * @param objRef      Pointer to this object.
   * @param targetNode  The node for the enclosing HTML tag for this widget.
   */
  this.mouseDownHandler = function(objRef,targetNode) {
    if (objRef.enabled) {
      objRef.started = true;
      objRef.anchorPoint = targetNode.evpl;
      objRef.dragBox( targetNode.evpl );
    }
  }

  /**
   * Process a the mousemove action as dragging out a box.
   * @param objRef      Pointer to this object.
   * @param targetNode  The node for the enclosing HTML tag for this widget.
   */
  this.mouseMoveHandler = function(objRef,targetNode) {
    if (objRef.enabled) {
      if (objRef.started) objRef.dragBox(targetNode.evpl);
    }
  }

  /** Change the coordinate of one corner of the box.  The anchor point stays fixed. 
   * @param evpl    new corner coordinate.
   */
  this.dragBox = function( evpl ) {	
    var ul = new Array();
    var lr = new Array();
    if (this.anchorPoint[0] > evpl[0]) {
      ul[0] = evpl[0];
      lr[0] = this.anchorPoint[0];
    } else {
      ul[0] = this.anchorPoint[0];
      lr[0] = evpl[0];
    }
    if (this.anchorPoint[1] > evpl[1]) {
      ul[1] = evpl[1];
      lr[1] = this.anchorPoint[1];
    } else {
      ul[1] = this.anchorPoint[1];
      lr[1] = evpl[1];
    }

    //set new AOI in context
    ul = this.model.extent.getXY( ul );
    lr = this.model.extent.getXY( lr );
    this.model.setParam("aoi", new Array(ul,lr) );
  }

    this.model.addListener('mousedown',this.mouseDownHandler,this);
    this.model.addListener('mousemove',this.mouseMoveHandler,this);
    this.model.addListener('mouseup',this.mouseUpHandler,this);

}
