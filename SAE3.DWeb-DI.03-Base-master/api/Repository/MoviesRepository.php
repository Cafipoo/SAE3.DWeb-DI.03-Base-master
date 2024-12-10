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
            (
    SELECT Movies.*, COUNT(Sales.id) as count, 'purchase' as type
    FROM Sales
    JOIN Movies ON Sales.movie_id = Movies.id
    WHERE MONTH(Sales.purchase_date) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH)
    AND YEAR(Sales.purchase_date) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)
    GROUP BY Movies.id
    ORDER BY count DESC
    LIMIT 3
)
UNION ALL
(
    SELECT Movies.*, COUNT(Rentals.id) as count, 'rental' as type
    FROM Rentals
    JOIN Movies ON Rentals.movie_id = Movies.id
    WHERE MONTH(Rentals.rental_date) = MONTH(CURRENT_DATE() - INTERVAL 1 MONTH)
    AND YEAR(Rentals.rental_date) = YEAR(CURRENT_DATE() - INTERVAL 1 MONTH)
    GROUP BY Movies.id
    ORDER BY count DESC
    LIMIT 3
)
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