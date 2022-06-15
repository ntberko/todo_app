<?php
$servername = "127.0.0.1";
$username = "root";
$password = '8yBNM@km';
$dbname = "db_todo";

global $conn;
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function db_create_note($note){

    global $conn;
    $sql = "INSERT INTO table_todos (text) VALUES ('$note')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

}

function db_delete_note($note){

    global $conn;
    $sql = "UPDATE table_todos SET deleted=1 WHERE id = $note";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

}

function db_checked_note($note){

    global $conn;

    $sql = "SELECT checked FROM table_todos WHERE id = $note";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    if($row['checked']){
        $sql = "UPDATE table_todos SET checked=0 WHERE id = $note";
    }
    else{
        $sql = "UPDATE table_todos SET checked=1 WHERE id = $note";
    }

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

}








