<?xml version="1.0" encoding="ISO-8859-1"?>
<!--
Description: transforms an OWS Context document Coverage resource element into
             the request string (HTTP GET only for now)
Author:      adair
Licence:     GPL as specified in http://www.gnu.org/copyleft/gpl.html .

$Id: wms_GetMap.xsl,v 1.6 2005/04/25 21:13:18 madair1 Exp $
$Name:  $
-->

<xsl:stylesheet version="1.0" 
    xmlns:wmc="http://www.opengis.net/context" 
    xmlns:mb="http://mapbuilder.sourceforge.net/mapbuilder" 
    xmlns:param="http;//www.opengis.net/param"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
    xmlns:xlink="http://www.w3.org/1999/xlink">

  <xsl:output method="xml"/>
  <xsl:strip-space elements="*"/>

  <xsl:param name="bbox"/>
  <xsl:param name="width"/>
  <xsl:param name="height"/>
  <xsl:param name="srs"/>
  <xsl:param name="version"/>
  
  <xsl:template match="wmc:Coverage">
    <GetCoverage>
      <mb:QueryString>
        <xsl:variable name="src">    
      VERSION=<xsl:value-of select="$version"/>
 &amp;REQUEST=GetCoverage
 &amp;SERVICE=WCS
     &amp;CRS=<xsl:value-of select="$srs"/>
    &amp;BBOX=<xsl:value-of select="$bbox"/>
   &amp;WIDTH=<xsl:value-of select="$width"/>
  &amp;HEIGHT=<xsl:value-of select="$height"/>
&amp;COVERAGE=<xsl:value-of select="wmc:Name"/>
  &amp;FORMAT=<xsl:value-of select="wmc:FormatList/wmc:Format[@current='1']"/>
        <xsl:for-each select="wmc:DimensionList/wmc:Dimension">
&amp;<xsl:value-of select="@name"/>=<xsl:value-of select="."/>
        </xsl:for-each>
        <xsl:for-each select="wmc:ParameterList/wmc:Parameter">
&amp;<xsl:value-of select="param:kvp/@name"/>=<xsl:value-of select="param:kvp/@value"/>          
        </xsl:for-each>
        </xsl:variable>
        <xsl:value-of select="translate(normalize-space($src),' ', '' )" disable-output-escaping="no"/>
      </mb:QueryString>
    </GetCoverage>
  </xsl:template>
  
  <xsl:template match="text()|@*"/>

</xsl:stylesheet>
