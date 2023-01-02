$(document).ready(function () {
  var results = $("#result");
  var list = [];
  var num = 0;
  $("#back").click(function () {

    location.href="/index.html";

  });

    num = 0;
    $.ajax({
      type: "GET",
      url: "selectTourist.php",
      success: function (msg) {
        $.each(msg, function (i, sight) {
          list[num] = sight.SightName;
          num++;
        });
        results.html("");
        var k = 0;
        for (k = 0; k < num; k++) {
          console.log(k);
          $.ajax({
            type: "GET",
            url: "selectSights.php",
            data: "SightName=" + list[k],
            success: function (msg) {
              $.each(msg, function (i, sight) {
                let address =
                  "https://www.google.com.tw/maps/place/" + sight.Address;                
                if (sight.PhotoURL == null) {
                  console.log("null");
                  results.append(
                    "<div class='card' id = o_card>" +
                      "<div class='card-header'>" +
                      sight.SightName +"❤️"+
                      "</div>" +
                      "<div class='card-body bg-dark text-white'>" +
                      "<p>" +
                      "區域:" +
                      sight.Zone +
                      "<br>" +
                      "分類:" +
                      sight.Category +
                      `<form action= ${address}  target='_blank'> 
                                          <button type='submit'>地址</button>
                                       </form>` +
                      "</p>" +
                      `<div class="card">
                                      <div class="card-header">
                                          <a class="btn" data-bs-toggle="collapse" href="#collapse${i}">
                                              詳細資訊
                                          </a>
                                      </div>
                                      <div id="collapse${i}" class="collapse" data-bs-parent="#accordion">
                                          <div class="card-body">                                        
                                               <p style="color: black;">${sight.Description}</p>
                                          </div>
                                      </div>
                                  </div>` +
                      "</div>" +
                      "</div>"
                  );
                } else {
                  results.append(
                    "<div class='card' id = o_card>" +
                      "<div class='card-header'>" +
                      sight.SightName +"❤️"+
                      "</div>" +
                      "<div class='card-body bg-dark text-white'>" +
                      "<img src=" +
                      sight.PhotoURL +
                      " alt='無圖片' />" +
                      "<p>" +
                      "區域:" +
                      sight.Zone +
                      "<br>" +
                      "分類:" +
                      sight.Category +
                      `<form action= ${address}  target='_blank'> 
                                          <button type='submit'>地址</button>
                                       </form>` +
                      "</p>" +
                      `<div class="card">
                                      <div class="card-header">
                                          <a class="btn" data-bs-toggle="collapse" href="#collapse${i}">
                                              詳細資訊
                                          </a>
                                      </div>
                                      <div id="collapse${i}" class="collapse" data-bs-parent="#accordion">
                                          <div class="card-body">                                          
                                              
                                               <p style="color: black;">${sight.Description}</p>
                                          </div>
                                      </div>
                                  </div>` +
                      "</div>" +
                      "</div>"
                  );
                }
              });
            },
            error: function () {
              flag = 1;
            },
          });
        }
      },
      error: function () {
        flag = 1;
      },
    });
    console.log(list);
    console.log(num);
 
});
