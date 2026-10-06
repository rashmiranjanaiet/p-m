(function () {
  "use strict";

  var corrections = [
    ["Want To Shift House / Office? Share Your Details here", "Want to shift house/office? Share Your Details Here"],
    ["For all queries contact at", "For all queries, contact us at"],
    ["To Place your Advertisement", "To Place Your Advertisement"],
    ["Packers Movers", "Packers and Movers"],
    ["Packer and Movers", "Packers and Movers"],
    ["a online", "an online"],
    ["all kind of", "all kinds of"],
    ["product or services", "products or services"],
    ["business in getting", "businesses in gaining"],
    ["on internet", "on the internet"],
    ["service needy", "service seekers"],
    ["custom plan based on your requirement", "custom plans based on your requirements"],
    ["number of listing", "number of listings"],
    ["In the recent time people asking for", "Recently, people have been asking for"],
    ["has been on top demand", "has been in high demand"],
    ["higher and furniture", "high-end furniture"],
    ["various location", "various locations"],
    ["would mostly required", "would mostly require"],
    ["as an I am being", "as I am"],
    ["according to the requirement", "according to the requirements"],
    ["Sachin Debu write a review", "Sachin Debu wrote a review"],
    ["Check best House", "Check the best house"],
    ["YOU LOOKING for ?", "ARE YOU LOOKING for the best"],
    ["So as you planning house", "As you are planning a house"],
    ["We have outsource", "We have outsourced"],
    ["perfectly handle by them", "handled perfectly by them"],
    ["any of the query", "any query"],
    ["leading leaders", "leading companies"],
    ["to within local", "within the local"],
    ["online Booking", "online booking"],
    ["present Trend", "present trend"],
    ["will meet so easy", "will be very easy"],
    ["Whatsapp", "WhatsApp"],
    ["15 minute response time", "15-minute response time"],
    ["with gave", "and gave"],
    ["completely shift your belonging", "completely shift your belongings"],
    ["is the top player", "are the top players"],
    ["experts team", "expert team"],
    ["safe and secured", "safe and secure"],
    ["acclaimed for taking", "were acclaimed for taking"],
    ["They reliable service", "They provided reliable service"],
    ["it ensure", "it ensures"],
    ["The staffs", "The staff"],
    ["Expertsâ€™ team", "The experts’ team"],
    ["â€œ", "“"],
    ["â€“", "–"],
    ["in depth", "in-depth"],
    ["house hold", "household"],
    ["taken at most care", "taken utmost care"],
    ["many a times", "many times"],
    ["cope up", "cope with"],
    ["I m found", "I found"],
    ["a businessmen", "a businessman"],
    ["what saap", "WhatsApp"],
    ["whatsaap", "WhatsApp"],
    ["cent percent", "100 percent"],
    ["1rst", "1st"],
    ["15 th", "15th"],
    ["these type of works", "this type of work"],
    ["on the most affordable prices", "at the most affordable prices"],
    ["are one of the highly recognized firms", "is one of the highly recognized firms"],
    ["which are applied", "that apply"],
    ["according to it", "accordingly"],
    ["a very less amount of time", "very little time"],
    ["any type of queries", "any type of query"],
    ["one of my employees suggests", "one of my employees suggested"],
    ["transport it to my new office", "transported it to my new office"],
    ["as compare to others", "compared with others"],
    ["they fully assure me", "they assured me"],
    ["decision done by me", "decision I made"],
    ["Firstly I was thinking to drive it to by myself", "At first, I thought about driving it myself"],
    ["I skip the plan", "I skipped the plan"],
    ["take the car for its packing", "took the car for packing"],
    ["tell me their whole procedure", "told me their whole procedure"],
    ["in the future it gets a chance", "if I get the chance"],
    ["After searing a lot", "After searching a lot"],
    ["any of my item", "any of my items"],
    ["huge appreciations", "many thanks"],
    ["My bike faces no damage to its any part", "My bike sustained no damage to any part"],
    ["I choose this company", "I chose this company"],
    ["did my whole house packing and moving is very less time", "packed and moved my whole house in very little time"],
    ["packaging and movement of my bike", "packaging and moving of my bike"],
    ["They did it very accurately and pack the bike", "They did it very accurately and packed the bike"],
    ["clients brief", "clients’ needs"],
    ["charges very fewer amounts", "charges much less"],
    ["transportation works", "transportation work"]
  ];

  corrections.sort(function (first, second) {
    return second[0].length - first[0].length;
  });

  function shouldSkip(node) {
    var parent = node.parentElement;
    if (!parent || !node.nodeValue.trim()) {
      return true;
    }
    if (parent.closest(".spelling-correction")) {
      return true;
    }
    return ["SCRIPT", "STYLE", "NOSCRIPT", "TITLE"].indexOf(parent.tagName) !== -1;
  }

  function correctTextNode(node) {
    if (shouldSkip(node)) {
      return;
    }

    var text = node.nodeValue;
    var fragments = [];
    var cursor = 0;
    var changed = false;

    while (cursor < text.length) {
      var match = null;

      corrections.forEach(function (correction) {
        var index = text.indexOf(correction[0], cursor);
        if (index === -1) {
          return;
        }
        if (!match || index < match.index || (index === match.index && correction[0].length > match.correction[0].length)) {
          match = { index: index, correction: correction };
        }
      });

      if (!match) {
        break;
      }

      if (match.index > cursor) {
        fragments.push(document.createTextNode(text.slice(cursor, match.index)));
      }

      var correctionSpan = document.createElement("span");
      correctionSpan.className = "spelling-correction";
      correctionSpan.title = "Previous text: " + match.correction[0];
      correctionSpan.setAttribute("aria-label", "Corrected text: " + match.correction[1] + ". Previous text: " + match.correction[0]);
      correctionSpan.textContent = match.correction[1];
      fragments.push(correctionSpan);
      cursor = match.index + match.correction[0].length;
      changed = true;
    }

    if (!changed) {
      return;
    }

    if (cursor < text.length) {
      fragments.push(document.createTextNode(text.slice(cursor)));
    }

    var replacement = document.createDocumentFragment();
    fragments.forEach(function (fragment) {
      replacement.appendChild(fragment);
    });
    node.parentNode.replaceChild(replacement, node);
  }

  function applyCorrections() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }
    nodes.forEach(correctTextNode);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCorrections);
  } else {
    applyCorrections();
  }
})();
