function dosearch(xAwal){ 
    xSearch ="";
    try 
    {
        if ($("#edSearch").val()!=""){
            xSearch = $("#edSearch").val();
        } 
    }catch(err){
        xSearch ="";
    }
    if (typeof(xSearch) =="undefined"){
        xSearch ="";
    } 
    $(document).ready(function(){
        $.ajax({
            url: getBaseURL()+"index.php/ctrtransaksifotokopi/search/",
            data: "xAwal="+xAwal+"&xSearch="+xSearch,
            cache: false,
            dataType: 'json',
            type: 'POST',
            success: function(json){
                $("#tabledata").html(json.tabledata);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                start = xmlHttpRequest.responseText.search("<title>") + 7;
                end  = xmlHttpRequest.responseText.search("</title>");
                errorMsg = " error on search ";
                if (start > 0 && end > 0)
                    alert("Rangerti "+errorMsg + "  [" + xmlHttpRequest.responseText.substring(start, end) + "]");
                else
                    alert("Error juga"+errorMsg);
            }
        });
    });
} 

function doedit(edidx){ 
    $(document).ready(function(){
        $.ajax({
            url: getBaseURL()+"index.php/ctrtransaksifotokopi/editrec/",
            data: "edidx="+edidx,
            cache: false,
            dataType: 'json',
            type: 'POST',
            success: function(json){
                $("#edidx").val(json.idx);
                $("#edidplu").val(json.idplu);
                $("#idjenipengguna").val(json.idjenipengguna);
                $("#edidjenistransaksi").val(json.idjenistransaksi);
                $("#edidpegawai").val(json.idpegawai);
                $("#edidunitkerja").val(json.idunitkerja);
                //       $("#edidstatusdinas").val(json.idstatusdinas);
                //       $("#edtanggal").val(json.tanggal);
                //       $("#edjam").val(json.jam);
                
                $("#edjumlahsatuan").val(json.jumlahsatuan);
                $("#ednominalpersatuan").val(json.nominalpersatuan);
                $("#edtotal").val(json.total);
                if(json.edchkispusd=="Y"){
                  $("#edchkispusd").val('Y');
                  $("#edchkispusd").attr('checked', true);
                }else
                {
                  $("#edchkispusd").val('N');
                  $("#edchkispusd").attr('checked', false);
                }

                //       $("#ediduser").val(json.iduser);
                //       $("#ednominaldenda").val(json.nominaldenda);
                //       $("#ediddendasparta").val(json.iddendasparta);
                //       $("#edidlokasi").val(json.idlokasi);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                start = xmlHttpRequest.responseText.search("<title>") + 7;
                end = xmlHttpRequest.responseText.search("</title>");
                errorMsg = "OnEdit ";
                if (start > 0 && end > 0)  alert("On Edit "+errorMsg + "  [" + xmlHttpRequest.responseText.substring(start, end) + "]");
                else
                    alert("Error juga "+errorMsg);
            }
        });
    });
}

function dotampildataPLU(){
    $(document).ready(function(){
        $.ajax({
            url: getBaseURL()+"index.php/ctrtransaksifotokopi/tampildataPLU/",
            data: "kodeplu="+$("#edidplu").val(),
            cache: false,
            dataType: 'json',
            type: 'POST',
            success: function(json){
            //alert('tess'+json.harga);

           if(json.isdataada){
                  //alert('tess'+json.idjenistransaksi);
                   $("#ednominalpersatuan").val(json.harga);
                   
                   $("#nmproduk").html(json.NamaProduk);
                   $("#edidgrouppengguna").val(json.idjenipengguna);
                   $("#edjumlahsatuan").attr('disabled', false);
                   $("#edjumlahsatuan").focus();

                    doshownamaProduk(true);

                  if((json.idjenipengguna==2)||(json.idjenipengguna==3)){
                       doshowpegawai(true);
                     }
            } else
             {
                    alert('Data Yang Anda Cari tidak Ditemukan');
             }
            //       $("#ediduser").val(json.iduser);
            //       $("#ednominaldenda").val(json.nominaldenda);
            //       $("#ediddendasparta").val(json.iddendasparta);
            //       $("#edidlokasi").val(json.idlokasi);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                start = xmlHttpRequest.responseText.search("<title>") + 7;
                end = xmlHttpRequest.responseText.search("</title>");
                errorMsg = "On Tampil PLU ";
                if (start > 0 && end > 0)  alert("On Edit "+errorMsg + "  [" + xmlHttpRequest.responseText.substring(start, end) + "]");
                else
                    alert("Error  "+errorMsg);
            }
        });
    });
}

