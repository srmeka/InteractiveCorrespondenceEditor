<HTML>
<HEAD><TITLE>ASP page to see all headers </TITLE></HEAD>
<BODY>

<%

Function GetAttribute(AttrName)
        Dim AllAttrs
        Dim RealAttrName
        Dim Location
        Dim Result
        
   
        AllAttrs = Server.HTMLEncode( Request.ServerVariables("ALL_HTTP") )
        RealAttrName = "HTTP_" & ucase(AttrName)

        Location = instr(AllAttrs, RealAttrName & ":")

        if Location <= 0 then
            GetAttribute = ""
            Exit Function
        end if

        Result = mid(AllAttrs, Location + Len(RealAttrName) + 1)

        Location = instr(Result, chr(10))
        if Location <= 0 then Location = len(Result) + 1

        GetAttribute = left(Result, Location - 1)
End Function

Response.Write "<B> All parameters: </B><PRE>" + Server.HTMLEncode(Request.ServerVariables("ALL_HTTP")) + "</PRE>"
Response.Write "<B> Login Name: </B>" + GetAttribute("SM_USER")

%>
<P>

REMOTE_USER: <%= Server.HTMLEncode(Request.ServerVariables("REMOTE_USER"))%>


</BODY>
</HTML>