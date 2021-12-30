// Inspired by @SithNode.Eth on Twitter 
// add more addresses and separate with comma ","
var wallets = ["0xwalletAddress"]; 

var widget;
if (config.runsInWidget) {
    widget = new ListWidget();
    widget.backgroundColor=new Color("#222222");
}

var n = 0;
while (n < wallets.length) {
    const address = wallets[n];
    if (config.runsInWidget) { // print address
        const title = widget.addText(address);
        title.textColor = Color.white();
        title.textOpacity = 0.8;
        title.font = new Font("Helvetica-Light ", 10);
        widget.addSpacer(4);
    }
    var balance_url = "https://openapi.debank.com/v1/user/token_list?is_all=true&id="+address;
    var req = new Request(balance_url);
    const data = await req.loadJSON();
    console.log(data);
    var resp = data;
    resp.forEach(token => {
        if (config.runsInWidget) { // print address
            const strongtext = widget.addText(`${token.symbol}: ${token.amount.toFixed(2)}`);
            strongtext.textColor = Color.white();
            strongtext.font = new Font("Courier", 14);
            widget.addSpacer(2);
            const usdtext = widget.addText(`USD: ${(token.amount * token.price).toFixed(2)}`);
            usdtext.textColor = Color.white();
            usdtext.font = new Font("Courier", 14);    
            widget.addSpacer(2);
        }
    });
    n += 1;
}

if (config.runsInWidget) {
    Script.setWidget(widget);
    Script.complete();
    widget.presentMedium()
}
