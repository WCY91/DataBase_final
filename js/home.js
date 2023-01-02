/*生成6位隨機數*/
var HotelName = [];
var HotelStarNum=[];
var HotelCount=[];

var SightNames = [];
var SightStarNum = [];
var SightCount=[];

function loveClick(e){  
  if(localStorage.getItem("status")==1){
    var chooseSight = SightNames[e.id];    
    var flag = 0; //判斷是否新增過
  $.ajax({
    url:'/php/select_tourist.php',
    method:'GET',
    data: 'account='+ localStorage.getItem("account"),
    success:function(allTourist){       
      $.each(allTourist, function(index, tourist){        
          if(SightNames[parseInt(e.id.substring(4,5),10)]==tourist.SightName) flag=1;
      });
      console.log(flag);
      if(flag==1){
        alert("已經加入過最愛");
      }else{
        $.ajax({
          url:'/php/insert_tourist.php',
          method:'POST',
          data:{
              account:localStorage.getItem("account"),
              sightName:SightNames[e.id.substring(4,5)]
          },
          success:function(res){              
              alert("成功加入到我的最愛!!!");
          }
      });
      }

    }
  });
 
  

}
else{
  alert("您必須登入才能使用這項功能");
} 
}

function hotelClick(e){ 
  if(localStorage.getItem("status")==1){    
    var chooseHotel = HotelName[e.id];
    var choose = "#"+ "evaluation"+e.id;
    var starNum = $(choose).val();  
    var oldCount = HotelCount[e.id];
    var oldStarNum = HotelStarNum[e.id];
    var newCount = oldCount +1 ;    
    var newStarNum = ( (oldStarNum * oldCount) + parseInt(starNum,10) ) / newCount;
    var userOldStarNum;
    var updateStarNum;
    var flag = 0; //判斷是否新增過此評價
  $.ajax({
    url:'/php/select_evaluationHotel.php',
    method:'GET',
    data: 'account='+ localStorage.getItem("account"),
    success:function(allHotel){ 
      
      $.each(allHotel, function(index, hotel){
          console.log("old: "+hotel['1']);//舊的使用者評價          
          
          if(hotel.HotelName==chooseHotel) {
            userOldStarNum = hotel['1'];
            flag = 1;
          }
      });
      console.log("hotel flag "+flag);
      if(flag==0){
        $.ajax({
          url:'/php/insert_evaluation.php',
          method:'POST',
          data:{
              account:localStorage.getItem("account"),
              place:chooseHotel,
              starNum:starNum
          },
          success:function(res){
              console.log(res);
              alert("成功加入評價!!!");
          }
        });
      }
      else{
        updateStarNum =  ( (oldStarNum * oldCount) + parseInt(starNum,10) - userOldStarNum ) /oldCount;       

        $.ajax({
          url:'/php/update_evaluation.php',
          method:'POST',
          data:{
              account:localStorage.getItem("account"),
              place:chooseHotel,
              starNum:starNum
          },
          success:function(res){
              console.log(res);
              alert("更新之前的評價!!!");
          }
        });
      }
      if(flag==0){
        console.log("newStarNum:Hotel   "+newStarNum);
        console.log("HotelCount:   " + oldCount);
        console.log("Hotel oldStarNum  "+oldStarNum );
        console.log("Hotel User  "+ userOldStarNum);
        console.log("now starNum "+starNum);
        $.ajax({
          url:'/php/update_hotel.php',
          method:'POST',
          data:{            
              count:newCount,
              starNum:newStarNum,
              hotelName:chooseHotel
          },
          success:function(res){          
            location.href="/home.html";            
          }
        });
      }
      else{
        console.log("updateStarNum:Hotel   "+updateStarNum);
        console.log("HotelCount:   " + oldCount);
        console.log("Hotel oldStarNum  "+oldStarNum );
        console.log("Hotel User  "+ userOldStarNum);
        console.log("now starNum "+starNum);
        $.ajax({
          url:'/php/update_hotel.php',
          method:'POST',
          data:{            
              count:oldCount,
              starNum:updateStarNum,
              hotelName:chooseHotel
          },
          success:function(res){          
            location.href="/home.html";            
          }
        });
      }

  }
  });

  }
  else{
    alert("您必須登入才能使用這項功能");
  } 
};


