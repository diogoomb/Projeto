<?php


if (isset($_POST['submit'])){
    $nome = $_POST['Nome'];
    $origem = $_POST['Email'];
    $tema = $_POST['Tema'];
    $mensagem = $_POST['Mensagem'];

    $mailTo = "diogomirandabarbosa25@gmail.com";

    $headers = "De: ".$origem;
    $texto = "Tu recebeste um e-mail de ".$nome.".\n\n".$mensagem;


    mail($mailTo, $tema, $texto, $headers);
    header("Location: index.php?mailsend");
}