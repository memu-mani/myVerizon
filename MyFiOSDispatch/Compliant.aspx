<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Compliant.aspx.cs" Inherits="MyFiOSDispatch.Compliant" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <span> Select your problem </span>
    <span><asp:DropDownList ID="ddProblemType" runat="server">
        <asp:ListItem>--Select--</asp:ListItem>
        <asp:ListItem>TV not working</asp:ListItem>
        <asp:ListItem>Internet not working</asp:ListItem>
        <asp:ListItem>Other issue</asp:ListItem>
          </asp:DropDownList> </span>
    </div>
        <div>
            <span>
         <asp:Button runat="server" ID="btnSubmit" Text="Submit" />
                </span>
            <span>
                 <asp:Button runat="server" ID="btnCancel" Text="Cancel" />

            </span>

        </div>
    </form>
</body>
</html>
