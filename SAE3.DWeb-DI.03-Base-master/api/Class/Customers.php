<?php

class Customers implements JsonSerializable {
    private int $id;
    private string $first_name;
    private string $last_name;
    private string $email;
    private string $country;
    private string $city;
    private float $lat;
    private float $lng;

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->first_name = $data["first_name"];
        $this->last_name = $data["last_name"];
        $this->email = $data["email"];
        $this->country = $data["country"];
        $this->city = $data["city"];
        $this->lat = $data["lat"];
        $this->lng = $data["lng"];
    }

    public function getId() {
        return $this->id;
    }

    public function getFirstName() {
        return $this->first_name;
    }

    public function getLastName() {
        return $this->last_name;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getCountry() {
        return $this->country;
    }

    public function getCity() {
        return $this->city;
    }

    public function getLat() {
        return $this->lat;
    }

    public function getLng() {
        return $this->lng;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'country' => $this->country,
            'city' => $this->city,
            'lat' => $this->lat,
            'lng' => $this->lng
        ];
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setFirstName($first_name) {
        $this->first_name = $first_name;
    }

    public function setLastName($last_name) {
        $this->last_name = $last_name;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setCountry($country) {
        $this->country = $country;
    }

    public function setCity($city) {
        $this->city = $city;
    }

    public function setLat($lat) {
        $this->lat = $lat;
    }

    public function setLng($lng) {
        $this->lng = $lng;
    }
}
?>