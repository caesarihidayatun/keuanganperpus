<?php

if (!defined('BASEPATH'))
    exit('Tidak Diperkenankan mengakses langsung');

/* Class  Control : anggotabaca  * di Buat oleh Diar PHP Generator * Update List untuk grid karena program generatorku lom sempurna ya hehehehehe */

class ctrlapdsetorannontunaifcharian extends CI_Controller {
    
    function __construct() {
        parent::__construct();
     
        
    }
    
    function index($xAwal=0, $xSearch='') {
//  $this->load->view('test.php');
        if ($xAwal <= -1) {
            $xAwal = 0;
        } $this->session->set_userdata('awal', $xAwal);
        $this->createform('0', $xAwal);

    }

    function createform($xidx, $xAwal=0, $xSearch='') {
        $this->load->helper('form');
        $this->load->helper('html');
        $this->load->model('modelgetmenu');
        $this->load->model('modelhargajenistransaksi');
        $row = $this->modelhargajenistransaksi->getDetailhargaIdJnsTransaksi('2');
        $xHarga = number_format($row->biaya, 0, '.', ',');
        $xForm = '<div id="stylized" class="myform"><h3>LAPORAN DINAS DAN PRIBADI HARIAN</h3>' . form_open_multipart('ctranggotabaca/inserttable', array('id' => 'form', 'name' => 'form')) . '<div class="garis"></div>';
        $xAddJs = link_tag('resource/js/themes/base/jquery.ui.all.css') .
                '<link rel="stylesheet" href="' . base_url() . 'resource/css/thickbox.css" type="text/css" media="screen" />'.
                '<script language="javascript" type="text/javascript" src="' . base_url() . 'resource/ajax/baseurl.js"></script>' .
                '<script language="javascript" type="text/javascript" src="' . base_url() . 'resource/js/ui/jquery.ui.core.js"></script>' .
                '<script language="javascript" type="text/javascript" src="' . base_url() . 'resource/js/ui/jquery.ui.widget.js"></script>' .
                '<script language="javascript" type="text/javascript" src="' . base_url() . 'resource/js/autoNumeric.js"></script>' .
                '<script language="javascript" type="text/javascript" src="' . base_url() . 'resource/js/ui/jquery.ui.datepicker.js"></script>' .
                '<script language="javascript" type="text/javascript" src="' . base_url() . 'resource/ajax/thickbox.js"></script>'.
                '<script language="javascript" type="text/javascript" src="' . base_url() . 'resource/ajax/ajaxfotokopibulan.js"></script>'.
                '<script language="javascript" type="text/javascript">
                    setawalrekapfotokopiperbulan();
                 </script>   ';
        //'<div id="tablereport" name ="tablereport"> </div>'     $this->getReport('4','2011')
        echo $this->modelgetmenu->SetViewPerpus($xForm . $this->setDetailFormReport($xidx), '<div id="tablereport" name ="tablereport"> </div>' , '', $xAddJs, '');
    }

    function setDetailFormReport($xidx) {
        $this->load->helper('form');
        $this->load->helper('common');
        //$this->load->model('modeljenisanggotabaca');
        $this->load->model('modellokasi');
        $xStrTahun = $this->session->userdata('tanggal');

        //$xBufResult = setForm('edTanggal', 'Tanggal', form_dropdown('edBulan', getArrayBulan(),'0','id="edBulan" width="150px"')) ;
        $xBufResult = setForm('edtgldenda', 'Tanggal Setoran', form_input(getArrayObj('edtgldenda', '', '120'))) . '<div class="spacer"></div>';
        $xBufResult .= setForm('edidlokasi', 'Lokasi', form_dropdown('edidlokasi', $this->modellokasi->getArrayListlokasi(), '0', 'id="edidlokasi" width="150px"')) . '<div class="spacer"></div>';
        $xBufResult .= '<div class="garis"></div>' . form_button('btSimpan', 'Tampil Data', 'onclick="dotampillapsetoranhariannontunai(false);"') . form_button('btNew', 'Export Ke Excel', 'onclick="dotampillapsetoranhariannontunai(true);"') . '<div class="spacer"></div>';
        return $xBufResult;
    }

