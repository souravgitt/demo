var speed = 100;

$("#filter").keyup(function() {
  clear();
  
  var $list = $('.list');
  var menus = $("a");
  
  var filter = $(this).val(); // get the value of the input, which we filter on
  write('\n\nfilter=' + filter);
  
  if (filter) {
    var $matchFilter = 'a:Contains(' + filter + ')';
    var $matchedLinks = $list.find($matchFilter);
    var $unmatchedFilter = 'a:not(' + $matchFilter + ')';
    var $unmatchedLinks = $list.find($unmatchedFilter);
             
    write('\nmatched links: ');
    $.each($matchedLinks, function(index, value) {
      write(value.text + ',');
    });        
    write('\nunmatched links: ');
    $.each($unmatchedLinks, function(index, value) {
      write(value.text + ',');
    });
    
    $matchedItems = $matchedLinks;
    $matchedGroups = $matchedLinks.closest('li.group');
    $matchedSubgroups = $matchedLinks.closest('li.subgroup');
    
    // $list.find('li.subgroup li').not($matchedItems).css({"color": "red"});
    // $list.find('li.subgroup').not($matchedSubgroups).css({"color": "red"});
    // $list.find('li.group').not($matchedGroups).css({"color": "red"});
    
    write('\n');    
    $matchedItems.find('a').each(function () {
        var text  = $(this).text();   
        var startIndex = text.toLowerCase().indexOf(filter.toLowerCase());
        var html = text.substr(0, startIndex) + 
            '<b>' + text.substr(startIndex, filter.length) + '</b>' +
            text.substr(startIndex + filter.length);
        $(this).html(html);
    });
    
    $("ul").removeClass("open").parent().removeClass("active");
    $("li").removeClass("active");
    $.each(menus, function(ind, item) {
      var trimText = $(item).text().toLowerCase().trim();
      if(trimText === filter.toLowerCase()) {
        $("a").css({'color': ''});
        $(item).parents("li").addClass("active");
        $(item).parents("ul").addClass("open");
        if($(item).next("ul")) {
          $(item).next("ul").addClass("open");
        }
        return;
      } else {
        return;
      }
    })
    $matchedGroups.parents("ul").addClass("open") ;
  } else {
    $matchedItems.parent("li").css({"color": ""});
    $matchedSubgroups.parent("li").css({"color": ""});
    $matchedGroups.parent("li").css({"color": ""});
    $list.find('li').slideDown(speed).css({"color": ""});
    $list.find('b').contents().unwrap();
  }
});

jQuery.expr[':'].Contains = function (a, i, m) {
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

function write(msg) {
  $('#output').append(msg);
}

function clear() {
  $('#output').text("");
}