<?php
function rand_string( $length ) {
	$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	

	$size = strlen( $chars );
	for( $i = 0; $i < $length; $i++ ) {
		$str .= $chars[ rand( 0, $size - 1 ) ];
	}
	$str = substr( str_shuffle( $chars ), 0, $length );
	return $str;
}
$_param="";
$_param=json_decode(stripslashes($_POST["jugada"]));
//print_r ($_param);

//$_param='{"jugada":{"court_view":"halfcourt","jugadores_activos":10,"is_favorite":false,"ball":"ball_n2","playerslook":"playerslook_default","pista":"court_default","type":"b_deffensive","idCloud":0,"id":1,"playersid":"letters","nombre":"Example","play_notes":""},"movimientos":[{"id":1,"pasos":[{"blocAngle":0,"id_objeto":"1","hasBall":false,"posiciones":[{"pasos_id":1,"y":615,"id":1,"x":521}],"movimientos_id":1,"id":1,"isBloc":false},{"blocAngle":0,"id_objeto":"2","hasBall":false,"posiciones":[{"pasos_id":2,"y":448,"id":2,"x":161}],"movimientos_id":1,"id":2,"isBloc":false},{"blocAngle":0,"id_objeto":"3","hasBall":false,"posiciones":[{"pasos_id":3,"y":424,"id":3,"x":888}],"movimientos_id":1,"id":3,"isBloc":false},{"blocAngle":0,"id_objeto":"5","hasBall":false,"posiciones":[{"pasos_id":4,"y":178,"id":4,"x":728}],"movimientos_id":1,"id":4,"isBloc":false},{"blocAngle":0,"id_objeto":"4","hasBall":false,"posiciones":[{"pasos_id":5,"y":179,"id":5,"x":295}],"movimientos_id":1,"id":5,"isBloc":false},{"blocAngle":0,"id_objeto":"1op","hasBall":false,"posiciones":[{"pasos_id":6,"y":443,"id":6,"x":515}],"movimientos_id":1,"id":6,"isBloc":false},{"blocAngle":0,"id_objeto":"3op","hasBall":false,"posiciones":[{"pasos_id":7,"y":338,"id":7,"x":789}],"movimientos_id":1,"id":7,"isBloc":false},{"blocAngle":0,"id_objeto":"2op","hasBall":false,"posiciones":[{"pasos_id":8,"y":346,"id":8,"x":258}],"movimientos_id":1,"id":8,"isBloc":false},{"blocAngle":0,"id_objeto":"4op","hasBall":false,"posiciones":[{"pasos_id":9,"y":178,"id":9,"x":399}],"movimientos_id":1,"id":9,"isBloc":false},{"blocAngle":0,"id_objeto":"ball","hasBall":false,"posiciones":[{"pasos_id":10,"y":563,"id":10,"x":552}],"movimientos_id":1,"id":10,"isBloc":false},{"blocAngle":0,"id_objeto":"5op","hasBall":false,"posiciones":[{"pasos_id":11,"y":177,"id":11,"x":619}],"movimientos_id":1,"id":11,"isBloc":false}],"jugadas_id":1},{"id":2,"pasos":[{"blocAngle":-167,"id_objeto":"3","hasBall":false,"posiciones":[{"pasos_id":12,"y":425,"id":12,"x":888},{"pasos_id":12,"y":425,"id":13,"x":888},{"pasos_id":12,"y":427,"id":14,"x":888},{"pasos_id":12,"y":430,"id":15,"x":887},{"pasos_id":12,"y":433,"id":16,"x":884},{"pasos_id":12,"y":439,"id":17,"x":875},{"pasos_id":12,"y":445,"id":18,"x":863},{"pasos_id":12,"y":452,"id":19,"x":850},{"pasos_id":12,"y":459,"id":20,"x":832},{"pasos_id":12,"y":465,"id":21,"x":812},{"pasos_id":12,"y":471,"id":22,"x":796},{"pasos_id":12,"y":477,"id":23,"x":781},{"pasos_id":12,"y":480,"id":24,"x":769},{"pasos_id":12,"y":482,"id":25,"x":762},{"pasos_id":12,"y":482,"id":26,"x":756},{"pasos_id":12,"y":482,"id":27,"x":748},{"pasos_id":12,"y":482,"id":28,"x":737},{"pasos_id":12,"y":481,"id":29,"x":726},{"pasos_id":12,"y":481,"id":30,"x":717},{"pasos_id":12,"y":481,"id":31,"x":710},{"pasos_id":12,"y":480,"id":32,"x":704},{"pasos_id":12,"y":480,"id":33,"x":696},{"pasos_id":12,"y":478,"id":34,"x":689},{"pasos_id":12,"y":477,"id":35,"x":680},{"pasos_id":12,"y":477,"id":36,"x":674},{"pasos_id":12,"y":476,"id":37,"x":669},{"pasos_id":12,"y":474,"id":38,"x":666},{"pasos_id":12,"y":474,"id":39,"x":662},{"pasos_id":12,"y":472,"id":40,"x":655},{"pasos_id":12,"y":471,"id":41,"x":646},{"pasos_id":12,"y":471,"id":42,"x":642},{"pasos_id":12,"y":470,"id":43,"x":640},{"pasos_id":12,"y":470,"id":44,"x":638},{"pasos_id":12,"y":470,"id":45,"x":638},{"pasos_id":12,"y":470,"id":46,"x":638},{"pasos_id":12,"y":470,"id":47,"x":636},{"pasos_id":12,"y":469,"id":48,"x":633},{"pasos_id":12,"y":469,"id":49,"x":633},{"pasos_id":12,"y":469,"id":50,"x":630},{"pasos_id":12,"y":468,"id":51,"x":628},{"pasos_id":12,"y":468,"id":52,"x":628},{"pasos_id":12,"y":468,"id":53,"x":628},{"pasos_id":12,"y":468,"id":54,"x":628},{"pasos_id":12,"y":468,"id":55,"x":628},{"pasos_id":12,"y":466,"id":56,"x":622}],"movimientos_id":2,"id":12,"isBloc":true}],"jugadas_id":1},{"id":3,"pasos":[{"blocAngle":0,"id_objeto":"1","hasBall":true,"posiciones":[{"pasos_id":13,"y":615,"id":57,"x":521},{"pasos_id":13,"y":615,"id":58,"x":521},{"pasos_id":13,"y":615,"id":59,"x":521},{"pasos_id":13,"y":614,"id":60,"x":522},{"pasos_id":13,"y":614,"id":61,"x":522},{"pasos_id":13,"y":614,"id":62,"x":523},{"pasos_id":13,"y":614,"id":63,"x":525},{"pasos_id":13,"y":614,"id":64,"x":526},{"pasos_id":13,"y":614,"id":65,"x":532},{"pasos_id":13,"y":614,"id":66,"x":540},{"pasos_id":13,"y":614,"id":67,"x":555},{"pasos_id":13,"y":614,"id":68,"x":572},{"pasos_id":13,"y":614,"id":69,"x":592},{"pasos_id":13,"y":614,"id":70,"x":605},{"pasos_id":13,"y":614,"id":71,"x":614},{"pasos_id":13,"y":614,"id":72,"x":622},{"pasos_id":13,"y":614,"id":73,"x":628},{"pasos_id":13,"y":614,"id":74,"x":631},{"pasos_id":13,"y":614,"id":75,"x":634},{"pasos_id":13,"y":613,"id":76,"x":636},{"pasos_id":13,"y":613,"id":77,"x":642},{"pasos_id":13,"y":613,"id":78,"x":646},{"pasos_id":13,"y":613,"id":79,"x":650},{"pasos_id":13,"y":611,"id":80,"x":653},{"pasos_id":13,"y":610,"id":81,"x":656},{"pasos_id":13,"y":607,"id":82,"x":659},{"pasos_id":13,"y":602,"id":83,"x":663},{"pasos_id":13,"y":599,"id":84,"x":667},{"pasos_id":13,"y":596,"id":85,"x":670},{"pasos_id":13,"y":594,"id":86,"x":673},{"pasos_id":13,"y":591,"id":87,"x":674},{"pasos_id":13,"y":590,"id":88,"x":677},{"pasos_id":13,"y":587,"id":89,"x":680},{"pasos_id":13,"y":582,"id":90,"x":685},{"pasos_id":13,"y":579,"id":91,"x":686},{"pasos_id":13,"y":577,"id":92,"x":688},{"pasos_id":13,"y":575,"id":93,"x":689},{"pasos_id":13,"y":573,"id":94,"x":692},{"pasos_id":13,"y":570,"id":95,"x":695},{"pasos_id":13,"y":567,"id":96,"x":697},{"pasos_id":13,"y":566,"id":97,"x":698},{"pasos_id":13,"y":564,"id":98,"x":699},{"pasos_id":13,"y":563,"id":99,"x":701},{"pasos_id":13,"y":562,"id":100,"x":701},{"pasos_id":13,"y":561,"id":101,"x":703},{"pasos_id":13,"y":559,"id":102,"x":704},{"pasos_id":13,"y":556,"id":103,"x":706},{"pasos_id":13,"y":555,"id":104,"x":706},{"pasos_id":13,"y":554,"id":105,"x":707},{"pasos_id":13,"y":553,"id":106,"x":707},{"pasos_id":13,"y":553,"id":107,"x":707},{"pasos_id":13,"y":552,"id":108,"x":707},{"pasos_id":13,"y":549,"id":109,"x":707}],"movimientos_id":3,"id":13,"isBloc":false},{"blocAngle":0,"id_objeto":"5","hasBall":false,"posiciones":[{"pasos_id":14,"y":178,"id":110,"x":728},{"pasos_id":14,"y":178,"id":111,"x":728},{"pasos_id":14,"y":177,"id":112,"x":728},{"pasos_id":14,"y":174,"id":113,"x":729},{"pasos_id":14,"y":173,"id":114,"x":730},{"pasos_id":14,"y":169,"id":115,"x":733},{"pasos_id":14,"y":165,"id":116,"x":739},{"pasos_id":14,"y":159,"id":117,"x":744},{"pasos_id":14,"y":153,"id":118,"x":750},{"pasos_id":14,"y":147,"id":119,"x":754},{"pasos_id":14,"y":143,"id":120,"x":760},{"pasos_id":14,"y":138,"id":121,"x":766},{"pasos_id":14,"y":133,"id":122,"x":774},{"pasos_id":14,"y":128,"id":123,"x":781},{"pasos_id":14,"y":125,"id":124,"x":787},{"pasos_id":14,"y":120,"id":125,"x":795},{"pasos_id":14,"y":117,"id":126,"x":800},{"pasos_id":14,"y":115,"id":127,"x":806},{"pasos_id":14,"y":112,"id":128,"x":812},{"pasos_id":14,"y":109,"id":129,"x":817},{"pasos_id":14,"y":106,"id":130,"x":823},{"pasos_id":14,"y":103,"id":131,"x":827},{"pasos_id":14,"y":101,"id":132,"x":832},{"pasos_id":14,"y":100,"id":133,"x":837},{"pasos_id":14,"y":97,"id":134,"x":841},{"pasos_id":14,"y":94,"id":135,"x":847},{"pasos_id":14,"y":90,"id":136,"x":854},{"pasos_id":14,"y":87,"id":137,"x":858},{"pasos_id":14,"y":83,"id":138,"x":864},{"pasos_id":14,"y":82,"id":139,"x":870},{"pasos_id":14,"y":80,"id":140,"x":872},{"pasos_id":14,"y":79,"id":141,"x":873},{"pasos_id":14,"y":79,"id":142,"x":876},{"pasos_id":14,"y":77,"id":143,"x":877},{"pasos_id":14,"y":77,"id":144,"x":879},{"pasos_id":14,"y":77,"id":145,"x":885},{"pasos_id":14,"y":74,"id":146,"x":891},{"pasos_id":14,"y":71,"id":147,"x":896},{"pasos_id":14,"y":69,"id":148,"x":901},{"pasos_id":14,"y":66,"id":149,"x":905},{"pasos_id":14,"y":63,"id":150,"x":910},{"pasos_id":14,"y":62,"id":151,"x":914},{"pasos_id":14,"y":60,"id":152,"x":917},{"pasos_id":14,"y":58,"id":153,"x":922},{"pasos_id":14,"y":57,"id":154,"x":926},{"pasos_id":14,"y":54,"id":155,"x":932},{"pasos_id":14,"y":53,"id":156,"x":936},{"pasos_id":14,"y":51,"id":157,"x":940},{"pasos_id":14,"y":51,"id":158,"x":943},{"pasos_id":14,"y":49,"id":159,"x":946},{"pasos_id":14,"y":48,"id":160,"x":950},{"pasos_id":14,"y":48,"id":161,"x":952},{"pasos_id":14,"y":48,"id":162,"x":953},{"pasos_id":14,"y":48,"id":163,"x":954},{"pasos_id":14,"y":46,"id":164,"x":955},{"pasos_id":14,"y":46,"id":165,"x":957},{"pasos_id":14,"y":46,"id":166,"x":957},{"pasos_id":14,"y":46,"id":167,"x":957},{"pasos_id":14,"y":46,"id":168,"x":957},{"pasos_id":14,"y":46,"id":169,"x":957},{"pasos_id":14,"y":46,"id":170,"x":957}],"movimientos_id":3,"id":14,"isBloc":false}],"jugadas_id":1},{"id":4,"pasos":[{"blocAngle":0,"id_objeto":"ball","hasBall":false,"posiciones":[{"pasos_id":15,"y":497,"id":171,"x":738},{"pasos_id":15,"y":90.97764730675115,"id":172,"x":935.1594129486065}],"movimientos_id":4,"id":15,"isBloc":false}],"jugadas_id":1}]}';
//$_param=json_decode($_param);