function sightClick(e){ 
  if(localStorage.getItem("status")==1){
      var chooseSight = SightNames[e.id];
      var choose = "#"+ "evaluation"+e.id;
      var starNum = $(choose).val();  
      console.log("choose"+choose);
      console.log("starNum"+starNum);
      var oldCount = SightCount[e.id];
      var oldStarNum = SightStarNum[e.id];
      var newCount = oldCount +1 ;    
      var newStarNum = ( (oldStarNum * oldCount) + parseInt(starNum,10) ) / newCount;
      var userOldStarNum;
      var updateStarNum;
      var flag = 0; //判斷是否新增過此評價
    $.ajax({
      url:'/php/select_evaluationSight.php',
      method:'GET',
      data: 'account='+ localStorage.getItem("account"),
      success:function(allSight){ 
        console.log(allSight);
        $.each(allSight, function(index, sight){
            console.log("old: "+sight['1']);//舊的使用者評價          
            
            if(sight['2']==chooseSight) {
              userOldStarNum = sight['1'];
              flag = 1;
            }
        });
        console.log("flag:"+flag);
        if(flag==0){
          $.ajax({
            url:'/php/insert_evaluation.php',
            method:'POST',
            data:{
                account:localStorage.getItem("account"),
                place:chooseSight,
                starNum:starNum
            },
            success:function(res){
                console.log(res);
                alert("成功加入評價!!!");                
            }
          });
        }
        else{
          updateStarNum =  ( (oldStarNum * oldCount) + parseInt(starNum,10) - userOldStarNum ) /oldCount;
          $.ajax({
            url:'/php/update_evaluation.php',
            method:'POST',
            data:{
                account:localStorage.getItem("account"),
                place:chooseSight,
                starNum:starNum
            },
            success:function(res){
                console.log(res);
                alert("更新之前的評價!!!");
            }
          });
        }
        if(flag==0){
          console.log("newStarNum:Sight   "+newStarNum);
          console.log("SightCount:   " + oldCount);
          console.log("Sight oldStarNum  "+oldStarNum );
          console.log("Sight User  "+ userOldStarNum);
          console.log("now starNum "+starNum);
          $.ajax({
            url:'/php/update_sight.php',
            method:'POST',
            data:{            
                count:newCount,
                starNum:newStarNum,
                sightName:chooseSight
            },
            success:function(res){          
              location.href="/home.html";              
            }
          });
        }
        else{
          console.log("updateStarNum:Sight   "+updateStarNum);
          console.log("SightCount:   " + oldCount);
          console.log("Sight oldStarNum  "+oldStarNum );
          console.log("Sight User  "+ userOldStarNum);
          console.log("now starNum "+starNum);
          $.ajax({
            url:'/php/update_sight.php',
            method:'POST',
            data:{            
                count:oldCount,
                starNum:updateStarNum,
                sightName:chooseSight
            },
            success:function(res){          
              location.href="/home.html";              
            }
          });
        }
  
    }
    });
  
  }
  else{
    alert("您必須登入才能使用這項功能");
  } 
};

