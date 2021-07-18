function setPage(url) {
    document.querySelector("#iframe").remove();
    document.querySelector(".component-viewer").innerHTML = "";
    let iFrame = ` <iframe id="iframe" src="${url}" frameborder="0"></iframe>`

    document.querySelector(".component-viewer").insertAdjacentHTML('beforeend', iFrame);
    setTimeout(function() {
        var iframeID = document.getElementById("iframe");
        var iframeCW = (iframeID.contentWindow || iframeID.contentDocument);
        //let doc = iframeID.contentDocument;

        var link = document.createElement("link");
        link.href = 'css/frame.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        iframeCW.document.head.appendChild(link);

        var appScript = document.createElement("script");
        appScript.src = 'js/jquery.min.js';
        appScript.type = 'text/javascript';
        iframeCW.document.body.appendChild(appScript);

        var iframeResizer = document.createElement("script");
        iframeResizer.src = 'js/iframeResizer.contentWindow.js';
        iframeResizer.type = 'text/javascript';
        iframeCW.document.body.appendChild(iframeResizer);

        var demoScript = document.createElement("script");
        demoScript.src = 'js/demo.js';
        demoScript.type = 'text/javascript';
        iframeCW.document.body.appendChild(demoScript);
        iFrameResize({ 
            log: false, // Enable console logging
            enablePublicMethods: true, // Enable methods within iframe hosted page
            enableInPageLinks: true, 
        }, '#iframe');
    }, 70)
}  

$(document).ready(function() {

    //Change Html Page in iframe
    setPage("Lilly Capability from IIoT Applied Architecture.html");

    iFrameResize({ 
        log: true, // Enable console logging
        enablePublicMethods: true, // Enable methods within iframe hosted page
        enableInPageLinks: true, 
    }, '#iframe');
    // Change Html Page in iframe End

    // Multilevel Menu
    const list = document.querySelectorAll("li");
    const pageTitle = document.querySelector(".component-viewer-title h1");

    for(let i = 0; i < list.length; i++) {
        if(list[i].children[1]) {
            list[i].children[0].classList.add("collapse");
        }
    }

    var getSiblings = function (elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstElementChild;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
    };

    function remove(elm) {
        for (let i of getSiblings(elm)) {
            if(i.children[0].nextSibling === null) {
                i.classList.remove("active");
                pageTitle.innerHTML = "";
            } else {
                if (i.children[0].nextElementSibling === null) {
                    i.classList.remove("active");
                } else {
                    if(i.children[1].classList.contains("open")) {
                        i.children[1].classList.remove('open');
                        i.classList.remove("active");
                        pageTitle.innerHTML = "";
                        if(i.children[1].nextSibling === null) {
                            i.classList.remove("active");
                            pageTitle.innerHTML = "";
                        }
                        for (let j of i.children[1].children) {
                            if (j.children[1] !== undefined && j.children[1].classList.contains('open')) {
                                j.children[1].classList.remove('open')
                            }
                            if(j.children[0].nextSibling === null) {
                                j.classList.remove("active");
                                pageTitle.innerHTML = "";
                            }
                        }
                    }
                }
            }
        }
        if (elm.parentNode.classList.contains('open')) {
            return
        }
    }

    function multiLevelMenu() {
        for (let abc of list) {
            abc.addEventListener('click', function (e) {
                e.stopPropagation();
                remove(this);
                if(this.children[0].nextElementSibling === null) {
                    this.classList.add("active");
                    pageTitle.innerHTML = this.children[0].innerHTML;
                } else {
                    if (this.children[0].nextElementSibling !== null) {
                        if (this.children[1].classList.contains('open')) {
                            this.children[1].classList.remove('open');
                            this.classList.remove('active');
                            pageTitle.innerHTML = "";
                        } else {
                            this.children[1].classList.add('open');
                            this.classList.add("active");
                            pageTitle.innerHTML = this.children[0].innerHTML;
                        }
                    } 
                }
            })
        }
    }

    multiLevelMenu();

    // Multilevel Menu End

})