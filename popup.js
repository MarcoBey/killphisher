/*global chrome */

(function () {
    var curTab;

    var handleTabInfo = function(response) {
        if (!response) {
            return;
        }
        console.log(response);
        if (response.status === "greenflagged") {
            document.getElementById('kp-remove-from-whitelist').style.display = 'block';
            document.getElementById('kp-add-to-whitelist').style.display = 'none';
            //document.getElementsByClassName('optsCurrent')[0].style.display = 'block';
        } else {
            document.getElementById('kp-add-to-whitelist').style.display = 'block';
        }
    }

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        curTab = tabs[0];
        console.log("Current tab : ", curTab);
        if (isSpecialTab(curTab.url)) {
            chrome.runtime.sendMessage({op: "update_info", curtab: curTab, status: tab_status.NA});
        } else {
            chrome.runtime.sendMessage({op: "get_tabinfo", curtab: curTab}, handleTabInfo);
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('kp-add-to-whitelist').addEventListener('click', function (e) {
            var site = stripQueryParams(curTab.url);
            chrome.runtime.sendMessage({ op: 'addToWhitelist', currentTab: curTab, site: site});
            window.close();
        });
        document.getElementById('kp-remove-from-whitelist').addEventListener('click', function (e) {
            var site = stripQueryParams(curTab.url);
            chrome.runtime.sendMessage({ op: 'removeFromWhitelist', site: site});
            window.close();
        });
        document.getElementById('settingsLink').addEventListener('click', function (e) {
            chrome.tabs.create({
                url: chrome.extension.getURL('option.html')
            });
            window.close();
        });

    });
}());
