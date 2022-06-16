<?php

include 'credentials.php';

global $conn;
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function db_get_note($note)
{
    global $conn;
    $sql = "SELECT * FROM table_todos WHERE id =$note";
    $result = $conn->query($sql);
    $return = '';
    if ($result->num_rows > 0) {
        // output data of each rows
        while ($row = $result->fetch_assoc()) {
            $return .= "id: " . $row["id"] . " - Text: " . $row["text"]
                . " - Checked: " . $row["checked"] . " - deleted: " . $row["deleted"] . "<br>";
        }
    } else {
        $return =  "0 results";
    }
    $conn->close();
    return $return;
}


function db_get_all_notes()
{
    global $conn;
    $sql = "SELECT * FROM table_todos";
    $result = $conn->query($sql);
    $return = '';
    if ($result->num_rows > 0) {
        // output data of each rows
        while ($row = $result->fetch_assoc()) {
            $return .= "id: " . $row["id"] . " - Text: " . $row["text"]
                . " - Checked: " . $row["checked"] . " - deleted: " . $row["deleted"] . "<br>";
        }
    } else {
        $return =  "0 results";
    }
    $conn->close();
    return $return;
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
        echo "record deleted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

}

function db_update_note($noteid , $text){

    global $conn;
    $sql = "UPDATE table_todos SET deleted=$text WHERE id = $noteid";
    if ($conn->query($sql) === TRUE) {
        echo "record update successfully";
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
        echo "record checked successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

}








