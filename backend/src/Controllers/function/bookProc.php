<?php 
//get all BOOK 
function getAllbook($db) {
    $sql = 'Select * FROM book '; 
    $stmt = $db->prepare ($sql); 
    $stmt ->execute(); 
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
} 
//get BOOK by id 
function getbook($db, $bookId) {
    $sql = 'Select o.bookId, o.bookTitle, o.bookAuthor, o.bookStatus FROM book o  ';
    $sql .= 'Where o.bookId = :id';
    $stmt = $db->prepare ($sql);
    $id = (int) $bookId;
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
}

//get all book titles
function getBookTitle($db) {
    $sql = 'SELECT bookTitle FROM book'; 
    $stmt = $db->prepare($sql); 
    $stmt->execute(); 
    return $stmt->fetchAll(PDO::FETCH_ASSOC); 
}
//add new BOOK 
function createbook($db, $form_data) { 
    $sql = 'Insert into book ( bookId, bookTitle, bookAuthor, bookStatus)'; 
    $sql .= 'values (:bookId, :bookTitle, :bookAuthor, :bookStatus)';  
    $stmt = $db->prepare ($sql); 
    $stmt->bindParam(':bookId', $form_data['bookId']);  
    $stmt->bindParam(':bookTitle', ($form_data['bookTitle']));
    $stmt->bindParam(':bookAuthor', ($form_data['bookAuthor']));
    $stmt->bindParam(':bookStatus', ($form_data['bookStatus']));
    $stmt->execute(); 
    return $db->lastInsertID();
}

//delete BOOK by id 
function deletebook($db,$bookId) { 

    $sql = ' Delete from book where bookId = :id';
    $stmt = $db->prepare($sql);  
    $id = (int)$bookId; 
    $stmt->bindParam(':id', $id, PDO::PARAM_INT); 
    $stmt->execute(); 
} 

//update BOOK by id 
function updatebook($db,$form_dat,$bookId) { 

    
    $sql = 'UPDATE book SET bookId = :bookId, bookTitle = :bookTitle , bookAuthor = :bookAuthor , bookStatus = :bookStatus'; 
    $sql .=' WHERE bookId = :id'; 
    $stmt = $db->prepare ($sql); 
    $id = (int)$bookId;  
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->bindParam(':bookId', $form_dat['bookId']);    
    $stmt->bindParam(':bookTitle', ($form_dat['bookTitle']));
    $stmt->bindParam(':bookAuthor', ($form_dat['bookAuthor']));
    $stmt->bindParam(':bookStatus', ($form_dat['bookStatus']));
    $stmt->execute(); 
}