<?php 
require_once("EntityRepository.php");
require_once("Class/Movies.php");

class MoviesRepository extends EntityRepository {
    
    public function __construct() {
        parent::__construct();
    }

    public function find($id): ?Movies {
        $requete = $this->cnx->prepare("select * from Movies where id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();

        $answer = $requete->fetch(PDO::FETCH_OBJ);

        if ($answer == false) return null;

        return new Movies([
            "id" => $answer->id,
            "movie_title" => $answer->movie_title,
            "genre" => $answer->genre,
            "release_date" => $answer->release_date,
            "duration_minutes" => $answer->duration_minutes,
            "rating" => $answer->rating
        ]);
    }

    public function getTop3(): array {
        $requete = $this->cnx->prepare("
( SELECT m.*, COUNT(s.movie_id) as Sales FROM Sales s JOIN Movies m ON s.movie_id = m.id WHERE s.purchase_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) GROUP BY m.movie_title ORDER BY Sales DESC LIMIT 3 ) UNION ALL ( SELECT m.*, COUNT(r.movie_id) as Rentals FROM Rentals r JOIN Movies m ON r.movie_id = m.id WHERE r.rental_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 MONTH) GROUP BY m.movie_title ORDER BY Rentals DESC LIMIT 3 );
        ");
        $requete->execute();
    
        $answers = $requete->fetchAll(PDO::FETCH_OBJ);
    
        if ($answers == false) return [];
    
        $result = [];
        foreach($answers as $answer) {
            array_push($result, new Movies([
                "id" => $answer->id,
                "movie_title" => $answer->movie_title,
                "genre" => $answer->genre,
                "release_date" => $answer->release_date,
                "duration_minutes" => $answer->duration_minutes,
                "rating" => $answer->rating
            ]));
        }
    
        return $result;
    }

    public function historyByTitle($movie_title): array {
        $requete = $this->cnx->prepare("SELECT DATE_FORMAT(date_range.month, '%Y-%m') AS month, COALESCE(SUM(CASE WHEN r.rental_price IS NOT NULL THEN 1 ELSE 0 END), 0) AS rentals_count, 0 AS sales_count FROM (SELECT DATE_FORMAT(CURDATE(), '%Y-%m-01') AS month UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01') UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 2 MONTH), '%Y-%m-01') UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 3 MONTH), '%Y-%m-01') UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 4 MONTH), '%Y-%m-01') UNION ALL SELECT DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01')) AS date_range LEFT JOIN Rentals r ON DATE_FORMAT(r.rental_date, '%Y-%m') = DATE_FORMAT(date_range.month, '%Y-%m') AND r.movie_id = (SELECT id FROM Movies WHERE movie_title = :movie_title) GROUP BY date_range.month ORDER BY date_range.month;
        ");
        $requete->bindParam(':movie_title', $movie_title);
        $requete->execute();
    
        $answers = $requete->fetchAll(PDO::FETCH_OBJ);
    
        if ($answers == false) return [];
    
        $result = [];
        foreach($answers as $answer) {
            array_push($result,[
                "month" => $answer->month,
                "rentals_count" => $answer->rentals_count,
                "sales_count" => $answer->sales_count,
            ]);
        }
    
        return $result;
    }

    public function movieCustomer($customer): array {
        $requete = $this->cnx->prepare("SELECT c.first_name, c.last_name, m.genre, m.movie_title FROM Rentals r JOIN Movies m ON r.movie_id = m.id JOIN Customers c ON r.customer_id = c.id WHERE r.customer_id = :customer ORDER BY m.genre, m.movie_title");
        $requete->bindParam(':customer', $customer);
        $requete->execute();

        $answers = $requete->fetchAll(PDO::FETCH_OBJ);

        if ($answers == false) return [];

        $result = [];
        foreach($answers as $answer) {
            array_push($result,[
                "genre" => $answer->genre,
                "first_name" => $answer->first_name,
                "last_name" => $answer->last_name,
                "movie_title" => $answer->movie_title
            ]);
        }
        return $result;
    }
    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Movies");
        $requete->execute();

        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $result = [];
        foreach($answer as $obj) {
            array_push($result, new Movies([
                "id" => $obj->id,
                "movie_title" => $obj->movie_title,
                "genre" => $obj->genre,
                "release_date" => $obj->release_date,
                "duration_minutes" => $obj->duration_minutes,
                "rating" => $obj->rating
            ]));
        }
        return $result;
    }

    public function save($data) {
        $requete = $this->cnx->prepare("insert into Movies (movie_title, genre, release_date, duration_minutes, rating) values (:movie_title, :genre, :release_date, :duration_minutes, :rating)");
        $requete->bindParam(':movie_title', $data["movie_title"]);
        $requete->bindParam(':genre', $data["genre"]);
        $requete->bindParam(':release_date', $data["release_date"]);
        $requete->bindParam(':duration_minutes', $data["duration_minutes"]);
        $requete->bindParam(':rating', $data["rating"]);
        $requete->execute();
    }
    public function update($data) {
        $requete = $this->cnx->prepare("update Movies set movie_title=:movie_title, genre=:genre, release_date=:release_date, duration_minutes=:duration_minutes, rating=:rating where id=:id");
        $requete->bindParam(':id', $data["id"]);
        $requete->bindParam(':movie_title', $data["movie_title"]);
        $requete->bindParam(':genre', $data["genre"]);
        $requete->bindParam(':release_date', $data["release_date"]);
        $requete->bindParam(':duration_minutes', $data["duration_minutes"]);
        $requete->bindParam(':rating', $data["rating"]);
        $requete->execute();
    }

    public function delete($id) {
        $requete = $this->cnx->prepare("delete from Movies where id=:id");
        $requete->bindParam(':id', $id);
        $requete->execute();
    }
}
?>