<?php 
require_once("EntityRepository.php");
require_once("Class/Rentals.php");


class RentalsRepository extends EntityRepository {
    
    public function __construct() {
        parent::__construct();
    }

    public function find($id): ?Rentals {
        $requete = $this->cnx->prepare("select * from Rentals where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();

        $answer = $requete->fetch(PDO::FETCH_OBJ);

        if ($answer == false) return null;

        return new Rentals([
            "id" => $answer->id,
            "customer_id" => $answer->customer_id,
            "movie_id" => $answer->movie_id,
            "rental_date" => $answer->rental_date,
            "rental_price" => $answer->rental_price
        ]);
    }

    public function getTotalRentalsForThisMonth(): float {
        $requete = $this->cnx->prepare("
            SELECT SUM(rental_price) AS total_rentals FROM Rentals WHERE MONTH(rental_date) = MONTH(CURRENT_DATE()) AND YEAR(rental_date) = YEAR(CURRENT_DATE());
        ");
        $requete->execute();
    
        $answer = $requete->fetch(PDO::FETCH_OBJ);
    
        if ($answer == false) return 0.0;
    
        $total_rentals = $answer->total_rentals ?? 0.0;
    
        return $total_rentals;
    }

    public function getRentalsEvolution(): array {
        $requete = $this->cnx->prepare("
            SELECT DATE_FORMAT(Rentals.rental_date, '%Y-%m') as month, SUM(Rentals.rental_price) as total_rentals FROM (SELECT rental_date, rental_price FROM Rentals WHERE rental_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH)) Rentals GROUP BY month ORDER BY month DESC;
        ");
        $requete->execute();
    
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
    
        $result = [];
        foreach($answer as $obj) {
            array_push($result, [
                "month" => $obj->month,
                "total_rentals" => $obj->total_rentals
            ]);
        }
    
        return $result;
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Rentals");
        $requete->execute();

        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $result = [];
        foreach($answer as $obj) {
            array_push($result, new Rentals([
                "id" => $obj->id,
                "customer_id" => $obj->customer_id,
                "movie_id" => $obj->movie_id,
                "rental_date" => $obj->rental_date,
                "rental_price" => $obj->rental_price
            ]));
        }
        return $result;
    }

    public function save($data) {
        $requete = $this->cnx->prepare("insert into Rentals (customer_id, movie_id, rental_date, rental_price) values (:customer_id, :movie_id, :rental_date, :rental_price)");
        $requete->bindParam(':customer_id', $data["customer_id"]);
        $requete->bindParam(':movie_id', $data["movie_id"]);
        $requete->bindParam(':rental_date', $data["rental_date"]);
        $requete->bindParam(':rental_price', $data["rental_price"]);
        $requete->execute();
    }

    public function update($data) {
        $requete = $this->cnx->prepare("update Rentals set customer_id=:customer_id, movie_id=:movie_id, rental_date=:rental_date, rental_price=:rental_price where id=:id");
        $requete->bindParam(':id', $data["id"]);
        $requete->bindParam(':customer_id', $data["customer_id"]);
        $requete->bindParam(':movie_id', $data["movie_id"]);
        $requete->bindParam(':rental_date', $data["rental_date"]);
        $requete->bindParam(':rental_price', $data["rental_price"]);
        $requete->execute();
    }

    public function delete($id) {
        $requete = $this->cnx->prepare("delete from Rentals where id=:id");
        $requete->bindParam(':id', $id);
        $requete->execute();
    }
}