$(document).ready(function(){ 
  if(localStorage.getItem("status")==1){
    document.getElementById('status').innerHTML=localStorage.getItem("account"); 
  }
  $.ajax({
    type: 'GET',
    url: '/php/select_AllSight.php',
    success:function(allSight){
        
        $("#result").html("");
        $.each(allSight, function(index, sight){
            SightNames[index] = sight.SightName;
            SightStarNum[index] = sight.StarNum;
            SightCount[index]  = sight.Count;
            MakeSightCard(index, sight);
        });
    }
  });
  $('#favorite').click(function(){
      if(localStorage.getItem("status")==1){
        location.href="/favorite.html";
      }else{
        alert("您必須登入才能使用這項功能");
      }
  });
  $('#evaluation').click(function(){
     if(localStorage.getItem("status")==1){
       location.href="/evaluation.html";
     }else{
       alert("您必須登入才能使用這項功能");
     }
  });
  $('#logout').click(function(){
    if(localStorage.getItem("status")==1) alert("成功登出");
    else alert("您尚未登入過")
    localStorage.setItem("status",0);
    localStorage.setItem("account","null");
    localStorage.setItem("password","null");   
    document.getElementById('status').innerHTML="未登入";   
 });
    $('#AllHotel').click(function(){
        console.log("AllHotel click");
        $.ajax({
            type: 'GET',
            url: '/php/select_AllHotel.php',
            success:function(allHotel){
               
                $("#result").html("");
                $.each(allHotel, function(index, hotel){
                    
                    HotelName[index]=hotel.HotelName;
                    HotelStarNum[index]=hotel.StarNum;
                    HotelCount[index]=hotel.Count;
                    
                    MakeHotelCard(index,  hotel);
                });
            }
        });
    });

    $('#AllSight').click(function(){
        $.ajax({
            type: 'GET',
            url: '/php/select_AllSight.php',
            success:function(allSight){
                
                $("#result").html("");
                $.each(allSight, function(index, sight){
                    SightNames[index] = sight.SightName;
                    SightStarNum[index] = sight.StarNum;
                    SightCount[index]  = sight.Count;
                    MakeSightCard(index, sight);
                });
            }
        });
    });


});
function MakeHotelCard(index, hotel)
{
  let mapURL = "https://www.google.com.tw/maps/place/" + hotel.Address;
  let collapseURL = "#collapse" + index;
  let card1 =
    `
            <div class="card container">
              <div style="width=130px; height=200px">
              <img src=${hotel.PhotoURL} style="width=100px; height=150px" alt="此景點無圖片">
              </div>
              <div class="card-body">
                <div class="row py-2">
                    <h3 class="card-title text-dark">${hotel.HotelName}</h5>
                </div>
                <span id="count" style="display:none">${hotel.count}</span>
                <div class="row">
                    <span class="col-9">
                        地區:${hotel.Zone}</br>                        
                        評價:${hotel.StarNum} &#11088;
                        
                    </span>
                    <a href=${mapURL} class="btn btn-info col-3">
                        地址
                    </a>
                </div>
                
              </div>
              <div class="card-footer">
                <div class="row">
                    <button class="btn btn-warning col-8 offset-2" data-bs-toggle="collapse" href="${collapseURL}">
                        詳細資訊
                    </button>                    
                <div>
              </div>
            </div>
    `;

    let card2 =
    `               <div class="collapse" id="collapse${index}">
                      <div class="card">
                        <div class="card-body">
                            <p>
                                ${hotel.Description}
                            </p>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <span class="col-4 ps-3 fs-4">留下評價:</span>
                                <div class="col-4 ">
                                  <div class="input-group">
                                    <select class="form-select" id="evaluation${index}">
                                        <option value="1"> 1 ⭐</option>
                                        <option value="2"> 2 ⭐</option>
                                        <option value="3"> 3 ⭐</option>
                                        <option value="4"> 4 ⭐</option>
                                        <option value="5"> 5 ⭐</option>
                                    </select>
                                  </div> 
                                </div>
                                <button id="${index}" class="btn btn-info btn-sm col-3 ms-3" onclick='hotelClick(this);'>
                                  確認評價
                                </button>
                            <div>
                        </div>
                      </div>
                    </div>
    `;                
  let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4 py-5")
    .attr("id", "showcards");

  finalcard.append(card1, card2);
  
  $("#result").append(finalcard);
}

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
            <h3 class="card-title text-dark">${sight.SightName}</h5>
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
            <button id="love${index}" style="text-align: center" class="col-3 pt-2 fs-4" onclick='loveClick(this);'>
              ❤
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
        <div class="card-footer">
            <div class="row">
                <span class="col-4 ps-3 fs-4">留下評價:</span>
                <div class="col-4 ">
                  <div class="input-group">
                    <select class="form-select" id="evaluation${index}">
                        <option value="1"> 1 ⭐</option>
                        <option value="2"> 2 ⭐</option>
                        <option value="3"> 3 ⭐</option>
                        <option value="4"> 4 ⭐</option>
                        <option value="5"> 5 ⭐</option>
                    </select>
                  </div> 
                </div>
                <button id="${index}" class="btn btn-info btn-sm col-3 ms-3" onclick='sightClick(this);'>
                  確認評價
                </button>
            <div>
        </div>
      </div>
    </div>
    `;                
  let finalcard = $("<div></div>").addClass("col-md-12 col-lg-4 py-5")
    .attr("id", "showcards");
  finalcard.append(card1, card2);
  $("#result").append(finalcard);
}