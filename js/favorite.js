/*生成6位隨機數*/

$(document).ready(function () {
  $("#back").click(function () {

    location.href="/home.html";

  });
    $.ajax({
        type: 'GET',
        url: '/php/select_tourist.php',
        data: 'account=' + "kai",
        success: function (allFavoriteSight) {
            console.log("allFavoriteSight="+allFavoriteSight);
            $("#result").html("");
            $.each(allFavoriteSight, function (index, sight) {
                console.log("sight" + index + "=" + sight);
                MakeSightCard(index, sight);
            });
        }
    });


});

function MakeSightCard(index, sight)
{
    let mapURL = "https://www.google.com.tw/maps/place/" + sight.Address;
    let collapseURL = "#collapse" + index;
    let card1 =
      `
              <div class="card">
                <img src=${sight.PhotoURL} width="100" height="100" alt="此景點無圖片">
                <div class="card-body">
                  <h5 class="card-title">${sight.SightName}</h5>
                  <span id="count" style="display:none">${sight.count}</span>
                    <p>
                      地區:${sight.Zone}</br>
                      評價:${sight.StarNum} &#11088;
                    </p>
                  <a href=${mapURL} class="btn btn-primary">
                      地址
                  </a>
                </div>
                <div class="card-footer">
                  <button class="btn btn-warning" data-bs-toggle="collapse" href="${collapseURL}">
                      詳細資訊
                  <button>
                </div>
              </div>
      `;

      let card2 =
      `               <div class="collapse" id="collapse${index}">
                        <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">景點種類:${sight.Category}</h5>
                              <p>
                                  ${sight.Description}
                              </p>
                          </div>
                        </div>
                      </div>
      `;                
    let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4")
      .attr("id", "showcards");
  
    finalcard.append(card1, card2);
    
    $("#result").append(finalcard);
}