//CODIGO REAL
include "CMySqlData.php";
$db = new CMySqlData();
$db->Connect();

$sql="insert into jugadas (nombre, type, pista, jugadores_activos, play_notes, playerslook, playersid, ball, is_favorite, court_view, is_public, hash, end_date) values(";
$sql.="'".addslashes($_param->jugada->nombre)."',";
$sql.="'".$_param->jugada->type."',";
$sql.="'".$_param->jugada->pista."',";
$sql.=$_param->jugada->jugadores_activos.",";
$sql.="'".addslashes($_param->jugada->play_notes)."',";
$sql.="'".$_param->jugada->playerslook."',";
$sql.="'".$_param->jugada->playersid."',";
$sql.="'".$_param->jugada->ball."',";
$tmp=0;
if ($_param->jugada->is_favorite == "true"){
	$tmp=1;
}
$sql.="'".$tmp."',";
$sql.="'".$_param->jugada->court_view."',";
$tmp=0;
if ($_param->jugada->is_public == "true"){
	$tmp=1;
}
$random=rand_string(8);
$sql.="'".$tmp."','".$random."',DATE_ADD(CURDATE(), INTERVAL 1 MONTH))";

$bOk=0;
try {
	
    $id_jugada="1";
    /*
    $id_jugada=$db->ExecuteNonQueryWithID($sql);
	if ($id_jugada > 0){
		//echo $id_jugada;
		for ($i=0; $i<count($_param->jugada->movimientos);$i++){
			//INSERT DE MOVIMIENTOS
			$sql="insert into movimientos (jugadas_id) values(".$id_jugada.")";
			$id_movimiento=$db->ExecuteNonQueryWithID($sql);
			for ($j=0;$j<count($_param->jugada->movimientos[$i]->pasos);$j++){
				//INSERT DE PASOS
				$sql="insert into pasos (id_objeto, hasBall, movimientos_id, isBloc, blocAngle) values (";
				$sql.="'".$_param->jugada->movimientos[$i]->pasos[$j]->id_objeto."',";
				$tmp=0;
				if ($_param->jugada->movimientos[$i]->pasos[$j]->hasBall == "true"){
					$tmp=1;
				}
				$sql.="'".$tmp."',";
				$sql.=$id_movimiento.",";
				$tmp=0;
				if ($_param->jugada->movimientos[$i]->pasos[$j]->isBloc == "true"){
					$tmp=1;
				}
				$sql.="'".$tmp."',";
				$sql.="'".$_param->jugada->movimientos[$i]->pasos[$j]->blocAngle."')";
				$id_pasos=$db->ExecuteNonQueryWithID($sql);
				for ($k=0;$k<count($_param->jugada->movimientos[$i]->pasos[$j]->posiciones);$k++){
					//INSERT POSICIONES
					$sql="insert into posiciones(x, y, pasos_id) values(";
					$sql.="'".str_replace(",",".",$_param->jugada->movimientos[$i]->pasos[$j]->posiciones[$k]->x)."',";
					$sql.="'".str_replace(",",".",$_param->jugada->movimientos[$i]->pasos[$j]->posiciones[$k]->y)."',";
					$sql.=$id_pasos.")";
					$id_posiciones=$db->ExecuteNonQueryWithID($sql);
				}
			}
		}
	}
    */
	$bOk=$id_jugada;
} catch (Exception $e) {
	$bOk=0;
	$random=0;
}