function dotampilpegawai(){
    $(document).ready(function(){
        $.ajax({
            url: getBaseURL()+"index.php/ctrtransaksifotokopi/tampildataPegawai/",
            data: "edidpegawai="+$("#edidpegawai").val(),
            cache: false,
            dataType: 'json',
            type: 'POST',
            success: function(json){
            if(json.isdataada){
                  // alert('tess '+json.idUnitKerja);
                   $("#nmpegawai").val(json.npp);
                   $("#nmpegawai").html(json.Nama);
                   $("#edunitkerja").val(json.idUnitKerja);
                   doshownmpegawai(true);                    
            } else
             {
                    alert('Data Yang Anda Cari tidak Ditemukan');
             }
            //       $("#ediduser").val(json.iduser);
            //       $("#ednominaldenda").val(json.nominaldenda);
            //       $("#ediddendasparta").val(json.iddendasparta);
            //       $("#edidlokasi").val(json.idlokasi);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                start = xmlHttpRequest.responseText.search("<title>") + 7;
                end = xmlHttpRequest.responseText.search("</title>");
                errorMsg = "On Search Pegawai ";
                if (start > 0 && end > 0)  alert("On Edit "+errorMsg + "  [" + xmlHttpRequest.responseText.substring(start, end) + "]");
                else
                    alert("Error  "+errorMsg);
            }
        });
    });
}

function doclickchkbkusd(){
 if ($("#edchkispusd").val()=='N'){
    $("#edchkispusd").val('Y');
 } else
  {
    $("#edchkispusd").val('N');
  }
 //alert($("#edchkispusd").val());
}

function onCbunitkerjaChange(){
 if($("#edunitkerja").val()!='0'){

    $("#edidpegawai").val("P.0000");

 }else{
   $("#edidpegawai").val("");  
 }


}

function doClear(){ 
    $(document).ready(function(){
        $("#edchkispusd").val("N");
        $("#edchkispusd").attr('checked', false);

        $("#edidx").val("0");
        $("#edidplu").val("");

        $("#edidjenistransaksi").val("");
        $("#edidgrouppengguna").val("");
        $("#edidpegawai").val("");
        $("#edidunitkerja").val("");
        // $("#edidstatusdinas").val("");
        // $("#edtanggal").val("");
        // $("#edjam").val("");
        $("#edjumlahsatuan").val("");
        $("#ednominalpersatuan").val("");
        $("#edtotal").val("");
         doshowpegawai(false);
    // $("#ediduser").val("");
    // $("#ednominaldenda").val("");
    // $("#ediddendasparta").val("");
    // $("#edidlokasi").val("");
    });
}

function dosimpan(){ 
    $(document).ready(function(){
        if(($("#edjumlahsatuan").val()=='0')||($("#edjumlahsatuan").val()==''))
        {
           alert("Data belum lengkap Terisi");
          return;
        }

        $.ajax({
            url: getBaseURL()+"index.php/ctrtransaksifotokopi/simpan/",
            data: "edidx="+$("#edidx").val()+
                  "&edidplu="+$("#edidplu").val()+
                  "&edidjenistransaksi="+$("#edidjenistransaksi").val()+
                  "&edidpegawai="+$("#edidpegawai").val()+
                  "&edidunitkerja="+$("#edunitkerja").val()+
                  "&edidstatusdinas="+$("#edidstatusdinas").val()+
                  "&edtanggal="+$("#edtanggal").val()+
                  "&edjam="+$("#edjam").val()+
                  "&edjumlahsatuan="+$("#edjumlahsatuan").val()+
                  "&ednominalpersatuan="+$("#ednominalpersatuan").val()+
                  "&edtotal="+$("#edtotal").val()+
                  "&ediduser="+$("#ediduser").val()+
                  "&ednominaldenda="+$("#ednominaldenda").val()+
                  "&ediddendasparta="+$("#ediddendasparta").val()+
                  "&edidlokasi="+$("#edidlokasi").val()+
                  "&edchkispusd="+$("#edchkispusd").val(),
            cache: false,
            dataType: 'json',
            type: 'POST',
            success: function(json){
                doClear();
                dosearch('-99');
                doshownamaProduk(false);
                doshownmpegawai(false);
                doshowpegawai(false);
               
                $("#edjumlahsatuan").attr('disabled', true);
                 $("#edidplu").focus();
                //$("#edidplu").val(json.data);
               // alert(json.data);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                start = xmlHttpRequest.responseText.search("<title>") + 7;
                end = xmlHttpRequest.responseText.search("</title>");
                errorMsg =  " On Simpan ";
                if (start > 0 && end > 0)
                    alert("E2 Error "+errorMsg + "  [" + xmlHttpRequest.responseText.substring(start, end) + "]");
                else
                    alert("Error  "+errorMsg);
            }
        });
    });
} 

