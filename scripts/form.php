<?php 
require_once("conexao.php"); 
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$mensagem = $_POST['mensagem'];

$sql = "INSERT INTO clientes (nome, email , telefone, mensagem) 
VALUES('$nome', '$email', '$telefone', '$mensagem')";


// $result = shell_exec('python sendEmail.py ' . $nome . $email . $telefone . $mensagem); 

// echo "$result";


#testando query
if(mysqli_query($conn, $sql)){
	echo "<script> alert('Dados enviados com sucesso!'); </script> ";
}else{
	echo "Os dados não foram enviados devido ao seguinte erro <br>". mysqli_error($conn);
}
mysqli_close($conn);
?>