    function  dotampillaporan(){
     $edtgldenda = $_POST['edtgldenda'];
     $edidlokasi = $_POST['edidlokasi'];
     $this->load->helper('json');
     $this->json_data['data'] =$this->getReport($edtgldenda,$edidlokasi);
     echo json_encode($this->json_data);
    }

    function getReport($edtgldenda,$edidlokasi) {
        //$xIdEdit = $_POST['edidx'];
        $this->load->helper('form');
        $this->load->helper('common');

        $arrayrow = $this->getrow($edtgldenda,$edidlokasi,'1');
        $xBufresult = "<br /><br />FOTO KOPI <br />";
        $xBufresult .='<table border="1px solid">';
        for($i=0;$i<count($arrayrow);$i++){
            $xBufresult .= '<tr>'. $arrayrow[$i].'</tr>';
        }
        $xBufresult .='</table>';

        $arrayrow = $this->getrow($edtgldenda,$edidlokasi,'2');
        $xBufresult .= "<br /><br />JILID <br />";
        $xBufresult .='<table border="1px solid">';
        for($i=0;$i<count($arrayrow);$i++){
            $xBufresult .= '<tr>'. $arrayrow[$i].'</tr>';
        }
        $xBufresult .='</table>';

        $arrayrow = $this->getrow($edtgldenda,$edidlokasi,'3');
        $xBufresult .= "<br /><br />PRINT <br />";
        $xBufresult .='<table border="1px solid">';
        for($i=0;$i<count($arrayrow);$i++){
            $xBufresult .= '<tr>'. $arrayrow[$i].'</tr>';
        }
        $xBufresult .='</table>';

        

        //$lokasi = $this->session->userdata('idlokasi');
        $this->load->model('modellokasi');
        $rowlokasi = $this->modellokasi->getDetaillokasi($edidlokasi);

        $judul = "PERPUSTAKAAN UNIVERSITAS SANATA DHARMA <br />".
                 "LAPORAN DETAIL DINAS DAN PRIBADI   <br />".
                 "TANGGAL ".$edtgldenda."<br /> DI ".$rowlokasi->NmLokasi;
        return '<div id="tablereport" name ="tablereport" class="tablereport" style="width:700px;" align="center"><h3>'.$judul.' </h3>' . $xBufresult . '</div>';
    }

    
    function getrow($edtgldenda,$edidlokasi,$xIdStatusPLU){
        //Prepare data untuk membuat reporttable
        /*
       *
          1. buat array untuk row
       *  2. tambahkan cell
       */
       $this->load->model('modeltransaksi');
       $xQuery = $this->modeltransaksi->getSetoranNONTunaiPertanggal($edtgldenda,$edidlokasi,$xIdStatusPLU);
       $arrayrow[0] = '<td width="100px"><b>Jam</b></td>';
       $arrayrow[0] .= '<td width="400px"><b>PLU </b></td>';
       $arrayrow[0] .= '<td><b>Jumlah</b></td>';
       $arrayrow[0] .= '<td><b>Pengguna</b></td>';
       $arrayrow[0] .= '<td><b>Unit Kerja</b></td>';
       $arrayrow[0] .= '<td><b>Jenis Pembayaran</b></td>';
       $arrayrow[0] .= '<td align="right" width="250px"><b>Total</b></td>';
       $arrayrow[0] .= '<td width="350px"><b>User</b></td>';
       $i=1;
       $jumlahsatuantotal =0;
       $jumlahtotal =0;
       foreach ($xQuery->result() as $row) {
            $arrayrow[$i]= '<td>'.$row->jam.'.</td>';
            $arrayrow[$i].= '<td>'.$row->NamaProduk.' ('.$row->nominalpersatuan.')</td>';
            $arrayrow[$i].= '<td align="center">'.$row->jumlahsatuan.'</td>';
            $arrayrow[$i].= '<td align="center">'.$row->namapengguna.'</td>';
            $arrayrow[$i].= '<td align="center">'.$row->namaunitkerja.'</td>';
            $arrayrow[$i].= '<td align="center">'.$row->JenisPengguna.'</td>';
            $arrayrow[$i].= '<td align="right">'.number_format($row->total, 0, '.', ',').'</td>';
            $arrayrow[$i].= '<td >'.$row->namauser.'</td>';
            $jumlahsatuantotal += $row->jumlahsatuan;
            $jumlahtotal += ($row->nominalpersatuan*$row->jumlahsatuan);
            $i++;
        }
       $arrayrow[$i] = '<td></td>';
       $arrayrow[$i] .= '<td>Jumlah</td>';
       $arrayrow[$i] .= '<td>'.number_format($jumlahsatuantotal, 0, '.', ',').'</td>';
       $arrayrow[$i] .= '<td></td>';
       $arrayrow[$i] .= '<td></td>';
       $arrayrow[$i] .= '<td></td>';
       $arrayrow[$i] .= '<td align="right">'.number_format($jumlahtotal, 0, '.', ',').'</td>';
       $arrayrow[$i] .= '<td></td>';
        //$this->load->model('modelsetoran');
//        $xQuery = $this->modelsetoran->getSumSetoranBulan($xbulan,$tahun);
//
//            $arrayrow[$i]= '<td> </td>';
//            $arrayrow[$i].= '<td> </td>';
//            $arrayrow[$i].= '<td>  </td>';
//            $arrayrow[$i].= '<td> </td>';
//        $i++;
//            $arrayrow[$i]= '<td> </td>';
//            $arrayrow[$i].= '<td> </td>';
//            $arrayrow[$i].= '<td>Jumlah  </td>';
//            $arrayrow[$i].= '<td align="right"> '.number_format($jumlahtotal, 0, '.', ',').' </td>';
//         $i++;
//      $TotalSetoran =0;
//      foreach ($xQuery->result() as $row) {
//            $arrayrow[$i]= '<td> </td>';
//            $arrayrow[$i].= '<td> </td>';
//            $arrayrow[$i].= '<td>Di Setor ke '.$row->NamaRekanan.' </td>';
//            $arrayrow[$i].= '<td align="right"> '.number_format($row->jumlah, 0, '.', ',').' </td>';
//            $TotalSetoran +=$row->jumlah;
//       $i++;
//      }
//
//
//            $arrayrow[$i]= '<td> </td>';
//            $arrayrow[$i].= '<td> </td>';
//            $arrayrow[$i].= '<td>Jumlah  Pemasukkan Total</td>';
//            $arrayrow[$i].= '<td align="right"> '.number_format($jumlahtotal-$TotalSetoran, 0, '.', ',').' </td>';
//       $i++;
    return $arrayrow;
    }

function getrowperuser($edtgldenda,$edidlokasi){

       $this->load->model('modeltransaksi');
       $xQuery = $this->modeltransaksi->getSetoranTunaiPertanggalUser($edtgldenda,$edidlokasi);
       $arrayrow[0] = '<td width="50px"><b>No.</b></td>';
       $arrayrow[0] .= '<td width="600px"><b>Nama </b></td>';
       $arrayrow[0] .= '<td><b>Jumlah Setoran</b></td>';

       $i=1;
       $jumlahtotal =0;
       foreach ($xQuery->result() as $row) {
            $arrayrow[$i]= '<td>'.$i.'.</td>';
            $arrayrow[$i].= '<td>'.$row->namauser.' </td>';
            $arrayrow[$i].= '<td align="right">'.number_format($row->total, 0, '.', ',').'</td>';
            $jumlahtotal += $row->total;
            $i++;
        }
       $arrayrow[$i] = '<td></td>';
       $arrayrow[$i] .= '<td width="600px">Jumlah</td>';
       $arrayrow[$i] .= '<td align="right">'.number_format($jumlahtotal, 0, '.', ',').'</td>';


    return $arrayrow;
    }
    

}

?>