function dohapus(edidx,edidplu){ 
    if (confirm("Anda yakin Akan menghapus data "+edidplu+"?"))
    {
        $(document).ready(function(){
            $.ajax({
                url: getBaseURL()+"index.php/ctrtransaksifotokopi/deletetable/",
                data: "edidx="+edidx,
                cache: false,
                dataType: 'json',
                type: 'POST',
                success: function(json){
                    doClear(); 
                    dosearch('-99');
                    doshownamaProduk(false);
                    doshowpegawai(false);
                    doshownmpegawai(false);

                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    start = xmlHttpRequest.responseText.search("<title>") + 7;
                    end = xmlHttpRequest.responseText.search("</title>");
                    errorMsg = " HAPUS ";
                    if (start > 0 && end > 0)
                        alert("Rangerti "+errorMsg + "  [" + xmlHttpRequest.responseText.substring(start, end) + "]");
                    else
                        alert("Error juga "+errorMsg);
                }
            });
        });
    }
} 


function dokeypresseed(){
    $(document).ready(function(){

        $("#ednominalpersatuan").attr('disabled', true);
        $("#edjumlahsatuan").attr('disabled', true);

        $("#edtotal").attr('disabled', true);
        $('#edidplu').bind('keypress', function(e) {
            if(e.keyCode==13){
               dotampildataPLU();
                //alert('OK');
                // Enter pressed... do anything here...
            }
        });

        $('#edjumlahsatuan').bind('keypress', function(e) {
            if(e.keyCode==13){
               if($('#edjumlahsatuan').val!=''){
                  $('#edtotal').val($("#ednominalpersatuan").val()*$("#edjumlahsatuan").val());
                  $("#btSimpan").focus();
               }
               if(($("#edidjenistransaksi").val()==3)||($("#edidjenistransaksi").val()==4)){
                  $("#edidpegawai").focus();
               }
                //alert('OK');
            // Enter pressed... do anything here...
            }
        });

        $('#edidpegawai').bind('keypress', function(e) {
            if(e.keyCode==13){
              dotampilpegawai();
             if($("#edidpegawai").val()!=""){
                  $("#btSimpan").focus();
               }
                //alert('OK');
            // Enter pressed... do anything here...
            }
        });


    });
}

function doshowpegawai(isshow){
    $(document).ready(function(){
        if(isshow){
            $("#showhide").show("slow");
        //$("#edidunitkerja").show("slow");
        } else
       {
          $("#showhide").hide("slow");
        //$("#nmpegawai").hide("slow");
       // $("#edidunitkerja").hide("slow");
        }

    });
}

function doshownmpegawai(isshow){
    $(document).ready(function(){
        $("#nmpegawai").css({
       "font-size":"18px",
       position :"relative",
       left:150,
       width:200,
       top :0
       //background:"blue",
      });
        if(isshow){
            $("#nmpegawai").show("slow");
        //$("#edidunitkerja").show("slow");
        } else
       {
            $("#nmpegawai").hide("slow");
        //$("#edidunitkerja").hide("slow");
        }

    });
}

function doshownamaProduk(isshow){
    $(document).ready(function(){
      $("#nmproduk").css({
       "font-size":"18px",
       position :"relative",
       left:350,
       width:200,
       top :-175
       //background:"blue",
      });
        if(isshow){
        $("#nmproduk").show("slow");
        //$("#edidunitkerja").show("slow");
        } else
       {
          $("#nmproduk").hide("slow");
        //$("#edidunitkerja").hide("slow");
        }

    });
}
function initCorners() { 
    var setting = {
        tl: {
            radius: 10
        }, // top left
        tr: {
            radius: 10
        }, // top right
        bl: {
            radius: 6
        }, // bottom left
        br: {
            radius: 6
        }, // bottom right
        antiAlias: true
    }
    curvyCorners(setting, "div#mnhead h1");
} 
//   addEvent(window, 'load', initCorners);
//     dosearch(0);
dokeypresseed();


doshownamaProduk(false);
doshowpegawai(false);
doshownmpegawai(false);

//** Cek Group Pengguna