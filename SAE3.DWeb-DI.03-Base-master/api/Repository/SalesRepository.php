<?php 
require_once("EntityRepository.php");
require_once("Class/Sales.php");

class SalesRepository extends EntityRepository {
    
    public function __construct() {
        parent::__construct();
    }

    public function find($id): ?Sales {
        $requete = $this->cnx->prepare("select * from Sales where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();

        $answer = $requete->fetch(PDO::FETCH_OBJ);

        if ($answer == false) return null;

        return new Sales([
            "id" => $answer->id,
            "customer_id" => $answer->customer_id,
            "movie_id" => $answer->movie_id,
            "purchase_date" => $answer->purchase_date,
            "purchase_price" => $answer->purchase_price
        ]);
    }

    public function getTotalSalesForThisMonth(): float {
        $requete = $this->cnx->prepare("
            SELECT SUM(purchase_price) AS total_sales FROM Sales WHERE MONTH(purchase_date) = MONTH(CURRENT_DATE()) AND YEAR(purchase_date) = YEAR(CURRENT_DATE())
        ");
        $requete->execute();
    
        $answer = $requete->fetch(PDO::FETCH_OBJ);
    
        if ($answer == false) return 0.0;
    
        $total_sales = $answer->total_sales ?? 0.0;
    
        return $total_sales;
    }

    public function getSalesEvolution(): array {
        $requete = $this->cnx->prepare("
            SELECT DATE_FORMAT(Sales.purchase_date, '%Y-%m') as month, COUNT(Sales.purchase_price) as total_sales FROM (SELECT purchase_date, purchase_price FROM Sales WHERE purchase_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH)) Sales GROUP BY month ORDER BY month DESC;
        ");
        $requete->execute();
    
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
    
        $result = [];
        foreach($answer as $obj) {
            array_push($result, [
                "month" => $obj->month,
                "total_sales" => $obj->total_sales
            ]);
        }
    
        return $result;
    }

    public function salesGenreEvolution(): array {
        $requete = $this->cnx->prepare("
            SELECT DATE_FORMAT(Sales.purchase_date, '%Y-%m') as month, Movies.genre,SUM(Sales.purchase_price) as total_sales FROM Sales JOIN Movies ON Sales.movie_id = Movies.id WHERE Sales.purchase_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 5 MONTH) GROUP BY month, Movies.genre ORDER BY month DESC, Movies.genre;
        ");
        $requete->execute();
    
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
    
        $result = [];
        foreach($answer as $obj) {
            array_push($result, [
                "month" => $obj->month,
                "genre" => $obj->genre,
                "total_sales" => $obj->total_sales
            ]);
        }
    
        return $result;
    }

    public function salesByCountry(): array {
        $requete = $this->cnx->prepare("
            SELECT Customers.country, SUM(Sales.purchase_price) as total_sales FROM Sales JOIN Customers ON Sales.customer_id = Customers.id GROUP BY Customers.country;
        ");
        $requete->execute();
    
        $answer = $requete->fetchAll(PDO::FETCH_OBJ);
    
        $result = [];
        foreach($answer as $obj) {
            array_push($result, [
                "country" => $obj->country,
                "total_sales" => $obj->total_sales
            ]);
        }
    
        return $result;
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Sales");
        $requete->execute();

        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $result = [];
        foreach($answer as $obj) {
            array_push($result, new Sales([
                "id" => $obj->id,
                "customer_id" => $obj->customer_id,
                "movie_id" => $obj->movie_id,
                "purchase_date" => $obj->purchase_date,
                "purchase_price" => $obj->purchase_price
            ]));
        }
        return $result;
    }

    public function save($data) {
        $requete = $this->cnx->prepare("insert into Sales (customer_id, movie_id, purchase_date, purchase_price) values (:customer_id, :movie_id, :purchase_date, :purchase_price)");
        $requete->bindParam(':customer_id', $data["customer_id"]);
        $requete->bindParam(':movie_id', $data["movie_id"]);
        $requete->bindParam(':purchase_date', $data["purchase_date"]);
        $requete->bindParam(':purchase_price', $data["purchase_price"]);
        $requete->execute();
    }

    public function update($data) {
        $requete = $this->cnx->prepare("update Sales set customer_id=:customer_id, movie_id=:movie_id, purchase_date=:purchase_date, purchase_price=:purchase_price where id=:id");
        $requete->bindParam(':id', $data["id"]);
        $requete->bindParam(':customer_id', $data["customer_id"]);
        $requete->bindParam(':movie_id', $data["movie_id"]);
        $requete->bindParam(':purchase_date', $data["purchase_date"]);
        $requete->bindParam(':purchase_price', $data["purchase_price"]);
        $requete->execute();
    }

    public function delete($id) {
        $requete = $this->cnx->prepare("delete from Sales where id=:id");
        $requete->bindParam(':id', $id);
        $requete->execute();
    }
}