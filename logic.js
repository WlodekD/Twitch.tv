// Twitch channels to display.
var twitchAcc = ["shroud", "ESL_SC2", "xQcOW", "cdewx", "ELEAGUETV", "LIRIK", "ESL_CSGO", "momochoco"];

// Iteration through fetched data from twitch API.
for(var i = 0; i<twitchAcc.length; i++){
  ajax();
}

// 'GET' request for twitch API data.
function ajax(){
 $.ajax({
  type: 'GET',
  url: 'https://wind-bow.glitch.me/twitch-api/streams/'+twitchAcc[i],
  data: {
    format: "json"
  },
  success: function(data) {
    fetchData(data);
 }
});
}

// This funcion display only streaming of live channels, and if channel is offline function redirect to functon offlineUsers().
function fetchData(data){
  if(data.stream === null){
    userOffline = data._links.channel.substring(38);
    offlineUsers(userOffline);
    
  } else if(data.stream.channel.logo !== null){
    name = data.stream.channel.display_name;
   $(".online").append('<a id="divLink" target="_blank" href="https://www.twitch.tv/'+name+'">'+'<div class="styleLine">'+'<h4 id="h4">'+data.stream.channel.display_name+'</h4>'+'<br>'+'<img src='+'"'+data.stream.channel.logo+'"'+'>'+'<p id="live"><i class="fa fa-circle" aria-hidden="true"></i> LIVE streaming of</p>'+' '+data.stream.game+'<br>'+'</div>'+'</a>'+'<hr>');
  }
}

// A function fetch data by 'get' request and display only "offline" channels.
function offlineUsers(offUser){
  $.ajax({
   type: 'GET',
   url: 'https://wind-bow.glitch.me/twitch-api/channels/'+offUser,
   data: {
   format: "json"
    },
   success: function(data){
     name = data.display_name;
     if(name !== "undefined"){
       // var statusOffline = $(".offline").empty();
       $(".offline").append('<a id="divLink" target="_blank" href="https://www.twitch.tv/'+name+'">'+'<div class="styleLine">'+'<h4 id="h4">'+data.display_name+'</h4>'+'<br>'+'<img src="'+data.logo+'">'+'<p id="offline">channel is OFFLINE</p>'+'<br>'+'</div>'+'</a>'+'<hr>');
     }
  }
  })
}

// A function takes a string from search input and doing 'get' request to fetch data about a searching channel. This function disables buttons "Online" and "Offline" as well.
function search(){
  $(".online, .offline").empty();
  var input = $("#myInput").val();
  var filter = input.toUpperCase();
  var user = filter.replace(/[^A-Z0-9_]/ig, "");
  document.getElementById("onBtn").disabled = true;
  document.getElementById("offBtn").disabled = true;
  document.getElementById("allBtn").innerHTML = "Refresh";
  $.ajax({
  type: 'GET',
  url: 'https://wind-bow.glitch.me/twitch-api/streams/'+user,
  data: {
    format: "json"
  },
  success: function(data) {
    fetchData(data);
 }
});
}

// A function to show both divs: online and offline to expose all channels.
function showAll(){
  $(".online, .offline").removeClass("hidden");
  $(".online, .offline").removeClass("green red");
  $(".hrTop").removeClass("hidden");
}

// A funcion to display only "online" channels.
function showOnline(statusOnline){
  $(".online").removeClass("hidden");
  $(".offline").addClass("hidden");
  $(".online").addClass("green");
  $(".hrTop").addClass("hidden");
}

// A funcion to display only "offline" channels.
function showOffline(statusOffline){
  $(".online").addClass("hidden");
  $(".offline").removeClass("hidden");
  $(".offline").addClass("red");
  $(".hrTop").addClass("hidden");
}

// button "Online"
$("#onBtn").click(function(){
  showOnline();
});

// button "Offline"
$("#offBtn").click(function(){
  showOffline();
});

// button "All"
$("#allBtn").click(function(){
  document.getElementById("allBtn").innerHTML = "All";
  showAll();
});

// Extra function extending "All" button functionality for enabling "Online" and "Offline" buttons after a search. A function does 'get' request as well to refresh and show all users.
$("#allBtn").click(function(){
  document.getElementById("onBtn").disabled = false;
  document.getElementById("offBtn").disabled = false;
  $(".online, .offline").empty();
  for(var i = 0; i<twitchAcc.length; i++){
  refresh();
}

      function refresh(){
       $.ajax({
        type: 'GET',
        url: 'https://wind-bow.glitch.me/twitch-api/streams/'+twitchAcc[i],
        data: {
          format: "json"
        },
        success: function(data) {
          fetchData(data);
       }
      });
      }
  
      $.ajax({
        type: 'GET',
        url: 'https://wind-bow.glitch.me/twitch-api/streams/'+twitchAcc,
        data: {
          format: "json"
        },
        success: function(data) {
          fetchData(data);  
        }
      });
    });
