/*生成6位隨機數*/

$(document).ready(function(){
  $("#back").click(function () {

    location.href="/home.html";

  });
    $('#hotelRate').click(function(){
        console.log("AllHotel click");
        $.ajax({
            type: 'GET',
            data: 'account=' + "kai",
            url: '/php/select_evaluationHotel.php',
            success:function(allHotel){
                console.log("AllHotel="+allHotel);
                $("#result").html("");
                $.each(allHotel, function(index, hotel){
                    console.log("hotel" + index + "=" + hotel);
                    MakeHotelCard(index,  hotel);
                });
            }
        });
    });

    $('#sightRate').click(function(){
        $.ajax({
            type: 'GET',
            url: '/php/select_AllSight.php',
            success:function(allSight){
                console.log("allSight="+allSight);
                $("#result").html("");
                $.each(allSight, function(index, sight){
                    console.log("sight" + index + "=" + sight);
                    MakeSightCard(index, sight);
                });
            }
        });
    });

});
function MakeHotelCard(index, hotel)
{
  let mapURL = "https://www.google.com.tw/maps/place/" + hotel.Address;
  let card1 =
    `
            <div class="card">
              <div class="card-header">${hotel.HotelName}</div>
              <div class="card-body">
                  <p>
                  地區:${hotel.Zone}</br>
                  評價:${hotel.StarNum} &#11088;
                  </p>
              </div>
              <a href=${mapURL}
                 target="_blank"
                 class="btn btn-primary">
              地址
              </a>
              </div>
            </div>
    `;

    let collapseURL = "#collapse" + index;
    let showcard2 = 
        `<img src=${hotel.PhotoURL} width="100" high="100"alt="此景點無圖片">
            <div>
                ${hotel.Description}
            </div>
        `;


  let card2 =
    `
                      <div class="card">
                        <div class="card-header">
                         <a class="btn" data-bs-toggle="collapse" href=${collapseURL}>
                         詳細資訊
                         </a>
                        </div>
                        <div class="card-body">
                            <div id="collapse${index}" class="collapse">
                            ${showcard2}
                            </div>
                        </div>
                      </div>
  `;
  let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4")
    .attr("id", "showcards");

  finalcard.append(card1, card2);
  
  $("#result").append(finalcard);
}

function MakeSightCard(index, sight)
{
  let mapURL = "https://www.google.com.tw/maps/place/" + sight.Address;
  let card1 =
    `
            <div class="card">
              <div class="card-header">${sight.SightName}</div>
              <div class="card-body">
                  <p>
                  地區:${sight.Zone}</br>
                  分類:${sight.Category}
                  </p>
              </div>
              <a href=${mapURL}
                 target="_blank"
                 class="btn btn-primary">
              地址
              </a>
              </div>
            </div>
    `;

    let collapseURL = "#collapse" + index;
    let showcard2 = 
        `<img src=${sight.PhotoURL} width="100" high="100"alt="此景點無圖片">
            <div>
                ${sight.Description}
            </div>
        `;


  let card2 =
    `
                      <div class="card">
                        <div class="card-header">
                         <a class="btn" data-bs-toggle="collapse" href=${collapseURL}>
                         詳細資訊
                         </a>
                        </div>
                        <div class="card-body">
                            <div id="collapse${index}" class="collapse">
                            ${showcard2}
                            </div>
                        </div>
                      </div>
  `;
  let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4")
    .attr("id", "showcards");

  finalcard.append(card1, card2);
  $("#result").append(finalcard);
}