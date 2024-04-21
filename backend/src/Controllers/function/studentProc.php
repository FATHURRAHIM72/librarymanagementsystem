<?php 
//get all STUDENT 
function getAllstudent($db) {

    
    $sql = 'Select * FROM student '; 
    $stmt = $db->prepare ($sql); 
    $stmt ->execute(); 
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
} 

//get STUDENT by id 
//get STUDENT by id 
function getstudent($db, $Id) {

    $sql = 'Select o.Id, o.studentName, o.studentID, o.bookTitle, o.borrowDate, o.returnDate FROM student o  ';
    $sql .= 'Where o.id = :id';
    $stmt = $db->prepare ($sql);
    $id = (int) $Id;
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 

}

//add new STUDENT 
function createstudent($db, $form_data) { 
    //stop at sisni
    $sql = 'Insert into student ( Id, studentName, studentID, borrowDate, returnDate, bookTitle)'; 
    $sql .= 'values (:Id, :studentName, :studentID, :borrowDate, :returnDate, :bookTitle)';  
    $stmt = $db->prepare ($sql); 
    $stmt->bindParam(':Id', $form_data['Id']);  
    $stmt->bindParam(':studentName', ($form_data['studentName']));
    $stmt->bindParam(':studentID', ($form_data['studentID']));
    $stmt->bindParam(':borrowDate', ($form_data['borrowDate']));
    $stmt->bindParam(':returnDate', ($form_data['returnDate']));
    $stmt->bindParam(':bookTitle', ($form_data['bookTitle']));
    $stmt->execute(); 
    return $db->lastInsertID();
}


//delete STUDENT by id 
function deletestudent($db,$Id) { 

    $sql = ' Delete from student where Id = :Id';
    $stmt = $db->prepare($sql);  
    $Id = (int)$Id; 
    $stmt->bindParam(':Id', $Id, PDO::PARAM_INT); 
    $stmt->execute(); 
} 

//update STUDENT by id 
//update STUDENT by id 
function updatestudent($db,$form_dat,$Id) { 

    $sql = 'UPDATE student SET Id = :Id, studentName = :studentName , studentID = :studentID , borrowDate = :borrowDate , returnDate = :returnDate, bookTitle = :bookTitle'; 
    $sql .=' WHERE Id = :id'; 
    $stmt = $db->prepare ($sql); 
    $id = (int)$Id;  
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':Id', $form_dat['Id']);    
    $stmt->bindParam(':studentName', ($form_dat['studentName']));
    $stmt->bindParam(':studentID', ($form_dat['studentID']));
    $stmt->bindParam(':bookTitle', ($form_dat['bookTitle']));
    $stmt->bindParam(':borrowDate', ($form_dat['borrowDate']));
    $stmt->bindParam(':returnDate', ($form_dat['returnDate']));
    $stmt->execute(); 
}
