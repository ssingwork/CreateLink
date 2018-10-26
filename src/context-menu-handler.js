
module.exports = class ContextMenuHandler {
  constructor(broker) {
    this.contextMenuIdList = {};
    this.broker = broker
  }

  initialize(formats) {
    this.updateContextMenus(formats)

    chrome.contextMenus.onClicked.addListener(this.onMenuItemClicked.bind(this))
    chrome.runtime.onMessage.addListener( this.onMessage.bind(this) )
  }

  onMessage(request, sender, sendResponse) {
    if ( request.request == 'updateFormats' ) {
      const formats = JSON.parse(request.formats)
      // options page requests upadting the items
      this.updateContextMenus(formats)
    }
  }

  formatIndexOfMenuItemId(menuItemId) {
    return this.contextMenuIdList[menuItemId]
  }

  onMenuItemClicked(info, tab) {
    //var formatId = this.formatIndexOfMenuItemId(info.menuItemId)
     alert("Clciked on "+JSON.stringify(info)); 
    // this.broker.sendMessage({
    //   request: 'copyInFormat',
    //   format: formatId,
    //   info: info,
    // }, tab)
    
  }

  updateContextMenus(formats) {
    chrome.contextMenus.removeAll();

    if (formats.length == 1) {
      chrome.contextMenus.create({
        "title": "Copy Link as " + formats[0].label,
        "id": "context-menu-item-0",
        "contexts": ["all"],
      });
    } else {
      for (var formatId = 0; formatId < formats.length; ++formatId) {
        var menuId = chrome.contextMenus.create({
          "title": formats[formatId].label,
          "id": formats[formatId].label,          
          "contexts": ["all"],
        });
        this.contextMenuIdList[menuId] = formatId;
      }
    }
  }
}
