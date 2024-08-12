<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/">
    <Root>
      <xsl:call-template name="getDocuments"/>
    </Root>
  </xsl:template>

  <xsl:template name="getDocuments">
    <xsl:param name="fileStartWith" select="'GC '"/>
    <xsl:param name="endCounter">760</xsl:param>
    <xsl:param name="startCounter">1</xsl:param>
    <xsl:choose>
      <xsl:when test="$endCounter > 0">
        <xsl:variable name="fileName">
          <xsl:value-of select="concat($fileStartWith ,'(',$startCounter,').xml')"/>
        </xsl:variable>
        
        <xsl:for-each select="document($fileName)/*">

          <xsl:if test="//DocumentConfig/FieldConfigSections/FieldConfigSection/Output/Part[@xmlOutNode = 'INBND_DOCTYPE']/@text != ''">
          <DocumentRoot>
            <InboundDocType>              
              <xsl:apply-templates select="//DocumentConfig/FieldConfigSections/FieldConfigSection/Output/Part[@xmlOutNode = 'INBND_DOCTYPE']/@text"/>
            </InboundDocType>
            <DocumentName>
              <xsl:apply-templates select="//DocumentConfig/FieldConfigSections/FieldConfigSection/Output/Part[@xmlOutNode = 'LTR_NAME']/@text"/>
            </DocumentName>
          </DocumentRoot>

          </xsl:if>
        </xsl:for-each>
        
        <xsl:call-template name="getDocuments">
          <xsl:with-param name="startCounter" select="$startCounter + 1"/>
          <xsl:with-param name="fileStartWith" select="$fileStartWith"/>
          <xsl:with-param name="endCounter" select="$endCounter - 1"/>
        </xsl:call-template>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
