<?php 
require_once("EntityRepository.php");
require_once("Class/Customers.php");

class CustomersRepository extends EntityRepository {
    
    public function __construct() {
        parent::__construct();
    }

    public function find($id): ?Customers {
        $requete = $this->cnx->prepare("SELECT * FROM Customers WHERE id=:value");
        $requete->bindParam(':value', $id);
        $requete->execute();

        $answer = $requete->fetch(PDO::FETCH_OBJ);

        if ($answer == false) return null;

        return new Customers([
            "id" => $answer->id,
            "first_name" => $answer->first_name,
            "last_name" => $answer->last_name,
            "email" => $answer->email,
            "country" => $answer->country,
            "city" => $answer->city,
            "lat" => $answer->lat,
            "lng" => $answer->lng
        ]);
    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("SELECT * FROM Customers");
        $requete->execute();

        $answer = $requete->fetchAll(PDO::FETCH_OBJ);

        $result = [];
        foreach($answer as $obj) {
            array_push($result, new Customers([
                "id" => $obj->id,
                "first_name" => $obj->first_name,
                "last_name" => $obj->last_name,
                "email" => $obj->email,
                "country" => $obj->country,
                "city" => $obj->city,
                "lat" => $obj->lat,
                "lng" => $obj->lng
            ]));
        }
        return $result;
    }

    public function save($data) {
        if (isset($data["id"])) {
            $this->update($data);
        } else {
            $requete = $this->cnx->prepare("INSERT INTO Customers (first_name, last_name, email, country, city, lat, lng) VALUES (:first_name, :last_name, :email, :country, :city, :lat, :lng)");
            $requete->bindParam(':first_name', $data["first_name"]);
            $requete->bindParam(':last_name', $data["last_name"]);
            $requete->bindParam(':email', $data["email"]);
            $requete->bindParam(':country', $data["country"]);
            $requete->bindParam(':city', $data["city"]);
            $requete->bindParam(':lat', $data["lat"]);
            $requete->bindParam(':lng', $data["lng"]);
            $requete->execute();
        }
    }

    public function update($data) {
        $requete = $this->cnx->prepare("UPDATE Customers SET first_name=:first_name, last_name=:last_name, email=:email, country=:country, city=:city, lat=:lat, lng=:lng WHERE id=:id");
        $requete->bindParam(':id', $data["id"]);
        $requete->bindParam(':first_name', $data["first_name"]);
        $requete->bindParam(':last_name', $data["last_name"]);
        $requete->bindParam(':email', $data["email"]);
        $requete->bindParam(':country', $data["country"]);
        $requete->bindParam(':city', $data["city"]);
        $requete->bindParam(':lat', $data["lat"]);
        $requete->bindParam(':lng', $data["lng"]);
        $requete->execute();
    }

    public function delete($id) {
        $requete = $this->cnx->prepare("DELETE FROM Customers WHERE id=:id");
        $requete->bindParam(':id', $id);
        $requete->execute();
    }
}
?>