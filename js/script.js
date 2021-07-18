var pageUrl = "";
var pageId = 0;

// initialize page rendering on page load
$(function() {
    includeHTmlFile();
})

// render html file into same html file
function includeHTmlFile(pageUrl) {
    if(pageId > 0) {
        $(".pageView").attr("include-html", pageUrl+".html");
        $(".pageView").attr("id", "pageHTML"+pageId);
    }
    
    $("*[include-html]").each(function(){
        var t = $(this).attr("include-html"),
            u = this.id;
        jQuery.ajax({
            url: t,
            success: function(t) {
                $("#" + u).html(t)
            },
            error: function(n,c,i) {
                var s = n.status + ": " + n.statusText;
                $("#" + u).html(t + "-" + s)
            }
        })
    })
    
}

$(document).ready(function() {

    // Multilevel Menu
    const list = document.querySelectorAll("li");
    const listMenus = document.querySelectorAll(".list a");
    const pageTitle = document.querySelector(".component-viewer-title h1");
    pageUrl = pageTitle.textContent;

    // add class collapse to all span
    for(let i = 0; i < list.length; i++) {
        if(list[i].children[1]) {
            list[i].children[0].classList.add("collapse");
        }
    }

    // check for siblings
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

    // remove class from all li and links
    function remove(elm, e) {
        for (let i of getSiblings(elm)) {
            if(i.children[0].nextSibling === null) {
                i.classList.remove("active");
            } else {
                if (i.children[0].nextElementSibling === null) {
                    i.classList.remove("active");
                } else {
                    if(i.children[1].classList.contains("open")) {
                        i.children[1].classList.remove('open');
                        i.classList.remove("active");
                        if(i.children[1].nextSibling === null) {
                            i.classList.remove("active");
                        }
                        for (let j of i.children[1].children) {
                            if (j.children[1] !== undefined && j.children[1].classList.contains('open')) {
                                j.children[1].classList.remove('open')
                            }
                            if(j.children[0].nextSibling === null) {
                                j.classList.remove("active");
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

    // add class on click
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
                        } else {
                            this.children[1].classList.add('open');
                            this.classList.add("active");
                            pageTitle.innerHTML = this.children[0].innerHTML;
                        }
                    } 
                }
            })
        }

        // get nav link text and passing in include HTML file function
        $.each(listMenus, function(ind, currentMenu) {
            currentMenu.addEventListener('click', function(e) {
                pageUrl = $(this).text().trim(); // get text and remove white space around sentence
                pageId++; 
                includeHTmlFile(pageUrl);
            })
        })
    }

    multiLevelMenu();
    // Multilevel Menu End

})