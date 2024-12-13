<?php

class Rentals implements JsonSerializable {
    private int $id;
    private string $customer_id;
    private string $movie_id;
    private string $rental_date;
    private string $rental_price;

    public function __construct(array $data){
        $this->id = $data["id"];
        $this->customer_id = $data["customer_id"];
        $this->movie_id = $data["movie_id"];
        $this->rental_date = $data["rental_date"];
        $this->rental_price = $data["rental_price"];
    }

    public function getId(): int
    {
        return $this->id;
    }
    public function getCustomerId(): string
    {
        return $this->customer_id;
    }
    public function getMovieId(): string
    {
        return $this->movie_id;
    }
    public function getRentalDate(): string
    {
        return $this->rental_date;
    }

    public function getRentalPrice(): string
    {
        return $this->rental_price;
    }

    public function jsonSerialize() : mixed
    {
        return [
            "id" => $this->id,
            "customer_id" => $this->customer_id,
            "movie_id" => $this->movie_id,
            "rental_date" => $this->rental_date,
            "rental_price" => $this->rental_price
        ];
    }

    public function setId($id): self
    {
        $this->id = $id;
        return $this;
    }

    public function setCustomerId($customer_id): self
    {
        $this->customer_id = $customer_id;
        return $this;
    }

    public function setMovieId($movie_id): self
    {
        $this->movie_id = $movie_id;
        return $this;
    }

    public function setRentalDate($rental_date): self    
    {
        $this->rental_date = $rental_date;
        return $this;
    }

    public function setRentalPrice($rental_price): self    
    {
        $this->rental_price = $rental_price;
        return $this;
    }
}