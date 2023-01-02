/*生成6位隨機數*/
var SightNames = [];
function brokenClick(e){ 
  sightName = SightNames[e.id];
  $.ajax({
    type: 'GET',
    url: '/php/delete_tourist.php',
    data:'account='+localStorage.getItem('account')+"&sightName="+sightName,
    success:function(allSight){
       console.log(allSight);
       alert("刪除成功");
       location.href="/favorite.html";
    }
  });


} 
$(document).ready(function () {
  $("#back").click(function () {

    location.href="/home.html";

  });
    $.ajax({
        type: 'GET',
        url: '/php/select_tourist.php',
        data: 'account=' + localStorage.getItem("account"),
        success: function (allFavoriteSight) {
            console.log("allFavoriteSight="+allFavoriteSight);
            $("#result").html("");
            $.each(allFavoriteSight, function (index, sight) {
                SightNames[index] = sight.SightName;
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
    <div class="card container">
      <div style="width=130px; height=200px">
      <img src=${sight.PhotoURL} style="width=100px; height=150px" alt="此景點無圖片">
      </div>
      <div class="card-body">
        <div class="row py-2">
            <h3 class="card-title text-dark">❤${sight.SightName}</h5>
        </div>
        <span id="count" style="display:none">${sight.count}</span>
        <div class="row">
            <span class="col-9">
                地區:${sight.Zone}</br>
                評價:${sight.StarNum} &#11088;
            </span>
            <a href=${mapURL} class="btn btn-info col-3">
                地址
            </a>
        </div>
        
      </div>
      <div class="card-footer">
        <div class="row">
            <button class="btn btn-warning col-9" data-bs-toggle="collapse" href="${collapseURL}">
                詳細資訊
            </button>
            <button id="${index}" style="text-align: center" class="col-3 pt-2 fs-4" onclick='brokenClick(this);'>
            💔
            </button>
            
        <div>
      </div>
    </div>
    `;

    let card2 =
    `               
    <div class="collapse" id="collapse${index}">
      <div class="card">
        <div class="card-body">
            <p>
                ${sight.Description}
            </p>
        </div>        
      </div>
    </div>
    `;                
  let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4 py-5")
    .attr("id", "showcards");
  finalcard.append(card1, card2);
  $("#result").append(finalcard);
}