if ($bOk != 0){
	//MAIL
	include "classphpmailer.php";
	$mail = new PHPMailer();
	$mail->IsHTML(true);
	$mail->From = "headcoach@appnormals.com";
	$mail->FromName = "HeadCoach";

	$mail->AddBCC("soymachine@gmail.com");
	//$mail->AddAddress("sergio.perales@gmail.com");
	try{
		$mail->AddAddress($_POST["emails"]);
	}catch (Exception $e) {}
	
	$usuario="Coack K";
	try{
		$usuario=$_POST["usuario"];
	}catch (Exception $e) {}
	$mail->Subject = "Basketball play shared with you!";
	$mail->Body = "'".$usuario."' has shared a basketball play with the name '".addslashes($_param->jugada->nombre)."' with you!<br/><br/>";
	$mail->Body .= "Play ID:<br/><br/>"; 
	$mail->Body .= "<h2>".$random."</h2>";
	$mail->Body .= "Paste this Play ID at the Load Panel in the HeadCoach Basketball App.<br/>";
	$mail->Body .= "'How to use it' instructions link: http://www.appnormals.com<br/><br/>";
	$date = date("Y-m-d");
	$date = date("d-M-Y",strtotime(date("Y-m-d", strtotime($date)) . " +1 month"));
	$mail->Body .= "This play will be valid only until ".$date."<br/><br/>";
	$mail->Body .= "If you don't have the app download it here:<br/>";
	$mail->Body .= "* iPad: https://itunes.apple.com/app/head-coach-basketball/id433386696<br/>";
	$mail->Body .= "* Android: https://play.google.com/store/apps/details?id=air.com.appnormals.headcoachbasketball<br/><br/>";
	$mail->Body .= "Thanks for using HeadCoach Basketball App developed by Appnormals Team ;)<br/><br/>";
	$mail->Body .= "Regards,<br/>";
	$mail->Body .= "HeadCoach Basketball Team<br/>";
	$mail->Body .= "http://headcoachbasketball.appnormals.com/";

	$mail->Send();
}
$result=array();
$result[0]=$random;
echo json_encode($result);
$db->ConnectionClose();
?>