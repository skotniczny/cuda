// Hamburger Button 
$mainMenu = $(".main-menu");
$mainMenu.addClass('hidden');

$("#hamburger").on('click', function() {
  $mainMenu.toggleClass("hidden");
});

// More Button
$("#more-projects").on("click", function(event) {
  event.preventDefault();
  var category = $("button.active")[0].id;
  var $hiddenProjects = $(".project.hidden");
  if (category !== "all") {
    $hiddenProjects = $hiddenProjects.filter(function() {
    return $(this).data("cat") === category ;
  });
  }
  $hiddenProjects.slice(0,2).each(function() {
    $(this).hide().removeClass('hidden not-filter').show(500);
  });
});

// Filtering Buttons
function filterPortfolio(event) {
  $("button.active").removeClass("active");
  $(this).addClass("active");    
  var targetId = event.target.id;
  $(".work .project").not(".not-filter").each(function() {
    var $this = $(this);
    $this.addClass("hidden");
    if (targetId === $this.data("cat") || targetId === "all") {
      $this.removeClass("hidden");
    }
  });
}
$(".filter-buttons").on("click", "button", filterPortfolio);

// Pie Charts 
$(".pie-chart").each(function() {
  var $pieChart = $(this);
  
  var percent = $pieChart.attr('data-percent');
  var $path = $pieChart.find('path');
  var pathLength = $path[0].getTotalLength();
  var offsetTo = pathLength * (percent / 100);

  $pieChart.attr('data-percent', 0);
  $path[0].style.strokeDashoffset = 0;

  $pieChart.one("inview", function(event) {
    $path.animate(
      {'strokeDashoffset': offsetTo}, 
      { duration: 2500,
        step: function (now) {
          $pieChart.attr('data-percent', Math.round(now/pathLength*100));
        }
      });
  });
});